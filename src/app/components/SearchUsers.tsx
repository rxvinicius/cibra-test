import React from "react";

interface SearchUsersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchUsers: React.FC<SearchUsersProps> = ({
  searchTerm,
  setSearchTerm,
}) => (
  <input
    type="text"
    placeholder="Buscar usuários"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 rounded-md w-full mb-2"
  />
);

export default SearchUsers;
