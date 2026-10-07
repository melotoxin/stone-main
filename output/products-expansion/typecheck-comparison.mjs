import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const baseline = await readFile(resolve('output/ux-refinement/typecheck.log'), 'utf8');
const current = await readFile(resolve('output/products-expansion/typecheck.log'), 'utf8');
const errorsIn = text => [...text.matchAll(/^.+?\(\d+,\d+\): error TS\d+: .+$/gm)].map(match => match[0].replace(/\r$/, ''));
const oldErrors = errorsIn(baseline);
const newErrors = errorsIn(current);
const introduced = newErrors.filter(error => !oldErrors.includes(error));
const resolved = oldErrors.filter(error => !newErrors.includes(error));
const report = {
  baselineErrors: oldErrors.length,
  currentErrors: newErrors.length,
  newErrors: introduced,
  resolvedErrors: resolved,
  matchesBaseline: JSON.stringify(oldErrors) === JSON.stringify(newErrors),
  status: !newErrors.length ? 'passed' : 'failed',
};
await writeFile(resolve('output/products-expansion/typecheck-comparison.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ baselineErrors: report.baselineErrors, currentErrors: report.currentErrors, introducedErrors: introduced.length, resolvedErrors: resolved.length, status: report.status }, null, 2));
if (newErrors.length) process.exitCode = 1;
