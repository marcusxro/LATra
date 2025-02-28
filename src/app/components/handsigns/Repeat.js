import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const RepeatSign = new GestureDescription('Repeat');

// Thumb (Slight Curl)
RepeatSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
RepeatSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.50);
RepeatSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.50);

// Index & Middle (Extended, forming a V shape)
RepeatSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
RepeatSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

RepeatSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
RepeatSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

// Ring & Pinky (Extended, together)
RepeatSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
RepeatSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

RepeatSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
RepeatSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);


