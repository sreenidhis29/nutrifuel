'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

const activityLevels = [
    'Sedentary',
    'Lightly active',
    'Active',
    'Very active',
];

export default function ActivityLevelPage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState('');

    const handleNext = () => {
        if (selectedLevel) {
            // TODO: Save activity level to your preferred backend
            router.push('/onboarding/goals');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">What's your activity level?</h1>
            <div className="max-w-2xl mx-auto space-y-4">
                {activityLevels.map((level) => (
                    <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`w-full p-4 text-left border rounded-lg transition-colors ${selectedLevel === level
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                    >
                        <h3 className="text-lg font-semibold">{level}</h3>
                        <p className="text-gray-600 mt-1">
                            {level === 'Sedentary' && 'Little or no exercise'}
                            {level === 'Lightly active' && 'Light exercise 1-3 days/week'}
                            {level === 'Active' && 'Moderate exercise 3-5 days/week'}
                            {level === 'Very active' && 'Hard exercise 6-7 days/week'}
                        </p>
                    </button>
                ))}
            </div>
            <div className="max-w-2xl mx-auto mt-8">
                <button
                    onClick={handleNext}
                    disabled={!selectedLevel}
                    className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
} 