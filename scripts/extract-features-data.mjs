import fs from "fs";

const htmlPath = process.argv[2] || "src/features.html";
const html = fs.readFileSync(htmlPath, "utf8");

const sectionRe = /<section[^>]+id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
};

function toISO(s) {
    const m = s.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+), (\d+)/);
    if (!m) return s;
    return `${m[3]}-${months[m[1]]}-${m[2].padStart(2, "0")}`;
}

const bySection = {};
let m;
while ((m = sectionRe.exec(html)) !== null) {
    const [, id, body] = m;
    if (!id) continue;
    bySection[id] = [];
    const cardRe =
        /<h3[^>]*>([^<]+)<\/h3>[\s\S]*?since (Jan \d+, 2026)[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?commit\/([a-f0-9]+)"/g;
    let c;
    while ((c = cardRe.exec(body)) !== null) {
        const [, name, dateStr, desc, hash] = c;
        const descClean = desc.replace(/\s+/g, " ").trim();
        bySection[id].push({ name: name.trim(), date: toISO(dateStr), commitHash: hash, description: descClean });
    }
}

const commits = {};
const categoryFeatureOrder = {};
for (const sectionId of Object.keys(bySection)) {
    categoryFeatureOrder[sectionId] = bySection[sectionId].map((f) => f.name);
    for (const f of bySection[sectionId]) {
        if (!commits[f.commitHash]) commits[f.commitHash] = { date: f.date, features: {} };
        commits[f.commitHash].features[f.name] = { description: f.description, category: sectionId };
    }
}

console.log(JSON.stringify({ commits, categoryFeatureOrder }, null, 2));
