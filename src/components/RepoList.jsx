import { useState, useEffect } from 'react';

function RepoList({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs after render. The array at the end [username] is the
  // "dependency array" - this effect re-runs ONLY when username changes.
  // Without it, this would run on every single re-render (usually bad).
  useEffect(() => {
    setLoading(true);

    async function fetchRepos() {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      );
      const data = await res.json();
      setRepos(data);
      setLoading(false);
    }

    fetchRepos();
  }, [username]); // <- dependency array: re-run this effect when "username" changes

  if (loading) return <p className="status">Loading repos...</p>;

  return (
    <div className="repo-list">
      <h3>Recent Repositories</h3>
      <ul>
        {/* .map() turns each repo object into a list item - core list-rendering pattern */}
        {repos.map((repo) => (
          <li key={repo.id}>
            {/* "key" is required by React to track items in a list efficiently -
                it must be unique per item, so we use GitHub's repo id */}
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            {repo.description && <p>{repo.description}</p>}
            <span className="repo-lang">{repo.language}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
