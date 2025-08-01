import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Job posted successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ Failed to post job: " + data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" className="w-full p-2 border" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full p-2 border" onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" className="w-full p-2 border" onChange={handleChange} />
        <input name="budget" placeholder="Budget (ETH)" className="w-full p-2 border" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
