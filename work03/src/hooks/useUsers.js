import { useState, useEffect } from 'react';
import { fetchUsers } from '../api';

export function useUsers(searchQuery) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // バグ: AbortControllerがない（検索を連続で行うとRace Conditionが発生）
    fetchUsers(searchQuery)
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    
    // バグ: クリーンアップ関数がない
  }, [searchQuery]);

  const removeUser = (id) => {
    // バグ: 楽観的更新しているが、APIが失敗した場合のロールバックがない
    setUsers(users.filter(u => u.id !== id));
  };

  const updateUserInList = (id, updates) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, ...updates } : u
    ));
  };

  return { users, loading, error, setUsers, removeUser, updateUserInList };
}
