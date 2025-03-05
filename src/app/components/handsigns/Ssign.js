import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const sSign = new GestureDescription('S');

// Thumb: Curled over fingers but allowing slight variations
sSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
sSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.8); // Allow slight looseness
sSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0); // Bias rotation left

// All other fingers should be curled, but with a leftward rotation
[Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
    sSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
    sSign.addCurl(finger, FingerCurl.HalfCurl, 0.7); // Allow minor variations
    sSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0); // Force left tilt
    sSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.8); // More left tilt
});

