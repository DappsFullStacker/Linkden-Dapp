import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AddUser from './components/AddUser';
import ConnectWithUser from './components/ConnectWithUser';
import EndorseSkill from './components/EndorseSkill';
import CreateJobPosting from './components/CreateJobPosting';
import ApplyToJobPosting from './components/ApplyToJobPosting';
import HasAppliedToJobPosting from './components/HasAppliedToJobPosting';
import FillJobPosting from './components/FillJobPosting';
import SendMessage from './components/SendMessage';
import GetJobPostingApplicants from './components/GetJobPostingApplicants';
import GetUserJobApplications from './components/GetUserJobApplications';
import GetUserSkillEndorsements from './components/GetUserSkillEndorsements';
import GetSkillEndorsements from './components/GetSkillEndorsements';
import './App.css'; // import the CSS file

// Load the contract ABI from the JSON file
const CONTRACT_ABI = require('./artifacts/contracts/LinkedIn.sol/LinkedIn.json').abi;

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Get the user's Ethereum account address
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);

      // Load the LinkedIn contract
      const contractAddress = '0x19746bab506A5D509A404919D1D6BAcf493962de';
      const contractABI = CONTRACT_ABI;
      const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
      setContract(contract);
    };

    init();
  }, []);

  return (
    <div className="app-container"> {/* add a class name */}
      <h1>LinkedIn</h1>
      {provider && contract && account && (
        <>
          <AddUser contract={contract} account={account} />
          <ConnectWithUser contract={contract} account={account} />
          <EndorseSkill contract={contract} account={account} />
          <CreateJobPosting contract={contract} account={account} />
          <ApplyToJobPosting contract={contract} account={account} />
          <HasAppliedToJobPosting contract={contract} account={account} />
          <FillJobPosting contract={contract} account={account} />
          <SendMessage contract={contract} account={account} />
          <GetJobPostingApplicants contract={contract} />
          <GetUserJobApplications contract={contract} account={account} />
          <GetUserSkillEndorsements contract={contract} />
          <GetSkillEndorsements contract={contract} />
        </>
      )}
    </div>
  );
}

export default App;