import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const dSign = new GestureDescription('D');

// Thumb
dSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
dSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.70); // Ensuring clear thumb direction

// Index
dSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
dSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.70);

// Middle
dSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// Ring
dSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// Pinky
dSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
dSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.70);
