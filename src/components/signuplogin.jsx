"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function Signuplogin({ onLogin }) {
  const [currentPage, setCurrentPage] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currentPage === "login" ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const response = await axios.post(url, formData);
      //alert(`Success: ${response.data.message}`);

      if (currentPage === "login") {
        onLogin();
      } else {
        setCurrentPage("login");
      }
    } catch (error) {
      //alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#6b7280] to-[#374151]">
      {currentPage === "login" && (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-0 md:px-6">
          <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="#" className="font-medium text-primary-600 hover:text-primary-500" onClick={() => setCurrentPage("signup")}>
                  Create a new account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <Input id="email" name="email" type="email" autoComplete="email" required onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon className="h-5 w-5 text-gray-400" /> : <EyeOffIcon className="h-5 w-5 text-gray-400" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" name="remember-me" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-50">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {currentPage === "signup" && (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-0 md:px-6">
          <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Create a new account</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="#" className="font-medium text-primary-600 hover:text-primary-500" onClick={() => setCurrentPage("login")}>
                  Sign in to your existing account
                </Link>
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="mt-1">
                  <Input id="name" name="name" type="text" autoComplete="name" required onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <Input id="email" name="email" type="email" autoComplete="email" required onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon className="h-5 w-5 text-gray-400" /> : <EyeOffIcon className="h-5 w-5 text-gray-400" />}
                  </Button>
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EyeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}


function EyeOffIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
