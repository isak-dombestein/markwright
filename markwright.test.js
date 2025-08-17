import fs from 'fs';
import path from 'path';
import { genFullHtml } from './markwright.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

describe("Markwright HTML Generation", () => {
    it("should correctly convert Markdown to HTML with syntax highlighting", async () => {
        const sampleMarkdown = fs.readFileSync(
            path.join(__dirname, "test.md"),
            "utf8"
        );

        const resultHtml = await genFullHtml(sampleMarkdown);
        
        expect(resultHtml).toMatchSnapshot();
    });
});