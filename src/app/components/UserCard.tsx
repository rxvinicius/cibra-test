import Image from "next/image";
import { User } from "@/types";
import { Button } from "@/components/ui";
import { useAppDispatch } from "@/store/hooks";
import { removeUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemoveUser = (userId: string) => {
    dispatch(removeUser(userId));
  };

  return (
    <div className="user-card">
      {user.photo && (
        <Image
          src={user.photo}
          alt={`${user.name} photo`}
          className="rounded-full object-cover w-[74px] h-[74px]"
          width={74}
          height={74}
        />
      )}

      <div className="flex-initial flex-col gap-1">
        <p className="h3-bold text-secondary text-center line-clamp-1 mb-2">
          {user.name}
        </p>

        <div className="flex-start gap-2 justify-start w-full">
          <p className="base-regular text-dark-1 text-left line-clamp-1">
            {user.email}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          size="sm"
          className="button bg-red"
          onClick={() => handleRemoveUser(user.id)}
        >
          Excluir
        </Button>
        <Button
          size="sm"
          className="button bg-blue"
          onClick={() => router.push(`/users/form?id=${user.id}`)}
        >
          Atualizar
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
