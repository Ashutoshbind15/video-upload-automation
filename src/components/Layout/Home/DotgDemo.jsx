import { DialogClose } from "@/components/ui/dialog";
import { MaskContainer } from "./SVGMaskEffect";
import { SidebarClose } from "lucide-react";

export function GridBackgroundDemo() {
  return (
    <div className="h-screen w-full dark:bg-black bg-whit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-12">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2 h-1/2 bg-white dark:bg-black dark:bg-opacity-20 bg-opacity-20 rounded-lg">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
            Youtube Content Automation Platform
          </p>
        </div>
        <MaskContainer
          revealSize={400}
          className="w-1/2 h-96 bg-white dark:bg-black dark:bg-opacity-20 bg-opacity-20 rounded-lg"
          revealText={
            <ul className="mx-auto text-black text-center font-bold flex flex-col items-center gap-y-3 ">
              <h2 className="my-3 font-bold text-2xl text-red-700">
                The Hassle
              </h2>
              <div className="flex items-center gap-x-4 my-1">
                <SidebarClose className="w-6 h-6 text-red-700" />
                <li className="text-red-700">Download lengthy Videos</li>
              </div>
              <div className="flex items-center gap-x-4 my-1">
                <SidebarClose className="w-6 h-6 text-red-700" />
                <li className="text-red-700">
                  Upload them when you don&apos;t have enough connectivity
                </li>
              </div>
              <div className="flex items-center gap-x-4 my-1">
                <SidebarClose className="w-6 h-6 text-red-700" />
                <li className="text-red-700">Copy paste Youtube Metadata</li>
              </div>
              <div className="flex items-center gap-x-4 my-1">
                <SidebarClose className="w-6 h-6 text-red-700" />
                <li className="text-red-700">Handle Channel permissions</li>
              </div>
              <div className="flex items-center gap-x-4 my-1">
                <SidebarClose className="w-6 h-6 text-red-700" />
                <li className="text-red-700">Handle Multiple Video Editors</li>
              </div>
            </ul>
          }
        >
          <ul className="mx-auto text-white text-center font-bold flex flex-col items-center gap-y-3">
            You absolutely don&apos;t have to care about the hassle. So you can
            focus on creating content.
          </ul>
        </MaskContainer>
      </div>
    </div>
  );
}
