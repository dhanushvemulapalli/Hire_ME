import { useEffect, useState } from "react";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Job Feed</h2>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-700">{job.description}</p>
          <p className="text-sm mt-2">Skills: {job.skills.join(", ")}</p>
          <p className="text-sm">Budget: ${job.budget}</p>
          <p className="text-sm text-gray-500">Posted by: {job.user?.name || "Anonymous"}</p>
        </div>
      ))}
    </div>
  );
};

export default JobFeed;
