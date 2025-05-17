"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signupSchema } from "@/schemas/signupSchema";
import { Eye, EyeOff } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const [formDataError, setFormDataError] = useState({
    emailError: "",
    firstNameError: "",
    lastNameError: "",
    passwordError: [] as string[],
    passwordConfirmError: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirm: false,
  });

  const isFormInvalid =
  !formData.email ||
  !formData.firstName ||
  !formData.lastName ||
  !formData.password ||
  !formData.passwordConfirm ||
  (Array.isArray(formDataError.passwordError) && formDataError.passwordError.length > 0) ||
  !!formDataError.emailError ||
  !!formDataError.firstNameError ||
  !!formDataError.lastNameError ||
  !!formDataError.passwordConfirmError;

  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();

      setFormDataError((prev) => ({
        ...prev,
        firstNameError: formattedErrors.firstName?._errors?.join(" ") || "",
        lastNameError: formattedErrors.lastName?._errors?.join(" ") || "",
        emailError: formattedErrors.email?._errors?.join(" ") || "",
        passwordError: formattedErrors.password?._errors || [],
        passwordConfirmError:
          formattedErrors.passwordConfirm?._errors?.join(" ") || "",
      }));

      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          emailVisibility: true,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = "/auth/login";
      } else {
        const errorMessage = data.error?.errors
          .map((error: { message: string }) => error.message)
          .join("\n");
        setError(
          errorMessage ||
            "Whoops! That email’s already in use. Got another?" ||
            "Failed to create account. Please try again."
        );
        return;
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  setFormDataError((prev) => ({
                    ...prev,
                    emailError: "",
                  }));
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                autoFocus
                required
              />
              {formDataError.emailError != "" && (
                <div className="text-red-500 text-sm">
                  {formDataError.emailError}
                </div>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value })
                  setFormDataError((prev) => ({
                    ...prev,
                    firstNameError: "",
                  }));
                }}
                id="first-name"
                type="text"
                placeholder="John"
                required
              />
              {formDataError.firstNameError != "" && (
                <div className="text-red-500 text-sm">
                  {formDataError.firstNameError}
                </div>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value })
                  setFormDataError((prev) => ({
                    ...prev,
                    lastNameError: "",
                  }));
                }}
                id="last-name"
                type="text"
                placeholder="Doe"
                required
              />
              {formDataError.lastNameError != "" && (
                <div className="text-red-500 text-sm">
                  {formDataError.lastNameError}
                </div>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    setFormDataError((prev) => ({
                      ...prev,
                      passwordError: [],
                    }));
                  }}
                  id="password"
                  name="password"
                  type={showPassword.password ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => ({...prev, password: !prev.password}))}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                >
                  {showPassword.password ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              {Array.isArray(formDataError.passwordError) ? (
                <ul className="text-red-500 text-sm list-disc pl-5">
                  {formDataError.passwordError.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              ) : formDataError.passwordError ? (
                <div className="text-red-500 text-sm">
                  {formDataError.passwordError}
                </div>
              ) : null}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Confirm Password</Label>
              </div>
              <div className="relative">
                <Input
                  value={formData.passwordConfirm}
                  onChange={(e) => {
                    setFormData({ ...formData, passwordConfirm: e.target.value })
                    setFormDataError((prev) => ({
                      ...prev,
                      passwordConfirmError: "",
                    }));
                  }}
                  id="password-confirm"
                  name="password-confirm"
                  type={showPassword.passwordConfirm ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => ({...prev, passwordConfirm: !prev.passwordConfirm}))}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                >
                  {showPassword.passwordConfirm ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              {formDataError.passwordConfirmError && (
                <div className="text-red-500 text-sm">
                  {formDataError.passwordConfirmError}
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full cursor-pointer disabled:opacity-50" disabled={isFormInvalid}>
              Create Account
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
