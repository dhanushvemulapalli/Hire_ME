import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    wallet: "",
  });
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <input
          name="wallet"
          placeholder="Wallet Address"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
  Already have an account?{" "}
  <button
    onClick={() => navigate("/login")}
    className="text-blue-600 underline"
  >
    Log In
  </button>
</p>

    </div>
  );
};

export default Signup;
