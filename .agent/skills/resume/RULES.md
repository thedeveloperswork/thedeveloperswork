# ⚖️ ATS & Marketability Scoring Rules

## 1. THE ATS COMPLIANCE PROTOCOL (SCORING: 100/100)
* **Standard Headers:** Use only standard section titles (Summary, Experience, Technical Projects, Education, Official Certifications).
* **Clean URL Display:** When showing links (LinkedIn, GitHub, Portfolio), display simplified visible URLs without prefixes like "https://www." or "https://" to improve both visual appeal and ATS recognition (e.g., `linkedin.com/in/thedeveloperswork`), while maintaining active hyperlinks.
* **Clean Formatting:** Use standard LaTeX fonts and avoid complex tables, graphics, or multi-column layouts that disrupt the left-to-right parsing flow. **CRITICAL: NEVER import custom fonts (e.g., `lato`, `helvet`) when generating a resume based on a JD. strictly use the default standard LaTeX font.**

## 2. THE IMPACT QUANTIFICATION RULES (XYZ FORMULA)
* **Metric Requirement:** Every bullet point in 'Experience' must contain a hard metric (%, $, time, TB, or count) followed by the specific technical methodology used to achieve it.
* **Structure:** [Action Verb] + [Quantifiable Result] + [Technical Methodology].
* **Thresholds:**
    - Performance: e.g., "Slashed execution time by 60%".
    - Quality: e.g., "Achieved 0% defect injection rate".
    - Scale: e.g., "Processed multi-terabyte datasets".

## 3. LINGUISTIC DIVERSITY & VERB REPETITION
* **Anti-Repetition:** Do not use the same action verb more than twice in the entire document to avoid appearing to have a low vocabulary level. Swap instances of repeated verbs for technical synonyms like "Architected," "Orchestrated," and "Pioneered".
* **Synonym Mapping:** - Instead of "Engineered": Use "Architected," "Systems-designed," or "Developed."
    - Instead of "Measured": Use "Quantified," "Benchmarked," "Validated," or "Assessed."

## 4. PROFESSIONAL BRANDING STANDARDS
* **Email Hygiene:** Use a professional-grade personal email consisting of variations of your name or a professional domain.
* **Title Alignment:** Ensure the resume headline matches the target job title to increase relevance scores.

## 5. SECTION SPECIFIC OPTIMIZATIONS
* **Summary:** Must be a bridge between your unique background (Systems/Game Dev) and your current specialty (Data Engineering).
* **Technical Arsenal:** Group skills by domain (Processing, Cloud, Architecture) and indicate recency/timestamp to help recruiters identify current expertise.
* **Projects:** Every project entry must include a direct link to the GitHub repository for "Proof of Work" verification.
* **Section Merging:** Combine Education and Certifications into a single section to save space, allowing your heavy-hitting experience section more vertical room to breathe.

## 6. LAYOUT AND STRUCTURAL CONVENTIONS
* **Layout & Geometry:** The resume MUST use the following exact packages and spacing overrides based on the validated ATS template:
  - Base Font: `\documentclass[10pt, letterpaper]{article}` (Must strictly use 10pt to match the template perfectly. Do not use `\usepackage[T1]{fontenc}` as it slightly alters the computer modern OT1 glyph sizes). NO `\small` tags in the body text.
  - Margins: `\usepackage[margin=0.75in]{geometry}` for strict margins.
  - Main Header (LOCKED IN): The Name MUST fit on a single line (scale down to `\LARGE` or `\huge` if necessary, e.g., `{\LARGE \textbf{NAME}}`). The Title MUST use a distinct sans-serif font (e.g., `\textsf{\textbf{TITLE}}`).
  - Contact Info Layout: Line 1 MUST be strictly `Location | Phone | Email`. Line 2 MUST be strictly `LinkedIn | GitHub | Portfolio`.
  - Side Headings (LOCKED IN): Must use exactly `\titleformat{\section}{\large\bfseries\uppercase}{}{0em}{}[\titlerule]` and `\titlespacing*{\section}{0pt}{1ex}{1ex}`. Do NOT alter these.
* **Section Item Formatting:** Do NOT use custom abstract command macros (like `\resumeItem` or `\resumeSubHeadingListStart`). Instead, hardcode standard elements:
  - Jobs/Projects Header: `\noindent \textbf{Company} \hfill Date \\ \textit{Title} \hfill Location`
  - Bullet Points: `\begin{itemize}[leftmargin=0.25in, itemsep=1pt]` and explicit `\item` tags.
  - Section Spacing: Use explicitly spaced `\vspace{4pt}` or `\vspace{2pt}` between experience blocks.
* **Link Formatting (LOCKED IN):** ALWAYS use `\hypersetup{hidelinks}` in the preamble (after `\usepackage{bookmark}`) to prevent ugly cyan boxes. Standard links (like in the header) AND Repo links must strictly be styled as italicized and underlined text inside the href: `\href{<url>}{\textit{\underline{link text}}}`. Do NOT use cyan boxes.
* **Project Links:** Explicitly write out the simplified URL on a new line directly under the project heading, formatted as `\textit{Repo: }\href{<url>}{\textit{\underline{repo\_link\_text}}}`.
* **Taglines/Titles:** Do not add specific tag lines or titles unless a specific Job Description (JD) is provided. When provided, ensure tags match both the profile and the JD.
* **Relevancy Filtering (Ruthless Purging):** If a specific JD/Role is provided (e.g., "Senior Data Engineer"), you must aggressively purge all irrelevant skills, experiences, courses, and certifications.
    - Example: Do not include C++, C#, Game Development, or front-end frameworks (React/PHP) for a Data Engineering role. 
    - Every single line in the Technical Arsenal, Experience, and Education sections must directly support the target title.
* **Chronological Ordering:** Always order projects, experience, and education in descending order based on their timelines (most recent first).