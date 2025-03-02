import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const eSign = new GestureDescription('E');

// Thumb should be curled but touching fingers (not tucked in like "A")
eSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
eSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.8);
eSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.8);

// Index finger should be slightly curled (not fully curled like "A")
eSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
eSign.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5); // Allow small variations
eSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);

// Middle, Ring, and Pinky should be fully curled
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  eSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  eSign.addDirection(finger, FingerDirection.VerticalUp, 0.9);
});
