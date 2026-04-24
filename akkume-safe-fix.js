(function () {
  const PPT_URL = "/AKKUME_QBR_Financial_Case.pptx";
  const BRIEF_URL = "https://akkume-site-9y25yj6o3-akkume-sites-projects.vercel.app/#";

  function t(el) {
    return (el?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function nav(target) {
    if (typeof window.navigate === "function") window.navigate(target);
  }

  function scrollSupport() {
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    const h = headings.find(x => {
      const s = t(x).toLowerCase();
      return s.includes("sign") && s.includes("support");
    });
    if (h) h.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goSupport(e) {
    e?.preventDefault();
    nav("proposal");
    setTimeout(scrollSupport, 200);
    return false;
  }

  function goBrief(e) {
    e?.preventDefault();
    nav("briefing");
    return false;
  }

  function patch() {
    let firstStrategy = false;

    document.querySelectorAll("a,button").forEach(el => {
      const text = t(el);

      if (text === "Support the Pilot") {
        el.href = "#";
        el.onclick = goSupport;
      }

      if (text === "Sign to Support" || text === "Sign in to Support" || text === "Sign & Support") {
        el.href = "#";
        el.onclick = goSupport;
      }

      if (text === "Read the Briefing" || text === "Read Briefing") {
        el.href = "#";
        el.onclick = goBrief;
      }

      if (text === "Read full proposal" || text === "Read the full proposal" || text === "Read Full Proposal") {
        el.style.display = "none";
      }

      if (text === "Download the Briefing" || text === "Download Briefing") {
        el.textContent = "Download the Brief";
        el.href = PPT_URL;
        el.style.width = "100%";
        el.style.justifyContent = "center";
        el.onclick = function(e) {
          e.preventDefault();
          window.location.href = PPT_URL;
          return false;
        };
      }

      if (text.includes("Strategy · May 2026 Pilot Launch") && !firstStrategy) {
        firstStrategy = true;
        el.textContent = "Read Brief";
        el.href = BRIEF_URL;
        el.style.background = "#475569";
        el.style.borderColor = "#475569";
        el.style.color = "#fff";
        el.onclick = function(e) {
          e.preventDefault();
          window.open(BRIEF_URL, "_blank", "noopener,noreferrer");
          return false;
        };
      }
    });

    const dataRoom =
      document.getElementById("tab-contact") ||
      document.getElementById("tab-data-room") ||
      document.getElementById("data-room");

    if (dataRoom && !document.getElementById("akkume-financial-case-ppt")) {
      const card = document.createElement("div");
      card.id = "akkume-financial-case-ppt";
      card.style.marginTop = "24px";
      card.style.padding = "20px";
      card.style.border = "1px solid rgba(148,163,184,.35)";
      card.style.borderRadius = "18px";
      card.innerHTML = `
        <h3>Q-BR Financial Case</h3>
        <p>Download the investor/lender deck: <strong>AKKUME_QBR_Financial_Case.pptx</strong></p>
        <a href="${PPT_URL}" style="display:inline-flex;width:100%;justify-content:center;box-sizing:border-box;padding:12px 16px;border-radius:12px;background:#475569;color:#fff;text-decoration:none;font-weight:700;">Download the Financial Case</a>
      `;
      dataRoom.appendChild(card);
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      n.nodeValue = n.nodeValue
        .replace(/DigiDow/gi, "Akkume")
        .replace(/Home\s*&\s*HODL/gi, "Qualified Bitcoin Reserve")
        .replace(/HomeHODL/gi, "Qualified Bitcoin Reserve");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patch);
  } else {
    patch();
  }
})();
