import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface UsersState {
  users: User[];
}

const loadUsersFromStorage = (): User[] => {
  if (typeof window !== "undefined") {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  return [];
};

const initialState: UsersState = {
  users: loadUsersFromStorage(),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { setUsers, addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
