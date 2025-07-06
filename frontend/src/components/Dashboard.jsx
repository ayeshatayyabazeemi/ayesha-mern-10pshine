import { useAuth } from './AuthContext';

const Dashboard = () => {
  const { user } = useAuth(); // access user info

  return <h2>Welcome, {user?.username}</h2>;
};
export default Dashboard;