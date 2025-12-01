function ProductList({ products, onAdd }) {
  return (
    <div className="space-y-2 mb-4">
      {products.map(product => (
        <div key={product.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
          <div>
            <span className="font-medium">{product.name}</span>
            <span className="text-gray-400 text-sm ml-2">¥{product.price}</span>
            <span className="text-gray-500 text-xs ml-2">(在庫: {product.stock})</span>
          </div>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700"
          >
            追加
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
