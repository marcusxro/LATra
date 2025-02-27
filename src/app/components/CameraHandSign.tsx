'use client';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { initializeGestureRecognizer } from '../lib/static-data/oten';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import { GestureEstimator } from 'fingerpose';
import { Camera, Hand, Maximize2, RefreshCw, ZoomIn } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface CameraHandSignProps {
    onDetection?: (letter: string, confidence: number) => void;
    confidenceThreshold: number;
    gestureRecognizer: GestureEstimator;
}

const CameraHandSignComponent: React.FC<CameraHandSignProps> = ({ onDetection }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [zoom, setZoom] = useState(100);
    const [error, setError] = useState<string | null>(null);
    const [model, setModel] = useState<handpose.HandPose | null>(null);
    const [detectedLetter, setDetectedLetter] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectionHistory, setDetectionHistory] = useState<string[]>([]);
    const [detectionBuffer, setDetectionBuffer] = useState<string[]>([]);
    const [lastStableDetection, setLastStableDetection] = useState<string | null>(null);



    const gestureEstimator = initializeGestureRecognizer();

    const detectHands = async () => {
        if (!model || !videoRef.current || !isStreaming || !isDetecting) return;

        try {
            const video = videoRef.current;
            const predictions = await model.estimateHands(video, {
                flipHorizontal: true,
                staticImageMode: false,
                maxNumHands: 1,
                detectionConfidence: 0.8,
            } as any);

            drawHandLandmarks(predictions);

            if (predictions.length > 0) {
                const landmarks = predictions[0].landmarks;
                if (isHandPositionValid(landmarks)) {
                    const estimatedGestures = gestureEstimator.estimate(landmarks as any, 7.5);
                    if (estimatedGestures.gestures.length > 0) {
                        const topGestures = estimatedGestures.gestures.sort((a, b) => b.score - a.score).slice(0, 3);
                        const bestGesture = topGestures[0];
                        if (bestGesture.score > 8.0) {
                            setDetectedLetter(bestGesture.name);
                            onDetection?.(bestGesture.name, bestGesture.score);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error during hand detection:", err);
        }

        if (isDetecting) {
            requestAnimationFrame(detectHands);
        }
    };

    const drawHandLandmarks = (predictions: handpose.AnnotatedPrediction[]) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        predictions.forEach(prediction => {
            const landmarks = prediction.landmarks;

            // Draw connections first (under the dots)
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';

            // Draw palm connections
            const palmBase = [0, 1, 5, 9, 13, 17, 0];
            for (let i = 0; i < palmBase.length - 1; i++) {
                const start = landmarks[palmBase[i]];
                const end = landmarks[palmBase[i + 1]];

                ctx.beginPath();
                ctx.moveTo(start[0], start[1]);
                ctx.lineTo(end[0], end[1]);
                ctx.stroke();
            }

            // Draw finger connections with different colors
            const fingers = [
                { points: [1, 2, 3, 4], color: 'rgba(255, 0, 0, 0.8)' },    // thumb
                { points: [5, 6, 7, 8], color: 'rgba(0, 255, 0, 0.8)' },    // index
                { points: [9, 10, 11, 12], color: 'rgba(0, 0, 255, 0.8)' }, // middle
                { points: [13, 14, 15, 16], color: 'rgba(255, 255, 0, 0.8)' }, // ring
                { points: [17, 18, 19, 20], color: 'rgba(0, 255, 255, 0.8)' } // pinky
            ];

            fingers.forEach(finger => {
                ctx.strokeStyle = finger.color;
                for (let i = 0; i < finger.points.length - 1; i++) {
                    const start = landmarks[finger.points[i]];
                    const end = landmarks[finger.points[i + 1]];

                    ctx.beginPath();
                    ctx.moveTo(start[0], start[1]);
                    ctx.lineTo(end[0], end[1]);
                    ctx.stroke();
                }
            });

            // Draw landmarks with a border for better visibility
            landmarks.forEach((landmark, index) => {
                ctx.beginPath();
                ctx.arc(landmark[0], landmark[1], 6, 0, 2 * Math.PI);
                ctx.fillStyle = index === 0 ? 'yellow' : 'white';
                ctx.fill();
                ctx.strokeStyle = 'black'; // Border color
                ctx.lineWidth = 2; // Border width
                ctx.stroke();
            });
        });
    };

    const isHandPositionValid = (landmarks: number[][]) => {
        const handSize = calculateHandSize(landmarks);
        const isInFrame = checkHandInFrame(landmarks);
        const hasGoodVisibility = checkHandVisibility(landmarks);
        return handSize > 100 && isInFrame && hasGoodVisibility;
    };

    const calculateHandSize = (landmarks: number[][]) => {
        const xs = landmarks.map(l => l[0]);
        const ys = landmarks.map(l => l[1]);
        const width = Math.max(...xs) - Math.min(...xs);
        const height = Math.max(...ys) - Math.min(...ys);
        return Math.sqrt(width * width + height * height);
    };

    const checkHandInFrame = (landmarks: number[][]) => {
        const videoWidth = videoRef.current?.videoWidth || 0;
        const videoHeight = videoRef.current?.videoHeight || 0;
        return landmarks.every(point =>
            point[0] >= 0 && point[0] <= videoWidth &&
            point[1] >= 0 && point[1] <= videoHeight
        );
    };

    const checkHandVisibility = (landmarks: number[][]) => {
        const keyPoints = [0, 4, 8, 12, 16, 20];
        return keyPoints.every(idx => landmarks[idx] && landmarks[idx].length === 3);
    };

    const loadHandposeModel = async () => {
        try {
            await tf.ready();
            const handModel = await handpose.load();
            setModel(handModel);
            console.log("Handpose model loaded");
        } catch (err) {
            console.error("Error loading handpose model:", err);
            setError("Failed to load hand detection model. Please try again.");
        }
    };

    const startCamera = async () => {
        try {
            setError(null);
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user',
                    frameRate: { ideal: 60 },
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    setIsStreaming(true);
                };

                if (!model) {
                    await loadHandposeModel();
                }
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Failed to start camera. Please check your camera settings and try again.");
            setIsStreaming(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setIsDetecting(false);
        }
    };

    const toggleCamera = () => {
        if (isStreaming) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const toggleDetection = () => {
        setIsDetecting(prev => !prev);
    };

    useEffect(() => {
        if (isDetecting) {
            detectHands();
        }
    }, [isDetecting]);

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <Card className="overflow-hidden border border-gray-800 bg-white">
            <CardHeader className="border-b border-gray-800 pb-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Hand className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg font-medium tracking-tight">Hand Sign Detection</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                        {isDetecting && (
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                                {detectedLetter ? `Detected: ${detectedLetter}` : 'Detecting...'}
                            </Badge>
                        )}
                        <Badge
                            variant={isStreaming ? "default" : "outline"}
                            className={isStreaming ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""}
                        >
                            {isStreaming ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="relative bg-black w-full aspect-video overflow-hidden">
                    {error && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center p-4">
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button
                                    variant="outline"
                                    className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                                    onClick={() => {
                                        setError(null);
                                        startCamera();
                                    }}
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="relative w-full h-full overflow-hidden">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
                            autoPlay
                            playsInline
                            muted
                        />

                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        />

                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-blue-500/50 backdrop-blur-sm border-gray-800 hover:bg-blue-600/50"
                                onClick={() => setZoom(100)}
                            >
                                <RefreshCw className="h-4 w-4 text-white" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-blue-500/50 backdrop-blur-sm border-gray-800 hover:bg-blue-600/50"
                            >
                                <Maximize2 className="h-4 w-4 text-white" />
                            </Button>
                        </div>

                        <div className="absolute bottom-4 right-4 w-32 bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-2">
                                <ZoomIn className="h-4 w-4 text-gray-400" />
                                <Slider
                                    value={[zoom]}
                                    min={100}
                                    max={200}
                                    step={10}
                                    onValueChange={(value: any) => setZoom(value[0])}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {!isStreaming && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-white text-lg mb-4">Camera is currently inactive.</p>
                                    <p className="text-gray-300 mb-6">Please grant camera access to start using the hand sign detection.</p>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                                        onClick={toggleCamera}
                                    >
                                        <Camera className="mr-2 h-5 w-5" />
                                        Start Camera
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-800 bg-white p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {isStreaming && (
                                <Button
                                    variant={isDetecting ? "outline" : "secondary"}
                                    className={isDetecting ? "border-blue-500/20 text-blue-500 hover:bg-blue-500/10" : ""}
                                    onClick={toggleDetection}
                                >
                                    {isDetecting ? "Stop Detection" : "Start Detection"}
                                </Button>
                            )}
                        </div>
                        <div className="text-sm text-gray-400">
                            {!isStreaming
                                ? "Camera is inactive"
                                : !model
                                    ? "Loading hand detection model..."
                                    : isDetecting
                                        ? `Detecting hand signs${detectedLetter ? `: ${detectedLetter}` : ''}`
                                        : "Camera is active (detection off)"
                            }
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CameraHandSignComponent;
