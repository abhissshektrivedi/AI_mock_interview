'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function InterviewPage() {
  const { mockId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/get-mock-response?mockId=${mockId}`);
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (mockId) {
      fetchQuestions();
    }
  }, [mockId]);

  if (loading) return <p>Loading questions...</p>;

  if (!questions.length) return <p>No questions found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Interview Questions</h1>
      <ul className="space-y-4">
        {questions.map((q, idx) => (
          <li key={idx} className="border p-4 rounded shadow">
            <p className="font-semibold">{q.Question}</p>
            <p className="text-sm text-gray-600 mt-2">{q.Answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
