import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, PauseCircle, PlayCircle, CheckCircle, Cpu, Award } from 'lucide-react';

const AssessmentTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize assessment
  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/start`);
        const { id, startTime } = response.data;
        setAssessmentId(id);
        setStartTime(new Date(startTime));
        setLoading(false);
      } catch (error) {
        console.error('Error starting assessment:', error);
        setError('Failed to start assessment. Check your connection.');
        setLoading(false);
      }
    };

    initializeAssessment();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (startTime && !isCompleted && !isPaused) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - new Date(startTime).getTime());
      }, 10);
    }
    return () => clearInterval(interval);
  }, [startTime, isCompleted, isPaused]);

  // Format time with precision
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
      .toString()
      .padStart(2, '0')}`;
  };

  // Complete assessment
  const handleComplete = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/complete`, {
        assessment_id: assessmentId,
        assessment_end_time: new Date(),
      });
      setIsCompleted(true);
      setLoading(false); 
    } catch (error) {
      console.error('Error completing assessment:', error);
      setError('Failed to complete assessment. Please try again.');
      setLoading(false);
    }
  };

  // Toggle pause/resume
  const togglePause = () => setIsPaused(!isPaused);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <h2 className="text-2xl font-bold text-white">Initializing...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <div className="bg-red-800 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-xl p-6 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Timer Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white flex items-center mb-4">
            <Cpu className="text-blue-400 mr-3" size={32} />
            Assessment Timer
          </h1>
          <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center text-gray-300 mb-2">
              <Clock className="mr-2" size={20} />
              <p>Time Elapsed</p>
            </div>
            <div className="text-5xl font-mono font-bold text-blue-400">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col items-center gap-6">
          {!isCompleted ? (
            <>
              <button
                onClick={togglePause}
                className={`${
                  isPaused
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white px-6 py-3 rounded-full shadow-md transition-all`}
              >
                {isPaused ? (
                  <>
                    <PlayCircle className="inline-block mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <PauseCircle className="inline-block mr-2" />
                    Pause
                  </>
                )}
              </button>
              <button
                onClick={handleComplete}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition-all"
              >
                <CheckCircle className="inline-block mr-2" />
                Complete Assessment
              </button>
            </>
          ) : (
            <div className="text-center">
              <Award className="text-green-400 mb-2" size={32} />
              <p className="text-lg font-bold text-green-400">Assessment Completed!</p>
              <p className="text-gray-300 mt-2">Total Time: {formatTime(currentTime)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentTimer;
