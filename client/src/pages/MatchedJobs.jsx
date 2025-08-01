import { useEffect, useState } from "react";

const MatchedJobs = () => {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const similarity = (skillsA, skillsB) => {
    const setA = new Set(skillsA.toLowerCase().split(",").map(s => s.trim()));
    const setB = new Set(skillsB.toLowerCase().split(",").map(s => s.trim()));
    const intersection = [...setA].filter(skill => setB.has(skill));
    return intersection.length / Math.max(setA.size, 1); // avoid div by 0
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const profileRes = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: token },
        });
        const { skills } = await profileRes.json();

        const jobRes = await fetch("http://localhost:5000/api/jobs");
        const jobs = await jobRes.json();

        const scored = jobs.map((job) => ({
          ...job,
          score: similarity(skills || "", job.skills || ""),
        }));

        scored.sort((a, b) => b.score - a.score); // sort by score descending
        setMatchedJobs(scored);
      } catch (err) {
        console.error("❌ Error fetching matches:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Matched Jobs for You</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul className="space-y-4">
          {matchedJobs.map((job) => (
            <li key={job._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="text-sm text-gray-500">
                Skills: {job.skills} | Match Score: {(job.score * 100).toFixed(0)}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchedJobs;
