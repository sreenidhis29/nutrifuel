export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'maintenance';
export type DietPreference = 'standard' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';
export type UserRole = 'admin' | 'chef' | 'nutritionist' | 'customer';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    subscription?: Subscription;
    fitnessGoals?: string[];
    dietaryPreferences?: string[];
    allergies?: string[];
}

export interface MealPlan {
    id: string;
    name: string;
    description: string;
    proteinContent: number;
    calories: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    instructions: string[];
    prepTime: number;
    cookingTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    cuisine: 'indian' | 'fusion';
    imageUrl: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Subscription {
    id: string;
    userId: string;
    planId: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: 'monthly' | 'yearly';
    features: string[];
    mealsPerDay: number;
    proteinContent: 'high' | 'medium' | 'low';
}

export interface Order {
    id: string;
    userId: string;
    mealPlanId: string;
    status: 'pending' | 'processing' | 'delivered' | 'cancelled';
    deliveryDate: Date;
    address: string;
    customerName: string;
    mealPlan: string;
}

export interface DailyPlan {
    id: string;
    userId: string;
    date: Date;
    meals: {
        breakfast: MealPlan;
        lunch: MealPlan;
        dinner: MealPlan;
        snacks?: MealPlan[];
    };
    totalCalories: number;
    totalProtein: number;
} 