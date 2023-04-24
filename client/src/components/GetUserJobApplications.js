import React, { useState } from 'react';
import './GetUserJobApplications.css'; // import the CSS file

function GetUserJobApplications({ contract, account }) {
  const [jobPostings, setJobPostings] = useState([]);

  const handleGetApplications = async (event) => {
    event.preventDefault();

    const result = await contract.getUserJobApplications();
    setJobPostings(result);
  };

  return (
    <div className="user-job-applications-container"> {/* add a class name */}
      <h2>Get User Job Applications</h2>
      <button onClick={handleGetApplications}>Get Applications</button>
      <ul>
        {jobPostings.map((jobPosting) => (
          <li key={jobPosting}>{jobPosting}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetUserJobApplications;