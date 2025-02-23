"use client";
import { UserList } from "@/components";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 items-start gap-10 py-16 px-5 md:px-8 lg:p-14">
      <div className="flex items-center justify-between w-full">
        <h1 className="h1-bold">Usuários</h1>

        <Button onClick={() => router.push("/users/form")}>
          Adicionar Usuário
        </Button>
      </div>

      <UserList />
    </div>
  );
}
