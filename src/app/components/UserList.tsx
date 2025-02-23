"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUsers, removeUser } from "@/store/userSlice";
import SearchUsers from "@/components/SearchUsers";
import Loader from "./Loader";
import UserCard from "./UserCard";

const UserList = () => {
  const dispatch = useAppDispatch();
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

  if (isLoading) return <Loader />;

  return (
    <div className="flex-start flex-col gap-3 justify-start w-full">
      <div className="flex flex-col gap-2 w-full">
        <SearchUsers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredUsers.length > 0 ? (
        <ul className="user-grid">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data mt-2">
          Nenhum usuário cadastrado. Clique no botão para adicionar ou atualize
          a página.
        </p>
      )}
    </div>
  );
};

export default UserList;
