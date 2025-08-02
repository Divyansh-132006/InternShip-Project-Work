const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const userData = require('./data/user.json');


app.get('/api/dashboard', (req, res) => {
 
  const interns = [
    "Divyansh Upadhyay", "Aarav Sharma", "Meera Patel",
    "Riya Verma", "Aditya Singh", "Ishita Mehra", "Raj Gupta"
  ];


  const rewardsPool = [
    "T-shirt unlocked", "Badge earned", "Certificate pending",
    "Hoodie unlocked", "Leaderboard Spot", "Social Media Shoutout"
  ];

  
  const getRandomRewards = () => {
    const count = Math.floor(Math.random() * 4) + 1; // 1 to 4 rewards
    const shuffled = rewardsPool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };


  const internName = interns[Math.floor(Math.random() * interns.length)];

  const response = {
    name: internName,
    referralCode: internName.toLowerCase().split(" ")[0] + "2025",
    donationsRaised: Math.floor(Math.random() * 20000 + 1000), // ₹1,000 to ₹21,000
    rewards: getRandomRewards()
  };

  res.json(response);
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
