import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

// This is a placeholder for your actual AI service integration
// In a real application, you would integrate with an AI service like OpenAI, Anthropic, etc.
async function generateMealPlan(userPreferences: any) {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // This is where you would make the actual API call to your AI service
    // For now, we'll return a mock response based on the user's preferences
    return {
        name: 'Your Personalized Plan',
        description: 'A custom meal plan tailored to your preferences and goals',
        type: 'ai',
        calories: calculateCalories(userPreferences),
        protein: calculateProtein(userPreferences),
        carbs: calculateCarbs(userPreferences),
        fat: calculateFat(userPreferences),
        meals: generateMeals(userPreferences),
        tags: generateTags(userPreferences),
    };
}

function calculateCalories(preferences: any) {
    // Basic calorie calculation based on weight, height, age, and activity level
    const { weight, height, age, activity_level } = preferences;
    let bmr = 10 * weight + 6.25 * height - 5 * age;

    const activityMultipliers = {
        'Sedentary': 1.2,
        'Lightly Active': 1.375,
        'Moderately Active': 1.55,
        'Very Active': 1.725,
        'Extremely Active': 1.9,
    };

    let tdee = bmr * (activityMultipliers[activity_level as keyof typeof activityMultipliers] || 1.2);

    // Adjust based on goal
    if (preferences.goal === 'Weight Loss') {
        tdee -= 500;
    } else if (preferences.goal === 'Muscle Gain') {
        tdee += 500;
    }

    return Math.round(tdee);
}

function calculateProtein(preferences: any) {
    // Protein calculation based on weight and goal
    const baseProtein = preferences.weight * 1.6; // 1.6g per kg of body weight
    if (preferences.goal === 'Muscle Gain') {
        return Math.round(baseProtein * 1.2);
    }
    return Math.round(baseProtein);
}

function calculateCarbs(preferences: any) {
    // Carb calculation based on total calories and protein
    const calories = calculateCalories(preferences);
    const proteinCalories = calculateProtein(preferences) * 4;
    const fatCalories = calculateFat(preferences) * 9;
    const carbCalories = calories - proteinCalories - fatCalories;
    return Math.round(carbCalories / 4);
}

function calculateFat(preferences: any) {
    // Fat calculation based on total calories
    const calories = calculateCalories(preferences);
    return Math.round((calories * 0.25) / 9); // 25% of calories from fat
}

function generateMeals(preferences: any) {
    const mealsPerDay = parseInt(preferences.meals_per_day) || 3;
    const mealTimes = ['8:00 AM', '1:00 PM', '7:00 PM'];
    const mealNames = ['Breakfast', 'Lunch', 'Dinner'];

    return Array.from({ length: mealsPerDay }, (_, i) => ({
        name: mealNames[i] || `Meal ${i + 1}`,
        time: mealTimes[i] || `${8 + i * 4}:00 ${i < 2 ? 'AM' : 'PM'}`,
        description: generateMealDescription(preferences, i),
        calories: Math.round(calculateCalories(preferences) / mealsPerDay),
    }));
}

function generateMealDescription(preferences: any, mealIndex: number) {
    const cuisines = preferences.cuisine_preference || ['Indian'];
    const restrictions = preferences.dietary_restrictions || [];

    // This is a simplified version. In a real application, you would have a more sophisticated
    // meal generation system that takes into account all preferences and restrictions
    const mealTypes = {
        0: ['Protein smoothie with fruits and nuts', 'Oatmeal with berries and nuts', 'Whole grain toast with avocado'],
        1: ['Quinoa bowl with roasted vegetables', 'Grilled chicken salad', 'Lentil soup with whole grain bread'],
        2: ['Grilled salmon with sweet potato', 'Baked fish with quinoa', 'Stir-fried tofu with vegetables'],
    };

    return mealTypes[mealIndex as keyof typeof mealTypes]?.[0] || 'Balanced meal with protein and vegetables';
}

function generateTags(preferences: any) {
    const tags = ['Custom', 'AI-Generated'];

    if (preferences.goal) {
        tags.push(preferences.goal);
    }

    if (preferences.dietary_restrictions) {
        tags.push(...preferences.dietary_restrictions);
    }

    return tags;
}

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { preferences } = await request.json();

        // Get or create user in our database
        const user = await prisma.user.upsert({
            where: { clerkId: userId },
            update: { preferences },
            create: {
                clerkId: userId,
                email: '', // You'll need to get this from Clerk
                preferences,
            },
        });

        // Generate meal plan
        const mealPlanData = await generateMealPlan(preferences);

        // Save the meal plan to the database
        const mealPlan = await prisma.mealPlan.create({
            data: {
                ...mealPlanData,
                userId: user.id,
            },
        });

        return NextResponse.json(mealPlan);
    } catch (error) {
        console.error('Error generating meal plan:', error);
        return NextResponse.json(
            { error: 'Failed to generate meal plan' },
            { status: 500 }
        );
    }
} 