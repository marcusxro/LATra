import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const insertSign = new GestureDescription('Space');

// Thumb
insertSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
insertSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.50);
insertSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.50);

// Index (Extended)
insertSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
insertSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// Middle (Curled)
insertSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);
insertSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.70);

// Ring (Curled)
insertSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
insertSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.70);

// Pinky (Extended)
insertSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1);
insertSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
