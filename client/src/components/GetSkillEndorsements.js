import React, { useState } from 'react';
import './GetSkillEndorsements.css'; // import the CSS file

function GetSkillEndorsements({ contract }) {
  const [skill, setSkill] = useState('');
  const [endorsements, setEndorsements] = useState([]);

  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await contract.getSkillEndorsements(skill);
    setEndorsements(result);
  };

  return (
    <div className="skill-endorsements-container"> {/* add a class name */}
      <h2>Get Skill Endorsements</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Skill:
          <input type="text" value={skill} onChange={handleSkillChange} />
        </label>
        <br />
        <button type="submit">Get Endorsements</button>
      </form>
      <ul>
        {endorsements.map((endorser, index) => (
          <li key={index}>{endorser}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetSkillEndorsements;