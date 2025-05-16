"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleReset = async ( e : React.FormEvent ) => {
    e.preventDefault()

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email })
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleReset}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image src='/logo/nexus_logo_white.svg' alt="logo" width={32} height={32} />
              </div>
              <span className="sr-only">nexus.sphere</span>
            </a>
            <h1 className="text-xl font-bold">Forgot Your Password?</h1>
            <div className="text-center text-sm">
              No worries! Just tell us your email and we’ll send you instructions to reset your password.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
