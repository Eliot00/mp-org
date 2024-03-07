const formatCommand = "prettier --write";

const config = {
  "*.{js,jsx,ts,tsx}": [formatCommand, "eslint --fix"],
  "*.css": [formatCommand],
};

export default config;
