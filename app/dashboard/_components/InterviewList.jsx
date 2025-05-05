import { useEffect, useState } from "react";

const InterviewList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions/fix-mock-json");
        const data = await res.json();
        console.log("✅ Raw fetched data:", data);

        setQuestions(Array.isArray(data) ? data : data.questions ?? []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Fetched Questions</h3>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {questions.map((q, i) => (
            <li key={i}>{q.Question ?? JSON.stringify(q)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewList;
