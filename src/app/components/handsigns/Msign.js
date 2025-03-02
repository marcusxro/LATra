import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const mSign = new GestureDescription('M');

// Thumb: Slightly curled, positioned away from palm
mSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
mSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Index: Fully curled, **tilted left**
mSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1);
mSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

// Middle: Fully curled, **tilted left**
mSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
mSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);

// Ring: Fully curled, **tilted left**
mSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
mSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);

// Pinky: **Lowered slightly, also tilted left**
mSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
mSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.80);
