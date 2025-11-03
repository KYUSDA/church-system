"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevotionalForDate = void 0;
const fs_1 = __importDefault(require("fs"));
const pdfjs_dist_1 = require("pdfjs-dist");
const extractTextFromPDF = async (filePath) => {
    try {
        console.log("📂 Reading PDF file...");
        const data = new Uint8Array(fs_1.default.readFileSync(filePath));
        const pdf = await (0, pdfjs_dist_1.getDocument)({ data }).promise;
        let text = "";
        console.log(`📄 PDF Loaded - Total Pages: ${pdf.numPages}`);
        for (let i = 24; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ");
            text += pageText + "\n\n";
        }
        console.log("✅ PDF text extraction complete!");
        console.log("📜 Extracted Text (first 2000 chars):", text.slice(0, 2000));
        return text;
    }
    catch (error) {
        console.error("❌ Error extracting text from PDF:", error);
        return "";
    }
};
const getDevotionalForDate = async (date, pdfPath) => {
    const text = await extractTextFromPDF(pdfPath);
    // ✅ Date Matching
    const datePattern = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s([1-9]|[12]\d|3[01])\b/g;
    console.log("🔍 Extracted Dates:", [...text.matchAll(datePattern)].map(d => d[0]));
    // ✅ Improved Devotional Extraction
    const devotionalPattern = /(.+?),\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d+)\s+\[(\d+)\]\s+([\s\S]+?)(?=\n.+?,\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d+|\Z)/g;
    const devotionals = [...text.matchAll(devotionalPattern)];
    console.log("🔎 Extracted devotionals:", devotionals.map(d => `${d[2]} ${d[3]} - ${d[1]}`));
    for (const devotional of devotionals) {
        const [_, title, month, day, number, content] = devotional;
        const devotionalDate = `${month} ${day}`;
        if (devotionalDate.trim() === date.trim()) {
            console.log("✅ Devotional found for date:", devotionalDate);
            return `📖 **${title}**\n📅 ${devotionalDate}\n🔢 [${number}]\n\n${content.trim()}`;
        }
    }
    console.log("⚠️ No devotional found for:", date);
    return "No devotional found for this date.";
};
exports.getDevotionalForDate = getDevotionalForDate;
