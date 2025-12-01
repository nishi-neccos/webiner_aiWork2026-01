import { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import { getDiscount, calcTotal } from './utils';

function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const products = [
    { id: 1, name: 'Tシャツ', price: 2000, stock: 5 },
    { id: 2, name: 'パーカー', price: 5000, stock: 3 },
    { id: 3, name: 'キャップ', price: 1500, stock: 0 },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const applyCoupon = () => {
    const discount = getDiscount(coupon);
    setAppliedDiscount(discount);
  };

  const total = calcTotal(cart, appliedDiscount);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">🛒 ショップ</h1>
        
        <ProductList 
          products={products} 
          onAdd={addToCart} 
        />
        
        <Cart 
          items={cart} 
          onRemove={removeFromCart}
          total={total}
        />

        <div className="mt-4 p-3 bg-gray-700 rounded">
          <p className="text-sm mb-2">クーポンコード</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="SAVE10"
              className="flex-1 px-2 py-1 rounded text-gray-900 text-sm"
            />
            <button
              onClick={applyCoupon}
              className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-700"
            >
              適用
            </button>
          </div>
          {appliedDiscount > 0 && (
            <p className="text-green-400 text-sm mt-1">{appliedDiscount}%OFF適用中</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
