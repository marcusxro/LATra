'use client';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import * as fp from "fingerpose"
import Handsigns from "../components/handsigns"
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"

import { Signimage, Signpass } from "../components/handimage"
import { drawHand } from "../components/handposeutil"
import Metatags from "../components/metatags"
import * as hands from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";


import { camelCase, debounce } from "lodash";

import {
    Clipboard,
    HandIcon,
    MessageSquare,
    Pause,
    Play,
    RotateCcw,
    Volume2,
    VolumeX
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import CameraHandSignComponent from './CameraHandSign';

interface TranslationWord {
    word: string;
    timestamp: number;
    confidence: number;
}


import '@tensorflow/tfjs-backend-webgl';
import { aslDictionary, commonPhrases, initializeGestureRecognizer } from '../lib/static-data/oten';
import ASLHandGestureSelector from './HandSignImages';
import PopUp from './ui/popUp';
import Language from './ui/Language';
import Dictionary from './ui/Dictionary';
import SignConverter from './ui/SignConverter';

const SignLanguageTranslator = () => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentSentence, setCurrentSentence] = useState<string>('');
    const [translationHistory, setTranslationHistory] = useState<TranslationWord[]>([]);
    const [isTypingEffect, setIsTypingEffect] = useState(true);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [letterSequence, setLetterSequence] = useState<string>('');
    const [lastDetectedLetter, setLastDetectedLetter] = useState<string | null>(null);
    const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
    const [wordTimeout, setWordTimeout] = useState<NodeJS.Timeout | null>(null);
    const translationRef = useRef<HTMLDivElement>(null);
    const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

    // NEW: Add confidence threshold state
    const [confidenceThreshold, setConfenceThreshold] = useState<number>(8.0);
    // NEW: Add suggested phrases based on context
    const [suggestedPhrases, setSuggestedPhrases] = useState<string[]>([]);

    // Initialize speech synthesis
    useEffect(() => {
        if (typeof window !== 'undefined') {
            speechSynthesisRef.current = new SpeechSynthesisUtterance();
            speechSynthesisRef.current.rate = 1;
            speechSynthesisRef.current.pitch = 1;
            speechSynthesisRef.current.volume = 1;
        }

        return () => {
            if (speechSynthesisRef.current && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);






    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)

    const [camState, setCamState] = useState("on")

    const [sign, setSign] = useState<any>(null)

    let signList: any[] = []
    let currentSign = 0

    let gamestate = "started"

    // let net;

    async function runHandpose() {
        const net = await handpose.load()
        _signList()

        // window.requestAnimationFrame(loop);

        setInterval(() => {
            detect(net)
        }, 150)
    }

    function _signList() {
        signList = generateSigns()
    }

    function shuffle(a: any) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[a[i], a[j]] = [a[j], a[i]]
        }
        return a
    }

    function generateSigns() {
        const password = shuffle(Signpass)
        return password
    }

    const [gestureBuffer, setGestureBuffer] = useState<string[]>([]);
    const bufferSize = 5; // Adjust to smooth more or less

    const debouncedSetGesture = debounce((newSign: string) => {
        setGestureBuffer((prev) => [...prev, newSign].slice(-bufferSize)); // Keep last N gestures
    }, 200); // Adjust debounce time as needed
    const [signArr, setSignArr] = useState<string[]>([]);
    const [currentGesture, setCurrentGesture] = useState(null);
    const [gestureCount, setGestureCount] = useState(0);
    let detectionBuffer: string[] = [];
    let detectionStartTime: number | null = null; // Track when a sign starts
    const DETECTION_DURATION = 1500; // Require stable detection for 1.5s


    const [lastAddedLetter, setLastAddedLetter] = useState<string | null>(null);
    const [canRepeat, setCanRepeat] = useState(false);

    async function detect(net: any) {
        if (gamestate === "started") {
            // console.log("started");
        }

        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            if (canvasRef.current) {
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;
            }

            const hand = await net.estimateHands(video);
            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    Handsigns.aSign,
                    Handsigns.bSign,
                    Handsigns.cSign,
                    Handsigns.dSign,
                    Handsigns.eSign,
                    Handsigns.fSign,
                    Handsigns.gSign,
                    Handsigns.hSign,
                    Handsigns.iSign,
                    Handsigns.jSign,
                    Handsigns.kSign,
                    Handsigns.lSign,
                    Handsigns.mSign,
                    Handsigns.nSign,
                    Handsigns.oSign,
                    Handsigns.pSign,
                    Handsigns.qSign,
                    Handsigns.rSign,
                    Handsigns.sSign,
                    Handsigns.tSign,
                    Handsigns.uSign,
                    Handsigns.vSign,
                    Handsigns.wSign,
                    Handsigns.xSign,
                    Handsigns.ySign,
                    Handsigns.zSign,
                    Handsigns.insertSign,
                ]);

                const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);
                if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
                    const confidence = estimatedGestures.gestures.map((p: any) => p.score);
                    const maxConfidence = confidence.indexOf(Math.max(...confidence));
                    const detectedGesture = estimatedGestures.gestures[maxConfidence];

                    if (detectedGesture.score > 0.8) {
                        if (detectionBuffer.length === 0) {
                            detectionStartTime = Date.now();
                        }
                        detectionBuffer.push(detectedGesture.name);

                        // Find most stable letter in buffer
                        const mostStable = detectionBuffer.reduce((acc, letter) => {
                            acc[letter] = (acc[letter] || 0) + 1;
                            return acc;
                        }, {} as Record<string, number>);

                        const stableLetter = Object.keys(mostStable).reduce((a, b) =>
                            mostStable[a] > mostStable[b] ? a : b
                        );

                        const timeHeld = Date.now() - (detectionStartTime ?? 0);

                        if (timeHeld >= DETECTION_DURATION) {
                            if (stableLetter === "Repeat") {
                                setCanRepeat(true);
                                setSign("Repeat - Ready for new input");
                                detectionBuffer = [];
                                detectionStartTime = null;
                            } else if (
                                stableLetter !== lastAddedLetter ||
                                canRepeat
                            ) {
                                if (stableLetter === "Space") {
                                    setSignArr(prev => [...prev, " "]);
                                    setLastAddedLetter(stableLetter);
                                    setCanRepeat(false);
                                    detectionBuffer = [];
                                    detectionStartTime = null;
                                } else {
                                    setSignArr(prev => [...prev, stableLetter]);
                                    setLastAddedLetter(stableLetter);
                                    setCanRepeat(false);
                                    detectionBuffer = [];
                                    detectionStartTime = null;
                                }
                            }
                            setSign(stableLetter);
                        }
                    }
                }

                // Draw hand lines
                const ctx = canvasRef.current.getContext("2d");
                drawHand(hand, ctx);
            } else {
                console.log("No hand detected.");
                setSign(""); // Reset sign when no hand is found
                setGestureBuffer([]); // Clear buffer to prevent ghost gestures
            }
        }
    }
    const THRESHOLD = 5;

    // Function to handle detected gestures
    const handleDetectedGesture = (detectedGesture: any) => {
        if (!detectedGesture || !detectedGesture.name) {
            console.error("Invalid gesture detected:", detectedGesture);
            return;
        }

        // If the detected gesture is the same as the current gesture, increment the count
        if (detectedGesture.name === currentGesture) {
            setGestureCount(prevCount => {
                const newCount = prevCount + 1;
                // If the gesture count exceeds the threshold, add it to the signArr
                if (newCount >= THRESHOLD) {
                    console.log("Gesture count exceeds threshold:", newCount);
                    console.log("Detected gesture:", detectedGesture.name);
                    setSign(detectedGesture.name); // Update the displayed sign
                    setSignArr(prevArr => {
                        // Avoid adding the same gesture repeatedly
                        if (prevArr[prevArr.length - 1] !== detectedGesture.name) {
                            const newArr = [...prevArr, detectedGesture.name];
                            console.log("Updated signArr:", newArr); // Debugging log
                            return newArr;
                        }
                        console.log("No update to signArr, same gesture detected:", detectedGesture.name); // Debugging log
                        return prevArr; // Return the previous array if the gesture is the same
                    });
                    return 0; // Reset the count after adding the gesture to the array
                }
                return newCount;
            });
        } else {
            // If a new gesture is detected, reset the count and update the current gesture
            console.log("New gesture detected:", detectedGesture.name);
            setCurrentGesture(detectedGesture.name);
            setGestureCount(1);
        }
    };

    // Debugging useEffect to track signArr changes
    useEffect(() => {
        console.log("Current signArr:", signArr);
    }, [signArr]);

    // Debugging useEffect to track currentGesture and gestureCount changes
    useEffect(() => {
        console.log("Current Gesture:", currentGesture, "Gesture Count:", gestureCount);
    }, [currentGesture, gestureCount]);


    useEffect(() => {
        runHandpose()
    }, [])

    function turnOffCamera() {
        setCamState((prevs) => {
            return prevs === "on" ? "off" : "on"
        })
    }

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handlePopUp = () => {
        setIsPopUpOpen(!isPopUpOpen);
    }


    const speakText = (text: any) => {
        if (text === "") {
            const utterance = new SpeechSynthesisUtterance("No text to speak");
            utterance.lang = 'en-US'; // Set language
            utterance.rate = 1; // Speed (1 is normal)
            utterance.pitch = 1; // Pitch (1 is normal)

            speechSynthesis.speak(utterance);
        }
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set language
            utterance.rate = 1; // Speed (1 is normal)
            utterance.pitch = 1; // Pitch (1 is normal)

            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    };

    const [showLanguage, setShowLanguage] = useState(false);

    const handleLanguageShow = () => {
        setShowLanguage(!showLanguage);
    };

    const [showDictionary, setShowDictionary] = useState(false);

    const handleDictionaryShow = () => {
        setShowDictionary(!showDictionary);
    };

    const [showSign, setShowSign] = useState(false);

    const handleSignShow = () => {
        setShowSign(!showSign);
    };

    const copyTextToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    };


    const [languageChosen, setlanguageChosen] = useState<String>("");



    useEffect(() => {

        setlanguageChosen(localStorage.getItem("selectedLanguage") || "English")

        console.log("languageChosen", languageChosen)
    }, [languageChosen])



    return (
        <div className="flex flex-col gap-6 bg-white">


            <div className='flex row-reverse gap-6'>
                <div className='flex items-center justify-center flex-col gap-6  w-full max-w-[400px]'>
                    <div className="lg:col-span-1 overflow-hidden rounded-lg">

                        {camState === "on" ? (

                            <Webcam id="webcam" ref={webcamRef} />
                        ) : (
                            <div id="webcam" className="w-full max-w-[700px] max-h-[400px] text-white p-5 h-full bg-black">
                                camera off
                            </div>
                        )}
                    </div>
                    <div className="relative w-full h-full max-w-[700px] max-h-[400px]">
                        {/* Canvas */}
                        <canvas
                            className="bg-[#ececec] w-full h-full overflow-hidden rounded-lg"
                            id="gesture-canvas"
                            ref={canvasRef}
                        />

                        {/* Overlayed Div for Detected Gesture */}
                        <div className="absolute top-2/2 left-1/2 pb-9 transform -translate-x-1/2 -translate-y-1/2 text-black text-sm font-bold">
                            {sign ? `Detected Gesture: ${sign}` : "No gesture detected"}
                        </div>
                    </div>

                </div>

                {/* Enhanced Translator component */}
                <Card className="border border-gray-800 lg:col-span-1 w-full">
                    <CardHeader className="border-b border-gray-800 pb-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500/20 p-2 rounded-lg transition duration-200 hover:bg-blue-500/30">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-medium tracking-tight">
                                        {
                                            languageChosen === "Filipino" ?
                                                "Tagasalin ng Wika ng Senyas" : "Sign Language Translator "
                                        }
                                    </CardTitle>
                                    <CardDescription className="text-gray-400 text-sm">
                                        {
                                            languageChosen === "Filipino"
                                                ? "Mabilisang Pagsasalin ng ASL sa Teksto"
                                                : "Real-time ASL to Text Translation"
                                        }


                                    </CardDescription>
                                </div>
                            </div>
                            <Badge
                                variant={isTranslating ? "default" : "outline"}
                                className={`px-4 py-1.5 ${isTranslating
                                    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                    : "border-gray-800"}`}
                            >
                                <div className="flex items-center gap-2">
                                    {camState === "on" && (
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                    )}
                                    {languageChosen === "Filipino" ? (camState === "on" ? "Aktibo" : "Hindi Aktibo") : (camState === "on" ? "Active" : "Inactive")}

                                </div>
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Current letter/sign display */}
                        {lastDetectedLetter && (
                            <div className="flex justify-center">
                                <div className="bg-blue-500/10 rounded-xl px-6 py-3 flex items-center gap-3 border border-blue-500/20">
                                    <span className="text-3xl font-semibold text-blue-600">
                                        {lastDetectedLetter.replace(/_/g, ' ')}
                                    </span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-gray-400">Current Sign</span>
                                        <span className="text-sm text-blue-400">Confidence: 95%</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Main translation display */}
                        <div
                            ref={translationRef}
                            className="min-h-[300px] bg-white backdrop-blur-sm rounded-xl p-6 overflow-y-auto relative group border border-black"
                        >
                            {currentSentence || currentWord ? (
                                <div className="space-y-2">
                                    <p className="text-xl font-medium leading-relaxed text-black">
                                        {currentSentence}
                                        {currentWord && (
                                            <span className="text-black font-semibold">
                                                {currentSentence ? ' ' : ''}{currentWord}
                                            </span>
                                        )}
                                        {isTranslating && isTypingEffect && (
                                            <span className="inline-block w-2 h-6 bg-black ml-1 animate-pulse"></span>
                                        )}
                                    </p>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                                    <HandIcon className="h-12 w-12 text-gray-400" />
                                    <div className='h-full w-full max-h-[500px]'>
                                        {
                                            signArr.length > 0 ? (
                                                <textarea
                                                    value={signArr.join('')}
                                                    className="w-full h-[270px] bg-gray-100 p-2 resize-none border outline-none rounded-lg"
                                                    readOnly // Add readOnly if the textarea should not be editable
                                                />
                                            ) : (
                                                <p className="text-lg text-black">
                                                    {languageChosen === "Filipino"
                                                        ? (isTranslating ? "Naghihintay ng senyas ng kamay..." : "Lalabas dito ang salin")
                                                        : (isTranslating ? "Waiting for hand signs..." : "Translation will appear here")}

                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            )}

                            <Button
                                variant="outline"
                                onClick={() => copyTextToClipboard(signArr.join(''))}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity border-gray-300 hover:bg-gray-200 bg-white text-black cursor-pointer"
                            >
                                <Clipboard className="h-4 w-4 text-black" />
                            </Button>
                        </div>

                        {/* Suggested phrases */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {suggestedPhrases.map((phrase, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-800 hover:bg-gray-700 transition-colors"
                                    // onClick={() => addSuggestedPhrase(phrase)}
                                    >
                                        {phrase}
                                    </Button>
                                ))}
                            </div>
                        </div>


                        {/* Controls */}
                        <div className="flex justify-between items-center bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
                            <div className="flex gap-4">

                                <Button
                                    onClick={turnOffCamera}
                                    variant={isTranslating ? "destructive" : "outline"}
                                    className={!isTranslating
                                        ? "bg-blue-500/20 text-white hover:bg-[#888]"
                                        : ""} >

                                    {languageChosen === "Filipino" ? (
                                        camState === "on" ? (
                                            <><Pause className="h-4 w-4 mr-1 text-red-500" />Itigil</>
                                        ) : (
                                            <><Play className="h-4 w-4 mr-1 text-green-500" />Simulan</>
                                        )
                                    ) : (
                                        camState === "on" ? (
                                            <><Pause className="h-4 w-4 mr-1 text-red-500" />Stop</>
                                        ) : (
                                            <><Play className="h-4 w-4 mr-1 text-green-500" />Start</>
                                        )
                                    )}

                                </Button>


                            </div>

                            <div className="flex items-center gap-4">

                                <div
                                    onClick={() => speakText(signArr.join(''))}
                                    className='bg-blue-500/20 p-2 text-white flex gap-2 border-[#ececec] rounded-lg transition duration-200 hover:bg-blue-500/30'>
                                    {
                                        languageChosen === "Filipino" ? "Pagsalita" : "Speak"
                                    }
                                    
                                     <VolumeX className="h-5 w-5" />
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


            {isPopUpOpen && <PopUp handlePopUp={handlePopUp} />}
            {showLanguage && <Language handlePopUp={handleLanguageShow} />}
            {showDictionary && <Dictionary handlePopUp={handleDictionaryShow} />}
            {showSign && <SignConverter handlePopUp={handleSignShow} text={signArr.join("")} />}

            <div className='flex gap-5'>

                <div
                    onClick={() => setShowLanguage(true)}
                    className='bg-blue-500/20 p-2 rounded-lg transition duration-200 hover:bg-blue-500/30'>
                    {
                        languageChosen === "Filipino" ? "Wika" : "Language"
                    }
                </div>
                <div
                    onClick={() => setShowDictionary(true)}
                    className='bg-blue-500/20 p-2 rounded-lg transition duration-200 hover:bg-blue-500/30'>
                    {
                        languageChosen === "Filipino" ? "Diksyunaryo" : "Dictionary"
                    }
                </div>
                <div
                    onClick={() => setShowSign(true)}
                    className='bg-blue-500/20 p-2 rounded-lg transition duration-200 hover:bg-blue-500/30'>
                   {
                        languageChosen === "Filipino" ? "Salin" : "Translate"
                   }
                </div>
                <div
                    onClick={() => setSignArr([])}
                    className='bg-blue-500/20 p-2 rounded-lg transition duration-200 hover:bg-blue-500/30'>
                   {
                        languageChosen === "Filipino" ? "Burahin" : "Clear"
                   }
                </div>
            </div>
        </div>
    );
};

export default SignLanguageTranslator;