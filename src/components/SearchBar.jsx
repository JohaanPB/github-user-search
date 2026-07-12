import { useState } from 'react';

// Props: this component receives a function "onSearch" from its parent (App)
// This is how child components "talk back" to parents in React - via callback props
function SearchBar({ onSearch }) {
  // useState gives us: [currentValue, functionToUpdateIt]
  // Every time setQuery runs, React re-renders this component with the new value
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from reloading (default HTML form behavior)
    if (query.trim() === '') return; // ignore empty searches
    onSearch(query); // call the function passed down from App, sending the search term up
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query} // this makes it a "controlled input" - React state IS the source of truth
        onChange={(e) => setQuery(e.target.value)} // update state on every keystroke
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
