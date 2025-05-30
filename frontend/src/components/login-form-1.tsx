'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("Email: ", formData.email);
    console.log("Password: ", formData.password);
  }, [formData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if ( data.success ) {
        window.location.href = '/dashboard';
      } else {
        setError(data.error || 'Hmm... those details don’t match. Try again!');  
      }
    } catch ( error ) {
      setError('Login failed. Please try again later.');
      console.error('Login request failed:', error);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} id="email" name="email" type="email" placeholder="m@example.com" required autoFocus/>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} id="password" name="password" type={showPassword ? 'text' : 'password'} required />
            <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
            </Button>
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-300 rounded-md text-center">
            {error == 'Invalid credentials' ? 'Hmm... those details don’t match. Try again!' : error}
          </div>
        )}
        <Button type="submit" onClick={handleLogin} className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
