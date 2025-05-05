"use client";
import { useState } from "react";

export default function AddQuestions() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    console.log("Generated Questions:", data);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={generateQuestions}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </div>
  );
}
