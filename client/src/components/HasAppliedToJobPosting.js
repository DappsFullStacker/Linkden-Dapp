import React, { useState } from 'react';
import './HasAppliedToJobPosting.css'; // import the CSS file

function HasAppliedToJobPosting({ contract, account }) {
  const [title, setTitle] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCheck = async (event) => {
    event.preventDefault();

    const result = await contract.hasAppliedToJobPosting(title);
    setHasApplied(result);
  };

  return (
    <div className="has-applied-to-job-posting-container"> {/* add a class name */}
      <h2>Has Applied to Job Posting</h2>
      <form onSubmit={handleCheck}>
        <label>
          Job Posting Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <button type="submit">Check</button>
      </form>
      {hasApplied && <p>You have already applied to this job posting.</p>}
    </div>
  );
}

export default HasAppliedToJobPosting;