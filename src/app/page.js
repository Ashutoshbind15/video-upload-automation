import VideoUploader from "@/components/ClientHelpers/Form/Inputs/VideoUploader";
import Profile from "@/components/ClientHelpers/auth/Profile";
import SignInButton from "@/components/ClientHelpers/auth/SignInButton";
import SignOutButton from "@/components/ClientHelpers/auth/SignOutButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
      <Profile />
      <SignOutButton />

      <VideoUploader />
    </main>
  );
}
