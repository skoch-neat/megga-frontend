const Dashboard = ({ userData, loading, error }) => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : userData?.length ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>No user data available.</p>}
    </div>
  );
};

export default Dashboard;
