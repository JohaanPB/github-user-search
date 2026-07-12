// Shows the last few searches as clickable "chips"
// Clicking one re-runs the search via the same onSelect (which is handleSearch from App)
function RecentSearches({ searches, onSelect }) {
  return (
    <div className="recent-searches">
      <span className="recent-label">Recent:</span>
      {searches.map((name) => (
        <button
          key={name}
          className="chip"
          onClick={() => onSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default RecentSearches;
