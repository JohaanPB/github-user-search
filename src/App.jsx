import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import RepoList from './components/RepoList';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  // Core state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New: recent searches - an array we grow as the user searches
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        throw new Error('User not found');
      }

      const data = await res.json();
      setUser(data);

      // Add to recent searches: remove duplicates, put newest first, cap at 5
      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (name) => name.toLowerCase() !== username.toLowerCase()
        );
        return [username, ...filtered].slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Recent searches only show if we have at least one, and no active loading/error */}
      {recentSearches.length > 0 && (
        <RecentSearches searches={recentSearches} onSelect={handleSearch} />
      )}

      {loading && <SkeletonCard />}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && !user && (
        <div className="empty-state">
          <p>🔍 Search any GitHub username to get started</p>
          <p className="empty-hint">Try "octocat", "torvalds", or your own username</p>
        </div>
      )}

      {user && !loading && (
        <div className="results fade-in">
          <UserCard user={user} />
          <RepoList username={user.login} />
        </div>
      )}
    </div>
  );
}

// Simple loading skeleton - mimics the shape of the UserCard while data loads
function SkeletonCard() {
  return (
    <div className="user-card skeleton">
      <div className="skeleton-avatar" />
      <div className="skeleton-lines">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-subtitle" />
        <div className="skeleton-line skeleton-text" />
      </div>
    </div>
  );
}

export default App;
