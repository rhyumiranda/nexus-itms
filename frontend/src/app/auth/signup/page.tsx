import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"

import { LoginForm } from "@/components/signup-form"

export default function SignUpPage() {
  return (
    <div className="bg-secondary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image 
              src="/logo/nexus_logo_white.svg" 
              alt="Nexus Logo" 
              width={16} 
              height={16}
              className="size-4"
            />
          </div>
          Nexus
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
