# markwright

[![license](https://badgen.net/github/license/isak-dombestein/markwright)](https://github.com/isak-dombestein/markwright/blob/main/LICENSE.md)
[![lastCommit](https://badgen.net/github/last-commit/isak-dombestein/markwright)](https://github.com/isak-dombestein/markwright/commits/main/)
[![Markwright CI](https://github.com/isak-dombestein/markwright/actions/workflows/ci.yml/badge.svg)](https://github.com/isak-dombestein/markwright/actions/workflows/ci.yml)

A simple node utility to convert Markdown (.md) files to printable A4-size PDF-files.

## Installation:
> **NOTE:** Requires Node.js to be installed

1. Clone the repository;
```bash
git clone https://github.com/isak-dombestein/markwright.git
```

2. Navigate to the cloned directory
```bash
cd markwright
```

3. Install dependencies
```bash
npm install
```

## Usage:
To use, run the following from within the markwright folder;

```bash
node markwright.js <input-file> <output-file>
```

### Example:
```bash
node markwright.js README.md README.pdf
```

## Open Source Libraries Used
Markwright is built with the following libraries:
- [markedjs](https://github.com/markedjs/marked)
- [marked-highlight](https://github.com/markedjs/marked-highlight)
- [highlight.js](https://highlightjs.org/)
- [puppeteer](https://pptr.dev/)

## CONTRIBUTING
Contributions are welcome! If you find a bug or have suggestions for extra functionality, feel free to open an issue or submit a pull request.

## LICENSE
Markwright is licensed under the MIT License. See the [LICENSE](https://github.com/isak-dombestein/markwright/LICENSE.md) for details.