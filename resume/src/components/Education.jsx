import React from 'react'

const Education = () => {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-900 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-teal-900 uppercase tracking-wide">Education</h2>
            </div>
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">B.Tech in Computer Science Engineering</h3>
                        <p className="text-gray-600">Sasi Institute of Technology & Engineering, Tadepalligudem.</p>
                    </div>
                    <span className="text-sm font-bold text-gray-500">2016 – 2020</span>
                </div>
            </div>
        </section>
    )
}

export default Education
