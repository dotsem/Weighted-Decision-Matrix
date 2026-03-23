# Weighted Decision Matrix

A premium, interactive web application for making objective decisions based on multiple criteria and weights. Built with the latest web technologies for a smooth and responsive experience.

## Features

- **Dynamic Matrix**: Add or remove as many criteria and options as you need.
- **Weighted Scoring**: Assign weights to different criteria to reflect their importance.
- **Real-time Results**: See updated rankings and scores instantly as you change values.
- **Visual Breakdown**: Clear progress bars and color-coded rankings (Gold, Silver, Bronze) for easy interpretation.
- **Markdown Export**: Export your entire decision matrix and results as a clean Markdown file for documentation or sharing.
- **Local Storage**: Automatically saves your decision matrix to local storage for easy access.
- **Modern UI**: Dark mode and a responsive layout that works on all devices.

## Visit the app

[Weighted Decision Matrix](https://dotsem.github.io/Weighted-Decision-Matrix/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/) (preferred package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dotsem/Weighted-Decision-Matrix.git
   cd Weighted-Decision-Matrix
   ```

2. Install dependencies:
   ```bash
   pnpm install
   npm install
   ```
   (currently the buildtool relies on npm)

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Usage

1. **Add Criteria**: Name your criteria (e.g., "Price", "Performance") and set a weight from 0 to 10.
2. **Add Options**: Add the items you are comparing (e.g., "Product A", "Product B").
3. **Score**: Rate each option against each criterion on a scale of 0 to 10.
4. **Decide**: The results section will automatically rank your options based on the weighted scores.

## License

MIT
