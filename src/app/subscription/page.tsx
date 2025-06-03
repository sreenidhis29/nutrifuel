'use client';

import { useState, useEffect } from 'react';
import { useFirebase } from '@/context/FirebaseContext';
import { Button } from '@/components/ui/Button';
import { Subscription, MealPlan } from '@/types';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import styles from './page.module.css';

export default function SubscriptionPage() {
    const { auth, db } = useFirebase();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!auth.currentUser) return;

            try {
                // Fetch active subscription
                const subscriptionsRef = collection(db, 'subscriptions');
                const q = query(
                    subscriptionsRef,
                    where('userId', '==', auth.currentUser.uid),
                    where('status', '==', 'active')
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const subscriptionData = {
                        id: querySnapshot.docs[0].id,
                        ...querySnapshot.docs[0].data()
                    } as Subscription;
                    setSubscription(subscriptionData);

                    // Fetch meal plan details
                    const mealPlanDoc = await getDocs(doc(db, 'mealPlans', subscriptionData.mealPlanId));
                    if (mealPlanDoc.exists()) {
                        setMealPlan({
                            id: mealPlanDoc.id,
                            ...mealPlanDoc.data()
                        } as MealPlan);
                    }
                }
            } catch (error) {
                console.error('Error fetching subscription:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, [auth.currentUser, db]);

    const handlePauseSubscription = async () => {
        if (!subscription) return;

        try {
            await updateDoc(doc(db, 'subscriptions', subscription.id), {
                status: 'paused',
                updatedAt: new Date()
            });
            setSubscription({ ...subscription, status: 'paused' });
        } catch (error) {
            console.error('Error pausing subscription:', error);
        }
    };

    const handleResumeSubscription = async () => {
        if (!subscription) return;

        try {
            await updateDoc(doc(db, 'subscriptions', subscription.id), {
                status: 'active',
                updatedAt: new Date()
            });
            setSubscription({ ...subscription, status: 'active' });
        } catch (error) {
            console.error('Error resuming subscription:', error);
        }
    };

    const handleCancelSubscription = async () => {
        if (!subscription) return;

        try {
            await updateDoc(doc(db, 'subscriptions', subscription.id), {
                status: 'cancelled',
                updatedAt: new Date()
            });
            setSubscription({ ...subscription, status: 'cancelled' });
        } catch (error) {
            console.error('Error cancelling subscription:', error);
        }
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
                                variant="error"
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