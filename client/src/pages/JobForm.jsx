import { useState } from "react";
import { useNavigate } from "react-router-dom";
const JobForm = () => {
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
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
          budget: parseFloat(formData.budget),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Job posted!");
        navigate("/dashboard");
      } else {
        alert(data.msg || "Job post failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" onChange={handleChange} className="w-full p-2 border" />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} className="w-full p-2 border" />
        <input name="skills" placeholder="Required Skills (comma separated)" onChange={handleChange} className="w-full p-2 border" />
        <input name="budget" placeholder="Budget ($)" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
