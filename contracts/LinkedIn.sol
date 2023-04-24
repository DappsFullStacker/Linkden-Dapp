//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract LinkedIn {
    struct User {
        string name;
        string[] skills;
        uint256 connectionsCount;
        mapping(address => bool) connections;
        mapping(string => bool) endorsements;
        uint256 reputation;
        address[] jobApplications;
    }
    
    struct Message {
        address sender;
        address receiver;
        string content;
    }
    
    struct JobPosting {
        string title;
        string description;
        uint256 salary;
        address employer;
        address[] applicants;
        bool isFilled;
    }
    
    struct SkillEndorsement {
        address endorser;
        string skill;
    }
    
    mapping(address => User) public users;
    mapping(string => JobPosting) public jobPostings;
    Message[] public messages;
    SkillEndorsement[] public skillEndorsements;
    
    event JobPostingCreated(string title, address employer);
    event JobApplicationSubmitted(string title, address applicant);
    
    function addUser(string memory _name, string[] memory _skills) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_skills.length > 0, "At least one skill is required");
        
        User storage user = users[msg.sender];
        user.name = _name;
        user.skills = _skills;
        user.reputation = 0;
    }
    
    function connectWithUser(address _userAddress) public {
        require(_userAddress != address(0), "Invalid user address");
        require(_userAddress != msg.sender, "Cannot connect with yourself");
        
        User storage user = users[msg.sender];
        User storage otherUser = users[_userAddress];
        
        require(!user.connections[_userAddress], "Already connected with this user");
        
        user.connections[_userAddress] = true;
        user.connectionsCount++;
        
        if (otherUser.connections[msg.sender]) {
            user.reputation++;
            otherUser.reputation++;
        }
    }
    
    function endorseSkill(address _userAddress, string memory _skill) public {
        require(_userAddress != address(0), "Invalid user address");
        require(bytes(_skill).length > 0, "Skill is required");
        
        User storage user = users[_userAddress];
        require(user.connections[msg.sender], "You must be connected with the user to endorse their skill");
        require(!user.endorsements[_skill], "You have already endorsed this skill for this user");
        
        user.endorsements[_skill] = true;
        skillEndorsements.push(SkillEndorsement(msg.sender, _skill));
    }
    
    function createJobPosting(string memory _title, string memory _description, uint256 _salary) public {
        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_description).length > 0, "Description is required");
        require(_salary > 0, "Salary must be greater than 0");
        
        JobPosting storage jobPosting = jobPostings[_title];
        require(jobPosting.employer == address(0), "Job posting with this title already exists");
        
        jobPosting.title = _title;
        jobPosting.description = _description;
        jobPosting.salary = _salary;
        jobPosting.employer = msg.sender;
        
        emit JobPostingCreated(_title, msg.sender);
    }
    
    function applyToJobPosting(string memory _title) public {
        require(bytes(_title).length > 0, "Title is required");
        
        JobPosting storage jobPosting = jobPostings[_title];
        
        require(jobPosting.employer != address(0), "Job posting does not exist");
        require(!jobPosting.isFilled, "Job posting is already filled");
        require(!hasAppliedToJobPosting(_title), "You have already applied to this job posting");
        
        User storage user = users[msg.sender];
        
        require(user.connections[jobPosting.employer], "You must be connected with the employer to apply");
        
        jobPosting.applicants.push(msg.sender);
        user.jobApplications.push(msg.sender);
        
        emit JobApplicationSubmitted(_title, msg.sender);
    }
    
    function hasAppliedToJobPosting(string memory _title) public view returns (bool) {
        JobPosting storage jobPosting = jobPostings[_title];
        
        for (uint256 i = 0; i < jobPosting.applicants.length; i++) {
            if (jobPosting.applicants[i] == msg.sender) {
                return true;
            }
        }
        
        return false;
    }
    
    function fillJobPosting(string memory _title) public {
        require(bytes(_title).length > 0, "Title is required");
        
        JobPosting storage jobPosting = jobPostings[_title];
        
        require(jobPosting.employer == msg.sender, "You are not the employer of this job posting");
        require(jobPosting.applicants.length > 0, "There are no applicants for this job posting");
        require(!jobPosting.isFilled, "Job posting is already filled");
        
        jobPosting.isFilled = true;
    }
    
    function sendMessage(address _receiver, string memory _content) public {
        require(_receiver != address(0), "Invalid receiver address");
        require(bytes(_content).length > 0, "Content is required");
        
        messages.push(Message(msg.sender, _receiver, _content));
    }
    
    function getJobPostingApplicants(string memory _title) public view returns (address[] memory) {
        JobPosting storage jobPosting = jobPostings[_title];
        
        return jobPosting.applicants;
    }
    
    function getUserJobApplications() public view returns (address[] memory) {
        User storage user = users[msg.sender];
        
        return user.jobApplications;
    }
    
    function getUserSkillEndorsements(address _userAddress) public view returns (string[] memory) {
    require(_userAddress != address(0), "Invalid user address");

    User storage user = users[_userAddress];
    uint256 numEndorsements = 0;

    // Count the number of endorsed skills
    for (uint256 i = 0; i < user.skills.length; i++) {
        if (user.endorsements[user.skills[i]]) {
            numEndorsements++;
        }
    }

    // Initialize the endorsements array with the correct size
    string[] memory endorsements = new string[](numEndorsements);

    // Populate the endorsements array
    uint256 j = 0;
    for (uint256 i = 0; i < user.skills.length; i++) {
        if (user.endorsements[user.skills[i]]) {
            endorsements[j] = user.skills[i];
            j++;
        }
    }

    return endorsements;
}
    
    function getSkillEndorsements(string memory _skill) public view returns (address[] memory) {
        require(bytes(_skill).length > 0, "Skill is required");
        
        address[] memory endorsers = new address[](skillEndorsements.length);
        uint256 endIndex = 0;
        
        for (uint256 i = 0; i < skillEndorsements.length; i++) {
            if (keccak256(bytes(skillEndorsements[i].skill)) == keccak256(bytes(_skill))) {
                endorsers[endIndex] = skillEndorsements[i].endorser;
                endIndex++;
            }
        }
        
        return endorsers;
    }
}