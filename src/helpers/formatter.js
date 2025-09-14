import chalk from "chalk";
import process from "process";

// ---------- Common Helpers ----------
function renderBullets(items) {
  return items.map(i => `  • ${i}`).join("\n");
}

function renderSection(title, content) {
  const line = "-".repeat(process.stdout.columns - 8);
  return `${chalk.bold(title)}\n${chalk.gray(line)}\n${content}`;
}

function joinBlocks(blocks) {
  return blocks.join("\n\n");
}

// ---------- Resume Formatters ----------
function formatExperience(experiences) {
  return experiences
    .map(exp => {
      const header = `${chalk.bold(exp.title)} ${chalk.dim("|")} ${chalk.italic(exp.company)} ${chalk.dim("|")} ${exp.period}`;
      return `${header}\n${renderBullets(exp.bullets)}`;
    })
    .join("\n\n");
}

function formatEducation(education) {
  return education
    .map(
      edu =>
        `${chalk.bold(edu.degree)} — ${edu.institution} ${chalk.dim("|")} ${edu.period}\n${edu.gpa}`
    )
    .join("\n\n");
}

function formatSkills(skills) {
  return skills
    .map(skill => `${chalk.bold(skill.category)}: ${skill.items.join(", ")}`)
    .join("\n");
}

function formatProjects(projects) {
  return projects
    .map(proj => {
      const header = `${chalk.bold(proj.name)} ${chalk.dim("|")} ${proj.stack.join(", ")}`;
      return `${header}\n${renderBullets(proj.bullets)}`;
    })
    .join("\n\n");
}

// ---------- Master Formatter ----------
export function formatResume(resume, type = "full") {
  const headerBlock = [
    chalk.bold.underline(resume.name),
    `${resume.contact.location} ${chalk.dim("|")} ${resume.contact.email} ${chalk.dim("|")} ${resume.contact.phone}`,
    `${chalk.cyan(resume.contact.linkedin)} ${chalk.dim("|")} ${chalk.cyan(resume.contact.github)}`
  ].join("\n");

  const summaryBlock = renderSection("Summary", resume.summary);
  const expBlock = renderSection("Experience", formatExperience(resume.experience));
  const eduBlock = renderSection("Education", formatEducation(resume.education));
  const skillsBlock = renderSection("Technical Skills", formatSkills(resume.skills));
  const projBlock = renderSection("Projects", formatProjects(resume.projects));

  if (type === "header") {
    return joinBlocks([headerBlock]);
  } else if (type === "body") {
    return joinBlocks([summaryBlock, expBlock, eduBlock, skillsBlock, projBlock]);
  }

  return joinBlocks([headerBlock, summaryBlock, expBlock, eduBlock, skillsBlock, projBlock]);
}
