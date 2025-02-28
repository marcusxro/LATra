
"use client"
import { useEffect, useRef, useState } from 'react';
import service from '../components/Service.js';

const maxVideoSize = 224;
const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '_NOTHING', '_SPACE',
];
const THRESHOLD = 5;
const THRESHOLDS: any = { S: 3, E: 5, A: 5, N: 6, R: 5 , I: 5, G: 5, H: 5, T: 5, O: 5, P: 5, Q:  5, U: 5, V: 5, W: 5, X: 5, Y: 5, Z: 5 };

export default function Page() {
  const videoElement = useRef<any>(null);
  const canvasEl = useRef<any>(null);
  const outputCanvasEl = useRef<any>(null);
  const [letter, setLetter] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [fps, setFps] = useState<any>(0);
  const [words, setWords] = useState<any>('');
  const wordsRef = useRef(''); // Use ref to avoid unnecessary re-renders

  useEffect(() => {
    if (typeof window === 'undefined') return;

    async function initCamera() {
      if (!videoElement.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: maxVideoSize, height: maxVideoSize, facingMode: 'user' },
          audio: false,
        });
        videoElement.current.srcObject = stream;
        videoElement.current.play();
      } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Webcam access denied or not available.');
      }
    }

    async function load() {
      await initCamera();
      await service.load();
      setLoading(false);
      processImage(); // Start processing after everything is loaded
    }

    load();
  }, []);

  function processImage() {
    if (!videoElement.current || !canvasEl.current) return;

    let prevLetter = '';
    let count = 0;
    let frames = 0;
    let startTime = performance.now();

    const ctx = canvasEl.current.getContext('2d');
    const ctxOutput = outputCanvasEl.current?.getContext('2d');

    const processFrame = async () => {
      if (!videoElement.current || !canvasEl.current) return;

      // Draw video frame to canvas
      ctx.drawImage(videoElement.current, 0, 0, maxVideoSize, maxVideoSize);
      const image = ctx.getImageData(0, 0, maxVideoSize, maxVideoSize);

      try {
        // Process image and get prediction
        const processedImage = await service.imageProcessing(image);
        ctxOutput?.putImageData(processedImage.data.payload, 0, 0);

        const prediction = await service.predict(processedImage.data.payload);
        const predictionValue = prediction.data.payload[0]; // Access the first element of Int32Array
        const letterValue = LETTERS[predictionValue]; // Get corresponding letter from array

        console.log(`Predicted letter index: ${prediction.data.payload}, Letter: ${letterValue}`);
        
    
        setLetter(letterValue);

        // Handle letter transitions and thresholds
        if (letterValue !== prevLetter) {
          if ((THRESHOLDS[prevLetter] || THRESHOLD) < count) {
            if (prevLetter === '_SPACE') {
              wordsRef.current += ' ';
            } else if (prevLetter !== '_NOTHING') {
              wordsRef.current += prevLetter;
            }
            setWords(wordsRef.current); // Update state with the new word
          }
          count = 0;
        } else {
          count++;
        }
        prevLetter = letterValue;

        // Calculate FPS
        frames++;
        const now = performance.now();
        if (now - startTime >= 1000) {
          setFps(frames);
          frames = 0;
          startTime = now;
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }

      requestAnimationFrame(processFrame);
    };

    requestAnimationFrame(processFrame);
  }

  return (
    <div style={{ marginTop: '2em' }}>
      <h1 className="text-center text-heading" style={{ marginBottom: '0.5em' }}>

      </h1>
      {loading && (
        <div className="row justify-content-center">
          <div className="col text-center">
            <div
              className="spinner-border"
              style={{ width: '8em', height: '8em', marginBottom: '2em' }}
              role="status"
            ></div>
          </div>
        </div>
      )}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div className="row justify-content-center">
          <div className="col-xs-12 text-center">
            <video className="video" playsInline ref={videoElement} />
          </div>
          <canvas
            style={{ display: 'none' }}
            ref={canvasEl}
            width={maxVideoSize}
            height={maxVideoSize}
          ></canvas>
          <canvas
            className="col-xs-12"
            style={{ display: 'none' }}
            ref={outputCanvasEl}
            width={maxVideoSize}
            height={maxVideoSize}
          ></canvas>
        </div>

        <div className="row justify-content-center text-center" style={{ marginTop: '2em' }}>
          <div className="col-xs-12">
            <h5 className="text-letter">Predicted Letter:</h5>
            <h4
              className="text-letter"
              style={{
                borderRadius: 10,
                border: '2px solid #FFFFFF',
                padding: '0.5em',
              }}
            >
              {letter}
            </h4>
          </div>
        </div>
        <div className="row justify-content-center text-center" style={{ marginTop: '2em' }}>
          <div className="col-xs-12">
            <h3 className="text-words">Predicted Words:</h3>
            <h2
              className="text-words"
              style={{
                borderRadius: 10,
                border: '2px solid #FFFFFF',
                padding: '1em',
              }}
            >
              {words}
            </h2>
            <p className="text-fps">FPS: {fps.toFixed(3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}