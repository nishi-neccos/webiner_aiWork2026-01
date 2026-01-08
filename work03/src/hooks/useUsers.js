import { useState, useEffect } from "react";
import { fetchUsers } from "../api";

export function useUsers(searchQuery) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers(searchQuery)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchQuery]);

  const removeUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUserInList = (id, updates) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  return {
    users,
    loading,
    error,
    setUsers,
    removeUser,
    updateUserInList,
  };
}
