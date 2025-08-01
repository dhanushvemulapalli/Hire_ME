import { useNavigate } from "react-router-dom";


const Dashboard = () => {
const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
        <button
    onClick={() => navigate("/profile")}
    className="text-blue-600 underline"
  >
    Profile
  </button>

    </div>
  );
};

export default Dashboard;
