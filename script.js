(function () {
  const config = window.PORTFOLIO_CONFIG || {};
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (config.name) {
    document.title = `${config.name} — Design with a point of view`;
    document.querySelectorAll(".wordmark").forEach((mark) => {
      mark.innerHTML = `${config.name.charAt(0)}<span>.</span>`;
      mark.setAttribute("aria-label", `${config.name}, home`);
    });
    document.querySelector(".site-footer small").textContent = `© ${new Date().getFullYear()} ${config.name}`;
    const years = config.experienceYears ? `${config.experienceYears}+` : "several";
    document.querySelector(".about-lede").textContent = `I’m ${config.name}, a graphics designer and video editor with ${years} years of experience shaping ideas into clear, memorable visuals.`;
  }

  if (config.location) {
    const locationLine = document.querySelector(".hero-foot > span");
    if (locationLine) locationLine.textContent = `Based in ${config.location} · Working worldwide`;
  }

  if (config.email) {
    const emailLink = document.getElementById("email-link");
    if (emailLink) emailLink.href = `mailto:${config.email}`;
    const footerEmail = document.querySelector('.site-footer a[href^="mailto:"]');
    if (footerEmail) footerEmail.href = `mailto:${config.email}`;
  }

  const projectGrid = document.getElementById("project-grid");
  if (projectGrid && Array.isArray(config.projects)) {
    const cardStyles = ["project-one", "project-two", "project-three", "project-four"];
    const makeText = (tag, className, value) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      element.textContent = value;
      return element;
    };

    config.projects.forEach((project, index) => {
      if (!project || !/^https:\/\/www\.behance\.net\/gallery\//i.test(project.url || "")) return;

      const card = document.createElement("a");
      card.className = `project-card ${cardStyles[index % cardStyles.length]}`;
      card.href = project.url;
      card.target = "_blank";
      card.rel = "noopener";
      card.setAttribute("aria-label", `${project.title}, view project on Behance`);

      const image = document.createElement("div");
      image.className = "project-image project-cover";
      image.setAttribute("aria-hidden", "true");
      const projectNumber = String(index + 1).padStart(2, "0");
      image.append(makeText("span", "project-count", `${projectNumber} / ${project.category}`));
      const coverTitle = document.createElement("div");
      coverTitle.className = "cover-title";
      (project.coverLines || [project.title]).forEach((line) => {
        coverTitle.append(makeText("span", "", line));
      });
      image.append(coverTitle, makeText("span", "cover-link", "BEHANCE PROJECT ↗"));

      const meta = document.createElement("div");
      meta.className = "project-meta";
      const details = document.createElement("div");
      details.append(makeText("h3", "", project.title), makeText("p", "", "View project on Behance"));
      meta.append(details, makeText("span", "project-arrow", "↗"));
      card.append(image, meta);
      projectGrid.append(card);
    });
  }

  const profile = (config.behanceProfileUrl || "").trim();
  const validBehanceUrl = /^https:\/\/([\w-]+\.)?behance\.net\//i.test(profile);
  const links = ["behance-link", "contact-behance", "footer-behance"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  links.forEach((link) => {
    if (validBehanceUrl) {
      link.href = profile;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });
  const callout = document.getElementById("behance-callout");
  if (callout && !validBehanceUrl) callout.hidden = true;
})();
