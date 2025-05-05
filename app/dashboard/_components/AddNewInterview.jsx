"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `
      Job Position: ${jobPosition}, 
      Job Description: ${jobDesc}, 
      Years of Experience: ${jobExperience}. 
      Based on this, give 5 interview questions with answers in JSON format like:
      [
        {
          "question": "What is React?",
          "answer": "React is a JavaScript library for building user interfaces."
        },
        ...
      ]
    `;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const rawText = result.response.text().replace(/```json|```/g, "").trim();

      let parsedJSON;
      try {
        parsedJSON = JSON.parse(rawText);
      } catch (jsonError) {
        console.error("Failed to parse JSON from Gemini:", jsonError);
        throw new Error("The response from AI was not valid JSON.");
      }

      const mockId = uuidv4();
      const interviewId = user?.id;

      await db.insert(MockInterview).values({
        mockId,
        jsonMockResp: JSON.stringify(parsedJSON),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      setOpenDialog(false);
      router.push(`/dashboard/interview/${interviewId}/${mockId}/start`);
    } catch (err) {
      console.error("Error generating interview:", err);
      alert("Something went wrong generating the interview. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-6 rounded-2xl bg-blue-900 text-white text-center cursor-pointer hover:scale-105 transition-all shadow-md"
      >
        <h2 className="text-lg font-semibold">+ Add New Interview</h2>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">New Interview Setup</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-5 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Role / Position
                  </label>
                  <Input
                    placeholder="e.g. Full Stack Developer"
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    placeholder="e.g. React, Node.js, PostgreSQL"
                    required
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g. 3"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" size={18} />
                        Generating...
                      </div>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
