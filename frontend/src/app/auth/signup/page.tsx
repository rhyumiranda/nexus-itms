import Image from "next/image";
import Link from "next/link";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/">
            <div className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <Image
                  src="/logo/nexus_logo_white.svg"
                  alt="Nexus Logo"
                  width={16}
                  height={16}
                  className="size-4"
                />
              </div>
              nexu.sphere
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/purplegradient.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
        />
      </div>
    </div>
  );
}
