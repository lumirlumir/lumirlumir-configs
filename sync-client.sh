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
cp configs/.eslintignore .
cp configs/.eslintrc.js .
cp configs/.markdownlint.json .
cp configs/.markdownlintignore .
cp configs/.nvmrc .
cp configs/.prettierignore .
cp configs/.prettierrc.js .
cp configs/.textlintrc.js .
cp configs/lint-staged.config.js .
cp configs/VScode.code-workspace .
