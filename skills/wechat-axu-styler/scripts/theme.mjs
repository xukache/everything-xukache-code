import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_THEME = {
  name: 'xukache-warm-companion',
  fontFamily: "'Source Han Sans SC','Noto Sans CJK SC','PingFang SC','Microsoft YaHei',Arial,sans-serif",
  fontFamilyEn: "'Inter','SF Pro Text','Helvetica Neue',Arial,sans-serif",
  codeFont: "'JetBrains Mono','SF Mono',Menlo,Consolas,monospace",
  fontSize: 17,
  lineHeight: 1.83,
  accent: '#AFC8B3',
  accentWarm: '#E8C7A1',
  quoteBg: '#EEF6EF',
  bg: '#F7F4EE',
  surface: '#FFFCF7',
  text: '#33363A',
  muted: '#6C706D',
  divider: '#D9DED8',
  codeBg: '#EEE9DF',
  imageBorder: '#DED6C8',
  h2NumberColor: '#9A7145',
  maxWidth: 628
};

function parseScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const unquoted = trimmed.replace(/^["']|["']$/g, '');
  if (/^-?\d+(\.\d+)?$/.test(unquoted)) return Number(unquoted);
  if (unquoted === 'true') return true;
  if (unquoted === 'false') return false;
  return unquoted;
}

function parseFlatYaml(source) {
  const data = {};
  source.split(/\r?\n/).forEach((line, index) => {
    const clean = line.replace(/\s+#.*$/, '').trim();
    if (!clean || clean.startsWith('#')) return;
    const match = clean.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!match) {
      throw new Error(`Unsupported theme.yaml syntax at line ${index + 1}: ${line}`);
    }
    data[match[1]] = parseScalar(match[2]);
  });
  return data;
}

function skillRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
}

function loadTheme(themePath = path.join(skillRoot(), 'theme.yaml')) {
  if (!fs.existsSync(themePath)) return { ...DEFAULT_THEME };
  const userTheme = parseFlatYaml(fs.readFileSync(themePath, 'utf8'));
  return { ...DEFAULT_THEME, ...userTheme };
}

export { DEFAULT_THEME, loadTheme, parseFlatYaml };
