# markwright

[![License: MIT](https://badgen.net/github/license/isak-dombestein/markwright)](LICENSE)
[![Last Commit](https://badgen.net/github/last-commit/isak-dombestein/markwright?v=1)](https://github.com/isak-dombestein/markwright/commits/main/)
[![Markwright CI](https://github.com/isak-dombestein/markwright/actions/workflows/ci.yml/badge.svg)](https://github.com/isak-dombestein/markwright/actions/workflows/ci.yml)

A simple node utility to convert Markdown (.md) files to printable A4-size PDF-files.

## Installation:
> **NOTE:** Requires Node.js to be installed

1. Clone the repository;
```shell
git clone https://github.com/isak-dombestein/markwright.git
```

2. Navigate to the cloned directory
```shell
cd markwright
```

3. Install dependencies
```shell
npm install
```

## Usage:
To use, run the following from within the markwright folder;

```shell
node markwright.js <input-file> <output-file>
```

### Example:
```shell
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
Markwright is licensed under the MIT License. See the [LICENSE](LICENSE) for details.
