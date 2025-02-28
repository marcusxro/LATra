import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const wSign = new GestureDescription('W');

// Thumb
wSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);  // Slightly curled thumb
wSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.7); // Thumb pointing diagonally up-left

// Index
wSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0); // Index finger fully extended
wSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7); // Index pointing diagonally up-right

// Middle
wSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0); // Middle finger fully extended
wSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7); // Middle pointing vertically up

// Ring
wSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0); // Ring finger fully extended
wSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.7); // Ring pointing diagonally up-left

// Pinky
wSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0); // Pinky fully curled
wSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.7); // Pinky pointing diagonally up-left
