import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const nSign = new GestureDescription('N');

// Thumb: Slightly curled and tilted left
nSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.2);
nSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.2);

// Index: Fully curled, **tilted left**
nSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.2);
nSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);  // More distinct than M

// Middle: Fully curled, **tilted left**
nSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.2);
nSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);

// Ring: Fully curled, **tilted left**
nSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.2);
nSign.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);

// Pinky: **Half curled to differentiate from M**
nSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.2);
nSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
