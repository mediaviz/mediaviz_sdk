'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SDK_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..');
const JS_ROOT = path.resolve(__dirname, '..', '..');

describe('task 6: smoke-test and gitignore', () => {
  test('smoke-test.js exits 0', () => {
    const result = execSync(`node ${path.join(JS_ROOT, 'smoke-test.js')}`, { encoding: 'utf8' });
    expect(result.trim()).toBe('OK');
  });

  test('.gitignore includes dist/', () => {
    const gitignore = fs.readFileSync(path.join(JS_ROOT, '.gitignore'), 'utf8');
    const lines = gitignore.split('\n').map(l => l.trim());
    expect(lines).toContain('dist/');
  });

  test('smoke-test.js awaits generateAuthorizationUrl', () => {
    const src = fs.readFileSync(path.join(JS_ROOT, 'smoke-test.js'), 'utf8');
    expect(src).toMatch(/await\s+client\.generateAuthorizationUrl\(\)/);
  });
});
