# .github
mkdir -p .github
cp configs/.github/dependabot.yml .github

# .husky
mkdir -p .husky
cp configs/.husky/pre-commit .husky

# .vscode
mkdir -p .vscode
cp configs/.vscode/settings.json .vscode

# root
cp configs/.editorconfig .
cp configs/.markdownlint.json .
cp configs/.markdownlintignore .
cp configs/.nvmrc .
cp configs/.prettierignore .
cp configs/VScode.code-workspace .
cp configs/eslint.config.mjs .
cp configs/lint-staged.config.mjs .
cp configs/prettier.config.mjs .
