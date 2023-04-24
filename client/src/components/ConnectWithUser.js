import React, { useState } from 'react';
import './ConnectWithUser.css'; // import the CSS file

function ConnectWithUser({ contract, account }) {
  const [userAddress, setUserAddress] = useState('');

  const handleUserAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.connectWithUser(userAddress);
  };

  return (
    <div className="connect-with-user-container"> {/* add a class name */}
      <h2>Connect with User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Address:
          <input type="text" value={userAddress} onChange={handleUserAddressChange} />
        </label>
        <br />
        <button type="submit">Connect</button>
      </form>
    </div>
  );
}

export default ConnectWithUser;