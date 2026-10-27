// Gera backend/projects.json a partir de src/data/projects.js (fonte única da verdade).
// Uso: npm run sync:projects
import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects.js';

writeFileSync(
  new URL('../backend/projects.json', import.meta.url),
  JSON.stringify(projects, null, 2) + '\n',
);
console.log(`backend/projects.json atualizado (${projects.length} projetos)`);
