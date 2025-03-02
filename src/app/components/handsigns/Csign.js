import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const cSign = new GestureDescription('C');

// Thumb: Stays outward but slightly tilted
cSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
cSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
cSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.8);

// Fingers: Half Curl (More open than "O") + Tilt Left
[Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  cSign.addCurl(finger, FingerCurl.HalfCurl, 1.0); // More open
  cSign.addCurl(finger, FingerCurl.NoCurl, 0.4); // Slight flexibility
  cSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9); // Tilt left
});

// Reduce Full Curl weight (Prevents it from looking like "O")
cSign.addCurl(Finger.Index, FingerCurl.FullCurl, 0.2);
cSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.2);
cSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.2);
cSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.2);
