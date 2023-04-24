import React, { useState } from 'react';
import './ApplyToJobPosting.css'; // import the CSS file

function ApplyToJobPosting({ contract, account }) {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.applyToJobPosting(title);
  };

  return (
    <div className="apply-to-job-posting-container"> {/* add a class name */}
      <h2>Apply to Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Posting Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ApplyToJobPosting;