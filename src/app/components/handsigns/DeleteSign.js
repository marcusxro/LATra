import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const deleteSign = new GestureDescription('Delete');

// **Thumb: Strong downward positioning**
deleteSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0); // Keep it extended
deleteSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
deleteSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
deleteSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);

// **Index Finger: Slightly curled but distinct**
deleteSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
deleteSign.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.9);
deleteSign.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);

// **Middle, Ring, and Pinky: Fully curled into palm**
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach((finger) => {
  deleteSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  deleteSign.addDirection(finger, FingerDirection.VerticalDown, 0.9); // Emphasizing downward motion
});
