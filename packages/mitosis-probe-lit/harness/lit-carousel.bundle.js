(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = /* @__PURE__ */ Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t4, e5, o6) {
      if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e5;
    }
    get styleSheet() {
      let t4 = this.o;
      const s4 = this.t;
      if (e && void 0 === t4) {
        const e5 = void 0 !== s4 && 1 === s4.length;
        e5 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
  var i = (t4, ...e5) => {
    const o6 = 1 === t4.length ? t4[0] : e5.reduce((e6, s4, o7) => e6 + ((t5) => {
      if (true === t5._$cssResult$) return t5.cssText;
      if ("number" == typeof t5) return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s4) + t4[o7 + 1], t4[0]);
    return new n(o6, t4, s);
  };
  var S = (s4, o6) => {
    if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
    else for (const e5 of o6) {
      const o7 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
    }
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e5 = "";
    for (const s4 of t5.cssRules) e5 += s4.cssText;
    return r(e5);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t4, s4) => t4;
  var u = { toAttribute(t4, s4) {
    switch (s4) {
      case Boolean:
        t4 = t4 ? l : null;
        break;
      case Object:
      case Array:
        t4 = null == t4 ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, s4) {
    let i5 = t4;
    switch (s4) {
      case Boolean:
        i5 = null !== t4;
        break;
      case Number:
        i5 = null === t4 ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          i5 = JSON.parse(t4);
        } catch (t5) {
          i5 = null;
        }
    }
    return i5;
  } };
  var f = (t4, s4) => !i2(t4, s4);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t4) {
      this._$Ei(), (this.l ??= []).push(t4);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t4, s4 = b) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
        const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
        void 0 !== h3 && e2(this.prototype, t4, h3);
      }
    }
    static getPropertyDescriptor(t4, s4, i5) {
      const { get: e5, set: r5 } = h(this.prototype, t4) ?? { get() {
        return this[s4];
      }, set(t5) {
        this[s4] = t5;
      } };
      return { get: e5, set(s5) {
        const h3 = e5?.call(this);
        r5?.call(this, s5), this.requestUpdate(t4, h3, i5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t4 = n2(this);
      t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
        for (const i5 of s4) this.createProperty(i5, t5[i5]);
      }
      const t4 = this[Symbol.metadata];
      if (null !== t4) {
        const s4 = litPropertyMetadata.get(t4);
        if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t5, s4] of this.elementProperties) {
        const i5 = this._$Eu(t5, s4);
        void 0 !== i5 && this._$Eh.set(i5, t5);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i5 = [];
      if (Array.isArray(s4)) {
        const e5 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e5) i5.unshift(c(s5));
      } else void 0 !== s4 && i5.push(c(s4));
      return i5;
    }
    static _$Eu(t4, s4) {
      const i5 = s4.attribute;
      return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
    }
    addController(t4) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
    }
    removeController(t4) {
      this._$EO?.delete(t4);
    }
    _$E_() {
      const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
      t4.size > 0 && (this._$Ep = t4);
    }
    createRenderRoot() {
      const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t4, this.constructor.elementStyles), t4;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t4) => t4.hostDisconnected?.());
    }
    attributeChangedCallback(t4, s4, i5) {
      this._$AK(t4, i5);
    }
    _$ET(t4, s4) {
      const i5 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i5);
      if (void 0 !== e5 && true === i5.reflect) {
        const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
        this._$Em = t4, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
      }
    }
    _$AK(t4, s4) {
      const i5 = this.constructor, e5 = i5._$Eh.get(t4);
      if (void 0 !== e5 && this._$Em !== e5) {
        const t5 = i5.getPropertyOptions(e5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
        this._$Em = e5;
        const r5 = h3.fromAttribute(s4, t5.type);
        this[e5] = r5 ?? this._$Ej?.get(e5) ?? r5, this._$Em = null;
      }
    }
    requestUpdate(t4, s4, i5, e5 = false, h3) {
      if (void 0 !== t4) {
        const r5 = this.constructor;
        if (false === e5 && (h3 = this[t4]), i5 ??= r5.getPropertyOptions(t4), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r5._$Eu(t4, i5)))) return;
        this.C(t4, s4, i5);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t4, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r5) {
      i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r5 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r5) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e5 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return null != t4 && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t6, s5] of this._$Ep) this[t6] = s5;
          this._$Ep = void 0;
        }
        const t5 = this.constructor.elementProperties;
        if (t5.size > 0) for (const [s5, i5] of t5) {
          const { wrapped: t6 } = i5, e5 = this[s5];
          true !== t6 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
        }
      }
      let t4 = false;
      const s4 = this._$AL;
      try {
        t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
      } catch (s5) {
        throw t4 = false, this._$EM(), s5;
      }
      t4 && this._$AE(s4);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5])), this._$EM();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = (t4) => t4;
  var s2 = t2.trustedTypes;
  var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var h2 = "$lit$";
  var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var n3 = "?" + o3;
  var r3 = `<${n3}>`;
  var l2 = document;
  var c3 = () => l2.createComment("");
  var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
  var u2 = Array.isArray;
  var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
  var f2 = "[ 	\n\f\r]";
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y2 = /^(?:script|style|textarea|title)$/i;
  var x = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
  var b2 = x(1);
  var w = x(2);
  var T = x(3);
  var E = /* @__PURE__ */ Symbol.for("lit-noChange");
  var A = /* @__PURE__ */ Symbol.for("lit-nothing");
  var C = /* @__PURE__ */ new WeakMap();
  var P = l2.createTreeWalker(l2, 129);
  function V(t4, i5) {
    if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i5) : i5;
  }
  var N = (t4, i5) => {
    const s4 = t4.length - 1, e5 = [];
    let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
    for (let i6 = 0; i6 < s4; i6++) {
      const s5 = t4[i6];
      let a3, u3, d3 = -1, f3 = 0;
      for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
      const x2 = c4 === p2 && t4[i6 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e5.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
    }
    return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
  };
  var S2 = class _S {
    constructor({ strings: t4, _$litType$: i5 }, e5) {
      let r5;
      this.parts = [];
      let l3 = 0, a3 = 0;
      const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i5);
      if (this.el = _S.createElement(f3, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
        const t5 = this.el.content.firstChild;
        t5.replaceWith(...t5.childNodes);
      }
      for (; null !== (r5 = P.nextNode()) && d3.length < u3; ) {
        if (1 === r5.nodeType) {
          if (r5.hasAttributes()) for (const t5 of r5.getAttributeNames()) if (t5.endsWith(h2)) {
            const i6 = v2[a3++], s4 = r5.getAttribute(t5).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
            d3.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r5.removeAttribute(t5);
          } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r5.removeAttribute(t5));
          if (y2.test(r5.tagName)) {
            const t5 = r5.textContent.split(o3), i6 = t5.length - 1;
            if (i6 > 0) {
              r5.textContent = s2 ? s2.emptyScript : "";
              for (let s4 = 0; s4 < i6; s4++) r5.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
              r5.append(t5[i6], c3());
            }
          }
        } else if (8 === r5.nodeType) if (r5.data === n3) d3.push({ type: 2, index: l3 });
        else {
          let t5 = -1;
          for (; -1 !== (t5 = r5.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
        }
        l3++;
      }
    }
    static createElement(t4, i5) {
      const s4 = l2.createElement("template");
      return s4.innerHTML = t4, s4;
    }
  };
  function M(t4, i5, s4 = t4, e5) {
    if (i5 === E) return i5;
    let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
    const o6 = a2(i5) ? void 0 : i5._$litDirective$;
    return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t4, h3._$AS(t4, i5.values), h3, e5)), i5;
  }
  var R = class {
    constructor(t4, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t4) {
      const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t4?.creationScope ?? l2).importNode(i5, true);
      P.currentNode = e5;
      let h3 = P.nextNode(), o6 = 0, n5 = 0, r5 = s4[0];
      for (; void 0 !== r5; ) {
        if (o6 === r5.index) {
          let i6;
          2 === r5.type ? i6 = new k(h3, h3.nextSibling, this, t4) : 1 === r5.type ? i6 = new r5.ctor(h3, r5.name, r5.strings, this, t4) : 6 === r5.type && (i6 = new Z(h3, this, t4)), this._$AV.push(i6), r5 = s4[++n5];
        }
        o6 !== r5?.index && (h3 = P.nextNode(), o6++);
      }
      return P.currentNode = l2, e5;
    }
    p(t4) {
      let i5 = 0;
      for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
    }
  };
  var k = class _k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t4, i5, s4, e5) {
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i5 = this) {
      t4 = M(this, t4, i5), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
    }
    O(t4) {
      return this._$AA.parentNode.insertBefore(t4, this._$AB);
    }
    T(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
    }
    _(t4) {
      this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
    }
    $(t4) {
      const { values: i5, _$litType$: s4 } = t4, e5 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e5) this._$AH.p(i5);
      else {
        const t5 = new R(e5, this), s5 = t5.u(this.options);
        t5.p(i5), this.T(s5), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i5 = C.get(t4.strings);
      return void 0 === i5 && C.set(t4.strings, i5 = new S2(t4)), i5;
    }
    k(t4) {
      u2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s4, e5 = 0;
      for (const h3 of t4) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
      e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
    }
    _$AR(t4 = this._$AA.nextSibling, s4) {
      for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
        const s5 = i3(t4).nextSibling;
        i3(t4).remove(), t4 = s5;
      }
    }
    setConnected(t4) {
      void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
    }
  };
  var H = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t4, i5, s4, e5, h3) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
    }
    _$AI(t4, i5 = this, s4, e5) {
      const h3 = this.strings;
      let o6 = false;
      if (void 0 === h3) t4 = M(this, t4, i5, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
      else {
        const e6 = t4;
        let n5, r5;
        for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r5 = M(this, e6[s4 + n5], i5, n5), r5 === E && (r5 = this._$AH[n5]), o6 ||= !a2(r5) || r5 !== this._$AH[n5], r5 === A ? t4 = A : t4 !== A && (t4 += (r5 ?? "") + h3[n5 + 1]), this._$AH[n5] = r5;
      }
      o6 && !e5 && this.j(t4);
    }
    j(t4) {
      t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
    }
  };
  var I = class extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === A ? void 0 : t4;
    }
  };
  var L = class extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
    }
  };
  var z = class extends H {
    constructor(t4, i5, s4, e5, h3) {
      super(t4, i5, s4, e5, h3), this.type = 5;
    }
    _$AI(t4, i5 = this) {
      if ((t4 = M(this, t4, i5, 0) ?? A) === E) return;
      const s4 = this._$AH, e5 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e5);
      e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var Z = class {
    constructor(t4, i5, s4) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      M(this, t4);
    }
  };
  var B = t2.litHtmlPolyfillSupport;
  B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
  var D = (t4, i5, s4) => {
    const e5 = s4?.renderBefore ?? i5;
    let h3 = e5._$litPart$;
    if (void 0 === h3) {
      const t5 = s4?.renderBefore ?? null;
      e5._$litPart$ = h3 = new k(i5.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
    }
    return h3._$AI(t4), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t4 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t4.firstChild, t4;
    }
    update(t4) {
      const r5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return E;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.2");

  // ../../node_modules/@splidejs/splide/dist/js/splide.esm.js
  function _defineProperties(target, props) {
    for (var i5 = 0; i5 < props.length; i5++) {
      var descriptor = props[i5];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED,
    MOUNTED,
    IDLE,
    MOVING,
    SCROLLING,
    DRAGGING,
    DESTROYED
  };
  function empty(array) {
    array.length = 0;
  }
  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }
  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }
  var nextTick = setTimeout;
  var noop = function noop2() {
  };
  function raf(func) {
    return requestAnimationFrame(func);
  }
  function typeOf(type, subject) {
    return typeof subject === type;
  }
  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }
  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");
  function isNull(subject) {
    return subject === null;
  }
  function isHTMLElement(subject) {
    try {
      return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    } catch (e5) {
      return false;
    }
  }
  function toArray(value) {
    return isArray(value) ? value : [value];
  }
  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }
  function includes(array, value) {
    return array.indexOf(value) > -1;
  }
  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }
  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function(name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }
  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }
  function append(parent, children2) {
    forEach(children2, parent.appendChild.bind(parent));
  }
  function before(nodes, ref) {
    forEach(nodes, function(node) {
      var parent = (ref || node).parentNode;
      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }
  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }
  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function(child2) {
      return matches(child2, selector);
    }) : children2;
  }
  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }
  var ownKeys = Object.keys;
  function forOwn(object, iteratee, right) {
    if (object) {
      (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function(key) {
        key !== "__proto__" && iteratee(object[key], key);
      });
    }
    return object;
  }
  function assign(object) {
    slice(arguments, 1).forEach(function(source) {
      forOwn(source, function(value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }
  function merge(object) {
    slice(arguments, 1).forEach(function(source) {
      forOwn(source, function(value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }
  function omit(object, keys) {
    forEach(keys || ownKeys(object), function(key) {
      delete object[key];
    });
  }
  function removeAttribute(elms, attrs) {
    forEach(elms, function(elm) {
      forEach(attrs, function(attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }
  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function(value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function(elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }
  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);
    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }
    parent && append(parent, elm);
    return elm;
  }
  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }
    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }
  function display(elm, display2) {
    style(elm, "display", display2);
  }
  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }
  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }
  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }
  function rect(target) {
    return target.getBoundingClientRect();
  }
  function remove(nodes) {
    forEach(nodes, function(node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }
  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }
  function prevent(e5, stopPropagation) {
    e5.preventDefault();
    if (stopPropagation) {
      e5.stopPropagation();
      e5.stopImmediatePropagation();
    }
  }
  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }
  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }
  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }
  function timeOf(e5) {
    return e5.timeStamp;
  }
  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }
  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }
  var min = Math.min;
  var max = Math.max;
  var floor = Math.floor;
  var ceil = Math.ceil;
  var abs = Math.abs;
  function approximatelyEqual(x2, y3, epsilon) {
    return abs(x2 - y3) < epsilon;
  }
  function between(number, x2, y3, exclusive) {
    var minimum = min(x2, y3);
    var maximum = max(x2, y3);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }
  function clamp(number, x2, y3) {
    var minimum = min(x2, y3);
    var maximum = max(x2, y3);
    return min(max(minimum, number), maximum);
  }
  function sign(x2) {
    return +(x2 > 0) - +(x2 < 0);
  }
  function format(string, replacements) {
    forEach(replacements, function(replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }
  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }
  var ids = {};
  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }
  function EventBinder() {
    var listeners = [];
    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function(target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }
    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function(target, event, namespace) {
        listeners = listeners.filter(function(listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }
          return true;
        });
      });
    }
    function dispatch(target, type, detail) {
      var e5;
      var bubbles = true;
      if (typeof CustomEvent === "function") {
        e5 = new CustomEvent(type, {
          bubbles,
          detail
        });
      } else {
        e5 = document.createEvent("CustomEvent");
        e5.initCustomEvent(type, bubbles, false, detail);
      }
      target.dispatchEvent(e5);
      return e5;
    }
    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function(target) {
        target && forEach(events, function(events2) {
          events2.split(" ").forEach(function(eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }
    function destroy() {
      listeners.forEach(function(data) {
        data[4]();
      });
      empty(listeners);
    }
    return {
      bind,
      unbind,
      dispatch,
      destroy
    };
  }
  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_OVERFLOW = "overflow";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var EVENT_SLIDE_KEYDOWN = "sk";
  var EVENT_SHIFTED = "sh";
  var EVENT_END_INDEX_CHANGED = "ei";
  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();
    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function(e5) {
        callback.apply(callback, isArray(e5.detail) ? e5.detail : []);
      });
    }
    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }
    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }
    return assign(binder, {
      bus,
      on,
      off: apply(binder.unbind, bus),
      emit
    });
  }
  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;
    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);
        if (rate >= 1) {
          onInterval();
          startTime = now();
          if (limit && ++count >= limit) {
            return pause();
          }
        }
        id = raf(update);
      }
    }
    function start(resume) {
      resume || cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      id = raf(update);
    }
    function pause() {
      paused = true;
    }
    function rewind() {
      startTime = now();
      rate = 0;
      if (onUpdate) {
        onUpdate(rate);
      }
    }
    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }
    function set(time) {
      interval = time;
    }
    function isPaused() {
      return paused;
    }
    return {
      start,
      rewind,
      pause,
      cancel,
      set,
      isPaused
    };
  }
  function State(initialState) {
    var state2 = initialState;
    function set(value) {
      state2 = value;
    }
    function is(states) {
      return includes(toArray(states), state2);
    }
    return {
      set,
      is
    };
  }
  function Throttle(func, duration) {
    var interval = RequestInterval(duration || 0, func, null, 1);
    return function() {
      interval.isPaused() && interval.start();
    };
  }
  function Media(Splide2, Components2, options) {
    var state2 = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];
    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function(n5, m2) {
        return isMin ? +n5 - +m2 : +m2 - +n5;
      }).forEach(function(key) {
        register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
      });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }
    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }
    function register(options2, query3) {
      var queryList = matchMedia(query3);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }
    function update() {
      var destroyed = state2.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function(merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);
      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }
    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }
    function set(opts, base, notify) {
      merge(options, opts);
      base && merge(Object.getPrototypeOf(options), opts);
      if (notify || !state2.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }
    return {
      setup,
      destroy,
      reduce,
      set
    };
  }
  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT]
  };
  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function(match, offset) {
        var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
        return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
      });
    }
    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }
    return {
      resolve,
      orient
    };
  }
  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
  var CLASS_PREFIX = PROJECT_CODE + "__";
  var STATUS_CLASS_PREFIX = "is-";
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = CLASS_PREFIX + "track";
  var CLASS_LIST = CLASS_PREFIX + "list";
  var CLASS_SLIDE = CLASS_PREFIX + "slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = CLASS_PREFIX + "arrows";
  var CLASS_ARROW = CLASS_PREFIX + "arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = CLASS_PREFIX + "progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
  var CLASS_TOGGLE_PLAY = CLASS_TOGGLE + "__play";
  var CLASS_TOGGLE_PAUSE = CLASS_TOGGLE + "__pause";
  var CLASS_SPINNER = CLASS_PREFIX + "spinner";
  var CLASS_SR = CLASS_PREFIX + "sr";
  var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
  var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
  var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
  var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
  var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
  var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
  var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
  var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER
  };
  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }
    var elm = from;
    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }
      elm = elm.parentElement;
    }
    return elm;
  }
  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2), on = _EventInterface.on, bind = _EventInterface.bind;
    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;
    function setup() {
      collect();
      init();
      update();
    }
    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(document, POINTER_DOWN_EVENTS + " keydown", function(e5) {
        isUsingKey = e5.type === "keydown";
      }, {
        capture: true
      });
      bind(root, "focusin", function() {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }
    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }
    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }
    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function(className, key) {
        elements[key] = find("." + className);
      });
      assign(elements, {
        root,
        track,
        list,
        slides
      });
    }
    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";
      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }
      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }
    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }
    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }
    return assign(elements, {
      setup,
      mount,
      destroy
    });
  }
  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";
  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on, emit = event.emit, bind = event.bind;
    var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
    var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;
    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }
      listen();
    }
    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);
      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }
    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }
    function initNavigation() {
      var controls = Splide2.splides.map(function(target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }
    function onMove() {
      if (!destroyed) {
        update();
      }
    }
    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }
    function updateActivity() {
      var active = isActive();
      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }
    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);
      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }
      setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }
      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }
      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }
    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }
    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }
    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }
      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }
    function isWithin(from, distance) {
      var diff = abs(from - index);
      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }
      return diff <= distance;
    }
    var self = {
      index,
      slideIndex,
      slide,
      container,
      isClone,
      mount,
      destroy,
      update,
      style: style$1,
      isWithin
    };
    return self;
  }
  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
    var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
    var Slides2 = [];
    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }
    function init() {
      slides.forEach(function(slide, index) {
        register(slide, index, -1);
      });
    }
    function destroy() {
      forEach$1(function(Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }
    function update() {
      forEach$1(function(Slide2) {
        Slide2.update();
      });
    }
    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function(Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }
    function get(excludeClones) {
      return excludeClones ? filter(function(Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }
    function getIn(page) {
      var Controller2 = Components2.Controller;
      var index = Controller2.toIndex(page);
      var max2 = Controller2.hasFocus() ? 1 : options.perPage;
      return filter(function(Slide2) {
        return between(Slide2.index, index, index + max2 - 1);
      });
    }
    function getAt(index) {
      return filter(index)[0];
    }
    function add(items, index) {
      forEach(items, function(slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }
        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }
    function remove$1(matcher) {
      remove(filter(matcher).map(function(Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }
    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }
    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }
    function style2(prop, value, useContainer) {
      forEach$1(function(Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }
    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;
      if (length) {
        images.forEach(function(img) {
          bind(img, "load error", function() {
            if (!--length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }
    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }
    function isEnough() {
      return Slides2.length > options.perPage;
    }
    return {
      mount,
      destroy,
      update,
      register,
      get,
      getIn,
      getAt,
      add,
      remove: remove$1,
      forEach: forEach$1,
      filter,
      style: style2,
      getLength,
      isEnough
    };
  }
  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
    var Slides2 = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
    var getAt = Slides2.getAt, styleSlides = Slides2.style;
    var vertical;
    var rootRect;
    var overflow;
    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }
    function init() {
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize(true);
    }
    function resize(force) {
      var newRect = rect(root);
      if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);
        if (overflow !== (overflow = isOverflow())) {
          toggleClass(root, CLASS_OVERFLOW, overflow);
          emit(EVENT_OVERFLOW, overflow);
        }
      }
    }
    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }
    function cssTrackHeight() {
      var height = "";
      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }
      return height;
    }
    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }
    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }
    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }
    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }
    function listSize() {
      return rect(list)[resolve("width")];
    }
    function slideSize(index, withoutGap) {
      var Slide2 = getAt(index || 0);
      return Slide2 ? rect(Slide2.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }
    function totalSize(index, withoutGap) {
      var Slide2 = getAt(index);
      if (Slide2) {
        var right = rect(Slide2.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }
      return 0;
    }
    function sliderSize(withoutGap) {
      return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
    }
    function getGap() {
      var Slide2 = getAt(0);
      return Slide2 && parseFloat(style(Slide2.slide, resolve("marginRight"))) || 0;
    }
    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }
    function isOverflow() {
      return Splide2.is(FADE) || sliderSize(true) > listSize();
    }
    return {
      mount,
      resize,
      listSize,
      slideSize,
      sliderSize,
      totalSize,
      getPadding,
      isOverflow
    };
  }
  var MULTIPLIER = 2;
  function Clones(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on;
    var Elements2 = Components2.Elements, Slides2 = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;
    function mount() {
      on(EVENT_REFRESH, remount);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);
      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        Components2.Layout.resize(true);
      }
    }
    function remount() {
      destroy();
      mount();
    }
    function destroy() {
      remove(clones);
      empty(clones);
      event.destroy();
    }
    function observe() {
      var count = computeCloneCount();
      if (cloneCount !== count) {
        if (cloneCount < count || !count) {
          event.emit(EVENT_REFRESH);
        }
      }
    }
    function generate(count) {
      var slides = Slides2.get().slice();
      var length = slides.length;
      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }
        push(slides.slice(-count), slides.slice(0, count)).forEach(function(Slide2, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide2.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements2.list, clone);
          push(clones, clone);
          Slides2.register(clone, index - count + (isHead ? 0 : length), Slide2.index);
        });
      }
    }
    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }
    function computeCloneCount() {
      var clones2 = options.clones;
      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (isUndefined(clones2)) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements2.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
      }
      return clones2;
    }
    return {
      mount,
      destroy
    };
  }
  function Move(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2), on = _EventInterface4.on, emit = _EventInterface4.emit;
    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
    var Transition;
    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }
    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }
    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }
      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function() {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }
    function jump(index) {
      translate(toPosition(index, true));
    }
    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
        position !== destination && emit(EVENT_SHIFTED);
      }
    }
    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;
        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }
      return position;
    }
    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }
    function cancel() {
      translate(getPosition(), true);
      Transition.cancel();
    }
    function toIndex(position) {
      var Slides2 = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;
      for (var i5 = 0; i5 < Slides2.length; i5++) {
        var slideIndex = Slides2[i5].index;
        var distance = abs(toPosition(slideIndex, true) - position);
        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }
      return index;
    }
    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }
    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }
    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize(true) - listSize()));
      }
      return position;
    }
    function offset(index) {
      var focus2 = options.focus;
      return focus2 === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus2 * slideSize(index) || 0;
    }
    function getLimit(max2) {
      return toPosition(max2 ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }
    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }
    function exceededLimit(max2, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max2 !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max2 !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }
    return {
      mount,
      move,
      jump,
      translate,
      shift,
      cancel,
      toIndex,
      toPosition,
      getPosition,
      getLimit,
      exceededLimit,
      reposition
    };
  }
  function Controller(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2), on = _EventInterface5.on, emit = _EventInterface5.emit;
    var Move2 = Components2.Move;
    var getPosition = Move2.getPosition, getLimit = Move2.getLimit, toPosition = Move2.toPosition;
    var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
    var omitEnd = options.omitEnd;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var endIndex;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;
    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
      on(EVENT_RESIZED, onResized);
    }
    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      endIndex = getEnd();
      var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
      if (index !== currIndex) {
        currIndex = index;
        Move2.reposition();
      }
    }
    function onResized() {
      if (endIndex !== getEnd()) {
        emit(EVENT_END_INDEX_CHANGED);
      }
    }
    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);
        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move2.move(dest, index, prevIndex, callback);
        }
      }
    }
    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function() {
        var index = loop(Move2.toIndex(getPosition()));
        setIndex(omitEnd ? min(index, endIndex) : index);
        callback && callback();
      });
    }
    function parse(control) {
      var index = currIndex;
      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, endIndex);
      }
      return index;
    }
    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : endIndex;
        }
      }
      return destination ? dest : loop(dest);
    }
    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var index = computeMovableDestIndex(dest);
        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }
        if (dest < 0 || dest > endIndex) {
          if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? endIndex : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }
      return dest;
    }
    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();
        while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
          dest < currIndex ? --dest : ++dest;
        }
      }
      return dest;
    }
    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }
    function getEnd() {
      var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
      while (omitEnd && end-- > 0) {
        if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
          end++;
          break;
        }
      }
      return clamp(end, 0, slideCount - 1);
    }
    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
    }
    function toPage(index) {
      return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
    }
    function toDest(destination) {
      var closest2 = Move2.toIndex(destination);
      return isSlide ? clamp(closest2, 0, endIndex) : closest2;
    }
    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }
    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }
    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }
    function isBusy() {
      return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
    }
    return {
      mount,
      go,
      scroll,
      getNext,
      getPrev,
      getAdjacent,
      getEnd,
      setIndex,
      getIndex,
      toIndex,
      toPage,
      toDest,
      hasFocus,
      isBusy
    };
  }
  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;
  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on, bind = event.bind, emit = event.emit;
    var classes = options.classes, i18n = options.i18n;
    var Elements2 = Components2.Elements, Controller2 = Components2.Controller;
    var placeholder = Elements2.arrows, track = Elements2.track;
    var wrapper = placeholder;
    var prev = Elements2.prev;
    var next = Elements2.next;
    var created;
    var wrapperClasses;
    var arrows = {};
    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }
    function remount() {
      destroy();
      mount();
    }
    function init() {
      var enabled = options.arrows;
      if (enabled && !(prev && next)) {
        createArrows();
      }
      if (prev && next) {
        assign(arrows, {
          prev,
          next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }
    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);
      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }
    function listen() {
      on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }
    function go(control) {
      Controller2.go(control, true);
    }
    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }
    function createArrow(prev2) {
      var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
      return parseHtml(arrow);
    }
    function update() {
      if (prev && next) {
        var index = Splide2.index;
        var prevIndex = Controller2.getPrev();
        var nextIndex = Controller2.getNext();
        var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
        var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
        prev.disabled = prevIndex < 0;
        next.disabled = nextIndex < 0;
        setAttribute(prev, ARIA_LABEL, prevLabel);
        setAttribute(next, ARIA_LABEL, nextLabel);
        emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
      }
    }
    return {
      arrows,
      mount,
      destroy,
      update
    };
  }
  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
  function Autoplay(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
    var isPaused = interval.isPaused;
    var Elements2 = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";
    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements2.track.id);
        stopped || play();
        update();
      }
    }
    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function(e5) {
          hovered = e5.type === "mouseenter";
          autoToggle();
        });
      }
      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function(e5) {
          focused = e5.type === "focusin";
          autoToggle();
        });
      }
      if (toggle) {
        bind(toggle, "click", function() {
          stopped ? play() : pause(true);
        });
      }
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }
    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }
    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }
      stopped = !!stop;
      update();
      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }
    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }
    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }
    function onAnimationFrame(rate) {
      var bar = Elements2.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }
    function onMove(index) {
      var Slide2 = Components2.Slides.getAt(index);
      interval.set(Slide2 && +getAttribute(Slide2.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }
    return {
      mount,
      destroy: interval.cancel,
      play,
      pause,
      isPaused
    };
  }
  function Cover(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2), on = _EventInterface7.on;
    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }
    function cover(cover2) {
      Components2.Slides.forEach(function(Slide2) {
        var img = child(Slide2.container || Slide2.slide, "img");
        if (img && img.src) {
          toggle(cover2, img, Slide2);
        }
      });
    }
    function toggle(cover2, img, Slide2) {
      Slide2.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
      display(img, cover2 ? "none" : "");
    }
    return {
      mount,
      destroy: apply(cover, false)
    };
  }
  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;
  function Scroll(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2), on = _EventInterface8.on, emit = _EventInterface8.emit;
    var set = Splide2.state.set;
    var Move2 = Components2.Move;
    var getPosition = Move2.getPosition, getLimit = Move2.getLimit, exceededLimit = Move2.exceededLimit, translate = Move2.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;
    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }
    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();
      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move2.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }
      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }
    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }
    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);
      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;
        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
        }
      }
    }
    function clear() {
      if (interval) {
        interval.cancel();
      }
    }
    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }
    function easing(t4) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t4) : 1 - Math.pow(1 - t4, 4);
    }
    return {
      mount,
      destroy: clear,
      scroll,
      cancel
    };
  }
  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };
  function Drag(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
    var state2 = Splide2.state;
    var Move2 = Components2.Move, Scroll2 = Components2.Scroll, Controller2 = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
    var getPosition = Move2.getPosition, exceededLimit = Move2.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;
    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }
    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }
    function onPointerDown(e5) {
      clickPrevented = false;
      if (!disabled) {
        var isTouch = isTouchEvent(e5);
        if (isDraggable(e5.target) && (isTouch || !e5.button)) {
          if (!Controller2.isBusy()) {
            target = isTouch ? track : window;
            dragging = state2.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
            Move2.cancel();
            Scroll2.cancel();
            save(e5);
          } else {
            prevent(e5, true);
          }
        }
      }
    }
    function onPointerMove(e5) {
      if (!state2.is(DRAGGING)) {
        state2.set(DRAGGING);
        emit(EVENT_DRAG);
      }
      if (e5.cancelable) {
        if (dragging) {
          Move2.translate(basePosition + constrain(diffCoord(e5)));
          var expired = diffTime(e5) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());
          if (expired || hasExceeded) {
            save(e5);
          }
          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e5);
        } else if (isSliderDirection(e5)) {
          dragging = shouldStart(e5);
          prevent(e5);
        }
      }
    }
    function onPointerUp(e5) {
      if (state2.is(DRAGGING)) {
        state2.set(IDLE);
        emit(EVENT_DRAGGED);
      }
      if (dragging) {
        move(e5);
        prevent(e5);
      }
      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }
    function onClick(e5) {
      if (!disabled && clickPrevented) {
        prevent(e5, true);
      }
    }
    function save(e5) {
      prevBaseEvent = baseEvent;
      baseEvent = e5;
      basePosition = getPosition();
    }
    function move(e5) {
      var velocity = computeVelocity(e5);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);
      if (isFree) {
        Controller2.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller2.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller2.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller2.go(Controller2.toDest(destination), true);
      }
      reduce(true);
    }
    function shouldStart(e5) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e5)) > (isTouchEvent(e5) ? touch : mouse);
    }
    function isSliderDirection(e5) {
      return abs(diffCoord(e5)) > abs(diffCoord(e5, true));
    }
    function computeVelocity(e5) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e5);
        if (time && time < LOG_INTERVAL) {
          return diffCoord(e5) / time;
        }
      }
      return 0;
    }
    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
    }
    function diffCoord(e5, orthogonal) {
      return coordOf(e5, orthogonal) - coordOf(getBaseEvent(e5), orthogonal);
    }
    function diffTime(e5) {
      return timeOf(e5) - timeOf(getBaseEvent(e5));
    }
    function getBaseEvent(e5) {
      return baseEvent === e5 && prevBaseEvent || baseEvent;
    }
    function coordOf(e5, orthogonal) {
      return (isTouchEvent(e5) ? e5.changedTouches[0] : e5)["page" + resolve(orthogonal ? "Y" : "X")];
    }
    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }
    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
    }
    function isTouchEvent(e5) {
      return typeof TouchEvent !== "undefined" && e5 instanceof TouchEvent;
    }
    function isDragging() {
      return dragging;
    }
    function disable(value) {
      disabled = value;
    }
    return {
      mount,
      disable,
      isDragging
    };
  }
  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN
  };
  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }
  var KEYBOARD_EVENT = "keydown";
  function Keyboard(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;
    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }
    function init() {
      var keyboard = options.keyboard;
      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }
    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }
    function disable(value) {
      disabled = value;
    }
    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function() {
        disabled = _disabled;
      });
    }
    function onKeydown(e5) {
      if (!disabled) {
        var key = normalizeKey(e5);
        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }
    return {
      mount,
      destroy,
      disable
    };
  }
  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];
    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }
    function init() {
      empty(entries);
      register();
      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }
    function register() {
      Components2.Slides.forEach(function(Slide2) {
        queryAll(Slide2.slide, IMAGE_SELECTOR).forEach(function(img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
            entries.push([img, Slide2, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }
    function check() {
      entries = entries.filter(function(data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }
    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }
    function onLoad(data, e5) {
      var img = data[0], Slide2 = data[1];
      removeClass(Slide2.slide, CLASS_LOADING);
      if (e5.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide2);
        emit(EVENT_RESIZE);
      }
      isSequential && loadNext();
    }
    function loadNext() {
      entries.length && load(entries.shift());
    }
    return {
      mount,
      destroy: apply(empty, entries),
      check
    };
  }
  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on, emit = event.emit, bind = event.bind;
    var Slides2 = Components2.Slides, Elements2 = Components2.Elements, Controller2 = Components2.Controller;
    var hasFocus = Controller2.hasFocus, getIndex = Controller2.getIndex, go = Controller2.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements2.pagination;
    var items = [];
    var list;
    var paginationClasses;
    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
      var enabled = options.pagination;
      placeholder && display(placeholder, enabled ? "" : "none");
      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(EVENT_PAGINATION_MOUNTED, {
          list,
          items
        }, getAt(Splide2.index));
      }
    }
    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }
      event.destroy();
    }
    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
      var max2 = hasFocus() ? Controller2.getEnd() + 1 : ceil(length / perPage);
      list = placeholder || create("ul", classes.pagination, Elements2.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
      for (var i5 = 0; i5 < max2; i5++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides2.getIn(i5).map(function(Slide2) {
          return Slide2.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i5));
        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i5));
        }
        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i5 + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li,
          button,
          page: i5
        });
      }
    }
    function onClick(page) {
      go(">" + page, true);
    }
    function onKeydown(page, e5) {
      var length = items.length;
      var key = normalizeKey(e5);
      var dir = getDirection();
      var nextPage = -1;
      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }
      var item = items[nextPage];
      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e5, true);
      }
    }
    function getDirection() {
      return options.paginationDirection || options.direction;
    }
    function getAt(index) {
      return items[Controller2.toPage(index)];
    }
    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());
      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }
      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }
      emit(EVENT_PAGINATION_UPDATED, {
        list,
        items
      }, prev, curr);
    }
    return {
      items,
      mount,
      destroy,
      getAt,
      update
    };
  }
  var TRIGGER_KEYS = [" ", "Enter"];
  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
    var events = [];
    function mount() {
      Splide2.splides.forEach(function(target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });
      if (isNavigation) {
        navigate();
      }
    }
    function destroy() {
      events.forEach(function(event) {
        event.destroy();
      });
      empty(events);
    }
    function remount() {
      destroy();
      mount();
    }
    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function(index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }
    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }
    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
    }
    function onClick(Slide2) {
      Splide2.go(Slide2.index);
    }
    function onKeydown(Slide2, e5) {
      if (includes(TRIGGER_KEYS, normalizeKey(e5))) {
        onClick(Slide2);
        prevent(e5);
      }
    }
    return {
      setup: apply(Components2.Media.set, {
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
      }, true),
      mount,
      destroy,
      remount
    };
  }
  function Wheel(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
    var lastTime = 0;
    function mount() {
      if (options.wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }
    function onWheel(e5) {
      if (e5.cancelable) {
        var deltaY = e5.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e5);
        var _min = options.wheelMinThreshold || 0;
        var sleep = options.wheelSleep || 0;
        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }
        shouldPrevent(backwards) && prevent(e5);
      }
    }
    function shouldPrevent(backwards) {
      return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
    }
    return {
      mount
    };
  }
  var SR_REMOVAL_DELAY = 90;
  function Live(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2), on = _EventInterface13.on;
    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }
    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);
      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
        interval.cancel();
      }
    }
    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }
    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }
    return {
      mount,
      disable,
      destroy
    };
  }
  var ComponentConstructors = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    Media,
    Direction,
    Elements,
    Slides,
    Layout,
    Clones,
    Move,
    Controller,
    Arrows,
    Autoplay,
    Cover,
    Scroll,
    Drag,
    Keyboard,
    LazyLoad,
    Pagination,
    Sync,
    Wheel,
    Live
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    }
  };
  function Fade(Splide2, Components2, options) {
    var Slides2 = Components2.Slides;
    function mount() {
      EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }
    function init() {
      Slides2.forEach(function(Slide2) {
        Slide2.style("transform", "translateX(-" + 100 * Slide2.index + "%)");
      });
    }
    function start(index, done) {
      Slides2.style("transition", "opacity " + options.speed + "ms " + options.easing);
      nextTick(done);
    }
    return {
      mount,
      start,
      cancel: noop
    };
  }
  function Slide(Splide2, Components2, options) {
    var Move2 = Components2.Move, Controller2 = Components2.Controller, Scroll2 = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;
    function mount() {
      EventInterface(Splide2).bind(list, "transitionend", function(e5) {
        if (e5.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }
    function start(index, done) {
      var destination = Move2.toPosition(index, true);
      var position = Move2.getPosition();
      var speed = getSpeed(index);
      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll2.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move2.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move2.jump(index);
        done();
      }
    }
    function cancel() {
      transition("");
      Scroll2.cancel();
    }
    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;
      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller2.getIndex(true);
        var end = Controller2.getEnd();
        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }
      return options.speed;
    }
    return {
      mount,
      start,
      cancel
    };
  }
  var _Splide = /* @__PURE__ */ (function() {
    function _Splide2(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide2.defaults, options || {});
      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e5) {
        assert(false, "Invalid JSON");
      }
      this._o = Object.create(merge({}, options));
    }
    var _proto = _Splide2.prototype;
    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;
      var state2 = this.state, Components2 = this.Components;
      assert(state2.is([CREATED, DESTROYED]), "Already mounted!");
      state2.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function(Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function(component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state2.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };
    _proto.sync = function sync(splide) {
      this.splides.push({
        splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });
      if (this.state.is(IDLE)) {
        this._C.Sync.remount();
        splide.Components.Sync.remount();
      }
      return this;
    };
    _proto.go = function go(control) {
      this._C.Controller.go(control);
      return this;
    };
    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };
    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };
    _proto.emit = function emit(event) {
      var _this$event;
      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
      return this;
    };
    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);
      return this;
    };
    _proto.remove = function remove2(matcher) {
      this._C.Slides.remove(matcher);
      return this;
    };
    _proto.is = function is(type) {
      return this._o.type === type;
    };
    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };
    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }
      var event = this.event, state2 = this.state;
      if (state2.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function(component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state2.set(DESTROYED);
      }
      return this;
    };
    _createClass(_Splide2, [{
      key: "options",
      get: function get() {
        return this._o;
      },
      set: function set(options) {
        this._C.Media.set(options, true, true);
      }
    }, {
      key: "length",
      get: function get() {
        return this._C.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._C.Controller.getIndex();
      }
    }]);
    return _Splide2;
  })();
  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t4) => (e5, o6) => {
    void 0 !== o6 ? o6.addInitializer(() => {
      customElements.define(t4, e5);
    }) : customElements.define(t4, e5);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t4 = o5, e5, r5) => {
    const { kind: n5, metadata: i5 } = r5;
    let s4 = globalThis.litPropertyMetadata.get(i5);
    if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r5.name, t4), "accessor" === n5) {
      const { name: o6 } = r5;
      return { set(r6) {
        const n6 = e5.get.call(this);
        e5.set.call(this, r6), this.requestUpdate(o6, n6, t4, true, r6);
      }, init(e6) {
        return void 0 !== e6 && this.C(o6, void 0, t4, e6), e6;
      } };
    }
    if ("setter" === n5) {
      const { name: o6 } = r5;
      return function(r6) {
        const n6 = this[o6];
        e5.call(this, r6), this.requestUpdate(o6, n6, t4, true, r6);
      };
    }
    throw Error("Unsupported decorator location: " + n5);
  };
  function n4(t4) {
    return (e5, o6) => "object" == typeof o6 ? r4(t4, e5, o6) : ((t5, e6, o7) => {
      const r5 = e6.hasOwnProperty(o7);
      return e6.constructor.createProperty(o7, t5), r5 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
    })(t4, e5, o6);
  }

  // output/lit/src/Carousel.ts
  var LitCarousel = class extends i4 {
    get cssText() {
      const isTrue = (v2) => v2 === true || v2 === "true" || v2 === "";
      const parse = (raw, fallback) => {
        if (raw === void 0 || raw === null || raw === "") return fallback;
        if (typeof raw === "string" && raw.charAt(0) === "{") {
          try {
            return JSON.parse(raw.replace(/'/g, '"'));
          } catch (e5) {
            return fallback;
          }
        }
        return raw;
      };
      const heading = (this.heading ?? this.getAttribute("heading")) || "";
      const description = (this.description ?? this.getAttribute("description")) || "";
      const hasHeading = !!heading || !!this.querySelector(":scope > [slot=heading]");
      const hasDescription = !!description || !!this.querySelector(":scope > [slot=description]");
      const hasControls = !!this.querySelector(":scope > [slot=controls]");
      const headingSize = (this.headingSize ?? this.getAttribute("heading-size") ?? this.getAttribute("headingsize")) || "x-large";
      const width = (this.width ?? this.getAttribute("width")) || "basic";
      const alignHeader = (this.alignHeader ?? this.getAttribute("align-header") ?? this.getAttribute("alignheader")) || "start";
      const alignControls = (this.alignControls ?? this.getAttribute("align-controls") ?? this.getAttribute("aligncontrols")) || "auto";
      const gradient = isTrue(this.gradient ?? this.getAttribute("gradient"));
      const pagination = parse(this.pagination ?? this.getAttribute("pagination"), false);
      const hasPagination = pagination === true || pagination === "true" || pagination && typeof pagination === "object";
      const isCenter = alignHeader === "center";
      const slidesPerPageRaw = this.slidesPerPage ?? this.getAttribute("slides-per-page") ?? this.getAttribute("slidesperpage") ?? 1;
      const parsedSpp = parse(slidesPerPageRaw, 1);
      const sppNow = typeof parsedSpp === "object" && parsedSpp ? window.matchMedia("(min-width:1000px)").matches && parsedSpp.m !== void 0 ? parsedSpp.m : window.matchMedia("(min-width:760px)").matches && parsedSpp.s !== void 0 ? parsedSpp.s : parsedSpp.base !== void 0 ? parsedSpp.base : 1 : parsedSpp;
      const slideKids = [...this.children].filter((el) => el.slot !== "heading" && el.slot !== "description" && el.slot !== "controls" && !String(el.slot || "").startsWith("slide-") || String(el.slot || "").startsWith("slide-"));
      const slideCount = [...this.children].filter((el) => {
        const slot = el.getAttribute("slot");
        return slot !== "heading" && slot !== "description" && slot !== "controls";
      }).length;
      const sppNum = sppNow === "auto" ? 1 : Math.round(Number(sppNow) || 1);
      const amountOfPages = slideCount === 0 ? 0 : slideCount < sppNum ? 1 : slideCount - sppNum + 1;
      const hasNavigation = sppNow === "auto" || amountOfPages > 1;
      const focusCenter = isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      const isInfinite = (focusCenter ? slideCount : amountOfPages) > 5;
      const col = width === "extended" ? "1" : "2";
      const padBase = "max(22px, 10.625vw - 12px)";
      const padS = "calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " + col + ")";
      const padXxl = "calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " + col + ")";
      const pad2 = (v2) => "var(--p-carousel-ps,var(--p-carousel-px," + v2 + "))";
      const fontSize = headingSize === "xx-large" ? "var(--p-typescale-2xl)" : "var(--p-typescale-xl)";
      let out = ":host{display:flex;gap:var(--p-spacing-fluid-md) !important;flex-direction:column !important;box-sizing:content-box !important}:host([hidden]){display:none !important}:not(:defined,[data-ssr]){visibility:hidden}::slotted(*){border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl)) !important}";
      if (hasHeading || hasDescription) {
        out += '.heading,p,::slotted([slot="description"]){grid-column:1/-1 !important;color:var(--p-color-primary) !important' + (isCenter ? ";text-align:center !important;justify-self:center !important" : "") + "}";
      }
      if (hasHeading) {
        out += ".heading{max-width:56.25rem !important;margin:0 0 " + (hasDescription ? "0" : "var(--p-spacing-fluid-md)") + " !important;font:var(--p-font-weight-normal) " + fontSize + ' / var(--p-leading-normal) var(--p-font-porsche-next) !important}::slotted([slot="heading"]){margin:0 !important;font:var(--p-font-weight-normal) ' + fontSize + " / var(--p-leading-normal) var(--p-font-porsche-next) !important}";
      }
      if (hasDescription) {
        out += 'p,::slotted([slot="description"]){max-width:34.375rem !important;margin:var(--p-spacing-fluid-sm) 0 var(--p-spacing-fluid-md) !important;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important}';
      }
      if (hasControls) {
        const just = alignControls !== "auto" ? alignControls : isCenter ? "center" : "start";
        out += 'slot[name="controls"]{display:block;grid-column:1/-1;grid-row-start:3;align-self:center;justify-self:' + just + "}";
      }
      out += ".header{display:grid;padding-inline-start:" + pad2(padBase) + ";padding-inline-end:" + pad2(padBase) + "}.nav{display:none;color-scheme:var(--p-carousel-prev-next-color-scheme)}.btn{padding:var(--p-spacing-static-sm)}.skip-link:not(:focus){opacity:0;pointer-events:none}.slide-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.splide{overflow:hidden;padding:4px 0;margin:-4px 0}.splide__track{position:relative;padding-block:0px !important;padding-inline-start:" + pad2(padBase) + " !important;padding-inline-end:" + pad2(padBase) + " !important" + (gradient ? ";-webkit-mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%);mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%)" : "") + "}.splide__list{backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex}.splide__slide{backface-visibility:hidden;-webkit-backface-visibility:hidden;flex-shrink:0;transform:translateZ(0);border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl))}.splide__slide:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}.splide__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}.splide__track--draggable{cursor:grab;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}";
      if (isCenter) {
        out += ".splide:not(.is-overflow) .splide__list{justify-content:center}.splide:not(.is-overflow) .splide__slide:last-child{margin-inline-end:0 !important}";
      }
      if (hasPagination && hasNavigation) {
        const justPag = isInfinite ? "flex-start" : "center";
        out += ".pagination-container{display:flex;position:relative;justify-content:" + justPag + ';width:calc(20px + 8px * 4 + 8px * 4);left:calc(50% - (calc(20px + 8px * 4 + 8px * 4)) / 2);overflow-x:hidden}.pagination{display:flex;align-items:center;width:fit-content;height:8px;gap:8px;transition:transform var(--p-transition-duration,var(--p-duration-md))}.bullet{border-radius:var(--p-radius-full);background:var(--p-color-contrast-medium);width:8px;height:8px;transition:background-color var(--p-transition-duration,var(--p-duration-md)), width var(--p-transition-duration,var(--p-duration-md))}.bullet--active{background:var(--p-color-primary);height:8px;width:20px !important}@media (pointer: coarse){.pagination-container{width:calc(20px + 8px * 4 + 16px * 4 + 2 * 8px);left:calc(50% - calc(20px + 8px * 4 + 16px * 4 + 2 * 8px) / 2)}.pagination{height:calc(8px + 2 * 8px);gap:16px}.bullet{position:relative}.bullet::before{content:"";position:absolute;inset:-8px}}@media(hover:hover){.bullet{cursor:pointer}}';
      }
      out += "@media(min-width:760px){.header{grid-template-columns:minmax(0px,1fr) auto;padding-inline-start:" + pad2(padS) + ";padding-inline-end:" + pad2(padS) + (hasNavigation ? ";column-gap:var(--p-spacing-static-md)" : "") + "}.nav{grid-row-start:3;grid-column-end:-1;display:flex;gap:var(--p-spacing-static-xs);align-self:flex-start}.splide__track{padding-inline-start:" + pad2(padS) + " !important;padding-inline-end:" + pad2(padS) + " !important}}@media(min-width:1920px){.header{padding-inline-start:" + pad2(padXxl) + ";padding-inline-end:" + pad2(padXxl) + "}.splide__track{padding-inline-start:" + pad2(padXxl) + " !important;padding-inline-end:" + pad2(padXxl) + " !important}}@media(forced-colors:active){.splide__slide:focus-visible{outline-color:Highlight}}";
      return out;
    }
    connectedCallback() {
      super.connectedCallback();
      this._childObserver = new MutationObserver(() => {
        this._assignSlideSlots();
        this.requestUpdate();
      });
      this._childObserver.observe(this, { childList: true, subtree: false });
    }
    disconnectedCallback() {
      this._childObserver?.disconnect();
      this._slideObserver?.disconnect();
      this._splide?.destroy();
      this._splide = void 0;
      super.disconnectedCallback();
    }
    firstUpdated() {
      this._assignSlideSlots();
      this.requestUpdate();
      queueMicrotask(() => this._initSplide());
    }
    updated() {
      this._assignSlideSlots();
      if (this._splide) {
        this._splide.options = { drag: this._hasNavigation() };
        this._splide.refresh();
        if (this._hasNavigation()) {
          this._renderPagination();
          this._updateButtons();
        }
      }
    }
    _assignSlideSlots() {
      const slides = [...this.children].filter((el) => {
        const slot = el.getAttribute("slot");
        return slot !== "heading" && slot !== "description" && slot !== "controls";
      });
      slides.forEach((el, i5) => el.setAttribute("slot", "slide-" + i5));
      this._slides = slides;
    }
    _parseJson(raw, fallback) {
      if (raw === void 0 || raw === null || raw === "") return fallback;
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          return JSON.parse(raw.replace(/'/g, '"'));
        } catch (e5) {
          return fallback;
        }
      }
      return raw;
    }
    _isTrue(v2) {
      return v2 === true || v2 === "true" || v2 === "";
    }
    _parsedSpp() {
      return this._parseJson(this.slidesPerPage ?? this.getAttribute("slides-per-page") ?? this.getAttribute("slidesperpage") ?? 1, 1);
    }
    _parsedPagination() {
      const raw = this._parseJson(this.pagination ?? this.getAttribute("pagination"), false);
      return raw === true || raw === "true" || raw === "";
    }
    _sppNow() {
      const parsed = this._parsedSpp();
      if (parsed && typeof parsed === "object") {
        if (window.matchMedia("(min-width:1000px)").matches && parsed.m !== void 0) return parsed.m;
        if (window.matchMedia("(min-width:760px)").matches && parsed.s !== void 0) return parsed.s;
        return parsed.base !== void 0 ? parsed.base : 1;
      }
      return parsed;
    }
    _amountOfPages() {
      const count = (this._slides || []).length;
      const spp = this._sppNow() === "auto" ? 1 : Math.round(Number(this._sppNow()) || 1);
      return count === 0 ? 0 : count < spp ? 1 : count - spp + 1;
    }
    _hasNavigation() {
      return this._sppNow() === "auto" || this._amountOfPages() > 1;
    }
    _pageCount() {
      const focus2 = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      return focus2 ? (this._slides || []).length : this._amountOfPages();
    }
    _splideBreakpoints() {
      const parsed = this._parsedSpp();
      const toOpt = (val) => ({ perPage: val === "auto" ? 1 : Math.round(Number(val) || 1), autoWidth: val === "auto" });
      if (parsed && typeof parsed === "object") {
        const map = { xs: 480, s: 760, m: 1e3, l: 1300, xl: 1760, xxl: 1920 };
        const out = {};
        for (const [k2, v2] of Object.entries(parsed)) {
          if (k2 === "base") out[0] = toOpt(v2);
          else if (map[k2]) out[map[k2]] = toOpt(v2);
        }
        return out;
      }
      return { 0: toOpt(parsed) };
    }
    _initSplide() {
      const container = this.renderRoot?.querySelector("#splide");
      if (!container || this._splide) return;
      const start = Number(this.activeSlideIndex ?? this.getAttribute("active-slide-index") ?? 0) || 0;
      const rewind = this._isTrue(this.rewind ?? this.getAttribute("rewind"));
      const focus2 = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      const trim = this._isTrue(this.trimSpace ?? this.getAttribute("trim-space") ?? this.getAttribute("trimspace"));
      this._splide = new Splide(container, {
        start,
        arrows: false,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
        focus: focus2 ? "center" : void 0,
        trimSpace: trim,
        pagination: false,
        rewind,
        rewindByDrag: true,
        drag: this._hasNavigation(),
        perMove: 1,
        mediaQuery: "min",
        speed: 0,
        gap: "var(--p-spacing-fluid-md)",
        live: false,
        breakpoints: this._splideBreakpoints(),
        i18n: this._parseJson(this.intl ?? this.getAttribute("intl"), {}) || {},
        direction: this.closest("[dir]")?.getAttribute("dir") || "ltr"
      });
      this._splide.on("mounted", () => {
        this._updateButtons();
        this._renderPagination();
      });
      this._splide.on("move", (activeIndex, previousIndex) => {
        this._updateButtons();
        this._updatePagination(activeIndex);
        this.dispatchEvent(new CustomEvent("update", { bubbles: false, detail: { activeIndex, previousIndex } }));
      });
      this._splide.mount();
      const trackSlides = () => {
        const slides = this._splide?.Components?.Elements?.slides || [];
        for (const el of slides) {
          el.removeAttribute("aria-hidden");
          el.setAttribute("tabindex", "0");
        }
      };
      this._slideObserver = new MutationObserver(trackSlides);
      this._slideObserver.observe(container, { subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
      trackSlides();
    }
    _updateButtons() {
      const prev = this.renderRoot?.querySelector(".btn-prev");
      const next = this.renderRoot?.querySelector(".btn-next");
      const splide = this._splide;
      if (!prev || !next || !splide) return;
      const rewind = !!splide.options.rewind;
      const isFirst = splide.index === 0;
      const pages = this._amountOfPages();
      const isLast = splide.index >= pages - 1;
      if (isFirst && !rewind) prev.setAttribute("disabled", "true");
      else prev.removeAttribute("disabled");
      if (isLast && !rewind) next.setAttribute("disabled", "true");
      else next.removeAttribute("disabled");
    }
    _renderPagination() {
      const el = this.renderRoot?.querySelector(".pagination");
      if (!el || !this._parsedPagination() || !this._hasNavigation()) return;
      const pages = this._pageCount();
      const active = this._splide?.index || 0;
      const sanitized = active > pages - 1 ? pages - 1 : active;
      el.innerHTML = Array.from(
        { length: pages },
        (_2, i5) => '<span class="bullet' + (i5 === sanitized ? " bullet--active" : "") + '"></span>'
      ).join("");
    }
    _updatePagination(activeIndex) {
      const el = this.renderRoot?.querySelector(".pagination");
      if (!el) return;
      el.querySelector(".bullet--active")?.classList.remove("bullet--active");
      el.children[activeIndex]?.classList.add("bullet--active");
    }
    _slidePrev() {
      if (!this._splide) return;
      const focus2 = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      if (focus2) this._splide.go("<");
      else this._splide.go(this._splide.index === 0 ? this._amountOfPages() - 1 : "<");
    }
    _slideNext() {
      if (!this._splide) return;
      const focus2 = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      if (focus2) this._splide.go(">");
      else this._splide.go(this._splide.index >= this._amountOfPages() - 1 ? 0 : ">");
    }
    render() {
      const heading = (this.heading ?? this.getAttribute("heading")) || "";
      const description = (this.description ?? this.getAttribute("description")) || "";
      const hasHeading = !!heading || !!this.querySelector(":scope > [slot=heading]");
      const hasDescription = !!description || !!this.querySelector(":scope > [slot=description]");
      const hasControls = !!this.querySelector(":scope > [slot=controls]");
      const skip = this.skipLinkTarget ?? this.getAttribute("skip-link-target") ?? this.getAttribute("skiplinktarget");
      const slides = [...this.children].filter((el) => {
        const slot = el.getAttribute("slot");
        return slot !== "heading" && slot !== "description" && slot !== "controls";
      });
      if (!this._slides) this._slides = slides;
      const headingNode = !hasHeading ? A : heading ? b2`<h2 class="heading" id="heading">${heading}</h2>` : b2`<div class="heading" id="heading"><slot name="heading"></slot></div>`;
      const descNode = !hasDescription ? A : description ? b2`<p>${description}</p>` : b2`<slot name="description"></slot>`;
      const controlsNode = hasControls ? b2`<slot name="controls"></slot>` : A;
      const skipNode = skip ? b2`<p-link-pure href=${skip} icon="arrow-last" class="btn skip-link" align-label="start" hide-label="true">Skip carousel entries</p-link-pure>` : A;
      const navBtns = this._hasNavigation() ? b2`<p-button-pure class="btn btn-prev" type="button" hide-label="true" icon="arrow-left" @click=${() => this._slidePrev()}></p-button-pure><p-button-pure class="btn btn-next" type="button" hide-label="true" icon="arrow-right" @click=${() => this._slideNext()}></p-button-pure>` : A;
      const slideNodes = (this._slides || slides).map((_2, i5) => b2`<div class="splide__slide" tabindex="0"><slot name="slide-${i5}"></slot></div>`);
      const pagination = this._parsedPagination() && this._hasNavigation() ? b2`<div class="pagination-container" aria-hidden="true"><div class="pagination"></div></div>` : A;
      return b2`<style .innerHTML="${this.cssText}"></style><div class="header">${headingNode}${descNode}${controlsNode}<div class="nav">${skipNode}${navBtns}</div></div><div id="splide" class="splide" @mousedown=${(e5) => e5.preventDefault()}><div class="splide__track"><div class="splide__list">${slideNodes}</div></div></div>${pagination}<div class="slide-status" aria-live="polite" aria-atomic="true"></div>`;
    }
  };
  LitCarousel.styles = i`
      :host {
          display: flex;
          flex-direction: column;
        }
        :host([hidden]) {
          display: none !important;
        }
`;
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "trimSpace", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "focusOnCenterSlide", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "skipLinkTarget", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "activeSlideIndex", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "intl", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "aria", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "slidesPerPage", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "rewind", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "heading", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "description", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "headingSize", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "width", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "alignHeader", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "alignControls", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "gradient", 2);
  __decorateClass([
    n4()
  ], LitCarousel.prototype, "pagination", 2);
  LitCarousel = __decorateClass([
    t3("lit-carousel")
  ], LitCarousel);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@splidejs/splide/dist/js/splide.esm.js:
  (*!
   * Splide.js
   * Version  : 4.1.4
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
