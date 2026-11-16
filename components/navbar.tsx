"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession, signOut } from "@/lib/auth/auth";
import SignOutButton from "./sign-out-btn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  // DropdownMenuItem,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  // const session = await getSession();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";
  if (isPending) {
    return <nav className="border-b border-gray-200 bg-white h-16" />;
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center justify-between text-xl font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-black"
              >
                <Button variant="ghost">Dashboard</Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    />
                  }
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || "User"}
                        </p>

                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <SignOutButton />
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-gray-700 hover:text-black">
                <Button variant="ghost">Log In</Button>
              </Link>

              <Link
                href="/sign-up"
                className="bg-primary hover:text-primary/90"
              >
                <Button>Start for free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
