import { useState, useEffect } from 'react';

// GitHub-style language colors - a small visual detail that makes repo lists
// feel more "authentic" (matches what people see on real GitHub)
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Ruby: '#701516',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  PHP: '#4F5D95',
};

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
          <li key={repo.id} className="repo-item">
            {/* "key" is required by React to track items in a list efficiently -
                it must be unique per item, so we use GitHub's repo id */}
            <div className="repo-header">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              {repo.language && (
                <span className="repo-lang">
                  <span
                    className="lang-dot"
                    style={{
                      backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b949e',
                    }}
                  />
                  {repo.language}
                </span>
              )}
            </div>
            {repo.description && <p>{repo.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
