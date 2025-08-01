import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/profile";
import JobForm from "./pages/JobForm";
import JobFeed from "./pages/JobFeed";
import SendETH from "./pages/SendETH";
// import PrivateRoute from "./components/PrivateRoute";
// import Profile from "./pages/profilero";
import PostJob from "./pages/PostJob";
import MatchedJobs from "./pages/MatchedJobs";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-job" element={<JobForm />} />
        <Route path="/feed" element={<JobFeed />} />
        <Route path="/send" element={<SendETH />} />

        {/* 🔒 Protected route */}
        {/* <Route path="/dashboard" 
        element={
        <PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route> */}

        <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />

        <Route
    path="/profile"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />
        <Route
    path="/post-job"
    element={
      <PrivateRoute>
        <PostJob />
      </PrivateRoute>
    }
  />
<Route
  path="/matched-jobs"
  element={
    <PrivateRoute>
      <MatchedJobs />
    </PrivateRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
