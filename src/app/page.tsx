'use client';

import { useState } from 'react';

import CameraHandSignComponent from './components/CameraHandSign';
import SignLanguageTranslator from './components/SignLanguageTranslator';
import { HandMetal } from 'lucide-react';

export default function Home() {
  const [detectionHistory, setDetectionHistory] = useState<string[]>(['H', 'E', 'L', 'L', 'O']);



  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <header className="flex h-16 items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <HandMetal className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-medium tracking-tight">LATra</h1>
          </div>
        </header>

        <main className="py-12">
          <div className="space-y-8">
            {/* Translation results */}
            <div className="rounded-lg">
              <SignLanguageTranslator />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}