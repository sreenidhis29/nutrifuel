import { SignIn } from "@clerk/nextjs";
import VideoBackground from "@/components/VideoBackground";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <VideoBackground />
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-sm text-gray-200">
            Sign in to continue your healthy journey
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary-600 hover:bg-primary-700 text-sm normal-case",
              card: "bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50",
              formFieldInput: "rounded-lg border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
              footerActionLink: "text-primary-600 hover:text-primary-500",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
} 