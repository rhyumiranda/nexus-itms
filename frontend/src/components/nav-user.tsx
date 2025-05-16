"use client"

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string | null
    avatar: string
  }
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [userName, setUserName] = useState({
    firstName: '',
    lastName: '',
  });

  const [email, setEmail] = useState({
    email: ''
  })

  useEffect(() => {
  const fn = Cookies.get('pb_user_fn');
  const ln = Cookies.get('pb_user_ln');
  const userEmail = Cookies.get('pb_user_email')?.split('%40').join('@').toString();

  setUserName({
    firstName: fn || '',
    lastName: ln || '',
  });

  setEmail({
    email: userEmail || ''
  })
  
}, []);

  console.log(userName.firstName + userName.lastName);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }
      
      Cookies.remove('pb_user_id');
      Cookies.remove('pb_user_fn');
      Cookies.remove('pb_user_ln');
      Cookies.remove('pb_user_email');

      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="h-8 w-8 rounded-lg dark:bg-gray-500 bg-gray-300 dark:text-white flex items-center justify-center">
                {(userName.firstName?.[0] || "") + (userName.lastName?.[0] || "")}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName.firstName + " " + userName.lastName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className=" h-8 w-8 rounded-lg dark:bg-gray-500 dark:text-white flex justify-center items-center">
                  {(userName.firstName?.[0] || "") + (userName.lastName?.[0] || "")}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName.firstName + " " + userName.lastName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
