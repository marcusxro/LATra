import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const zSign = new GestureDescription('Z');

// Thumb - Natural position
zSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
zSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.75);

// Index Finger - **Partially curled and bent to the right**
zSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1); // **Half curl to indicate bending**
zSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1); // **Bent toward the right smoothly**

// Middle, Ring, and Pinky - Fully curled (fist-like shape)
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach(finger => {
    zSign.addCurl(finger, FingerCurl.FullCurl, 1);
    zSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.75);
});
