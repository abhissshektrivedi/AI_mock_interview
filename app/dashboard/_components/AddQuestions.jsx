"use client";

import React, { useState } from "react";

const AddQuestions = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
  
    console.log("Generated questions:", data.questions); // 👈 Add this line
  
    setQuestions(data.questions);
    setLoading(false);
  };
  

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. React, Java)"
        className="border p-2 w-full mb-3"
      />
      <button
        onClick={handleGenerate}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <ul className="mt-4 list-disc list-inside">
        {questions.map((q, idx) => (
          <li key={idx}>{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddQuestions;
