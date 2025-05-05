# AI_mock_interview
Powered Mock Interview Platform

## Description
This is an advanced and interactive AI-powered mock interview platform designed to help job seekers practice and improve their interview skills. Built with Next.js, Tailwind CSS, and Gemini Api,PostgreSQL, Drizzle ORM, it provides users with a good interview experience to enhance their chances of landing their dream job.

## Features
- AI-driven Interview: interview questions and feedback powered by AI.
- Personalized Interview Experiences: Tailor interview sessions based on job roles and industries.
- User Experience Level Questions: Questions are adjusted based on the user's experience level, ensuring relevance and appropriate difficulty.
- Detailed Feedback and Insights: Receive detailed feedback on your performance, including strengths, areas for improvement, and actionable tips.
- Question Bank: Access a wide range of interview questions across different domains and difficulty levels.
- Overall Grade: Receive an overall grade for each interview session, providing a quick assessment of your performance.
- Recent Interviews: Easily access and review your recent interview sessions directly from the home page.


- ## Getting Started
To get started with the AI-Powered Mock Interview Platform, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/abhissshektrivedi/AI_mock_interview

2. Navigate to the project directory:
   ```bash
   cd ai-mock-interview

3. Install dependencies by running: `npm install` 

4. Start the Server `npm run dev`
5. Set up environment variables
Create a .env.local file in the root with the following keys:

env
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

DATABASE_URL=postgresql://user:password@host:port/dbname

GEMINI_API_KEY=your-gemini-api-key
4. Set up the database (Neon)
If you're using Neon, run this to initialize your schema:

sql
-- Run inside Neon SQL Console

CREATE TABLE "mockInterview" (
  id SERIAL PRIMARY KEY,
  "jsonMockResp" TEXT NOT NULL,
  "jobPosition" VARCHAR NOT NULL,
  "jobDesc" VARCHAR NOT NULL,
  "jobExperience" VARCHAR NOT NULL,
  "createdBy" VARCHAR NOT NULL,
  "createdAt" VARCHAR,
  "mockId" VARCHAR NOT NULL
);
Or run via Drizzle migration (if set up):

bash

npm run drizzle:migrate
📦 Folder Structure
bash

/app
  /dashboard
    /interview/[interviewId]/[mockId]/start  → Interview start page
  /_components                              → Shared components
  /api/questions/[mockId]/route.js          → API route to fetch questions

/utils
  db.js                                     → Neon DB connection via Drizzle
  schema.js                                 → Drizzle schema definition
  GeminiAIModal.js                          → Gemini API handler



6. Access the Application: Open your browser and go to http://localhost:3000 to access the application.

## Technologies Used
- Next.js: A React framework for building server-side rendered and static web applications.
- Gemini API: Provides an interface for accessing the AI interview functionalities.
- PostgreSQL: A powerful, open-source object-relational database system.
- Neon Serverless: A serverless deployment for PostgreSQL, offering scalability and ease of use.
- Drizzle ORM: An ORM that makes database interactions simpler and more intuitive.

## Usage
To use the AI-Powered Mock Interview Platform, follow these guidelines:
- Create an Account: Sign up to start your mock interview sessions.
- Choose Interview Type: Select the type of interview (e.g., technical, behavioral) and job role
- Start Interview: Begin your mock interview and respond to the AI-generated questions.
- Receive Feedback: After completing the interview, get detailed feedback and insights to improve.
- Review Recent Interviews: Access your most recent interviews directly from the home page for quick review and continued improvement.


