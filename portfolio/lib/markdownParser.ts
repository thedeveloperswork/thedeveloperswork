import fs from 'fs';
import path from 'path';

export interface Profile {
    name: string;
    metadata: Record<string, string>;
    digitalFootprint: Record<string, string>;
    summary: string;
    technicalArsenal: Record<string, string[]>;
}

export interface Experience {
    company: string;
    client?: string;
    role: string;
    location: string;
    dates: string;
    bullets: string[];
}

export interface Project {
    title: string;
    technologies: string;
    repository?: string;
    timeline: string;
    bullets: string[];
}

export interface Education {
    degree: string;
    institution: string;
    cgpa: string;
    dates: string;
    duration?: string;
    timeline?: string;
    certifications: string[];
    training: string[];
    development: string[];
}

const assetsDir = path.join(process.cwd(), '../assets');

export function getProfile(): Profile {
    const filePath = path.join(assetsDir, '01_profile.md');
    const fileContent = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

    const lines = fileContent.split('\n');
    const profile: Profile = { name: '', metadata: {}, digitalFootprint: {}, summary: '', technicalArsenal: {} };

    let currentSection = '';
    let currentArsenalCategory = '';

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('# ')) {
            profile.name = line.replace('# ', '');
        } else if (line.startsWith('## ')) {
            currentSection = line;
        } else if (line !== '') {
            if (currentSection.includes('CONTACT') && line.startsWith('* **')) {
                const parts = line.replace('* **', '').split(':** ');
                if (parts.length > 1) profile.metadata[parts[0]] = parts[1];
            } else if (currentSection.includes('DIGITAL') && line.startsWith('* **')) {
                const parts = line.replace('* **', '').split(':** ');
                if (parts.length > 1) {
                    profile.digitalFootprint[parts[0]] = parts[1]?.match(/\[(.*?)\]/)?.[1] || parts[1];
                }
            } else if (currentSection.includes('SUMMARY') && !line.startsWith('>')) {
                profile.summary += line + '\n';
            } else if (currentSection.includes('TECHNICAL') && !line.startsWith('>')) {
                if (line.startsWith('**') && line.endsWith('**')) {
                    currentArsenalCategory = line.replace(/\*\*/g, '');
                    profile.technicalArsenal[currentArsenalCategory] = [];
                } else if (line.startsWith('* ')) {
                    if (currentArsenalCategory) {
                        profile.technicalArsenal[currentArsenalCategory].push(line.replace('* ', ''));
                    }
                }
            }
        }
    }
    return profile;
}

export function getExperience(): Experience[] {
    const filePath = path.join(assetsDir, '02_experience.md');
    const fileContent = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const sections = fileContent.split('\n\n').slice(1);

    const experiences: Experience[] = [];

    sections.forEach(section => {
        const lines = section.split('\n').filter(Boolean);
        if (lines.length === 0) return;

        const headerLine = lines[0];
        if (!headerLine.startsWith('**')) return;

        const [companyPart, rolePart] = headerLine.split('|').map(s => s.trim());
        const companyStr = companyPart.replace(/\*\*/g, '').trim();
        let company = companyStr;
        let client = undefined;
        if (companyStr.includes('(Client:')) {
            company = companyStr.split('(Client:')[0].trim();
            client = companyStr.split('(Client:')[1].replace(')', '').trim();
        }
        const role = rolePart ? rolePart.replace(/\*/g, '').trim() : '';

        const locationDateLine = lines[1] || '';
        const locationSplit = locationDateLine.split('|');
        const location = locationSplit[0] ? locationSplit[0].trim() : '';
        const dates = locationSplit.length > 1 ? locationSplit[1].trim() : '';

        const bullets = lines.slice(2).map(l => l.replace(/^\*\s*/, '').trim());

        experiences.push({ company, client, role, location, dates, bullets });
    });

    return experiences;
}

export function getProjects(): Project[] {
    const filePath = path.join(assetsDir, '03_projects.md');
    const fileContent = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const sections = fileContent.split('\n\n').slice(1);

    const projects: Project[] = [];

    sections.forEach(section => {
        const lines = section.split('\n').filter(Boolean);
        if (!lines[0] || !lines[0].startsWith('**Title:**')) return;

        const project: any = { bullets: [] };

        lines.forEach(line => {
            if (line.startsWith('**Title:**')) project.title = line.replace('**Title:**', '').trim();
            else if (line.startsWith('**Technologies:**')) project.technologies = line.replace('**Technologies:**', '').trim();
            else if (line.startsWith('**Repository:**')) {
                const repoStr = line.replace('**Repository:**', '').trim();
                project.repository = repoStr.match(/\[(.*?)\]/)?.[1] || repoStr;
            }
            else if (line.startsWith('**Timeline:**')) project.timeline = line.replace('**Timeline:**', '').trim();
            else if (line.startsWith('* ')) project.bullets.push(line.replace('* ', '').trim());
        });

        projects.push(project as Project);
    });

    return projects;
}

export function getEducation(): Education {
    const filePath = path.join(assetsDir, '04_education.md');
    const fileContent = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

    const edu: Education = { degree: '', institution: '', cgpa: '', dates: '', certifications: [], training: [], development: [] };
    let currentSection = '';

    fileContent.split('\n').forEach(line => {
        line = line.trim();
        if (line.startsWith('## ')) currentSection = line.replace('## ', '').split(' ')[0];
        else if (line === '') return;
        else if (currentSection === 'DEGREE') {
            if (line.startsWith('### ')) {
                edu.degree = line.replace('### ', '').trim();
            } else if (line.startsWith('* **Field**:')) {
                edu.degree += ' in ' + line.replace('* **Field**:', '').trim();
            } else if (line.startsWith('* **University**:')) {
                const uni = line.replace('* **University**:', '').trim();
                edu.institution = edu.institution ? `${edu.institution} (${uni})` : uni;
            } else if (line.startsWith('* **College**:')) {
                const college = line.replace('* **College**:', '').trim();
                edu.institution = edu.institution ? `${college} - ${edu.institution}` : college;
            } else if (line.startsWith('* **CGPA**:')) {
                edu.cgpa = line.replace('* **CGPA**:', '').trim();
            } else if (line.startsWith('* **Duration:**')) {
                edu.duration = line.replace('* **Duration:**', '').trim();
            } else if (line.startsWith('* **Timeline:**')) {
                edu.timeline = line.replace('* **Timeline:**', '').trim();
                edu.dates = edu.timeline; // fallback mapping
            }
        } else if (currentSection.includes('OFFICIAL') && line.startsWith('* ')) {
            edu.certifications.push(line.replace('* ', '').replace(/\*\*/g, ''));
        } else if (currentSection.includes('TRAINING')) {
            if (line.startsWith('### ')) {
                edu.training.push(line.replace('### ', '').trim());
            } else if (line.startsWith('* ')) {
                if (edu.training.length > 0) {
                    edu.training[edu.training.length - 1] += ' | ' + line.replace('* ', '').replace(/\*\*/g, '').trim();
                } else {
                    edu.training.push(line.replace('* ', '').replace(/\*\*/g, '').trim());
                }
            }
        } else if (currentSection.includes('PROFESSIONAL') && line.startsWith('* ')) {
            edu.development.push(line.replace('* ', '').replace(/\*\*/g, ''));
        }
    });

    return edu;
}
