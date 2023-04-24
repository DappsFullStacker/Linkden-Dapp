import React, { useState } from 'react';
import './GetJobPostingApplicants.css'; // import the CSS file

function GetJobPostingApplicants({ contract }) {
  const [title, setTitle] = useState('');
  const [applicants, setApplicants] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await contract.getJobPostingApplicants(title);
    setApplicants(result);
  };

  return (
    <div className="job-posting-applicants-container"> {/* add a class name */}
      <h2>Get Job Posting Applicants</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Posting Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <button type="submit">Get Applicants</button>
      </form>
      <ul>
        {applicants.map((applicant) => (
          <li key={applicant}>{applicant}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetJobPostingApplicants;