'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan: string) => {
        if (!user) {
            router.push('/sign-in');
            return;
        }

        setLoading(true);
        try {
            // TODO: Implement subscription logic with your preferred payment provider
            console.log(`Subscribing to ${plan} plan`);
            router.push('/dashboard');
        } catch (error) {
            console.error('Subscription error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Basic Plan */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Basic</h2>
                    <p className="text-4xl font-bold mb-4">$29<span className="text-lg">/month</span></p>
                    <ul className="space-y-2 mb-6">
                        <li>✓ 5 meals per week</li>
                        <li>✓ Basic nutrition tracking</li>
                        <li>✓ Email support</li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('basic')}
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="border rounded-lg p-6 shadow-sm bg-primary/5">
                    <h2 className="text-2xl font-semibold mb-4">Premium</h2>
                    <p className="text-4xl font-bold mb-4">$49<span className="text-lg">/month</span></p>
                    <ul className="space-y-2 mb-6">
                        <li>✓ 10 meals per week</li>
                        <li>✓ Advanced nutrition tracking</li>
                        <li>✓ Priority support</li>
                        <li>✓ Custom meal preferences</li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('premium')}
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>

                {/* Elite Plan */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">Elite</h2>
                    <p className="text-4xl font-bold mb-4">$79<span className="text-lg">/month</span></p>
                    <ul className="space-y-2 mb-6">
                        <li>✓ 15 meals per week</li>
                        <li>✓ Full nutrition tracking</li>
                        <li>✓ 24/7 support</li>
                        <li>✓ Custom meal preferences</li>
                        <li>✓ Personal nutritionist</li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('elite')}
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Subscribe Now'}
                    </button>
                </div>
            </div>
        </div>
    );
} 