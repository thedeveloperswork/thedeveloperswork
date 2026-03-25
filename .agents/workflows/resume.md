---
description: Generating strict, ATS-compliant vanilla LaTeX resumes from master assets.
---

# Resume Architect Workflow

## 🏗️ Pre-flight Cleanup
- **Purge Artifacts**: Delete Node.js/React artifacts (`package.json`, `package-lock.json`, `dist/`) if the pipeline is purely LaTeX-based.
- **Clear Builds**: Aggressively remove intermediate LaTeX files (`.aux`, `.log`, `.out`, etc.).

## 🔐 Strict Formatting (LOCKED-IN)
- **Base**: Use `\documentclass[10pt, letterpaper]{article}`. No `fontenc`.
- **Vanilla Layout**: NO `titlesec`, `enumitem`, `bookmark`, or `titlesec`. Follow this exact setup:
  ```latex
  \newcommand{\resumesection}[1]{
    \vspace{8pt}\noindent\textbf{\large\uppercase{#1}}\\\vspace{-8pt}\hrule\vspace{6pt}
  }
  \begin{itemize} \setlength{\itemsep}{1pt} \item ... \end{itemize}
  ```
- **Header**: Single-line Name (`\Large` or `\LARGE`). Title: `\textsf{\textbf{TITLE}}`.
- **Links**: `\hypersetup{hidelinks}`. Clean URLs: `\href{url}{\textit{\underline{clean_url}}}`.

## 🔄 Content Alignment
- **Master vs. Target**: Use `source.tex` as the immutable master vault (character-focused). Use `resume.tex` as the targeted scratchpad for specific roles.
- **Tailoring**: In `resume.tex`, aggressively purge non-relevant roles/projects. Compress to exactly 1 page for applications.
- **Consolidation**: Merge "Education" and "Certifications" sections unless space is abundant.
