import React, { useState } from 'react';
import './FillJobPosting.css'; // import the CSS file

function FillJobPosting({ contract, account }) {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.fillJobPosting(title);
  };

  return (
    <div className="fill-job-posting-container"> {/* add a class name */}
      <h2>Fill Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Posting Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <button type="submit">Fill</button>
      </form>
    </div>
  );
}

export default FillJobPosting;