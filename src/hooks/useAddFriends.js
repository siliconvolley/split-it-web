import { AddFriendsContext } from "@/contexts/add-friends-context";
import { useContext } from "react";

export function useAddFriends() {
  const context = useContext(AddFriendsContext);
  if (!context) {
    throw new Error('useAddFriends must be used within an AddFriendsContextProvider');
  }
  return context;
}