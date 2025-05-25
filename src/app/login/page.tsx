'use client';

import { useState } from 'react';

import { useAuth } from '@/src/app/authContext'
import { ErrorMessage } from '@/src/components/errorMessage';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const { setUser } = useAuth();

    async function login(em: string, pw: string) {
        try {
            const response = await fetch("http://localhost:8001/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: em,
                    password: pw
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setShowError(true);
                throw new Error(data.error || "Invalid Login");
            }

            setShowError(false);
            setUser({
                name: data.user.user_metadata.username || data.user.email
            });

            // window.location.href = '/Dashboard';

        } catch (error) {
            console.error('Login error:', error);
            setShowError(true);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
            <form className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold text-center text-gray-900">Login</h1>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                >
                    Log In
                </button>
                <button
                    type="button"
                    className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition duration-200"
                    onClick={() => location.href = "/signup"}
                >
                    Sign Up
                </button>
                <div>
                    <ErrorMessage showCondition={showError} message={"Invalid Login"} />
                </div>
            </form >
        </div >
    );
}
