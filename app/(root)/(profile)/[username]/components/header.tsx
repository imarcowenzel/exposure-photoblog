import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

export const Header = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar>
        <AvatarImage src={user.image! || "/assets/profile-picture.svg"} />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>
      <h2 className="text-lg font-medium">{user.username}</h2>
    </div>
  );
};
