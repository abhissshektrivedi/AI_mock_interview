'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InterviewStartPage() {
  const { mockId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mockId) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions/${mockId}`);
        const data = await res.json();

        if (res.ok) {
          setQuestions(data?.questions || []);
        } else {
          console.error("API error:", data?.error);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [mockId]);

  if (loading) return <p className="p-10 text-gray-500">Loading questions...</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Your Interview Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions found for this mock interview.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q, i) => (
            <li key={i} className="bg-gray-100 p-5 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">
                <span className="font-bold">Q{i + 1}:</span> {q.question}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Ans:</span> {q.answer}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
