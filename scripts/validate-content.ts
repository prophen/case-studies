import { readStudies, visibleStudies } from '../src/lib/case-studies';
const studies = readStudies();
console.log(`Validated ${studies.length} studies. ${visibleStudies(studies, 'production').length} eligible for production.`);
