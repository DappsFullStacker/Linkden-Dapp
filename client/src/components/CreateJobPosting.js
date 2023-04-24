import React, { useState } from 'react';
import './CreateJobPosting.css'; // import the CSS file

function CreateJobPosting({ contract, account }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.createJobPosting(title, description, salary);
  };

  return (
    <div className="create-job-posting-container"> {/* add a class name */}
      <h2>Create Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <label>
          Salary:
          <input type="text" value={salary} onChange={handleSalaryChange} />
        </label>
        <br />
        <button type="submit">Create Job Posting</button>
      </form>
    </div>
  );
}

export default CreateJobPosting;