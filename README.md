🍽️ NutriFuel – Fitness-Focused Meal Subscription App
NutriFuel is a subscription-based nutrition delivery platform that provides curated meal plans for athletes, gym-goers, and fitness enthusiasts. Our mission is to bridge the nutrition gap by delivering high-protein, goal-aligned vegetarian and non-vegetarian meals to users' doorsteps.

⚡ Built with performance, personalization, and scale in mind.

🔧 Tech Stack
Layer	Technology
Frontend	Next.js 14, Tailwind CSS
Authentication	Clerk.dev
Backend / API	Next.js API Routes, Prisma ORM
Database	Neon (PostgreSQL serverless)
ORM	Prisma
Deployment	Vercel (Frontend & API)

🚀 Features

🧑‍🍳 Goal-based meal plans (e.g. muscle gain, fat loss, endurance)

🥗 Vegetarian & non-vegetarian options

📦 Weekly and monthly subscription system

🔐 Secure authentication via Clerk.dev

📊 Protein intake & nutrition dashboard

🧾 Order tracking and delivery status updates

🎯 Meal selection based on macros & calorie goals

🪄 Admin dashboard for kitchen staff & logistics

📱 Responsive, mobile-first UI with Tailwind CSS

🌐 RESTful API built with Next.js

🛠️ Getting Started
Clone the repository:
1. git clone (https://github.com/sreenidhis29/nutrifuel.git)

2. cd nutrifuel

3. Install dependencies:
npm install

4. Create a .env.local file with the following environment variables:

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

  CLERK_SECRET_KEY=your_clerk_secret_key

  DATABASE_URL=your_neon_database_url

5. Generate Prisma Client:

npx prisma generate

6.Push Prisma schema to Neon:

npx prisma db push

7.Run the development server:

npm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
.
├── components/           # Reusable React components  
├── pages/                # Next.js pages  
│   ├── api/              # Backend API routes (REST)  
├── lib/                  # Utilities, helper functions  
├── prisma/               # Prisma schema & client  
├── styles/               # Tailwind global styles  
├── public/               # Static assets  
└── .env.local            # Environment variables

🔄 Example Prisma Schema

prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  meals     MealPlan[]
  createdAt DateTime @default(now())
}

model MealPlan {
  id          String   @id @default(cuid())
  userId      String
  mealType    String
  calories    Int
  protein     Int
  startDate   DateTime
  endDate     DateTime
  status      String
  user        User     @relation(fields: [userId], references: [id])
}

📦 Deployment
Frontend & Backend: Vercel

Database: Neon (PostgreSQL serverless with pooling)

Optional: Admin panel at admin.nutrifuel.in

🛡️ Security
Clerk.dev handles authentication, sessions, and JWT securely.

Secrets are stored in .env.local or Vercel Environment Settings.

Prisma enforces schema-level data integrity.

🙌 Contributors
S Shreenidhi – Project Lead, UI/UX, Frontend Development

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
