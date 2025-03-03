import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import AuthForm from "./auth/AuthForm";
import Dashboard from "./dashboard/Dashboard";

interface HomeProps {
  isAuthenticated?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onLogin?: (data: any) => void;
  onSignup?: (data: any) => void;
  onLogout?: () => void;
}

const Home = ({
  isAuthenticated = false,
  user = {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "",
  },
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
}: HomeProps) => {
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        username={user.name}
        avatarUrl={user.avatar}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col">
        {isAuthenticated ? (
          <Dashboard user={user} onLogout={onLogout} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to Draft Platform
                </h1>
                <p className="text-xl text-muted-foreground">
                  Create and participate in customizable drafts with real-time
                  updates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">Features</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary font-medium">1</span>
                        </div>
                        <span>
                          Interactive draft rooms with live status updates
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary font-medium">2</span>
                        </div>
                        <span>Customizable draft settings and formats</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary font-medium">3</span>
                        </div>
                        <span>Friend system for easy invitations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary font-medium">4</span>
                        </div>
                        <span>Real-time notifications and alerts</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">Get Started</h2>
                    <p className="mb-4">
                      Join our platform to start creating and participating in
                      drafts with friends or other users.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setAuthTab("login")}
                        className={`flex-1 py-2 rounded-md ${authTab === "login" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setAuthTab("signup")}
                        className={`flex-1 py-2 rounded-md ${authTab === "signup" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <AuthForm
                    onLogin={onLogin}
                    onSignup={onSignup}
                    defaultTab={authTab}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <footer className="bg-muted/30 border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Draft Platform. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
