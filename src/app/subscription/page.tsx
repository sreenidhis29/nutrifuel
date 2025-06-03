'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

interface Subscription {
    id: string;
    status: 'active' | 'paused' | 'cancelled';
    startDate: Date;
    endDate: Date;
    deliveryFrequency: string;
    deliveryAddress: string;
}

interface MealPlan {
    id: string;
    name: string;
    price: number;
}

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePauseSubscription = async () => {
        if (!subscription) return;
        setSubscription({ ...subscription, status: 'paused' });
    };

    const handleResumeSubscription = async () => {
        if (!subscription) return;
        setSubscription({ ...subscription, status: 'active' });
    };

    const handleCancelSubscription = async () => {
        if (!subscription) return;
        setSubscription({ ...subscription, status: 'cancelled' });
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.heading}>Subscription</h1>
                        <p className={styles.subheading}>
                            Manage your meal plan subscription
                        </p>
                    </div>
                    <div className={styles.noSubscription}>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.heading}>Subscription</h1>
                        <p className={styles.subheading}>
                            Manage your meal plan subscription
                        </p>
                    </div>
                    <div className={styles.noSubscription}>
                        <p>You don't have an active subscription.</p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => window.location.href = '/meal-plans'}
                        >
                            View Meal Plans
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>Subscription</h1>
                    <p className={styles.subheading}>
                        Manage your meal plan subscription
                    </p>
                </div>

                <div className={styles.subscriptionCard}>
                    <div className={styles.subscriptionHeader}>
                        <div className={styles.subscriptionInfo}>
                            <h2>{mealPlan?.name}</h2>
                            <p>{subscription.deliveryFrequency} delivery</p>
                        </div>
                        <span className={`${styles.statusBadge} ${styles[subscription.status]}`}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                    </div>

                    <div className={styles.subscriptionDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Start Date</span>
                            <span className={styles.detailValue}>{new Date(subscription.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Next Delivery</span>
                            <span className={styles.detailValue}>{new Date(subscription.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Delivery Address</span>
                            <span className={styles.detailValue}>{subscription.deliveryAddress}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Price per Day</span>
                            <span className={styles.detailValue}>${mealPlan?.price}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        {subscription.status === 'active' ? (
                            <Button
                                variant="outline"
                                onClick={handlePauseSubscription}
                            >
                                Pause Subscription
                            </Button>
                        ) : subscription.status === 'paused' ? (
                            <Button
                                variant="primary"
                                onClick={handleResumeSubscription}
                            >
                                Resume Subscription
                            </Button>
                        ) : null}
                        {subscription.status !== 'cancelled' && (
                            <Button
                                variant="secondary"
                                onClick={handleCancelSubscription}
                            >
                                Cancel Subscription
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 