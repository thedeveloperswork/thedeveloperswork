---
description: Updating and Maintaining the GitHub Profile README
---

# GitHub Profile README Maintenance

When asked to update or maintain the GitHub Profile README, follow this workflow:

1. **Target File:** The main profile README is located at `README.md` at the root of the project.
2. **Rules:** Always consult `.agent/skills/readme/RULES.md` for strict formatting and content rules before making any modifications.
3. **Automated Workflows:** 
   - The repository uses a GitHub Action defined in `.github/workflows/snake.yml` to generate a contribution snake animation. 
   - It outputs to the `output` branch. The README must reference this generated `snake.svg` correctly.
4. **Information Sources:** 
   - Before making any informational updates, strictly refer to the source of truth documents:
     - `assets/01_profile.md` (Contains active/past technical skills, contact info, domains)
     - `assets/02_experience.md` (Professional history)
     - `assets/03_projects.md` (Project portfolio)
     - `assets/04_education.md` (Education and certifications)
5. **Skills Maintenance:** 
   - When maintaining the `<!-- START_SKILLS -->` section manually, you MUST only add **active skills**, as denoted by the `[Active ...]` tags within `assets/01_profile.md` (e.g., PySpark, Databricks, AWS, Python, SQL, Docker).
   - Ensure badges strictly use the `img.shields.io` format with `style=for-the-badge`.
6. **Verification:** After making changes, ensure no broken image links or unclosed HTML tags exist.
