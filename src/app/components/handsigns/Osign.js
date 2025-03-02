import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const oSign = new GestureDescription('O');

// Thumb: No Curl, slightly rotated left
oSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
oSign.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
oSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);

// Fingers: **Full Curl (Perfect "O" Shape) + Tilted Slightly Left**
[Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  oSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  oSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.9); // Rotated left
  oSign.addDirection(finger, FingerDirection.HorizontalRight, 0.9);
});

// Reduce Half Curl weight to avoid confusion with "C"
oSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.3);
oSign.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.3);
oSign.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.3);
oSign.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.3);

