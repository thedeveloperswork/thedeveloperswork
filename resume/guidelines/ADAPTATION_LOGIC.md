# Resume Adaptation Framework (Evidence-First Logic)

## Objective
Use `template.html` to generate a tailored resume. Prune breadth unless specifically required by the JD.

## Filtering Logic: The "Evidence" Rule
- [cite_start]**Always Include:** Infosys (BP & Telstra) engagements and Retail360 Lakehouse[cite: 930, 1139].
- **Suppress Non-Evidence:** Do NOT add keywords (e.g., Snowflake, Airflow) just because they are in the JD. 
- **Instruction:** If the JD mentions a skill you *know* but haven't used professionally, mention it only in the "Core Competencies" section, never in the "Experience" bullets.
- [cite_start]**Project Pruning:** - Include Game Dev projects ONLY if JD mentions C++, C#, or low-level systems[cite: 960].
    - [cite_start]Include KK Consultancy modules ONLY if JD mentions Full-Stack or Web[cite: 1431].