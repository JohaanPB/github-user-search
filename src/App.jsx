import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import RepoList from './components/RepoList';
import './App.css';

function App() {
  // Three pieces of state to track:
  const [user, setUser] = useState(null);       // the fetched GitHub user data
  const [loading, setLoading] = useState(false); // are we currently fetching?
  const [error, setError] = useState(null);      // did something go wrong?

  // This function runs when SearchBar calls onSearch(query)
  const handleSearch = async (username) => {
    setLoading(true);   // show a loading state
    setError(null);     // clear any old error
    setUser(null);      // clear old results

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        // GitHub returns 404 if the username doesn't exist
        throw new Error('User not found');
      }

      const data = await res.json();
      setUser(data); // this triggers a re-render, showing the UserCard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // runs whether it succeeded or failed
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Conditional rendering: only one of these three shows at a time */}
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {user && (
        <>
          <UserCard user={user} />
          <RepoList username={user.login} />
        </>
      )}
    </div>
  );
}

export default App;
