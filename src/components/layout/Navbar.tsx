import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, LogOut, Menu, Settings, User, Users } from "lucide-react";
import NotificationCenter from "../notifications/NotificationCenter";

interface NavbarProps {
  isAuthenticated?: boolean;
  username?: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

const Navbar = ({
  isAuthenticated = false,
  username = "Guest User",
  avatarUrl = "",
  onLogout = () => {},
}: NavbarProps) => {
  return (
    <nav className="w-full h-16 border-b bg-background flex items-center justify-between px-4 md:px-6 lg:px-8">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-bold text-xl">Draft Platform</div>
        </Link>
      </div>

      {/* Desktop navigation links */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/drafts"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              My Drafts
            </Link>
            <Link
              to="/create"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Create Draft
            </Link>
            <Link
              to="/friends"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Friends
            </Link>
          </>
        )}
        <Link
          to="/about"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          About
        </Link>
      </div>

      {/* Auth section */}
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            {/* Notification center */}
            <NotificationCenter />

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src={
                        avatarUrl ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
                      }
                      alt={username}
                    />
                    <AvatarFallback>
                      {username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="cursor-pointer flex w-full items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/friends"
                    className="cursor-pointer flex w-full items-center"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Friends
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="cursor-pointer flex w-full items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
