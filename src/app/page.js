import { GridBackgroundDemo } from "@/components/Layout/Home/DotgDemo";
import { LampDemo } from "@/components/Layout/Home/Lamp";
import { MovingCards } from "@/components/Layout/Home/MovingCards";
import { StickyScrollReveal } from "@/components/Layout/Home/StickyScrollReveal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GridBackgroundDemo />
      <StickyScrollReveal />
      <LampDemo />
      <MovingCards />
    </main>
  );
}
