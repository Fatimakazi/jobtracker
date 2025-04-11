import React, { useState } from "react";
import API from "../api";

const JobForm = ({ fetchJobs }) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/", form);
      fetchJobs();
      setForm({
        company: "",
        role: "",
        status: "Applied",
        date: "",
        link: "",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company Name"
        required
      />
      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Job Role"
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Job Link"
      />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
