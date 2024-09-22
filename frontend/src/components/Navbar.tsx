import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";

import AuthContext from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 w-full bg-gray-200 dark:bg-gray-800 shadow-md">
      <div className="md:container md:mx-auto py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center gap-4">
          <Link to="/employee_list">
            <Button
              variant="link"
              className="flex items-center justify-center gap-1 text-md"
            >
              <UsersRound className="h-6 w-6" />
              Employee List
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
