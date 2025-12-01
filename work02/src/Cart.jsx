function Cart({ items, onRemove, total }) {
  if (items.length === 0) {
    return (
      <div className="p-4 bg-gray-800 rounded text-center text-gray-500">
        カートは空です
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-800 rounded">
      <h3 className="font-bold mb-2">カート</h3>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center justify-between text-sm">
            <span>{item.name} x {item.quantity}</span>
            <div className="flex items-center gap-2">
              <span>¥{item.price + item.quantity}</span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between font-bold">
        <span>合計</span>
        <span>¥{total}</span>
      </div>
    </div>
  );
}

export default Cart;
