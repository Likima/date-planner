"use client";

import { useState } from "react";

export default function About() {
    const [showFeatures, setShowFeatures] = useState(false);
    const [showDev, setShowDev] = useState(false);
    const [showMotivation, setShowMotivation] = useState(false);
    
    return (
    <div className="flex min-h-screen text-white gap-x-0 bg-gradient-to-br from-indigo-900 to-purple-800">

        {/* Left Side: Breif Description */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">
            <div className="bg-blue-600/90 backdrop-blur-sm rounded-2xl px-10 py-15 shadow w-full max-w-2x1">
            <h1 className="text-4xl font-bold text-black mb-4 text-center">Welcome to Day Planner</h1>

            {/* Just placeholder descriptive text for now */}
            <p className="text-lg text-white text-center"> 
                The DayPlanner project aims to provide users with a comprehensive web application that automates and optimizes
                the process of planning daily activities. This full-stack solution will enable users to efficiently organize,
                visualize, and manage their schedules for individual or group activities. The application will incorporate
                location-based services, intelligent recommendations, and interactive planning tools to enhance user
                productivity and experience.
            </p>
            </div>
        </div>

        {/* Right Side: Interactive Sections */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12 gap-6">

            {/* Project Features Section */}
            <div className="bg-blue-600/90 rounded-2xl shadow p-6 w-full max-w-lg">
            <button
                onClick={() => setShowFeatures((prev) => !prev)}
                className="flex items-center text-2xl font-bold text-white focus:outline-none"
            >
                <span className="text-white text-3xl mr-2">{showFeatures ? "−" : "+"}</span>
                Project Features
            </button>
            {showFeatures && (
                <ul className="mt-4 ml-8 text-white-100 space-y-2 list-disc">
                <li> Calendar integration for easy scheduling</li>
                <li> Map-based activity planning</li>
                <li> Intelligent recommendations for activities</li>
                </ul>
            )}
            </div>

            {/* Meet the Developer Section*/}
            <div className="bg-blue-600/90 rounded-2xl shadow p-6 w-full max-w-lg">
            <button
                onClick={() => setShowDev((prev) => !prev)}
                className="flex items-center text-2xl font-bold text-white focus:outline-none"
            >
                <span className="text-white text-3xl mr-2">{showDev ? "−" : "+"}</span>
                Meet the Developers
            </button>
            {showDev && (
                <div className="mt-4 ml-8 text-white-100">
                <h2 className="text-xl font-semibold mb-1">Sample Dev 1</h2>
                <p>
                    Sample Text
                </p>
                <h2 className="text-xl font-semibold mb-1">Sample Dev 2</h2>
                <p>
                    Sample Text
                </p>
                </div>
            )}
            </div>

            {/* Project Motivation Section*/}
            <div className="bg-blue-600/90 rounded-2xl shadow p-6 w-full max-w-lg">
            <button
                onClick={() => setShowMotivation((prev) => !prev)}
                className="flex items-center text-2xl font-bold text-white focus:outline-none"
            >
                <span className="text-white text-3xl mr-2">{showMotivation ? "−" : "+"}</span>
                Project Motivation
            </button>
            {showMotivation && (
                <div className="mt-4 ml-8 text-white-100">
                <p>
                    Sample Text
                </p>
                </div>
            )}
            </div>
        </div>
    </div>
    );
}