#!/usr/bin/env node
// scripts/gitflow.js

const { execSync } = require('child_process');
const [, , command, name] = process.argv;

if (!command || !['start', 'pr'].includes(command) || !name) {
  console.log('Uso: npm run gitflow start <nome>  - Cria branch feature/<nome>');
  console.log('     npm run gitflow pr <nome>     - Push e abre Pull Request');
  process.exit(1);
}

try {
  if (command === 'start') {
    console.log(`
🔀 Iniciando branch feature/${name}...
`);
    execSync(`git checkout main && git pull origin main && git checkout -b feature/${name}`, { stdio: 'inherit' });
    console.log(`
✔ Branch feature/${name} criada e checada.
`);
  } else if (command === 'pr') {
    console.log(`
📤 Enviando branch feature/${name} e criando Pull Request...
`);
    execSync(`git push --set-upstream origin feature/${name}`, { stdio: 'inherit' });
    execSync(`gh pr create --fill --base main --head feature/${name}`, { stdio: 'inherit' });
    console.log(`
✔ Pull Request criado para feature/${name}.
`);
  }
} catch (error) {
  console.error(`Erro no GitFlow: ${error.message}`);
  process.exit(1);
}