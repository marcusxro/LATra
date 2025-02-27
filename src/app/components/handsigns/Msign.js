import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const mSign = new GestureDescription('M');

// Thumb
mSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0); // Thumb is half-curled
mSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.70);
mSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.70);

// Index
mSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0); // Index is fully curled
mSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.70);
mSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

// Middle
mSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0); // Middle is fully curled
mSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// Ring
mSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0); // Ring is fully curled
mSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// Pinky
mSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0); // Pinky is fully curled
mSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);