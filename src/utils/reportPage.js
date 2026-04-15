export function resolvePagePath(pageId) {
  return pageId === "index" ? "/" : `/pages/${pageId}`;
}

export function preparePageForRender(page) {
  let counter = 0;
  const tocItems = [];

  const sections = page.sections.map((section) => {
    const nextSection = { ...section };

    if (section.heading) {
      nextSection.anchorId = createAnchorId(section.heading, ++counter);
      tocItems.push({ id: nextSection.anchorId, title: section.heading, level: 2 });
    }

    if (section.type === "problemList") {
      nextSection.problems = section.problems.map((problem) => {
        const nextProblem = { ...problem, anchorId: createAnchorId(problem.title, ++counter) };
        tocItems.push({ id: nextProblem.anchorId, title: problem.title, level: 3 });
        return nextProblem;
      });
    }

    return nextSection;
  });

  return { ...page, sections, tocItems };
}

function createAnchorId(title, index) {
  const normalized = title
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${normalized || "section"}-${index}`;
}
