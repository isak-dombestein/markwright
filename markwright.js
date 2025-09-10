//----------------------------------------------------------------------------------------------
// Name: Markwright.js
// Description: A Node utility to convert md files to pdf files.
// Date Created: 11.08.2025
// Author: Isak Dombestein (isak@dombesteindata.net)
//----------------------------------------------------------------------------------------------

import fs from 'fs';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import puppeteer from 'puppeteer';
import hljs from 'highlight.js';
import { fileURLToPath } from 'url';

const marked = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value; 
        }
    })
);

// Copied from the githubDarkCSS theme page, too lazy to bother splitting this into proper spaced line syntax.
const githubDarkCSS = `
pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-built_in,.hljs-code,.hljs-formula,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-comment,.hljs-deletion,.hljs-quote,.hljs-section{color:#8b949e}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-addition,.hljs-bullet,.hljs-link,.hljs-name,.hljs-selector-tag,.hljs-subst,.hljs-symbol{color:#7ee787}.hljs-string .hljs-char{color:#79c0ff}
`;

export async function genFullHtml(markdown) {
    const parsedHtml = await marked.parse(markdown);

	return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PDF Output</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        line-height: 1.6;
                        padding: 40px;
                    }
                    
                    code {
                        font-family: "Fira Code", "Courier New", monospace;
                    }

                    blockquote {
                        border-left: 4px solid #ccc;
                        padding-left: 1em;
                        color: #666;
                    }

                    ${githubDarkCSS}
                </style>
            </head>
            <body>
                ${parsedHtml}
            </body>
        </html>
    `;
}

async function mdToPdf(inputFile, outputFile) {
	console.log(`Converting file: ${inputFile}...`);

	const markdown = fs.readFileSync(inputFile, "utf8");
    const fullHtml = await genFullHtml(markdown);

	console.log("Launching headless browser...");
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(fullHtml, { waitUntil: "domcontentloaded" });

	console.log("Generating PDF...");
	await page.pdf({
		path: outputFile,
		format: "A4",
		printBackground: true,
		margin: {
			top: "20mm",
			right: "20mm",
			bottom: "20mm",
			left: "20mm",
		},
	});

	await browser.close();
	console.log(`Successfully created PDF file at ${outputFile}!`);
}

const isCLI = process.argv[1] === fileURLToPath(import.meta.url);
if (isCLI) {
    const inputFile = process.argv[2];
    const outputFile = `${process.argv[3]}.pdf`;

    if (!inputFile || !outputFile) {
        console.error("Usage: node markwright.js <input-file> <output-file>");
        process.exit(1);
    }

    mdToPdf(inputFile, outputFile).catch((err) => {
        console.error("An error occurred: ", err);
        process.exit(1);
    });
}