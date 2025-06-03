'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { DietPreference } from '@/types';
import styles from './page.module.css';

const dietPreferences: { value: DietPreference, label: string }[] = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'keto', label: 'Keto' },
    { value: 'standard', label: 'Standard' },
];

export default function DietaryPreferencePage() {
    const router = useRouter();
    const [selectedPreference, setSelectedPreference] = useState<DietPreference | null>(null);

    const handleNext = () => {
        if (selectedPreference) {
            // Save selectedPreference to state or context if needed
            // After this step, onboarding is complete, redirect to meal plans or dashboard
            router.push('/meal-plans');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo} role="img" aria-label="NutriFuel Logo">🌿</div>
                <h1 className={styles.heading}>Select Dietary Preference</h1>
            </div>

            <div className={styles.optionsList}>
                {dietPreferences.map(preference => (
                    <button
                        key={preference.value}
                        className={`${styles.optionButton} ${selectedPreference === preference.value ? styles.selected : ''}`}
                        onClick={() => setSelectedPreference(preference.value)}
                    >
                        {preference.label}
                    </button>
                ))}
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    onClick={handleNext}
                    fullWidth
                    disabled={!selectedPreference}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 