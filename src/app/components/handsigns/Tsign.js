import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const tSign = new GestureDescription('T');

// Thumb: No curl, **slightly diagonal left**
tSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.2);
tSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Index: Full curl, **tilted left**
tSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.2);
tSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);

// Middle: Full curl, **keeps vertical-up position**
tSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
tSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);

// Ring: Full curl, **aligned with middle finger**
tSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
tSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);

// Pinky: Full curl, **slightly diagonal left**
tSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
tSign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
