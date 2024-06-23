"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Space } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <NavigationMenu className="z-30">
      <NavigationMenuList className="flex items-center justify-between px-8 w-screen py-3">
        <div className="flex items-center gap-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/"
            >
              Automationify
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Space Links</NavigationMenuTrigger>
            <NavigationMenuContent className="flex items-center justify-between">
              <div className="flex flex-col items-center w-80 gap-y-4 bg-slate-900 text-white py-6 px-8">
                <div className="flex items-center justify-around">
                  <h1>Spaces</h1>
                </div>

                <p>
                  A space is a place where you can create video ideas and share
                  em with your editors.
                </p>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/space"
                >
                  Space List
                </NavigationMenuLink>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="/space/create"
                >
                  Create Space
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </div>

        <div>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/auth/profile"
            >
              Profile
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
