# 🏗️ Automated Resume Pipeline

This repository serves as the Master Asset for my professional resume. It is built using LaTeX to guarantee a 100% ATS-compliant, machine-readable, single-column PDF output.

## ⚙️ The Workflow (Tailoring for Applications)

Do not send the master resume. The master file contains my entire work history, including early career internships and versatile projects (Game Development, Freelance Web Dev). 

**To apply for a specific role:**
1. Create a new branch for the target company: `git checkout -b apply/faang-data-engineer`
2. Open `resume.tex`.
3. **Purge & Tailor:** Comment out (`%`) any projects or roles that do not directly serve the target Job Description (JD). Compress the document to exactly 1 page.
4. Inject specific keywords from the JD into the Summary and bullet points.
5. Commit and push the branch.
6. The GitHub Actions CI/CD pipeline will automatically compile a fresh `resume.pdf` in the Actions tab.

## 🛠️ Infrastructure
- **Compiler:** `pdflatex`
- **Automation:** GitHub Actions (`.github/workflows/build-resume.yml`)
- **Format:** Single-column, no tables, no minipages (Strict ATS adherence).