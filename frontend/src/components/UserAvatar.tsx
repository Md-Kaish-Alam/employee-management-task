import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username?: string;
  url?: string;
  isBordered?: boolean;
}

export const UserAvatar = ({ url, username, isBordered }: UserAvatarProps) => {
  const fallbackUsername = username?.trim().substring(0, 2);
  return (
    <Avatar className={cn(isBordered && !url ? "border border-gray-300 dark:border-gray-700" : "")}>
      <AvatarImage src={url} />
      <AvatarFallback>
        {username ? (
          fallbackUsername
        ) : (
          <User className="h-6 w-6 text-black dark:text-white" />
        )}
      </AvatarFallback>
    </Avatar>
  );
};
