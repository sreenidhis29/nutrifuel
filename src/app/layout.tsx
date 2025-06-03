import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthProvider } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NutriFuel - Premium Nutrition for Your Fitness Journey',
  description: 'Transform your health with premium nutrition. Expert nutritionists and chefs crafting the perfect balance of taste and nutrition.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
