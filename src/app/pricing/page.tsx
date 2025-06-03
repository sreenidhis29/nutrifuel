'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
    {
        name: 'Basic',
        id: 'tier-basic',
        href: '/signup?plan=basic',
        price: { monthly: '$49', yearly: '$490' },
        description: 'Perfect for beginners starting their fitness journey.',
        features: [
            '3 meals per day',
            'Basic protein content',
            'Standard Indian cuisine',
            'Weekly meal rotation',
            'Basic nutrition tracking',
            'Email support',
        ],
        featured: false,
    },
    {
        name: 'Pro',
        id: 'tier-pro',
        href: '/signup?plan=pro',
        price: { monthly: '$79', yearly: '$790' },
        description: 'Ideal for serious fitness enthusiasts and athletes.',
        features: [
            '4 meals per day',
            'High protein content',
            'Premium Indian cuisine',
            'Customizable meal plans',
            'Advanced nutrition tracking',
            'Priority support',
            'Chef consultation',
            'Nutritionist guidance',
        ],
        featured: true,
    },
    {
        name: 'Elite',
        id: 'tier-elite',
        href: '/signup?plan=elite',
        price: { monthly: '$129', yearly: '$1290' },
        description: 'For professional athletes and bodybuilders.',
        features: [
            '5 meals per day',
            'Maximum protein content',
            'Premium Indian cuisine',
            'Fully customizable meal plans',
            'Advanced nutrition tracking',
            '24/7 priority support',
            'Weekly chef consultation',
            'Weekly nutritionist guidance',
            'Personalized supplements',
            'Progress tracking app',
        ],
        featured: false,
    },
];

export default function PricingPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState('basic');

    // Redirect if not logged in
    if (isLoaded && !user) {
        router.push('/');
        return null;
    }

    // Show loading state while Clerk is loading
    if (!isLoaded) {
        return null;
    }

    const handleSubscribe = (tierId: string) => {
        if (!user) {
            router.push(`/signup?plan=${tierId}`);
        } else {
            router.push(`/checkout?plan=${tierId}&cycle=${billingCycle}`);
        }
    };

    return (
        <div className="bg-white">
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
                        <p className="mt-2 text-4xl font-heading font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Choose the right plan for&nbsp;you
                        </p>
                    </div>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                        Select the perfect meal plan that aligns with your fitness goals and dietary preferences.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-16 flex justify-center">
                        <div className="relative flex rounded-full p-1 bg-gray-100">
                            <button
                                type="button"
                                className={`${billingCycle === 'monthly'
                                    ? 'bg-white shadow-sm text-gray-900'
                                    : 'text-gray-500'
                                    } relative w-32 rounded-full py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                                onClick={() => setBillingCycle('monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                className={`${billingCycle === 'yearly'
                                    ? 'bg-white shadow-sm text-gray-900'
                                    : 'text-gray-500'
                                    } relative w-32 rounded-full py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                                onClick={() => setBillingCycle('yearly')}
                            >
                                Yearly
                                <span className="absolute -top-1 -right-1 rounded-full bg-primary-500 px-2 py-0.5 text-xs font-medium text-white">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Tiers */}
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${tier.featured ? 'relative' : ''
                                    }`}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                                            Most popular
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center justify-between gap-x-4">
                                        <h3
                                            className={`text-lg font-semibold leading-8 ${tier.featured ? 'text-primary-600' : 'text-gray-900'
                                                }`}
                                        >
                                            {tier.name}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-gray-900">
                                            {billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly}
                                        </span>
                                        <span className="text-sm font-semibold leading-6 text-gray-600">
                                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                                        </span>
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex gap-x-3">
                                                <CheckIcon
                                                    className="h-6 w-5 flex-none text-primary-600"
                                                    aria-hidden="true"
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => handleSubscribe(tier.id)}
                                    className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tier.featured
                                        ? 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600'
                                        : 'bg-primary-50 text-primary-600 hover:bg-primary-100 focus-visible:outline-primary-600'
                                        }`}
                                >
                                    {user ? 'Subscribe now' : 'Get started'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 