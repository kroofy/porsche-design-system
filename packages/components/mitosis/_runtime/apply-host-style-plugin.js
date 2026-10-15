/**
 * Mitosis Lit has no host `style` channel. `style={...}` on a child becomes
 * `.style=${object}`, which cannot assign CSS custom properties.
 * Components expose `get hostStyle()`; this plugin copies those vars onto the
 * host so `useStyle` rules can consume them.
 *
 * @returns {import('@builder.io/mitosis').MitosisPlugin}
 */
function applyHostStylePlugin() {
  return {
    name: 'apply-host-style',
    code: {
      post(code) {
        if (!/\bget hostStyle\s*\(/.test(code)) return code;
        if (code.includes('applyHostStyle()')) return code;

        const methods = `
  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
  }

  updated() {
    this.applyHostStyle();
  }

  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }
`;

        if (/\bupdated\s*\(/.test(code) || /\bconnectedCallback\s*\(/.test(code)) {
          throw new Error('apply-host-style: component already defines updated/connectedCallback');
        }

        if (!/\brender\s*\(/.test(code)) {
          throw new Error('apply-host-style: no render() to hook');
        }

        return code.replace(/\brender\s*\(\s*\)\s*\{/, `${methods}\n  render() {`);
      },
    },
  };
}

module.exports = applyHostStylePlugin;
module.exports.applyHostStylePlugin = applyHostStylePlugin;
