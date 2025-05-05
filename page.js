'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contect from './_components/Contect';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <div>
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen font-sans bg-gradient-to-b from-[#090e33] to-[#0d0628] text-white">
        {/* Header */}
        <header className="border-b border-[#1e1b4b] sticky top-0 z-50 bg-[#0d0628]/80 backdrop-blur-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-extrabold text-white">AI Mock Interviews</h1>
            <nav className="flex items-center space-x-6 text-sm font-medium text-white/80">
              <Link href="#features" className="hover:text-white">Features</Link>
              <Link href="#testimonials" className="hover:text-white">Testimonials</Link>
              <Link href="#contact" className="hover:text-white">Contact</Link>
              <a href="https://github.com/abhissshektrivedi" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6 text-white hover:text-white/70" />
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center py-24 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">
            Ace Your Next Interview
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            Practice with AI-powered mock interviews and get personalized feedback.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-purple-500 text-white hover:bg-purple-600">Get Started</Button>
            </Link>
            <Link href="/dashboard/howit">
              <Button variant="outline" className="bg-purple-500 text-white hover:text-purple-700">Learn More</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-[#100a2f] text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform <span className="text-purple-400">Features</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10">
            Our platform provides everything you need to crack your next interview.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {["AI Mock Interviews", "Instant Feedback", "Comprehensive Reports"].map((title, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1c1440] to-[#22184c] p-6 rounded-2xl shadow-lg text-left text-white hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-white/70">
                  {title === "AI Mock Interviews"
                    ? "Procurring in meditations array interfed for easic: baxids."
                    : title === "Instant Feedback"
                    ? "Smart suggestions to etalin Internuny improve yes."
                    : "Breakdowns of your aterights’ and improvement areas."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-[#0b0925] text-center">
          <h2 className="text-3xl font-bold text-white mb-10">
            Hear from Our <span className="text-purple-400">Achievers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {[{
              quote: "It’s like having a personal coach with me 24/7. The feedback was on point and helped me improve drastically.",
              name: "Rohit Verma"
            }, {
              quote:"The practice sessions felt just like real interviews. They sharpened my responses and played a big role in landing my dream job.",
              name: "Anjali Sharma"
            }].map((testi, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#1a123c] to-[#22184c] p-6 rounded-2xl shadow text-left"
              >
                <p className="text-white/80 italic mb-2">"{testi.quote}"</p>
                <h4 className="font-semibold text-purple-300">{testi.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-[#100a2f]">
          <div className="container mx-auto px-4">
            <Contect />
          </div>
        </section>
      </main>

      <footer className="bg-black text-white text-center py-6">
        <p>© 2025 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default page;
