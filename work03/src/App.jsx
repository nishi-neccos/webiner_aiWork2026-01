import { useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import { useUsers } from "./hooks/useUsers";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { users, loading, error, removeUser, updateUserInList } =
    useUsers(searchQuery);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseDetail = () => {
    setSelectedUserId(null);
  };

  const handleUserUpdated = (updatedUser) => {
    updateUserInList(updatedUser.id, updatedUser);
    setSelectedUserId(null);
  };

  const handleUserDeleted = (userId) => {
    removeUser(userId);
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">👥 ユーザー管理</h1>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded p-3 mb-4 text-red-300">
            ⚠️ {error}
          </div>
        )}

        <UserList
          users={users}
          loading={loading}
          onSelect={handleSelectUser}
          onDelete={handleUserDeleted}
        />

        {selectedUserId && (
          <UserDetail
            userId={selectedUserId}
            onClose={handleCloseDetail}
            onUpdated={handleUserUpdated}
            onDeleted={handleUserDeleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
