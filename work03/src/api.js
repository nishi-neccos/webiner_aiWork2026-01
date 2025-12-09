// モックユーザーデータ
let users = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com', role: 'admin', status: 'active' },
  { id: 2, name: '鈴木花子', email: 'suzuki@example.com', role: 'user', status: 'active' },
  { id: 3, name: '佐藤次郎', email: 'sato@example.com', role: 'user', status: 'inactive' },
  { id: 4, name: '高橋美咲', email: 'takahashi@example.com', role: 'moderator', status: 'active' },
  { id: 5, name: '伊藤健一', email: 'ito@example.com', role: 'user', status: 'active' },
  { id: 6, name: '渡辺麻衣', email: 'watanabe@example.com', role: 'user', status: 'inactive' },
];

// ランダムな遅延を追加（50-300ms）
const delay = () => new Promise(resolve => 
  setTimeout(resolve, Math.random() * 250 + 50)
);

// 10%の確率で失敗するAPIシミュレーション
const maybeFailure = () => {
  if (Math.random() < 0.1) {
    throw new Error('サーバーエラーが発生しました');
  }
};

export async function fetchUsers(searchQuery = '') {
  await delay();
  maybeFailure();
  
  if (searchQuery) {
    return users.filter(user => 
      user.name.includes(searchQuery) || 
      user.email.includes(searchQuery)
    );
  }
  return [...users];
}

export async function fetchUser(id) {
  await delay();
  maybeFailure();
  
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }
  return { ...user };
}

export async function updateUser(id, updates) {
  await delay();
  maybeFailure();
  
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('ユーザーが見つかりません');
  }
  
  users[index] = { ...users[index], ...updates };
  return { ...users[index] };
}

export async function deleteUser(id) {
  await delay();
  maybeFailure();
  
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('ユーザーが見つかりません');
  }
  
  users = users.filter(u => u.id !== id);
  return { success: true };
}

export async function createUser(userData) {
  await delay();
  maybeFailure();
  
  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    ...userData
  };
  users.push(newUser);
  return { ...newUser };
}
