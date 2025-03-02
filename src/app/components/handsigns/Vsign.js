import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const vSign = new GestureDescription('V');

// Thumb: Slightly curled, positioned diagonally
vSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
vSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);

// Index: Fully extended, **tilted slightly left**
vSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
vSign.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
vSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.5); // Allow slight tilt

// Middle: Fully extended, **tilted more left than index**
vSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
vSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
vSign.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 0.6); // More tilt

// Ring: Fully curled, positioned slightly lower
vSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
vSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.9);

// Pinky: Fully curled, angled more diagonally
vSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
vSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
