import React, { useState } from 'react';

const Assignment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([
    { id: 1, question: 'Do you often feel sad or down?', answer: null },
    { id: 2, question: 'Do you have trouble sleeping or oversleeping?', answer: null },
    { id: 3, question: 'Do you feel fatigued or lack energy frequently?', answer: null },
    { id: 4, question: 'Do you find it hard to focus or concentrate?', answer: null },
    { id: 5, question: 'Do you experience a lack of interest in daily activities?', answer: null },
    { id: 6, question: 'Do you often feel anxious or nervous?', answer: null },
    { id: 7, question: 'Do you have trouble controlling your emotions?', answer: null },
    { id: 8, question: 'Do you feel isolated or lonely most of the time?', answer: null },
    { id: 9, question: 'Do you find it difficult to enjoy things you used to love?', answer: null },
    { id: 10, question: 'Do you feel hopeless or have thoughts of self-harm?', answer: null },
  ]);
  const [results, setResults] = useState(null);

  const handleAnswer = (questionId, answer) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answer } : q))
    );
  };

  const calculateResults = () => {
    const totalScore = questions.reduce((sum, q) => sum + (q.answer || 0), 0);
    let level = '';
    let recommendations = [];

    if (totalScore <= 15) {
      level = 'Mild Symptoms';
      recommendations = ['Practice mindfulness and meditation daily.', 'Stay connected with loved ones.', 'Maintain a healthy lifestyle with regular exercise and proper diet.'];
    } else if (totalScore <= 30) {
      level = 'Moderate Symptoms';
      recommendations = [
        'Consider consulting a mental health professional.',
        'Adopt stress management techniques such as yoga or journaling.',
        'Engage in social activities and build a support system.',
      ];
    } else {
      level = 'Severe Symptoms';
      recommendations = [
        'Seek immediate help from a licensed mental health professional.',
        'Discuss possible therapy or medication options with a psychiatrist.',
        'Ensure you have someone to talk to and a safety plan in place.',
      ];
    }

    setResults({ totalScore, level, recommendations });
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Mental Health & Well-being Assessment</h2>
          <p className="text-lg text-gray-700 mb-6">
            Take this professional assessment to gain insight into your mental health. Your responses will remain confidential.
          </p>
          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 flex items-center justify-center py-12">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">Mental Health Questionnaire</h2>
    <p className="text-gray-600 text-center mb-6">Rate each question from 0 (Never) to 4 (Always).</p>
    {questions.map((q) => (
      <div key={q.id} className="mb-6">
        <p className="text-lg text-gray-800 mb-3">{q.question}</p>
        <div className="flex justify-between">
          {[0, 1, 2, 3, 4].map((score) => (
            <button
              key={score}
              className={`px-4 py-2 border rounded-lg ${
                q.answer === score ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => handleAnswer(q.id, score)}
            >
              {score}
            </button>
          ))}
        </div>
      </div>
    ))}
    <div className="text-center mt-8">
      <button
        onClick={() => {
          setCurrentStep(3);
          calculateResults();
        }}
        className="py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
      >
        Submit Assessment
      </button>
    </div>
  </div>
</div>

    );
  }

  if (currentStep === 3 && results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Assessment Results</h2>
          <p className="text-xl text-gray-800 text-center mb-4">Total Score: {results.totalScore}</p>
          <p className="text-lg text-green-600 font-bold text-center mb-8">Mental Health Level: {results.level}</p>
          <h3 className="text-lg font-bold text-blue-800 mb-4">Recommendations:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {results.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setQuestions(questions.map((q) => ({ ...q, answer: null })));
                setResults(null);
                setCurrentStep(1);
              }}
              className="py-3 px-6 bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Assignment;
