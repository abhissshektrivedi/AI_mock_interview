"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState(null);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // ⬇️ This will log all mock interviews to the browser console
  useEffect(() => {
    const logAllInterviews = async () => {
      const allInterviews = await db.select().from(MockInterview);
      console.log("All mock interviews:", allInterviews);
    };
    logAllInterviews();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const data = result[0];
    setInterviewData(data);

    try {
      let parsed;

      if (typeof data?.jsonMockResp === "string") {
        parsed = JSON.parse(data.jsonMockResp);
      } else {
        parsed = data.jsonMockResp; // already parsed
      }

      if (Array.isArray(parsed)) {
        setParsedQuestions(parsed);
      } else {
        console.error("Parsed questions is not an array:", parsed);
        setParsedQuestions([]);
      }
    } catch (err) {
      console.error("Error parsing questions JSON:", err);
      setParsedQuestions([]);
    }

    setLoading(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-3">
            <h2 className="text-lg">
              <strong>Job Role: </strong>{interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description: </strong>{interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Experience: </strong>{interviewData?.jobExperience} years
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 dark:bg-yellow-900 dark:border-yellow-600">
            <h2 className="flex gap-2 items-center text-yellow-700 dark:text-yellow-200 mb-2">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <p className="text-yellow-600 dark:text-yellow-300">
              {process.env.NEXT_PUBLIC_INFORMATION || "Use webcam and click below to start the interview."}
            </p>
          </div>

          {parsedQuestions.length > 0 && (
            <div className="p-5 border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Sample Questions:</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {parsedQuestions.map((q, index) => (
                  <li key={index}>
                    <strong>Q{index + 1}:</strong> {q.Question}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              height={300}
              width={300}
              mirrored
              className="rounded-lg border"
            />
          ) : (
            <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border" />
          )}
          <Button
            className="w-full"
            onClick={() => setWebCamEnabled((prev) => !prev)}
          >
            {webCamEnabled ? "Close Webcam" : "Enable Webcam"}
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
