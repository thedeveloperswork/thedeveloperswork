import React from 'react'

const Sidebar = () => {
    return (
        <div className="md:col-span-4 flex flex-col gap-8 border-r border-gray-100 pr-6">
            {/* About Me */}
            <section>
                <h3 className="text-teal-900 font-bold uppercase tracking-wider mb-3 text-lg border-b-2 border-teal-900 w-28 pb-1">
                    About Me
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Big Data Engineer and Specialist Programmer with over 5 years of experience. I specialize in
                    designing and optimizing scalable data pipelines on AWS and Azure ecosystems using PySpark and
                    SQL.
                </p>
            </section>

            {/* Expertise */}
            <section>
                <h3 className="text-teal-900 font-bold uppercase tracking-wider mb-4 text-lg border-b-2 border-teal-900 w-28 pb-1">
                    Expertise
                </h3>
                <ul className="space-y-3 text-sm">
                    <li>
                        <strong className="block text-gray-900">Big Data & Processing</strong>
                        <span className="text-gray-600">PySpark, Apache Spark, Databricks, Delta Lake</span>
                    </li>
                    <li>
                        <strong className="block text-gray-900">Cloud</strong>
                        <span className="text-gray-600">AWS (Glue, Step Functions), Azure, GCP</span>
                    </li>
                    <li>
                        <strong className="block text-gray-900">Databases</strong>
                        <span className="text-gray-600">PostgreSQL, MySQL, MongoDB</span>
                    </li>
                    <li>
                        <strong className="block text-gray-900">Concepts</strong>
                        <span className="text-gray-600">Medallion Architecture, WAP Pattern, Z-Ordering, Data Skipping, Salting, CAP Theorem</span>
                    </li>
                    <li>
                        <strong className="block text-gray-900">DevOps</strong>
                        <span className="text-gray-600">Git, CI/CD, Docker</span>
                    </li>
                </ul>
            </section>

            {/* Certifications */}
            <section>
                <h3 className="text-teal-900 font-bold uppercase tracking-wider mb-4 text-lg border-b-2 border-teal-900 w-28 pb-1">
                    Certifications
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                            alt="Microsoft" className="w-5 h-5 object-contain mt-0.5 opacity-80" />
                        <div>
                            <span className="block font-semibold text-gray-800 text-sm leading-tight">Azure Data Engineer Associate</span>
                            <span className="text-xs text-gray-500">Microsoft Certified</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
                            alt="Google Cloud" className="w-5 h-5 object-contain mt-0.5 opacity-80" />
                        <div>
                            <span className="block font-semibold text-gray-800 text-sm leading-tight">Generative AI Leader</span>
                            <span className="text-xs text-gray-500">Google Cloud</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"
                            alt="MongoDB" className="w-5 h-5 object-contain mt-0.5 opacity-80" />
                        <div>
                            <span className="block font-semibold text-gray-800 text-sm leading-tight">MongoDB for Javascript Developers</span>
                            <span className="text-xs text-gray-500">MongoDB</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sidebar
