import { GestureEstimator } from "fingerpose";

import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

export const initializeGestureRecognizer = () => {
    const gestures = new Map<string, GestureDescription>();

    // A - Fist with thumb to the side
    const letterA = new GestureDescription('A');
    letterA.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterA.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
    letterA.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterA.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterA.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterA.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('A', letterA);

    // B - Fingers straight up, thumb across palm
    const letterB = new GestureDescription('B');
    letterB.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterB.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterB.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterB.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterB.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterB.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
    letterB.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.9);
    letterB.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
    letterB.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.9);
    gestures.set('B', letterB);

    // C - Curved hand, thumb and fingers together
    const letterC = new GestureDescription('C');
    letterC.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterC.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
    letterC.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
    letterC.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.9);
    letterC.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
    letterC.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterC.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
    letterC.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.9);
    letterC.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
    letterC.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9);
    gestures.set('C', letterC);

    // D - Index up, others curled
    const letterD = new GestureDescription('D');
    letterD.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterD.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterD.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterD.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterD.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterD.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('D', letterD);

    // E - All fingers curled tightly against palm
    const letterE = new GestureDescription('E');
    letterE.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterE.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
    letterE.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterE.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterE.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterE.addDirection(Finger.Middle, FingerDirection.VerticalDown, 0.9);
    letterE.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterE.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 0.9);
    letterE.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    letterE.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.9);
    gestures.set('E', letterE);

    // F - Thumb and index touching, others straight
    const letterF = new GestureDescription('F');
    letterF.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
    letterF.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
    letterF.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterF.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterF.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
    letterF.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.9);
    letterF.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
    letterF.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.9);
    gestures.set('F', letterF);

    // G - Thumb and index pointing right
    const letterG = new GestureDescription('G');
    letterG.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterG.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
    letterG.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterG.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);
    letterG.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterG.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterG.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('G', letterG);

    // H - Index and middle straight
    const letterH = new GestureDescription('H');
    letterH.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterH.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterH.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);
    letterH.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterH.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.9);
    letterH.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterH.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('H', letterH);

    // I - Pinky straight up
    const letterI = new GestureDescription('I');
    letterI.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterI.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterI.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterI.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterI.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
    letterI.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.9);
    gestures.set('I', letterI);

    // J - Like I but with motion (pinky traces J)
    const letterJ = new GestureDescription('J');
    letterJ.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterJ.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterJ.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterJ.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterJ.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
    letterJ.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 0.9);
    gestures.set('J', letterJ);

    // K - Index and middle straight up in V, thumb to middle
    const letterK = new GestureDescription('K');
    letterK.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterK.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
    letterK.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterK.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterK.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterK.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9);
    letterK.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterK.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('K', letterK);

    // L - L shape with thumb and index
    const letterL = new GestureDescription('L');
    letterL.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterL.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
    letterL.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterL.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterL.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterL.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterL.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('L', letterL);

    // M - Three fingers over thumb
    const letterM = new GestureDescription('M');
    letterM.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterM.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterM.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterM.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterM.addDirection(Finger.Middle, FingerDirection.DiagonalDownRight, 0.9);
    letterM.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterM.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 0.9);
    letterM.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('M', letterM);

    // N - Two fingers over thumb
    const letterN = new GestureDescription('N');
    letterN.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterN.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterN.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterN.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterN.addDirection(Finger.Middle, FingerDirection.DiagonalDownRight, 0.9);
    letterN.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterN.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('N', letterN);

    // O - All fingers forming O shape
    const letterO = new GestureDescription('O');
    letterO.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
    letterO.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
    letterO.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
    letterO.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
    letterO.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
    gestures.set('O', letterO);

    // P - Index pointing down, thumb out
    const letterP = new GestureDescription('P');
    letterP.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterP.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
    letterP.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterP.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterP.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterP.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterP.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('P', letterP);

    // Q - Index down, thumb out
    const letterQ = new GestureDescription('Q');
    letterQ.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterQ.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
    letterQ.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterQ.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterQ.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterQ.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterQ.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('Q', letterQ);

    // R - Crossed fingers
    const letterR = new GestureDescription('R');
    letterR.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterR.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterR.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterR.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterR.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterR.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterR.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('R', letterR);

    // S - Fist with thumb wrapped over fingers
    const letterS = new GestureDescription('S');
    letterS.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterS.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
    letterS.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterS.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 0.9);
    letterS.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterS.addDirection(Finger.Middle, FingerDirection.VerticalDown, 0.9);
    letterS.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterS.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 0.9);
    letterS.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    letterS.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 0.9);
    gestures.set('S', letterS);

    // T - Index between thumb and middle
    const letterT = new GestureDescription('T');
    letterT.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterT.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.9);
    letterT.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterT.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterT.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterT.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterT.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('T', letterT);

    // U - Index and middle parallel
    const letterU = new GestureDescription('U');
    letterU.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterU.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterU.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.9);
    letterU.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterU.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterU.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterU.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('U', letterU);

    // V - Index and middle in V shape
    const letterV = new GestureDescription('V');
    letterV.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterV.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterV.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
    letterV.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterV.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 0.9);
    letterV.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterV.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('V', letterV);

    // W - Index, middle, and ring fingers spread
    const letterW = new GestureDescription('W');
    letterW.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterW.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterW.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);
    letterW.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    letterW.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
    letterW.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
    letterW.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);
    letterW.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('W', letterW);

    // X - Index finger hook
    const letterX = new GestureDescription('X');
    letterX.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterX.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
    letterX.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.9);
    letterX.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterX.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterX.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('X', letterX);

    // Y - Thumb and pinky out
    const letterY = new GestureDescription('Y');
    letterY.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
    letterY.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
    letterY.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
    letterY.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterY.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterY.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
    letterY.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);
    gestures.set('Y', letterY);

    // Z - Index finger draws Z in air
    const letterZ = new GestureDescription('Z');
    letterZ.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
    letterZ.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    letterZ.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);
    letterZ.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
    letterZ.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
    letterZ.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
    gestures.set('Z', letterZ);

    return new GestureEstimator(Array.from(gestures.values()));
};

// ASL alphabet to word mappings
export const aslDictionary: { [key: string]: string[] } = {
    'A': ['A', 'AM', 'AT', 'ABOUT'],
    'B': ['BE', 'BUT', 'BEFORE', 'BY'],
    'C': ['CAN', 'COME', 'COULD', 'CHANGE'],
    'D': ['DO', 'DAY', 'DEAL', 'DONE'],
    'E': ['EVERY', 'EACH', 'ELSE', 'EXPLAIN'],
    'F': ['FOR', 'FROM', 'FIND', 'FRIEND'],
    'G': ['GO', 'GET', 'GOOD', 'GIVE'],
    'H': ['HAVE', 'HELP', 'HOW', 'HE'],
    'I': ['I', 'IN', 'IS', 'IF'],
    'J': ['JUST', 'JOB', 'JOIN', 'JOSEPH'],
    'K': ['KIND', 'KEEP', 'KNOW', 'KNEW'],
    'L': ['LIKE', 'LOOK', 'LEARN', 'LIVE'],
    'M': ['ME', 'MY', 'MORE', 'MAKE'],
    'N': ['NO', 'NEW', 'NOW', 'NAME'],
    'O': ['OF', 'ON', 'OR', 'OPEN'],
    'P': ['PEOPLE', 'PLACE', 'PLEASE', 'PUT'],
    'Q': ['QUESTION', 'QUICK', 'QUITE'],
    'R': ['REALLY', 'RIGHT', 'RUN'],
    'S': ['SEE', 'SAY', 'SOME', 'SHOULD'],
    'T': ['THE', 'TO', 'TIME', 'THINK'],
    'U': ['USE', 'UP', 'US', 'UNDER'],
    'V': ['VERY', 'VIEW', 'VOTE'],
    'W': ['WILL', 'WANT', 'WITH', 'WORK'],
    'X': ['EXAMPLE', 'EXPLAIN'],
    'Y': ['YOU', 'YOUR', 'YEAR', 'YES'],
    'Z': ['ZERO', 'ZEBRA'],

    // Full phrase mappings
    'I_LOVE_YOU': ['I love you'],
    'THANK_YOU': ['Thank you'],
    'HELLO': ['Hello', 'Hi'],
    'PLEASE': ['Please'],
    'SORRY': ['Sorry', 'I apologize']
};

// Common phrases based on letter sequences
export const commonPhrases: { [key: string]: string } = {
    'IAM': 'I am',
    'IMY': 'I miss you',
    'ICA': 'I can',
    'ICH': 'I can help',
    'ICU': 'I can use',
    'IMJ': 'I am Joseph',
    'IMD': 'I am deaf',
    'IWY': 'I want you',
    'THY': 'Thank you',
    'HWA': 'How are',
    'HWY': 'How are you',
    'NIC': 'Nice to',
    'NIM': 'Nice to meet',
    'NIY': 'Nice to meet you',
    'PLH': 'Please help',
    'ILY': 'I love you',
};
