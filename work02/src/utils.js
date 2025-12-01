export function getDiscount(couponCode) {
  const coupons = {
    'SAVE10': 10,
    'SAVE20': 20,
    'HALF': 50,
  };
  return coupons[couponCode] || 0;
}

export function calcTotal(cart, discountPercent) {
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  
  return subtotal;
}
