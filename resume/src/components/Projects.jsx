import React from 'react'

const Projects = () => {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-900 p-2 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-teal-900 uppercase tracking-wide">Technical Projects</h2>
            </div>

            <div className="space-y-6">
                {/* Project 1 */}
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">Retail360 Lakehouse</h3>
                        <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2 py-1 rounded border border-teal-100">Databricks</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 italic">
                        Designed a production-grade Lakehouse architecture (Bronze/Silver/Gold) using
                        Databricks Auto Loader and Delta Lake for analytical workloads.
                    </p>
                    <ul className="space-y-2 text-gray-600 list-disc list-outside ml-4 marker:text-teal-600 text-sm leading-relaxed">
                        <li>Improved query latency by ~40% using Z-Ordering and Data Skipping.</li>
                        <li>Implemented Salted Join strategies to handle data skew in high-volume joins.</li>
                        <li>Built a Write-Audit-Publish (WAP) pattern with data quality checks in PySpark to prevent schema drift and ensure downstream data integrity.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Projects
