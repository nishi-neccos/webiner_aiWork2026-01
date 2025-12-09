import { useState, useEffect } from 'react';
import { fetchUser, updateUser, deleteUser } from './api';

function UserDetail({ userId, onClose, onUpdated, onDeleted }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setFormData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    
    // バグ: userIdが変わっても古いリクエストがキャンセルされない
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // バグ: 保存中に別の操作ができてしまう
    // バグ: エラー時のUIフィードバックが不十分
    try {
      const updated = await updateUser(userId, formData);
      onUpdated(updated);
    } catch (err) {
      setError(err.message);
    }
    
    setSaving(false);
  };

  const handleDelete = async () => {
    // バグ: 削除中の状態管理がない
    // バグ: エラー時のロールバックがない
    try {
      await deleteUser(userId);
      onDeleted(userId);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-6">
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">ユーザー編集</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded p-2 mb-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">名前</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">メール</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">役割</label>
            <select
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">ステータス</label>
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
            >
              <option value="active">有効</option>
              <option value="inactive">無効</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-2 rounded font-medium"
            >
              {saving ? '保存中...' : '保存'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 bg-red-600 hover:bg-red-700 py-2 rounded font-medium"
            >
              削除
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetail;
