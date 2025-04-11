import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: ''
  });
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });

  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/jobs?${query}`);
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/jobs', formData);
    setFormData({ company: '', role: '', status: 'Applied', date: '', link: '' });
    fetchJobs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    fetchJobs();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await axios.patch(`http://localhost:5000/api/jobs/${id}`, { status: newStatus });
    fetchJobs();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🎯 Student Job Tracker</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow mb-5">
        <h4 className="mb-3">Add Job Application</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input className="form-control" type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="col-md-4">
            <input className="form-control" type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" type="text" name="link" placeholder="Job Link" value={formData.link} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">Add Job</button>
      </form>

      {/* Filter Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select name="status" className="form-select" onChange={handleFilterChange} value={filters.status}>
            <option value="">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        {/* <div className="col-md-4">
          <input name="date" type="date" className="form-control" value={filters.date} onChange={handleFilterChange} />
        </div> */}
        {/* <button
  className="btn btn-secondary w-50"
  onClick={() => {
    setFilters({ status: '', date: '' });
    // ✅ Force fetch all jobs after clearing
    setTimeout(() => fetchJobs(), 0);
  }}
>
  Clear Filters
</button> */}

      </div>

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-6" key={job._id}>
            <div className="card mb-4 shadow">
              <div className="card-body">
                <h5 className="card-title">{job.company} - {job.role}</h5>
                <p className="card-text"><strong>Status:</strong> {job.status}</p>
                <p className="card-text"><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>

                {job.link && (
                  <a href={job.link} className="btn btn-sm btn-outline-info me-2" target="_blank" rel="noreferrer">View Job</a>
                )}

                <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(job._id)}>Delete</button>

                <select
                  className="form-select form-select-sm mt-2"
                  value={job.status}
                  onChange={(e) => handleStatusUpdate(job._id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
