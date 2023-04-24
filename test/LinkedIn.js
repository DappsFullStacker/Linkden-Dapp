const { expect } = require("chai");
   const { ethers, waffle } = require("hardhat");

   describe("Voting", function () {
     let voting;
     let provider;
     let accounts;

     beforeEach(async function () {
       const Voting = await ethers.getContractFactory("Voting");
       voting = await Voting.deploy();
       await voting.deployed();

       provider = waffle.provider;
       accounts = await ethers.getSigners();
     });

     it("Should add a candidate", async function () {
       await voting.addCandidate("Alice");
       const candidateCount = await voting.getCandidateCount();
       expect(candidateCount).to.equal(1);
     });

     it("Should vote for a candidate", async function () {
       await voting.addCandidate("Alice");
       await voting.setVotingEnd(Math.floor(Date.now() / 1000) + 3600); // Set voting end to 1 hour from now
       await voting.setQuorum(1); // Set quorum to 1 vote
       await voting.setVoterWeight(accounts[0].address, 1); // Set voter weight to 1
       await voting.vote(1);
       const candidate = await voting.getCandidate(1);
       expect(candidate.voteCount).to.equal(1);
     });

     it("Should delegate a vote", async function () {
       await voting.addCandidate("Alice");
       await voting.setVotingEnd(Math.floor(Date.now() / 1000) + 3600); // Set voting end to 1 hour from now
       await voting.setQuorum(1); // Set quorum to 1 vote
       await voting.setVoterWeight(accounts[0].address, 1); // Set voter weight to 1
       await voting.setVoterWeight(accounts[1].address, 1); // Set voter weight to 1
       await voting.delegateVote(accounts[1].address, { from: accounts[0].address });
       await voting.vote(1, { from: accounts[1].address });
       const candidate = await voting.getCandidate(1);
       expect(candidate.voteCount).to.equal(2);
     });

     it("Should resolve a dispute", async function () {
       await voting.addCandidate("Alice");
       await voting.setVotingEnd(Math.floor(Date.now() / 1000) + 3600); // Set voting end to 1 hour from now
       await voting.setQuorum(1); // Set quorum to 1 vote
       await voting.setVoterWeight(accounts[0].address, 1); // Set voter weight to 1
       await voting.setVoterWeight(accounts[1].address, 1); // Set voter weight to 1
       await voting.vote(1, { from: accounts[0].address });
       await voting.vote(1, { from: accounts[1].address });
       await voting.resolveDispute(accounts[2].address, 1);
       const candidate = await voting.getCandidate(1);
       expect(candidate.voteCount).to.equal(3);
     });
   });