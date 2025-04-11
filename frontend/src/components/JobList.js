import React from "react";
import API from "../api";

const JobList = ({ jobs, fetchJobs }) => {
  const deleteJob = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/${id}`, { status: newStatus });
      fetchJobs();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{job.company}</h3>
          <p>Role: {job.role}</p>
          <p>Status: {job.status}</p>
          <p>Date Applied: {new Date(job.date).toLocaleDateString()}</p>
          {job.link && (
            <p>
              <a href={job.link} target="_blank" rel="noreferrer">
                View Job Posting
              </a>
            </p>
          )}
          <select
            value={job.status}
            onChange={(e) => updateStatus(job._id, e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button onClick={() => deleteJob(job._id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
