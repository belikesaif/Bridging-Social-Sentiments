// Import necessary modules
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from "@/components/dashboard";
import { Signuplogin } from "@/components/signuplogin";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    router.push('/');
  };

  return (
    <div>
      {loggedIn ? <Dashboard onLogout={handleLogout} /> : <Signuplogin onLogin={handleLogin} />}
    </div>
  );
}
