/** @format */

"use client";

import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import { PiChatsCircle, PiWallet } from "react-icons/pi";
import { TfiBag } from "react-icons/tfi";
import { GoPlus, GoTag } from "react-icons/go";
import { BiSolidPackage } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import LogoutModal from "./LogOutModal";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Clear all cookies
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    // Clear any other cookies if needed
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    
    // Clear localStorage as well
    localStorage.clear();
    
    // Redirect to login page
    router.push("/sign-in");
    setIsLogoutModalOpen(false);
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-pass" ||
    pathname === "/verify-method" ||
    pathname === "/verify-otp" ||
    pathname === "/set-new-pass" ||
    pathname === "/account-setup"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  return (
    <>
      <Sidebar className="border-r-0  " collapsible="icon">
        <SidebarContent className="bg-white">
          <div
            className={`flex items-center justify-center  px-0 md:px-4 py-4 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/DMS-logo.png"
                  alt="Logo"
                  width={70}
                  height={60}
                  className="rounded-xl object-contain"
                />
              </Link>
            </div>
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-1 items-center" : "md:px-6 space-y-1"
            }
          >
            {!isCollapsed && <p className="text-gray-500 text-sm">DASHBOARD</p>}
            <NavItem
              href="/"
              icon={BiSolidPackage}
              label={"Orders"}
              active={pathname === "/" || pathname.startsWith("/" + "/")}
              collapsed={isCollapsed}
            />
            <NavItem
              href="/catalogue"
              icon={GoTag}
              label={"Catalogue"}
              active={
                pathname === "/catalogue" ||
                pathname.startsWith("/catalogue" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/add-new-item"
              icon={GoPlus}
              label={"Add New Item"}
              active={
                pathname === "/add-new-item" ||
                pathname.startsWith("/add-new-item" + "/")
              }
              collapsed={isCollapsed}
            />
            {!isCollapsed && (
              <p className="text-gray-500 text-sm">Account Management</p>
            )}
            <NavItem
              href="/my-business"
              icon={TfiBag}
              label={"My Business"}
              active={
                pathname === "/my-business" ||
                pathname.startsWith("/my-business" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/wallet"
              icon={PiWallet}
              label={"Wallet"}
              active={
                pathname === "/wallet" || pathname.startsWith("/wallet" + "/")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/feedback"
              icon={PiChatsCircle}
              label={"Feedback"}
              active={
                pathname === "/feedback" ||
                pathname.startsWith("/feedback" + "/")
              }
              collapsed={isCollapsed}
            />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter
          className={`w-full bg-white border-t border-gray-200 ${
            isCollapsed ? "px-2" : "px-3"
          }`}
        >
          {/* User Profile Section */}
          {!isCollapsed && (
            <div className="py-3 space-y-3">
              {/* Log Out Button */}
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <IoLogOutOutline className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

          {/* Collapsed State */}
          {isCollapsed && (
            <div className="py-3 flex flex-col items-center gap-2">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
              >
                <IoLogOutOutline className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          active
            ? "bg-gray-200 text-black hover:text-black hover:bg-gray-200 focus:bg-gray-200 font-medium"
            : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-black font-medium",
        )}
      >
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md",
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
