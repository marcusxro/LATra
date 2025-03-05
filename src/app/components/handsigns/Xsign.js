import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

export const xSign = new GestureDescription("X");

// ✅ Palm faces **RIGHT** (Allows minor rotation)
xSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9); // Rotated Right
xSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.6); // Some flexibility

// 👍 **Thumb** - Slightly curled, pointing **right**
xSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1);
xSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
xSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7);

// ☝️ **Index Finger** - **Bent at Tip**, relaxed
xSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1); 
xSign.addCurl(Finger.Index, FingerCurl.NoCurl, 0.7); // Allows slight variation
xSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);
xSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.5); // Flexibility

// ✊ **Other Fingers (Middle, Ring, Pinky)** - **Fully curled into palm**
[Finger.Middle, Finger.Ring, Finger.Pinky].forEach(finger => {
    xSign.addCurl(finger, FingerCurl.FullCurl, 1);
    xSign.addDirection(finger, FingerDirection.HorizontalRight, 0.9);
    xSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.6); // Slight palm rotation allowed
});
