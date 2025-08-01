import { useState } from "react";
import WalletConnect from "../components/WalletConnect";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    linkedin: "",
    skills: "",
    wallet: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSave = async (e) => {
  e.preventDefault(); // 🛑 stops form from submitting normally

  const token = localStorage.getItem("token");

  // Clone formData and convert skills string into an array
  const processedData = {
    ...formData,
    skills: formData.skills.split(",").map(skill => skill.trim()).filter(Boolean),
  };

  try {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(processedData),
    });

    const data = await res.json();
    console.log("✅ Profile updated:", data);
    alert("Profile saved!");

    navigate("/dashboard");
  } catch (err) {
    console.error("❌ Error saving profile:", err.message);
    alert("Error: " + err.message);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="bio" placeholder="Bio" onChange={handleChange} className="w-full p-2 border" />
        <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="w-full p-2 border" />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full p-2 border" />
        <input name="wallet" placeholder="Wallet Address" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Save Profile</button>
      </form>
    <WalletConnect
  onWalletConnected={(walletAddress) =>
    setFormData({ ...formData, wallet: walletAddress })
  }/>

    </div>

  );
};

export default Profile;
