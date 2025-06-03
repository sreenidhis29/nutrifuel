'use client';

import Navigation from '@/components/Navigation';
import OnboardingQuestionnaire from '@/components/OnboardingQuestionnaire';

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <OnboardingQuestionnaire />
        </div>
    );
} 