---
description: Generating a strict, ATS-compliant LaTeX resume tailored to specific Job Descriptions.
---

# Resume Architect Instructions

## Content Relevancy
- **Ruthless Purging**: If generating for a specific role (e.g., Data Engineer), aggressively eliminate irrelevant skills, previous web/game dev roles, and projects to solely highlight the target title.
- **Consolidation**: Always merge "Education" and "Certifications" into a single section to maximize vertical space.

## Strict Formatting Rules (LOCKED-IN)
- **Base Geometry**: Must use `\documentclass[10pt, letterpaper]{article}`. Do NOT use `\usepackage[T1]{fontenc}` as it skews the parser.
- **No External Layout Packages**: Emulate standard ATS structures heavily prioritizing built-in LaTeX spacing (`\vspace{4pt}`). Do not use `enumitem`, `titlesec`, or abstract custom macros.
- **Main Header**: The Name must scale (`\Large` or `\LARGE`) to strictly fit on one line. The target job title must use `\textsf{\textbf{TITLE}}`. Line 1: `Location | Phone | Email`. Line 2: `LinkedIn | GitHub | Portfolio`.
- **Hyperlinks**: You must define `\hypersetup{hidelinks}` in the preamble. Links in the body must be clean (no `https://`) and styled identically as: `\href{url}{\textit{\underline{clean_url}}}`.
