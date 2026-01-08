import { deleteUser } from "./api";

function UserList({ users, loading, onSelect, onDelete }) {
  const handleDelete = async (e, userId) => {
    e.stopPropagation();
    onDelete(userId);
    deleteUser(userId);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-600";
      case "moderator":
        return "bg-yellow-600";
      default:
        return "bg-blue-600";
    }
  };

  const getStatusColor = (status) => {
    return status === "active" ? "text-green-400" : "text-gray-500";
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">読み込み中...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ユーザーが見つかりません
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user.id)}
          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs ${getStatusColor(user.status)}`}>
              ● {user.status === "active" ? "有効" : "無効"}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
            <button
              onClick={(e) => handleDelete(e, user.id)}
              className="text-red-400 hover:text-red-300 px-2"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
