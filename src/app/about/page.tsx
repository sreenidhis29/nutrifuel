'use client';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-heading font-bold tracking-tight text-gray-900 sm:text-6xl">
                            About NutriFuel
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We're on a mission to revolutionize fitness nutrition in India by combining traditional flavors with modern nutritional science.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Mission</h2>
                    <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Making Fitness Nutrition Accessible
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We believe that achieving your fitness goals shouldn't mean compromising on taste or convenience. Our team of expert nutritionists and chefs work together to create meals that are both delicious and nutritionally optimized.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Our Team</h2>
                    <p className="mt-2 text-3xl font-heading font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Meet the Experts Behind NutriFuel
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {team.map((member) => (
                            <div key={member.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <span className="text-2xl">{member.emoji}</span>
                                    {member.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{member.role}</p>
                                    <p className="mt-6">{member.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-primary-600">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-heading font-bold tracking-tight text-white sm:text-4xl">
                            Our Core Values
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
                            These principles guide everything we do at NutriFuel
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {values.map((value) => (
                                <div key={value.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                        <span className="text-2xl">{value.emoji}</span>
                                        {value.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-primary-100">
                                        <p className="flex-auto">{value.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

const team = [
    {
        name: 'Dr. Sarah Sharma',
        role: 'Head Nutritionist',
        emoji: '👩‍⚕️',
        description: 'With over 10 years of experience in sports nutrition, Dr. Sharma ensures that every meal plan meets the highest nutritional standards.',
    },
    {
        name: 'Chef Rajesh Kumar',
        role: 'Executive Chef',
        emoji: '👨‍🍳',
        description: 'A culinary expert specializing in healthy Indian cuisine, Chef Kumar brings traditional flavors to our modern meal plans.',
    },
    {
        name: 'Amit Patel',
        role: 'Fitness Director',
        emoji: '💪',
        description: 'Former professional athlete turned fitness expert, Amit ensures our meal plans align perfectly with your fitness goals.',
    },
];

const values = [
    {
        name: 'Quality First',
        emoji: '⭐',
        description: 'We never compromise on the quality of ingredients or nutritional value of our meals.',
    },
    {
        name: 'Innovation',
        emoji: '💡',
        description: 'Constantly evolving our recipes and meal plans to incorporate the latest nutritional research.',
    },
    {
        name: 'Customer Success',
        emoji: '🎯',
        description: 'Your fitness journey is our priority. We\'re committed to helping you achieve your goals.',
    },
]; 