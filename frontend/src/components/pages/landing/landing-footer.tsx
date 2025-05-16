import Link from "next/link"
import { Facebook } from "lucide-react"
import Image from "next/image"

export function LandingFooter() {

  const memberLogos = [
    {
      name: "Alonzo",
      logo: "images/white_alonzo.png",
    },
    {
      name: "Santos",
      logo: "images/white_santos.png",
    },
    {
      name: "Sapigao",
      logo: "images/white_sapigao.png",
    },
    {
      name: "Malabed",
      logo: "images/white_malabed.png",
    }
  ];

  return (
    <footer className="w-full border-t bg-background flex justify-center items-center flex-col">
      <div className="container flex flex-col gap-10 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo/nexus_logo_white.svg" 
                alt="Nexus Logo" 
                width={16} 
                height={16}
                className="size-4"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Nexus of Endeavor and Excellence: Unfolding Solutions
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/profile.php?id=61573942836369" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-35 relative">
            {memberLogos.map((member) => (
              <div key={member.name} className="flex items-center justify-center w-25 h-25">
                <Image
                  src={`/${member.logo}`}
                  alt={member.name}
                  width={150}
                  height={150}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nexus. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
