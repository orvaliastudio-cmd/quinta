import { execSync } from 'child_process';
execSync('git checkout index.html index-en.html index-es.html');
console.log('reset done');
