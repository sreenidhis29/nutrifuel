'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFirebase } from '@/context/FirebaseContext';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { indianMeals, Meal } from '@/data/indianMeals';
import styles from './page.module.css';

interface UserMeal extends Meal {
    date: string;
    userId: string;
}

export default function MealsPage() {
    const { user } = useAuth();
    const { db } = useFirebase();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [userMeals, setUserMeals] = useState<UserMeal[]>([]);
    const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'snack' | 'dinner'>('breakfast');

    useEffect(() => {
        if (user) {
            fetchUserMeals();
        }
    }, [user, selectedDate]);

    const fetchUserMeals = async () => {
        if (!user) return;

        const mealsRef = collection(db, 'userMeals');
        const q = query(
            mealsRef,
            where('userId', '==', user.uid),
            where('date', '==', selectedDate),
            orderBy('type')
        );

        const querySnapshot = await getDocs(q);
        const meals: UserMeal[] = [];
        querySnapshot.forEach((doc) => {
            meals.push(doc.data() as UserMeal);
        });
        setUserMeals(meals);
    };

    const addMeal = async (meal: Meal) => {
        if (!user) return;

        const userMeal: UserMeal = {
            ...meal,
            date: selectedDate,
            userId: user.uid
        };

        await addDoc(collection(db, 'userMeals'), userMeal);
        fetchUserMeals();
    };

    const getMealsByType = (type: string) => {
        return indianMeals.filter(meal => meal.type === type);
    };

    const getTotalNutrition = () => {
        return userMeals.reduce((acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fiber: acc.fiber + meal.fiber,
            fat: acc.fat + meal.fat
        }), { calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Meal Tracker</h1>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={styles.datePicker}
                />
            </div>

            <div className={styles.mealTypes}>
                {['breakfast', 'lunch', 'snack', 'dinner'].map((type) => (
                    <button
                        key={type}
                        className={`${styles.mealTypeButton} ${selectedType === type ? styles.active : ''}`}
                        onClick={() => setSelectedType(type as any)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                <div className={styles.mealSelection}>
                    <h2>Select {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
                    <div className={styles.mealGrid}>
                        {getMealsByType(selectedType).map((meal) => (
                            <div key={meal.id} className={styles.mealCard} onClick={() => addMeal(meal)}>
                                <img src={meal.image} alt={meal.name} className={styles.mealImage} />
                                <div className={styles.mealInfo}>
                                    <h3>{meal.name}</h3>
                                    <p>{meal.description}</p>
                                    <div className={styles.nutritionInfo}>
                                        <span>{meal.calories} cal</span>
                                        <span>{meal.protein}g protein</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.todayMeals}>
                    <h2>Today's Meals</h2>
                    {userMeals.length === 0 ? (
                        <p className={styles.noMeals}>No meals added for today</p>
                    ) : (
                        <>
                            <div className={styles.mealList}>
                                {userMeals.map((meal, index) => (
                                    <div key={index} className={styles.mealItem}>
                                        <img src={meal.image} alt={meal.name} className={styles.mealThumbnail} />
                                        <div className={styles.mealDetails}>
                                            <h3>{meal.name}</h3>
                                            <p>{meal.type}</p>
                                            <div className={styles.nutritionInfo}>
                                                <span>{meal.calories} cal</span>
                                                <span>{meal.protein}g protein</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.totalNutrition}>
                                <h3>Total Nutrition</h3>
                                <div className={styles.nutritionGrid}>
                                    <div className={styles.nutritionItem}>
                                        <span>Calories</span>
                                        <span>{getTotalNutrition().calories}</span>
                                    </div>
                                    <div className={styles.nutritionItem}>
                                        <span>Protein</span>
                                        <span>{getTotalNutrition().protein}g</span>
                                    </div>
                                    <div className={styles.nutritionItem}>
                                        <span>Carbs</span>
                                        <span>{getTotalNutrition().carbs}g</span>
                                    </div>
                                    <div className={styles.nutritionItem}>
                                        <span>Fiber</span>
                                        <span>{getTotalNutrition().fiber}g</span>
                                    </div>
                                    <div className={styles.nutritionItem}>
                                        <span>Fat</span>
                                        <span>{getTotalNutrition().fat}g</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 