import React, { useState } from 'react';
import './SendMessage.css'; // import the CSS file

function SendMessage({ contract, account }) {
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await contract.sendMessage(receiver, content);
  };

  return (
    <div className="send-message-container"> {/* add a class name */}
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Receiver Address:
          <input type="text" value={receiver} onChange={handleReceiverChange} />
        </label>
        <br />
        <label>
          Content:
          <input type="text" value={content} onChange={handleContentChange} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendMessage;