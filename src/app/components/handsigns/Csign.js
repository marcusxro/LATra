import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const cSign = new GestureDescription('C');

// Thumb
cSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
cSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.70); // Adjusted for right hand

// Index
cSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.70); // Adjusted for right hand

// Middle
cSign.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.70); // Adjusted for right hand

// Ring
cSign.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.70); // Adjusted for right hand

// Pinky
cSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1);
cSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.70); // Adjusted for right hand
