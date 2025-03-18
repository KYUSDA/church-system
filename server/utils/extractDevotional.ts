import fs from "fs";
import { getDocument } from "pdfjs-dist";

interface TextItem {
    str: string;
}

interface TextMarkedContent {}

type PDFContentItem = TextItem | TextMarkedContent;

interface PDFPage {
    getTextContent(): Promise<{ items: PDFContentItem[] }>;
}

interface PDFDocument {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPage>;
}

const extractTextFromPDF = async (filePath: string): Promise<string> => {
    try {
        console.log("📂 Reading PDF file...");
        const data = new Uint8Array(fs.readFileSync(filePath));
        const pdf: PDFDocument = await getDocument({ data }).promise;

        let text = "";
        console.log(`📄 PDF Loaded - Total Pages: ${pdf.numPages}`);

        for (let i = 24; i <= pdf.numPages; i++) {
            const page: PDFPage = await pdf.getPage(i);
            const content = await page.getTextContent();

            const pageText = content.items
                .map((item: PDFContentItem) => ("str" in item ? item.str : ""))
                .join(" ");

            text += pageText + "\n\n";
        }

        console.log("✅ PDF text extraction complete!");
        console.log("📜 Extracted Text (first 2000 chars):", text.slice(0, 2000));
        return text;
    } catch (error) {
        console.error("❌ Error extracting text from PDF:", error);
        return "";
    }
};


export const getDevotionalForDate = async (date: string, pdfPath: string): Promise<string> => {
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
