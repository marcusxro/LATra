import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const eSign = new GestureDescription('E');

// Thumb should be half-curled, touching fingers
eSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
eSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.7);

// Index should be half-curled (not fully curled)
eSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
eSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);

// Middle, Ring, and Pinky should be fully curled
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  eSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  eSign.addDirection(finger, FingerDirection.VerticalUp, 0.7);
});
