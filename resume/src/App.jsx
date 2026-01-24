import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import './index.css'

function App() {
    return (
        <div className="text-gray-700">
            <main className="resume-container flex flex-col p-8 md:p-12 relative" id="resume" role="main">
                <Header />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                    <Sidebar />

                    <div className="md:col-span-8 flex flex-col gap-8">
                        <Experience />
                        <Projects />
                        <Education />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-2 bg-teal-900 no-print"></div>
            </main>
        </div>
    )
}

export default App
