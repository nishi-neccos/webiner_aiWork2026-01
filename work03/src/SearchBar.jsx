import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="名前またはメールで検索..."
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
