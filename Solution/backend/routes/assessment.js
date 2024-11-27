const express = require("express");
const axios = require("axios");
const router = express.Router();
const Assessment = require("../models/Assessment");

// Endpoint to fetch assessment start time
router.get('/start', async (req, res) => {
  try {
    // GitHub API request to fetch forks
    const response = await axios.get('https://api.github.com/repos/pankajexa/fs-assessment/forks', {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    // Find the specific fork for the current user
    const fork = response.data.find(f => 
      f.owner.login === process.env.GITHUB_USERNAME
    );

    if (!fork) {
      return res.status(404).json({ 
        error: 'No fork found for the specified user',
        message: 'Please ensure you have forked the original repository'
      });
    }

    // Create assessment record
    const assessment = new Assessment({
      assessment_start_time: new Date(fork.created_at),
      fork_url: fork.html_url
    });

    await assessment.save();

    // Return assessment details
    res.json({
      id: assessment._id,
      startTime: assessment.assessment_start_time,
      forkUrl: assessment.fork_url
    });

  } catch (error) {
    console.error("Error fetching GitHub data:", error.response ? error.response.data : error.message);
    
    res.status(500).json({ 
      message: 'Error fetching GitHub data',
      details: error.response ? error.response.data : error.message 
    });
  }
});

// Endpoint to save assessment end time
router.post("/complete", async (req, res) => {
  try {
    const { assessment_id, assessment_end_time } = req.body;

    if (!assessment_id || !assessment_end_time) {
      return res.status(400).json({ 
        message: "Missing assessment_id or assessment_end_time in request body." 
      });
    }

    // Find and update the assessment
    const assessment = await Assessment.findById(assessment_id);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Calculate total duration
    const endTime = new Date(assessment_end_time);
    const totalDuration = endTime - new Date(assessment.assessment_start_time);

    // Update assessment
    assessment.assessment_end_time = endTime;
    assessment.total_duration = totalDuration;

    await assessment.save();

    res.status(200).json({ 
      message: "Assessment completed successfully",
      totalDuration: totalDuration,
      startTime: assessment.assessment_start_time,
      endTime: endTime
    });

  } catch (error) {
    console.error("Error recording assessment end time:", error.message);
    return res.status(500).json({ 
      message: "Error recording assessment end time",
      details: error.message 
    });
  }
});

module.exports = router;