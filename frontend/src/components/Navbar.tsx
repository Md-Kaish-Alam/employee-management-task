import { Link } from "react-router-dom";

import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { User, UsersRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 w-full bg-gray-200 dark:bg-gray-800 shadow-md">
      <div className="md:container md:mx-auto py-4 flex items-center justify-between">
        <Logo/>
        <div className="flex items-center justify-center gap-4">
          <Link to="/employee_list">
            <Button
              variant="link"
              className="flex items-center justify-center gap-1"
            >
              <UsersRound className="h-6 w-6" />
              Employee List
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  <User className="h-6 w-6 text-black dark:text-white" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[99999]">
              <DropdownMenuItem>
                <p className="font-bold">{user?.f_username}</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
