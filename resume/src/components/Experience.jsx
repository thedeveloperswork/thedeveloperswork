import React from 'react'

const Experience = () => {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-900 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-teal-900 uppercase tracking-wide">Experience</h2>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-3 space-y-10 pl-8 pb-4">
                {/* Job 1 */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-teal-900 h-6 w-6 rounded-full border-4 border-white"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Infosys: British Petroleum (BP)</h3>
                        <span className="text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mt-1 sm:mt-0">
                            Feb 2025 – Present
                        </span>
                    </div>
                    <p className="text-gray-700 italic mb-3 font-medium">Specialist Programmer L2 (Data Engineering) | Hyderabad</p>
                    <ul className="space-y-2 text-gray-600 list-disc list-outside ml-4 marker:text-teal-600 text-sm leading-relaxed">
                        <li>Developed scalable PySpark ETL pipelines using AWS Glue and Crawlers, processing multi-GB datasets for downstream analytics.</li>
                        <li>Orchestrated end-to-end data workflows using AWS Step Functions and CloudFormation, improving pipeline reliability and deployment consistency.</li>
                        <li>Managed AWS Aurora PostgreSQL databases, ensuring high availability and supporting analytical reporting workloads.</li>
                    </ul>
                </div>

                {/* Job 2 */}
                <div className="relative">
                    <div className="absolute -left-[41px] bg-gray-300 h-6 w-6 rounded-full border-4 border-white"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Infosys: Telstra</h3>
                        <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full mt-1 sm:mt-0">
                            Mar 2021 – Dec 2024
                        </span>
                    </div>
                    <p className="text-gray-700 italic mb-3 font-medium">Specialist Programmer L1 (Data Engineering) | Hyderabad</p>
                    <ul className="space-y-2 text-gray-600 list-disc list-outside ml-4 marker:text-gray-400 text-sm leading-relaxed">
                        <li>Designed and implemented Azure-based ETL pipelines using PySpark, supporting enterprise-scale data warehousing and reporting use cases.</li>
                        <li>Optimized Spark jobs to improve data processing performance and reliability.</li>
                        <li>Recognized as MVP for outstanding contributions and proactive learning.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Experience
