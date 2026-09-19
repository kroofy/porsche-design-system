function assertLitIdiom(code, { tag, requireHostStyle = false } = {}) {
  const name = tag || 'component';
  if (!code.includes('static styles')) {
    throw new Error(`${name}: expected Lit static styles from useStyle`);
  }
  if (code.includes('get cssText') || /<style[\s\S]*innerHTML/.test(code) || /style \.innerHTML/.test(code)) {
    throw new Error(`${name}: cssText/innerHTML stylesheet hack is not allowed`);
  }
  if (requireHostStyle) {
    if (!/\bget hostStyle\s*\(/.test(code)) {
      throw new Error(`${name}: expected hostStyle getter`);
    }
    if (!code.includes('applyHostStyle()')) {
      throw new Error(`${name}: expected apply-host-style plugin hook`);
    }
  }
}

module.exports = { assertLitIdiom };
