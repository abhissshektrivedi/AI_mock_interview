"use client"; // Only if you're using App Router

import { useState } from "react";

export default function QuestionGenerator() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]); // Clear old results
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      console.log("Frontend received:", data);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Question Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. React)"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <ul className="mt-4 space-y-2">
        {questions.map((q, idx) => (
          <li key={idx} className="p-3 bg-gray-100 rounded shadow">
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}
