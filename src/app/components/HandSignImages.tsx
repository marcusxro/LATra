'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import a from '../lib/hand-images/a.jpg';
import b from '../lib/hand-images/b.jpg';
/* import c from '@/lib/hand-images/c.jpg';
import d from '@/lib/hand-images/d.jpg';
import e from '@/lib/hand-images/e.jpg';
import f from '@/lib/hand-images/f.jpg';
import g from '@/lib/hand-images/g.jpg';

 */
const aslData = [
    { letter: 'A', image: a },
    { letter: 'B', image: b },
    { letter: 'C', image: '/asl/c.png' },
    { letter: 'D', image: '/asl/d.png' },
    { letter: 'E', image: '/asl/e.png' },
    { letter: 'F', image: '/asl/f.png' },
    { letter: 'G', image: '/asl/g.png' },
    { letter: 'H', image: '/asl/h.png' },
    { letter: 'I', image: '/asl/i.png' },
    { letter: 'J', image: '/asl/j.png' },
    { letter: 'K', image: '/asl/k.png' },
    { letter: 'L', image: '/asl/l.png' },
    { letter: 'M', image: '/asl/m.png' },
    { letter: 'N', image: '/asl/n.png' },
    { letter: 'O', image: '/asl/o.png' },
    { letter: 'P', image: '/asl/p.png' },
    { letter: 'Q', image: '/asl/q.png' },
    { letter: 'R', image: '/asl/r.png' },
    { letter: 'S', image: '/asl/s.png' },
    { letter: 'T', image: '/asl/t.png' },
    { letter: 'U', image: '/asl/u.png' },
    { letter: 'V', image: '/asl/v.png' },
    { letter: 'W', image: '/asl/w.png' },
    { letter: 'X', image: '/asl/x.png' },
    { letter: 'Y', image: '/asl/y.png' },
    { letter: 'Z', image: '/asl/z.png' },
    { letter: 'Insert', image: '/asl/z.pn' },
    { letter: 'Repeat', image: '/asl/z.pn' },
];

const ASLHandGestureSelector = () => {
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const handleSelectChange = (value: string) => {
        setSelectedLetter(value);
    };

    const selectedData = aslData.find((item) => item.letter === selectedLetter);

    return (
        <div className="w-full flex flex-col items-center justify-center  space-y-6 bg-white p-6 border border-black rounded-xl">
            <h1 className="text-2xl font-bold uppercase text-black">ASL Hand Gesture Selector</h1>
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-48 bg-black text-white border border-black shadow-md">
                    <SelectValue placeholder="Choose a letter" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border border-black rounded-lg shadow-lg">
                    {aslData.map(({ letter }) => (
                        <SelectItem key={letter} value={letter} className="hover:bg-gray-300 cursor-pointer">
                            {letter}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedData && (
                <div className="mt-6 flex flex-col items-center">
                    <Image
                        src={selectedData.image}
                        alt={`ASL Hand Gesture for ${selectedData.letter}`}
                        width={200}
                        height={200}
                        className="border-4 border-black rounded-lg shadow-lg"
                    />
                    <p className="mt-4 text-lg font-semibold text-black">Letter: {selectedData.letter}</p>
                </div>
            )}
        </div>
    );
};

export default ASLHandGestureSelector;
