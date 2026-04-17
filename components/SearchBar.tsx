import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  /** Text hints inside the input field */
  placeholder?: string;
  /** Callback triggered on submit */
  onSearch: (searchValue: string) => void;
  /** Additional class for external styling */
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "e.g. EC4R 3TE", 
  onSearch,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg ${className}`}
    >
      <div className="relative w-full flex-grow">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-3.5 border-2 border-orange-500 rounded-full outline-none text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-orange-100 transition-all font-medium"
        />
      </div>
      
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed transition-colors text-white px-8 py-3.5 rounded-full flex items-center justify-center gap-2 font-bold focus:outline-none focus:ring-4 focus:ring-orange-200 flex-shrink-0"
      >
        <Search className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
