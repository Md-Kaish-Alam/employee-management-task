import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  username?: string;
  url?: string;
}

export const UserAvatar = ({ url, username }: UserAvatarProps) => {
  const fallbackUsername = username?.trim().substring(0, 2);
  return (
    <Avatar>
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
