import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const wSign = new GestureDescription('W');

// 👍 Thumb - Relaxed curl, diagonal right
wSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.9); // More flexible
wSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.8);
wSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.6); // Extra allowance

// ☝️ Index - Fully extended, tilting right
wSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
wSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);
wSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.6); // Extra flexibility

// ✌️ Middle - Fully extended, slight right tilt
wSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
wSign.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9);
wSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.6); // Extra flexibility

// 🖖 Ring - Fully extended, allowing a slight right tilt
wSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
wSign.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);
wSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.6);

// 🐸 Pinky - Slightly bent, allows more variations
wSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.8);
wSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.6); // Allows flexibility
wSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.7);
wSign.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.5); // Extra allowance
