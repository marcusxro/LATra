import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const sSign = new GestureDescription('S');

// Thumb
sSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
sSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.70); // Adjust for left/right hand

// Index
sSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
sSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.70);

// Middle
sSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
sSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.70);

// Ring
sSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
sSign.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 0.70);

// Pinky
sSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
sSign.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.70);
