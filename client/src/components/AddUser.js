import React, { useState } from 'react';
import './AddUser.css'; // import the CSS file

function AddUser({ contract, account }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillsArray = skills.split(',').map((skill) => skill.trim());

    await contract.addUser(name, skillsArray);
  };

  return (
    <div className="add-user-container"> {/* add a class name */}
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Skills (comma-separated):
          <input type="text" value={skills} onChange={handleSkillsChange} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;