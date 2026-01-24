import React from 'react'

const Header = () => {
    return (
        <header className="text-center mb-6 border-b-2 border-teal-900/10 pb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase mb-2">
                Vijaya Gopinadh Reddy<span className="text-teal-800"> Velagala</span>
            </h1>
            <p className="text-xl font-bold text-teal-900 tracking-wider uppercase mb-5">
                DATA ENGINEER | BIG DATA | LAKEHOUSE | CLOUD
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-teal-700">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91 6281762528</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-teal-700">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <a href="mailto:gopinadh199922@gmail.com" className="hover:text-teal-800 hover:underline">
                        gopinadh199922@gmail.com
                    </a>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-teal-700">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-teal-700">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <a href="https://thedevelopers.work" target="_blank" rel="noopener noreferrer" className="hover:text-teal-800 hover:underline">
                        thedevelopers.work
                    </a>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-teal-700">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <a href="https://linkedin.com/in/developerswork" target="_blank" rel="noopener noreferrer" className="hover:text-teal-800 hover:underline">
                        in/developerswork
                    </a>
                </div>
                <p className="text-gray-600 leading-relaxed text-xs">
                    Data Engineer with 5+ years of experience designing and optimizing scalable data
                    pipelines on AWS and Azure using PySpark, Databricks, and Delta Lake. Proven
                    experience building production-grade Lakehouse architectures, optimizing Spark
                    jobs for performance, and ensuring data quality for large-scale analytical
                    workloads in energy and telecom domains.
                </p>
            </div>
        </header>
    )
}

export default Header
