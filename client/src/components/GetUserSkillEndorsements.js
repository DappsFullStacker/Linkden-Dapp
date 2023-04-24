import React, { useState } from 'react';
import './GetUserSkillEndorsements.css';

function GetUserSkillEndorsements({ contract, account }) {
  const [userAddress, setUserAddress] = useState('');
  const [skills, setSkills] = useState([]);

  const handleUserAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

  const handleGetEndorsements = async (event) => {
    event.preventDefault();

    console.log('Calling getUserSkillEndorsements with user address:', userAddress);
    const result = await contract.getUserSkillEndorsements(userAddress);
    console.log('Result from getUserSkillEndorsements:', result);
    setSkills(result);
  };

  return (
    <div className="user-skill-endorsements-container">
      <h2>Get User Skill Endorsements</h2>
      <form onSubmit={handleGetEndorsements}>
        <label>
          User Address:
          <input type="text" value={userAddress} onChange={handleUserAddressChange} />
        </label>
        <br />
        <button type="submit">Get Endorsements</button>
      </form>
      {skills.length > 0 && (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetUserSkillEndorsements;