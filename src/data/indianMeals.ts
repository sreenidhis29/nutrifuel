export interface Meal {
    id: string;
    name: string;
    type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    fat: number;
    image: string;
    description: string;
}

export const indianMeals: Meal[] = [
    // Breakfast Options
    {
        id: 'b1',
        name: 'Idli with Sambar',
        type: 'breakfast',
        calories: 250,
        protein: 8,
        carbs: 45,
        fiber: 5,
        fat: 2,
        image: '/media/meals/idli-sambar.jpg',
        description: 'Steamed rice cakes served with lentil soup'
    },
    {
        id: 'b2',
        name: 'Poha',
        type: 'breakfast',
        calories: 280,
        protein: 6,
        carbs: 52,
        fiber: 4,
        fat: 3,
        image: '/media/meals/poha.jpg',
        description: 'Flattened rice cooked with vegetables and spices'
    },
    {
        id: 'b3',
        name: 'Upma',
        type: 'breakfast',
        calories: 220,
        protein: 5,
        carbs: 38,
        fiber: 3,
        fat: 4,
        image: '/media/meals/upma.jpg',
        description: 'Semolina porridge with vegetables'
    },
    {
        id: 'b4',
        name: 'Dosa with Chutney',
        type: 'breakfast',
        calories: 300,
        protein: 7,
        carbs: 48,
        fiber: 4,
        fat: 5,
        image: '/media/meals/dosa.jpg',
        description: 'Crispy crepe made from fermented rice and lentil batter'
    },
    {
        id: 'b5',
        name: 'Paratha with Curd',
        type: 'breakfast',
        calories: 350,
        protein: 9,
        carbs: 42,
        fiber: 3,
        fat: 12,
        image: '/media/meals/paratha.jpg',
        description: 'Whole wheat flatbread with yogurt'
    },

    // Lunch Options
    {
        id: 'l1',
        name: 'Rajma Chawal',
        type: 'lunch',
        calories: 450,
        protein: 15,
        carbs: 75,
        fiber: 12,
        fat: 8,
        image: '/media/meals/rajma-chawal.jpg',
        description: 'Kidney beans curry with rice'
    },
    {
        id: 'l2',
        name: 'Dal Makhani with Roti',
        type: 'lunch',
        calories: 400,
        protein: 12,
        carbs: 60,
        fiber: 8,
        fat: 10,
        image: '/media/meals/dal-makhani.jpg',
        description: 'Black lentils with butter and whole wheat bread'
    },
    {
        id: 'l3',
        name: 'Vegetable Biryani',
        type: 'lunch',
        calories: 500,
        protein: 10,
        carbs: 85,
        fiber: 6,
        fat: 12,
        image: '/media/meals/biryani.jpg',
        description: 'Fragrant rice dish with mixed vegetables'
    },
    {
        id: 'l4',
        name: 'Chole Bhature',
        type: 'lunch',
        calories: 550,
        protein: 14,
        carbs: 70,
        fiber: 9,
        fat: 18,
        image: '/media/meals/chole-bhature.jpg',
        description: 'Chickpea curry with fried bread'
    },
    {
        id: 'l5',
        name: 'Thali',
        type: 'lunch',
        calories: 600,
        protein: 20,
        carbs: 90,
        fiber: 15,
        fat: 15,
        image: '/media/meals/thali.jpg',
        description: 'Complete meal with various dishes'
    },

    // Snack Options
    {
        id: 's1',
        name: 'Samosa',
        type: 'snack',
        calories: 250,
        protein: 5,
        carbs: 30,
        fiber: 3,
        fat: 12,
        image: '/media/meals/samosa.jpg',
        description: 'Crispy pastry with spiced potatoes and peas'
    },
    {
        id: 's2',
        name: 'Dhokla',
        type: 'snack',
        calories: 180,
        protein: 8,
        carbs: 25,
        fiber: 4,
        fat: 5,
        image: '/media/meals/dhokla.jpg',
        description: 'Steamed savory cake made from fermented batter'
    },
    {
        id: 's3',
        name: 'Bhel Puri',
        type: 'snack',
        calories: 200,
        protein: 6,
        carbs: 35,
        fiber: 5,
        fat: 4,
        image: '/media/meals/bhel-puri.jpg',
        description: 'Puffed rice snack with vegetables and chutneys'
    },
    {
        id: 's4',
        name: 'Vada Pav',
        type: 'snack',
        calories: 300,
        protein: 8,
        carbs: 45,
        fiber: 4,
        fat: 10,
        image: '/media/meals/vada-pav.jpg',
        description: 'Spicy potato fritter in a bun'
    },
    {
        id: 's5',
        name: 'Khandvi',
        type: 'snack',
        calories: 150,
        protein: 7,
        carbs: 20,
        fiber: 3,
        fat: 6,
        image: '/media/meals/khandvi.jpg',
        description: 'Rolls made from gram flour and yogurt'
    },

    // Dinner Options
    {
        id: 'd1',
        name: 'Butter Chicken with Naan',
        type: 'dinner',
        calories: 550,
        protein: 25,
        carbs: 60,
        fiber: 5,
        fat: 20,
        image: '/media/meals/butter-chicken.jpg',
        description: 'Chicken in tomato-based curry with bread'
    },
    {
        id: 'd2',
        name: 'Palak Paneer with Roti',
        type: 'dinner',
        calories: 400,
        protein: 18,
        carbs: 45,
        fiber: 8,
        fat: 15,
        image: '/media/meals/palak-paneer.jpg',
        description: 'Cottage cheese in spinach gravy'
    },
    {
        id: 'd3',
        name: 'Vegetable Pulao',
        type: 'dinner',
        calories: 350,
        protein: 8,
        carbs: 65,
        fiber: 6,
        fat: 8,
        image: '/media/meals/pulao.jpg',
        description: 'Fragrant rice with mixed vegetables'
    },
    {
        id: 'd4',
        name: 'Masala Dosa',
        type: 'dinner',
        calories: 400,
        protein: 10,
        carbs: 55,
        fiber: 7,
        fat: 12,
        image: '/media/meals/masala-dosa.jpg',
        description: 'Crispy crepe with spiced potato filling'
    },
    {
        id: 'd5',
        name: 'Chana Masala with Rice',
        type: 'dinner',
        calories: 450,
        protein: 15,
        carbs: 70,
        fiber: 10,
        fat: 10,
        image: '/media/meals/chana-masala.jpg',
        description: 'Chickpea curry with rice'
    }
]; 