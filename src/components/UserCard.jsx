// Destructuring props directly in the function signature - very common pattern
// Instead of writing "props" then "props.user", we pull "user" straight out
function UserCard({ user }) {
  // Destructure fields off the user object for cleaner JSX below
  const { avatar_url, login, name, bio, followers, public_repos, html_url } = user;

  return (
    <div className="user-card">
      <img src={avatar_url} alt={login} className="avatar" />
      <div className="user-info">
        <h2>{name || login}</h2>
        <p className="username">@{login}</p>
        {bio && <p className="bio">{bio}</p>}

        <div className="stats">
          <span>👥 {followers} followers</span>
          <span>📦 {public_repos} repos</span>
        </div>

        <a href={html_url} target="_blank" rel="noreferrer">
          View GitHub Profile →
        </a>
      </div>
    </div>
  );
}

export default UserCard;
