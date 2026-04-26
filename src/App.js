import { useMemo, useState } from "react";
import "./App.css";

const DOMAIN_PROFILES = {
  "Computer Science": {
    label: "Computer Science / IT",
    categories: [
      {
        name: "Programming foundation",
        keywords: ["python", "java", "c++", "javascript", "typescript", "c#", "programming"],
        why: "A clear primary language makes projects, interviews, and internships easier to evaluate.",
        actions: [
          "Pick one main language and build 3 small command-line projects.",
          "Practice arrays, strings, recursion, sorting, and basic OOP.",
          "Add clean GitHub links with README files for each project."
        ],
        proof: "A GitHub repository with problem notes and one polished mini project."
      },
      {
        name: "Data structures and algorithms",
        keywords: ["data structures", "algorithms", "dsa", "leetcode", "hashmap", "tree", "graph", "dynamic programming"],
        why: "DSA is still a common filter for software roles and technical interviews.",
        actions: [
          "Solve 5 easy and 3 medium problems every week.",
          "Write short notes for patterns like two pointers, sliding window, stack, and BFS.",
          "Mention only meaningful progress, not just platform names."
        ],
        proof: "A short DSA practice log with solved patterns and links."
      },
      {
        name: "Web or app development",
        keywords: ["react", "node", "express", "html", "css", "api", "frontend", "backend", "mongodb", "sql"],
        why: "Recruiters look for working software, not only course names.",
        actions: [
          "Build one complete CRUD app with authentication and a database.",
          "Deploy it and add screenshots, features, and tech stack to the README.",
          "Keep the UI simple, responsive, and usable."
        ],
        proof: "A deployed app link plus source code."
      },
      {
        name: "Database basics",
        keywords: ["sql", "mysql", "postgresql", "database", "dbms", "mongodb", "firebase"],
        why: "Most useful student projects need reliable data storage and queries.",
        actions: [
          "Learn joins, indexes, normalization, and simple schema design.",
          "Use a real database in your next project.",
          "Add sample queries or schema notes to the project README."
        ],
        proof: "A project with tables or collections explained clearly."
      },
      {
        name: "Internship-ready project depth",
        keywords: ["internship", "project", "deployed", "github", "portfolio", "open source", "hackathon"],
        why: "A stronger CV shows evidence: shipped work, collaboration, and measurable outcomes.",
        actions: [
          "Turn one project into a finished case study.",
          "Add problem statement, user flow, screenshots, and what you personally built.",
          "Include metrics such as users tested, speed improved, or bugs fixed."
        ],
        proof: "One project case study that looks complete and honest."
      }
    ]
  },
  "Artificial Intelligence / Data Science": {
    label: "AI / Data Science",
    categories: [
      {
        name: "Python and notebooks",
        keywords: ["python", "jupyter", "pandas", "numpy", "matplotlib", "seaborn"],
        why: "Python notebooks are the base layer for most AI and data work.",
        actions: [
          "Practice data cleaning, grouping, plotting, and feature creation.",
          "Rebuild one public dataset analysis from scratch.",
          "Explain each notebook like a story: question, method, result."
        ],
        proof: "A clean notebook with charts and written observations."
      },
      {
        name: "Machine learning basics",
        keywords: ["machine learning", "ml", "regression", "classification", "clustering", "scikit", "sklearn", "model"],
        why: "A CV is stronger when it shows model choice, evaluation, and limitations.",
        actions: [
          "Build classification and regression projects using scikit-learn.",
          "Compare at least two models and report metrics.",
          "Write what the model gets wrong and how you would improve it."
        ],
        proof: "A model report with accuracy, precision, recall, or RMSE."
      },
      {
        name: "Statistics and evaluation",
        keywords: ["statistics", "probability", "hypothesis", "precision", "recall", "f1", "confusion matrix", "auc"],
        why: "Metrics help you defend your project decisions in reviews and interviews.",
        actions: [
          "Revise probability, distributions, correlation, and train-test split.",
          "Use confusion matrices and error analysis in projects.",
          "Avoid saying a model is good without a metric."
        ],
        proof: "A project section that explains evaluation in plain language."
      },
      {
        name: "Deep learning or NLP exposure",
        keywords: ["deep learning", "tensorflow", "pytorch", "neural", "cnn", "rnn", "nlp", "transformer"],
        why: "One focused advanced project can make an AI profile stand out.",
        actions: [
          "Choose one area: computer vision, NLP, forecasting, or recommendation.",
          "Train or fine-tune a small model and document the data pipeline.",
          "Keep the scope small enough to finish."
        ],
        proof: "A reproducible notebook or app demo for one advanced model."
      },
      {
        name: "Portfolio evidence",
        keywords: ["github", "kaggle", "dashboard", "streamlit", "project", "portfolio", "dataset"],
        why: "AI resumes need visible work because claims are easy to overstate.",
        actions: [
          "Publish 2 polished notebooks and 1 simple deployed demo.",
          "Write the business problem and the model result for each project.",
          "Link code, dataset source, and screenshots."
        ],
        proof: "A portfolio page or GitHub profile with pinned AI projects."
      }
    ]
  },
  "Electronics and Communication": {
    label: "Electronics and Communication",
    categories: [
      {
        name: "Circuit and signals foundation",
        keywords: ["circuit", "signals", "network analysis", "analog", "digital", "filter", "communication"],
        why: "Core ECE roles expect comfort with circuits, signals, and communication basics.",
        actions: [
          "Revise network theorems, filters, modulation, and sampling.",
          "Create short notes with solved examples.",
          "Connect theory to one practical lab-style project."
        ],
        proof: "A circuit or signal analysis mini report."
      },
      {
        name: "Embedded systems",
        keywords: ["arduino", "raspberry pi", "microcontroller", "embedded", "iot", "sensor", "esp32"],
        why: "Embedded projects show hands-on hardware ability.",
        actions: [
          "Build a sensor-based project using Arduino or ESP32.",
          "Document circuit diagram, components, code, and test results.",
          "Add a short demo video link if possible."
        ],
        proof: "A working prototype with code and wiring diagram."
      },
      {
        name: "Simulation tools",
        keywords: ["matlab", "simulink", "proteus", "multisim", "ltspice", "cadence", "simulation"],
        why: "Tools help you validate designs and show industry-style workflow.",
        actions: [
          "Simulate one circuit and one signal-processing problem.",
          "Capture screenshots and explain the result.",
          "Compare expected and observed output."
        ],
        proof: "A simulation report with screenshots."
      },
      {
        name: "PCB or hardware design",
        keywords: ["pcb", "kicad", "altium", "eagle", "schematic", "layout"],
        why: "PCB exposure separates project builders from theory-only profiles.",
        actions: [
          "Design a small PCB for a sensor, regulator, or microcontroller board.",
          "Export schematic, layout, and BOM.",
          "Add design decisions and constraints to your CV project notes."
        ],
        proof: "PCB files and rendered board screenshots."
      },
      {
        name: "Project evidence",
        keywords: ["project", "internship", "prototype", "paper", "hackathon", "github"],
        why: "ECE profiles improve quickly when practical work is visible.",
        actions: [
          "Polish one hardware or communication project end to end.",
          "Add components used, your role, result, and limitations.",
          "Prepare a short explanation for viva or interview questions."
        ],
        proof: "A project write-up with photos, diagrams, and code."
      }
    ]
  },
  "Mechanical Engineering": {
    label: "Mechanical Engineering",
    categories: [
      {
        name: "CAD modeling",
        keywords: ["cad", "solidworks", "autocad", "catia", "fusion 360", "creo", "drawing"],
        why: "CAD is one of the clearest ways to show mechanical design skill.",
        actions: [
          "Model 5 parts and one small assembly.",
          "Create engineering drawings with dimensions and tolerances.",
          "Build a small portfolio PDF with renders and drawings."
        ],
        proof: "A CAD portfolio with part, assembly, and drawing views."
      },
      {
        name: "Analysis and simulation",
        keywords: ["ansys", "fea", "cfd", "simulation", "stress analysis", "thermal", "fluid"],
        why: "Simulation work shows that you can evaluate design decisions.",
        actions: [
          "Run one stress or thermal analysis on a simple part.",
          "Document boundary conditions and assumptions.",
          "Compare results with hand calculations where possible."
        ],
        proof: "A simulation report with setup, results, and conclusion."
      },
      {
        name: "Manufacturing basics",
        keywords: ["manufacturing", "cnc", "lathe", "welding", "3d printing", "machining", "gd&t"],
        why: "Design becomes stronger when you understand how parts are made.",
        actions: [
          "Learn common processes, tolerances, and material choices.",
          "Create one design-for-manufacturing note for a CAD project.",
          "Add workshop or fabrication experience clearly."
        ],
        proof: "A project note explaining process and material choices."
      },
      {
        name: "Core mechanical concepts",
        keywords: ["thermodynamics", "fluid mechanics", "som", "strength of materials", "machine design", "heat transfer"],
        why: "Core concepts help in technical interviews and project reasoning.",
        actions: [
          "Revise formulas through solved practical problems.",
          "Connect each concept to a project or lab example.",
          "Prepare short explanations for your strongest subjects."
        ],
        proof: "A notes page with solved examples and project links."
      },
      {
        name: "Project evidence",
        keywords: ["project", "prototype", "internship", "sae", "robotics", "design", "fabrication"],
        why: "Mechanical CVs become stronger when design, build, and testing are visible.",
        actions: [
          "Turn one project into a concise engineering case study.",
          "Add objective, design choices, calculations, testing, and result.",
          "Mention your exact contribution."
        ],
        proof: "A project case study with photos, CAD, and results."
      }
    ]
  },
  "Civil Engineering": {
    label: "Civil Engineering",
    categories: [
      {
        name: "Structural basics",
        keywords: ["structure", "rcc", "steel", "structural analysis", "load", "beam", "column"],
        why: "Structural concepts are central to many civil engineering roles.",
        actions: [
          "Revise beams, columns, load combinations, and design basics.",
          "Solve one small design example and document it.",
          "Connect calculations to drawings or software output."
        ],
        proof: "A short structural design example with assumptions."
      },
      {
        name: "Design and drafting tools",
        keywords: ["autocad", "revit", "staad", "etabs", "sketchup", "bim", "civil 3d"],
        why: "Tool fluency helps employers trust that you can contribute quickly.",
        actions: [
          "Create one building plan or model using AutoCAD, Revit, or STAAD.",
          "Export clean sheets and screenshots.",
          "Write what standards or assumptions you used."
        ],
        proof: "A drawing or model portfolio page."
      },
      {
        name: "Surveying and site exposure",
        keywords: ["surveying", "total station", "leveling", "site", "estimation", "quantity"],
        why: "Civil resumes improve when they show practical site understanding.",
        actions: [
          "Document any site visits, surveying practice, or estimation work.",
          "Learn basic quantity takeoff from drawings.",
          "Add tools, measurements, and outcome."
        ],
        proof: "A site or survey note with photos or sample calculations."
      },
      {
        name: "Materials and construction",
        keywords: ["concrete", "materials", "soil", "geotechnical", "transportation", "construction"],
        why: "Material and construction knowledge supports better project decisions.",
        actions: [
          "Revise concrete tests, soil tests, and construction methods.",
          "Prepare one lab report or case note neatly.",
          "Mention test results rather than only lab names."
        ],
        proof: "A lab or construction case note with values and conclusion."
      },
      {
        name: "Project evidence",
        keywords: ["project", "internship", "site visit", "report", "estimation", "planning"],
        why: "Evidence of real drawings, reports, or site work makes the CV more credible.",
        actions: [
          "Turn one civil project into a professional report.",
          "Add objective, method, drawings, quantities, result, and your role.",
          "Keep the language specific and measurable."
        ],
        proof: "A concise report or portfolio entry for one civil project."
      }
    ]
  },
  "Electrical Engineering": {
    label: "Electrical Engineering",
    categories: [
      {
        name: "Power systems foundation",
        keywords: ["power system", "transformer", "transmission", "distribution", "protection", "relay"],
        why: "Power fundamentals are central to many electrical engineering roles.",
        actions: [
          "Revise transformers, faults, protection, and load flow basics.",
          "Solve practical examples with diagrams.",
          "Relate the topic to one mini project or lab."
        ],
        proof: "A short power systems note with solved examples."
      },
      {
        name: "Machines and drives",
        keywords: ["motor", "generator", "machines", "drive", "vfd", "induction", "synchronous"],
        why: "Machines knowledge is useful in plant, automation, and maintenance roles.",
        actions: [
          "Study motor characteristics and control methods.",
          "Build or simulate a simple motor control circuit.",
          "Document ratings, circuit, and observed behavior."
        ],
        proof: "A motor control simulation or lab write-up."
      },
      {
        name: "Electrical tools and simulation",
        keywords: ["matlab", "simulink", "etap", "pscad", "proteus", "multisim", "simulation"],
        why: "Simulation tools help demonstrate practical analysis ability.",
        actions: [
          "Simulate one power or control problem.",
          "Write assumptions, input values, and results.",
          "Add screenshots to your project proof."
        ],
        proof: "A simulation report with clear outputs."
      },
      {
        name: "Control and automation",
        keywords: ["plc", "scada", "control system", "automation", "ladder", "pid", "sensor"],
        why: "Automation exposure opens stronger internship and entry-level options.",
        actions: [
          "Learn PLC ladder basics or control-system response basics.",
          "Create a small automation logic example.",
          "Explain inputs, outputs, and safety behavior."
        ],
        proof: "A PLC/control mini project screenshot or report."
      },
      {
        name: "Project evidence",
        keywords: ["project", "internship", "prototype", "panel", "wiring", "maintenance", "energy audit"],
        why: "Hands-on evidence makes an electrical CV much stronger than subject lists alone.",
        actions: [
          "Polish one project with circuit diagram, ratings, testing, and result.",
          "Mention your exact contribution and safety considerations.",
          "Prepare a short technical explanation."
        ],
        proof: "A project write-up with diagram and measured results."
      }
    ]
  }
};

const DOMAIN_OPTIONS = Object.keys(DOMAIN_PROFILES);

const starterMessages = [
  {
    sender: "bot",
    text: "Complete an assessment first. I will use the result to guide the next steps."
  }
];

function cleanText(value) {
  return value.toLowerCase().replace(/[^a-z0-9+#.\s]/g, " ");
}

function includesKeyword(text, keyword) {
  return text.includes(keyword.toLowerCase());
}

function buildAssessment(domain, cvText) {
  const profile = DOMAIN_PROFILES[domain];
  const clean = cleanText(cvText);
  const wordCount = cvText.trim().split(/\s+/).filter(Boolean).length;

  const categories = profile.categories.map((category) => {
    const matched = category.keywords.filter((keyword) => includesKeyword(clean, keyword));
    let status = "gap";

    if (matched.length >= 2) {
      status = "strong";
    } else if (matched.length === 1) {
      status = "developing";
    }

    return {
      ...category,
      matched,
      status
    };
  });

  const strong = categories.filter((category) => category.status === "strong");
  const developing = categories.filter((category) => category.status === "developing");
  const gaps = categories.filter((category) => category.status === "gap");
  const proofKeywords = ["github", "deployed", "internship", "project", "portfolio", "paper", "prototype", "report"];
  const proofCount = proofKeywords.filter((keyword) => includesKeyword(clean, keyword)).length;
  const categoryScore = Math.round(((strong.length * 2 + developing.length) / (categories.length * 2)) * 75);
  const proofScore = Math.min(15, proofCount * 4);
  const detailScore = Math.min(10, Math.floor(wordCount / 60) * 2);
  const score = Math.min(100, categoryScore + proofScore + detailScore);

  const sortedNeeds = [...gaps, ...developing].slice(0, 4);
  const recommendations = sortedNeeds.length > 0 ? sortedNeeds : categories.slice(0, 3);
  const topPriority = recommendations[0];

  let summary = "The profile has a starting point, but it needs clearer proof of skills and project outcomes.";
  if (score >= 70) {
    summary = "The profile already has useful signals. The next improvement is to make the work deeper, measurable, and easier to verify.";
  } else if (score >= 45) {
    summary = "The profile shows some direction. Focus now on 2 or 3 visible projects and stronger proof for the chosen domain.";
  }

  return {
    domain,
    profileLabel: profile.label,
    score,
    summary,
    categories,
    strong,
    developing,
    gaps,
    recommendations,
    topPriority,
    wordCount
  };
}

function decodePdfString(value) {
  return value
    .slice(1, -1)
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)));
}

function decodeHexPdfString(value) {
  const hex = value.replace(/\s/g, "");
  let output = "";

  for (let index = 0; index < hex.length - 1; index += 2) {
    const code = parseInt(hex.slice(index, index + 2), 16);
    if (Number.isFinite(code) && code >= 32 && code <= 126) {
      output += String.fromCharCode(code);
    } else {
      output += " ";
    }
  }

  return output;
}

async function readFileAsText(file) {
  if (!file) {
    return "";
  }

  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    const buffer = await file.arrayBuffer();
    const raw = new TextDecoder("latin1").decode(buffer);
    const literalMatches = raw.match(/\((?:\\.|[^\\)]){3,}\)/g) || [];
    const hexMatches = raw.match(/<([0-9a-fA-F\s]{12,})>/g) || [];
    const literalText = literalMatches.map(decodePdfString);
    const hexText = hexMatches.map((item) => decodeHexPdfString(item.slice(1, -1)));
    return [...literalText, ...hexText]
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/[^\x20-\x7E]/g, " ")
      .trim();
  }

  return file.text();
}

function responseForMessage(message, assessment) {
  if (!assessment) {
    return "Run the assessment first so I can guide you from your actual domain and skill gaps.";
  }

  const lower = message.toLowerCase();
  const first = assessment.topPriority;
  const second = assessment.recommendations[1];

  if (lower.includes("project")) {
    return `Start with ${first.name}. Build one small but complete project around it. Proof to add later: ${first.proof}`;
  }

  if (lower.includes("roadmap") || lower.includes("plan") || lower.includes("week")) {
    const next = second ? ` In week 3, move to ${second.name}.` : "";
    return `Two-week plan: spend week 1 learning and practicing ${first.name}. Spend week 2 building a small project or report that proves it.${next} Keep the scope small enough to finish.`;
  }

  if (lower.includes("cv") || lower.includes("resume")) {
    return `For the CV, add proof for ${first.name}: ${first.proof} Use bullets that say what you built, which tools you used, and what result you achieved.`;
  }

  if (lower.includes("interview")) {
    return `Prepare interview answers around ${first.name}. Be ready to explain the basics, one mistake you faced, how you fixed it, and what you would improve next.`;
  }

  if (lower.includes("certificate") || lower.includes("course")) {
    return `A course can help, but do not stop at the certificate. Pair it with a visible output: ${first.proof}`;
  }

  if (lower.includes("first") || lower.includes("start")) {
    return `Start with ${first.name}. First action: ${first.actions[0]} Then save proof as you go so it can become a CV bullet.`;
  }

  return `Your strongest next move is ${first.name}. ${first.why} Start with: ${first.actions[0]}`;
}

function App() {
  const [domain, setDomain] = useState(DOMAIN_OPTIONS[0]);
  const [inputMethod, setInputMethod] = useState("file");
  const [fileText, setFileText] = useState("");
  const [plainText, setPlainText] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [assessment, setAssessment] = useState(null);
  const [fileStatus, setFileStatus] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [chatInput, setChatInput] = useState("");

  const activeCvText = inputMethod === "file" ? fileText : plainText;
  const canAssess = useMemo(() => activeCvText.trim().length >= 40, [activeCvText]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileStatus(`Reading ${file.name}...`);

    try {
      const text = await readFileAsText(file);

      if (text.length < 80 && file.name.toLowerCase().endsWith(".pdf")) {
        setFileStatus("Only a little text could be read from this PDF. Switch to Plain text and paste the CV for a better result.");
      } else {
        setFileStatus(`${file.name} loaded.`);
      }

      setFileText(text);
    } catch (error) {
      setFileStatus("Could not read this file. Switch to Plain text and paste the CV instead.");
    }
  }

  function handleAssess(event) {
    event.preventDefault();

    if (!canAssess) {
      return;
    }

    const result = buildAssessment(domain, activeCvText);
    setAssessment(result);
    setMessages([
      {
        sender: "bot",
        text: `Assessment ready for ${result.profileLabel}. The first goal I would work on is ${result.topPriority.name}.`
      }
    ]);
  }

  function handleClear() {
    setFileText("");
    setPlainText("");
    setFileInputKey((current) => current + 1);
    setAssessment(null);
    setFileStatus("");
    setMessages(starterMessages);
    setChatInput("");
  }

  function handleChatSubmit(event) {
    event.preventDefault();

    const userMessage = chatInput.trim();

    if (!userMessage) {
      return;
    }

    const botMessage = responseForMessage(userMessage, assessment);
    setMessages((current) => [
      ...current,
      { sender: "user", text: userMessage },
      { sender: "bot", text: botMessage }
    ]);
    setChatInput("");
  }

  return (
    <main className="app-shell">
      <section className="app-heading">
        <div>
          <p className="eyebrow">Student CV Extendor</p>
          <h1>SkillGraphAI</h1>
        </div>
        <p className="heading-note">Simple domain assessment with a focused guidance chat.</p>
      </section>

      <section className="workspace-grid">
        <form className="input-panel" onSubmit={handleAssess}>
          <div className="field-group">
            <label htmlFor="domain">Engineering domain</label>
            <select id="domain" value={domain} onChange={(event) => setDomain(event.target.value)}>
              {DOMAIN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {DOMAIN_PROFILES[option].label}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="field-group">
            <legend>Input type</legend>
            <div className="input-choice">
              <label className={inputMethod === "file" ? "choice-option active" : "choice-option"}>
                <input
                  type="radio"
                  name="inputMethod"
                  value="file"
                  checked={inputMethod === "file"}
                  onChange={() => setInputMethod("file")}
                />
                CV file
              </label>
              <label className={inputMethod === "text" ? "choice-option active" : "choice-option"}>
                <input
                  type="radio"
                  name="inputMethod"
                  value="text"
                  checked={inputMethod === "text"}
                  onChange={() => setInputMethod("text")}
                />
                Plain text
              </label>
            </div>
          </fieldset>

          {inputMethod === "file" && (
            <div className="field-group grow-field">
              <label htmlFor="cvFile">Upload CV file</label>
              <input
                key={fileInputKey}
                id="cvFile"
                type="file"
                accept=".pdf,.txt,.md"
                onChange={handleFileChange}
              />
              {fileStatus && <p className="file-status">{fileStatus}</p>}
              {fileText ? (
                <div className="file-preview" aria-live="polite">
                  {/* <strong>Text extracted from file.</strong>
                  <span>
                    {fileText.slice(0, 160)}
                    {fileText.length > 160 ? "..." : ""}
                  </span> */}
                </div>
              ) : (
                <div className="input-hint">Upload a PDF, TXT, or MD file to unlock assessment.</div>
              )}
            </div>
          )}

          {inputMethod === "text" && (
            <div className="field-group grow-field">
              <label htmlFor="cvText">CV or skillset text</label>
              <textarea
                id="cvText"
                value={plainText}
                onChange={(event) => setPlainText(event.target.value)}
                placeholder="Paste projects, skills, internships, tools, certifications, and achievements here."
              />
              <div className="input-hint">Paste at least a few lines of skills, projects, or experience.</div>
            </div>
          )}

          <div className="button-row">
            <button type="submit" disabled={!canAssess}>
              Assess
            </button>
            <button type="button" className="secondary-button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        <section className="result-panel" aria-live="polite">
          {assessment ? (
            <>
              <div className="score-block">
                <div>
                  <p className="eyebrow">Assessment</p>
                  <h2>{assessment.profileLabel}</h2>
                </div>
                <div className="score-number">{assessment.score}</div>
              </div>

              <div className="score-track" aria-label={`Profile strength score ${assessment.score} out of 100`}>
                <div className="score-fill" style={{ width: `${assessment.score}%` }} />
              </div>

              <p className="summary-text">{assessment.summary}</p>

              <div className="mini-grid">
                <div>
                  <h3>Current strengths</h3>
                  <ul className="compact-list">
                    {[...assessment.strong, ...assessment.developing].slice(0, 4).map((category) => (
                      <li key={category.name}>
                        <span>{category.name}</span>
                        <small>{category.matched.join(", ") || "some evidence"}</small>
                      </li>
                    ))}
                    {[...assessment.strong, ...assessment.developing].length === 0 && (
                      <li>
                        <span>No strong signal yet</span>
                        <small>Add specific tools, projects, and outcomes.</small>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3>Gaps to improve</h3>
                  <ul className="compact-list">
                    {assessment.gaps.slice(0, 4).map((category) => (
                      <li key={category.name}>
                        <span>{category.name}</span>
                        <small>{category.why}</small>
                      </li>
                    ))}
                    {assessment.gaps.length === 0 && (
                      <li>
                        <span>No major gaps found</span>
                        <small>Now make the proof more measurable.</small>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="recommendation-list">
                <h3>Start working on this</h3>
                {assessment.recommendations.map((item, index) => (
                  <article className="recommendation-card" key={item.name}>
                    <div className="priority-pill">Goal {index + 1}</div>
                    <h4>{item.name}</h4>
                    <p>{item.why}</p>
                    <ul>
                      {item.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                    <strong>CV proof: {item.proof}</strong>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">Assessment</p>
              <h2>Ready when the input is ready.</h2>
              <p>Choose a domain, then upload a CV file or paste a few lines of skills, projects, and experience.</p>
            </div>
          )}
        </section>

        <section className="chat-panel">
          <div className="chat-header">
            <div>
              <p className="eyebrow">Goal chat</p>
              <h2>Ask for the next step</h2>
            </div>
          </div>

          <div className="chat-window">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.sender}`} key={`${message.sender}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder={assessment ? "Ask about projects, CV bullets, interview prep..." : "Run assessment first"}
              disabled={!assessment}
            />
            <button type="submit" disabled={!assessment || !chatInput.trim()}>
              Send
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default App;
