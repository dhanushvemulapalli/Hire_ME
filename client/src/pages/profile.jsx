import { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    linkedin: "",
    skills: "",
    wallet: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated!");
      } else {
        alert(data.msg || "Something went wrong");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="bio" placeholder="Bio" onChange={handleChange} className="w-full p-2 border" />
        <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="w-full p-2 border" />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full p-2 border" />
        <input name="wallet" placeholder="Wallet Address" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
