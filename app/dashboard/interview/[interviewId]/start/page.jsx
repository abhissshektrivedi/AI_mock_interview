"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    } else {
      console.error("Missing interviewId in params");
    }
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      console.log("DB result:", result);

      if (!result || result.length === 0) {
        console.error("No mock interview found.");
        return;
      }

      const data = result[0];

      try {
        const parsedQuestions = JSON.parse(data.jsonMockResp);
        console.log("Parsed questions:", parsedQuestions);

        if (!Array.isArray(parsedQuestions)) {
          console.error("Parsed questions is not an array.");
          return;
        }

        setInterviewData(data);
        setMockInterviewQuestions(parsedQuestions);
      } catch (jsonError) {
        console.error("Failed to parse JSON from jsonMockResp:", jsonError);
      }
    } catch (error) {
      console.error("Error loading interview data:", error);
    }
  };

  return (
    <div className="px-4 py-8">
      {mockInterviewQuestions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuestionSection
              mockInterviewQuestion={mockInterviewQuestions}
              activeQuestionIndex={activeQuestionIndex}
            />
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestions}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
            />
          </div>

          <div className="flex gap-4 mt-6 justify-end">
            {activeQuestionIndex > 0 && (
              <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                Previous
              </Button>
            )}
            {activeQuestionIndex < mockInterviewQuestions.length - 1 ? (
              <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                Next
              </Button>
            ) : (
              <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button>End Interview</Button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-20">
          Loading questions or none found...
        </p>
      )}
    </div>
  );
};

export default StartInterview;
