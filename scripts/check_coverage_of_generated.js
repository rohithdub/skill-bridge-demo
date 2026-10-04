const fs = require('fs');

const missing = JSON.parse(fs.readFileSync('scripts/missing_dynamic_strings.json', 'utf8'));
const gen = JSON.parse(fs.readFileSync('scripts/generated_missing_dynamic_dictionary.json', 'utf8'));

console.log('--- COVERAGE CHECK ---');

const checkCategory = (name, list, dicts) => {
  const uncov = [];
  for (const item of list) {
    let found = false;
    for (const d of dicts) {
      if (d[item]) {
        found = true;
        break;
      }
    }
    if (!found) uncov.push(item);
  }
  console.log(`${name}: ${list.length - uncov.length}/${list.length} covered. Remaining: ${uncov.length}`);
  if (uncov.length > 0) {
    console.log('Uncovered sample:', uncov.slice(0, 5));
  }
  return uncov;
};

const remaining = {
  skills: checkCategory('Skills', missing.skills, [gen.skills, gen.prerequisites]),
  tasks: checkCategory('Tasks', missing.tasks, [gen.tasks]),
  certs: checkCategory('Certs', missing.certs, [gen.certs]),
  titles: checkCategory('Titles', missing.titles, [gen.titles]),
  prerequisites: checkCategory('Prerequisites', missing.prerequisites, [gen.prerequisites, gen.skills])
};

fs.writeFileSync('scripts/remaining_missing.json', JSON.stringify(remaining, null, 2));
