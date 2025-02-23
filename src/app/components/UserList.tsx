"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUsers, removeUser } from "@/store/userSlice";
import SearchUsers from "@/components/SearchUsers";
import Loader from "./Loader";

const UserList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = localStorage.getItem("users");

      if (storedUsers && storedUsers !== "[]") {
        dispatch(setUsers(JSON.parse(storedUsers)));
      } else {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const data = await response.json();

          const usersWithImages = data.map((user: any) => ({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            photo: `https://picsum.photos/seed/${user.id}/200`,
          }));

          dispatch(setUsers(usersWithImages));
          localStorage.setItem("users", JSON.stringify(usersWithImages));
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      }
    };

    setIsLoading(true);
    fetchUsers().finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleRemoveUser = (userId: string) => {
    dispatch(removeUser(userId));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex-start gap-3 justify-start w-full">
      <SearchUsers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ul className="mt-4">
        {filteredUsers.map((user) => (
          <div className="flex flex-row gap-2 mt-2" key={user.id}>
            <li
              onClick={() => router.push(`/users/form?id=${user.id}`)}
              className="cursor-pointer"
            >
              {user.name} - {user.email}
            </li>
            <button
              onClick={() => handleRemoveUser(user.id)}
              className="text-red"
            >
              Remover
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
