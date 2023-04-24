import React, { useState } from 'react';
import './EndorseSkill.css'; // import the CSS file

function EndorseSkill({ contract, account }) {
  const [userAddress, setUserAddress] = useState('');
  const [skill, setSkill] = useState('');

  const handleUserAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.endorseSkill(userAddress, skill);
  };

  return (
    <div className="endorse-skill-container"> {/* add a class name */}
      <h2>Endorse Skill</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Address:
          <input type="text" value={userAddress} onChange={handleUserAddressChange} />
        </label>
        <br />
        <label>
          Skill:
          <input type="text" value={skill} onChange={handleSkillChange} />
        </label>
        <br />
        <button type="submit">Endorse</button>
      </form>
    </div>
  );
}

export default EndorseSkill;