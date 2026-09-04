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

  // @lit/reactive-element/css-tag.js
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

  // @lit/reactive-element/reactive-element.js
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

  // lit-html/lit-html.js
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

  // lit-element/lit-element.js
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

  // @lit/reactive-element/decorators/custom-element.js
  var t3 = (t4) => (e5, o6) => {
    void 0 !== o6 ? o6.addInitializer(() => {
      customElements.define(t4, e5);
    }) : customElements.define(t4, e5);
  };

  // @lit/reactive-element/decorators/property.js
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

  // ../../components/mitosis/checkbox/output/lit/Checkbox.ts
  var CHECK_MASK = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>') center/contain no-repeat`;
  var DASH_MASK = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>') center/contain no-repeat`;
  var BREAKPOINTS = ["base", "xs", "s", "m", "l", "xl", "xxl"];
  var assignHide = (vars, bp, hidden) => {
    const p3 = bp === "base" ? "--p-cb-lw" : `--p-cb-lw-${bp}`;
    if (hidden) {
      vars[`${p3}-pos`] = "absolute";
      vars[`${p3}-w`] = "1px";
      vars[`${p3}-h`] = "1px";
      vars[`${p3}-pad`] = "0";
      vars[`${p3}-m`] = "-1px";
      vars[`${p3}-ov`] = "hidden";
      vars[`${p3}-clip`] = "rect(0, 0, 0, 0)";
      vars[`${p3}-ws`] = "nowrap";
      vars[`${p3}-minw`] = "";
      vars[`${p3}-pt`] = "";
      vars[`${p3}-pis`] = "";
      return;
    }
    vars[`${p3}-pos`] = "static";
    vars[`${p3}-w`] = "auto";
    vars[`${p3}-h`] = "auto";
    vars[`${p3}-pad`] = "0";
    vars[`${p3}-m`] = "0";
    vars[`${p3}-ov`] = "visible";
    vars[`${p3}-clip`] = "auto";
    vars[`${p3}-ws`] = "normal";
    vars[`${p3}-minw`] = "fit-content";
    vars[`${p3}-pt`] = "max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))";
    vars[`${p3}-pis`] = "calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)";
  };
  var LitCheckbox = class extends i4 {
    get hostStyle() {
      const parse = (raw, fallback) => {
        if (raw === void 0 || raw === null || raw === "") return fallback;
        if (typeof raw === "string" && raw.charAt(0) === "{") {
          try {
            return JSON.parse(
              raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
            );
          } catch (e5) {
            return fallback;
          }
        }
        return raw;
      };
      const isTrue = (v2) => v2 === true || v2 === "true" || v2 === "";
      const pick = (obj, key, fallback) => {
        if (obj && typeof obj === "object") {
          if (obj[key] === void 0) return fallback;
          return obj[key];
        }
        return obj;
      };
      const disabled = isTrue(this.disabled);
      const loading = isTrue(this.loading);
      const compact = isTrue(this.compact);
      const blocked = disabled || loading;
      const formState = this.state || "none";
      const message = this.message || "";
      const hasMsg = !!message && (formState === "success" || formState === "error");
      const hasLbl = !!(this.label || "");
      const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
      const hideBase = typeof hideLabel === "object" && hideLabel !== null ? pick(hideLabel, "base", false) : hideLabel;
      const palettes = {
        none: {
          bg: "var(--p-checkbox-background-color, var(--p-color-frosted))",
          border: "var(--p-checkbox-border-color, var(--p-color-contrast-lower))",
          hover: "var(--p-checkbox-border-color, var(--p-color-primary))",
          checked: "var(--p-color-primary)",
          checkedHover: "var(--p-checkbox-border-color, var(--p-color-contrast-high))",
          indeterminate: "var(--p-color-primary)",
          message: ""
        },
        success: {
          bg: "var(--p-checkbox-background-color, var(--p-color-success-frosted-soft))",
          border: "var(--p-checkbox-border-color, var(--p-color-success))",
          hover: "var(--p-checkbox-border-color, var(--p-color-success))",
          checked: "var(--p-color-success)",
          checkedHover: "",
          indeterminate: "var(--p-color-success)",
          message: "var(--p-color-success)"
        },
        error: {
          bg: "var(--p-checkbox-background-color, var(--p-color-error-frosted-soft))",
          border: "var(--p-checkbox-border-color, var(--p-color-error))",
          hover: "var(--p-checkbox-border-color, var(--p-color-error))",
          checked: "var(--p-color-error)",
          checkedHover: "",
          indeterminate: "var(--p-color-error)",
          message: "var(--p-color-error)"
        }
      };
      const palette = palettes[formState] || palettes.none;
      const vars = {
        "--p-cb-scale": compact ? "0.64285714" : "1",
        "--p-cb-radius": compact ? "var(--p-radius-md)" : "var(--p-radius-lg)",
        "--p-cb-bg": palette.bg,
        "--p-cb-border": palette.border,
        "--p-cb-hover": palette.hover,
        "--p-cb-checked": loading ? "" : palette.checked,
        "--p-cb-checked-hover": !loading && formState === "none" ? palette.checkedHover : "",
        "--p-cb-checked-hover-border": !loading && formState === "none" ? "transparent" : "",
        "--p-cb-indeterminate": loading ? "" : palette.indeterminate,
        "--p-cb-check-mask": loading ? "" : CHECK_MASK,
        "--p-cb-dash-mask": loading ? "" : DASH_MASK,
        "--p-cb-icon-bg": loading ? "" : "var(--p-checkbox-icon-color, var(--p-color-canvas))",
        "--p-cb-pe": blocked ? "none" : "",
        "--p-cb-cursor": blocked ? "not-allowed" : "pointer",
        "--p-cb-opacity": disabled ? "0.4" : "",
        "--p-cb-fc-border": blocked ? "GrayText" : "",
        "--p-cb-spinner-display": loading ? "" : "none",
        "--p-cb-lw-display": hasLbl ? "" : "none",
        "--p-cb-msg": palette.message,
        "--p-cb-msg-opacity": hasMsg ? "" : "0",
        "--p-cb-msg-pos": hasMsg ? "" : "absolute",
        "--p-cb-icon-display": hasMsg ? "" : "none"
      };
      if (typeof hideLabel === "object" && hideLabel !== null) {
        let last = isTrue(hideBase);
        for (const bp of BREAKPOINTS) {
          if (hideLabel[bp] !== void 0)
            last = isTrue(pick(hideLabel, bp, hideBase));
          assignHide(vars, bp, last);
        }
      } else {
        assignHide(vars, "base", isTrue(hideBase));
      }
      return vars;
    }
    get labelText() {
      return this.label || "";
    }
    get messageText() {
      const formState = this.state || "none";
      const message = this.message || "";
      if (!message || formState !== "success" && formState !== "error")
        return "";
      return message;
    }
    get iconName() {
      const formState = this.state || "none";
      const message = this.message || "";
      if (!message || formState !== "success" && formState !== "error")
        return "";
      return formState === "error" ? "exclamation" : "check";
    }
    get iconColor() {
      const formState = this.state || "none";
      if (formState === "error") return "error";
      if (formState === "success") return "success";
      return "";
    }
    get isChecked() {
      return this.checked === true || this.checked === "true" || this.checked === "";
    }
    get isDisabled() {
      return this.disabled === true || this.disabled === "true" || this.disabled === "";
    }
    get ariaDisabled() {
      const disabled = this.disabled === true || this.disabled === "true" || this.disabled === "";
      const loading = this.loading === true || this.loading === "true" || this.loading === "";
      return disabled || loading ? "true" : "";
    }
    get ariaInvalid() {
      return this.state === "error" ? "true" : "";
    }
    get loadingText() {
      const loading = this.loading === true || this.loading === "true" || this.loading === "";
      return loading ? "Loading" : "";
    }
    get iconSrc() {
      const files = {
        check: "check.8ba06be.svg",
        exclamation: "exclamation.46cd17b.svg"
      };
      const name = this.iconName;
      if (files[name]) return "http://localhost:3001/icons/" + files[name];
      return "";
    }
    connectedCallback() {
      super.connectedCallback();
      this.applyHostStyle();
    }
    updated() {
      this.applyHostStyle();
      const input = this.renderRoot?.querySelector("input");
      if (input) {
        const raw = this.indeterminate ?? this.getAttribute("indeterminate");
        input.indeterminate = raw === true || raw === "true" || raw === "";
      }
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
    render() {
      return b2`<div class="root"><div class="wrapper"><div class="input-wrapper"><input type="checkbox" id="x" .checked=${!!this.isChecked} ?disabled=${!!this.isDisabled} aria-disabled=${this.ariaDisabled || A} aria-invalid=${this.ariaInvalid || A}><p-spinner class="spinner" aria-hidden="true"></p-spinner></div><div class="label-wrapper"><label class="label" id="label" for="x">${this.labelText}</label></div></div><span class="message" id="message"><p-icon name=${this.iconName || A} source=${this.iconSrc || A} color=${this.iconColor || A} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;
    }
  };
  LitCheckbox.styles = i`
      :host {
          display: block;
          --_p-checkbox-scaling: var(--p-cb-scale, 1);
        }
        :host([hidden]) {
          display: none !important;
        }
        :not(:defined, [data-ssr]) {
          visibility: hidden;
        }
        slot[name="label-after"] {
          display: inline-block;
          vertical-align: top;
        }
        slot[name="label-after"]::slotted(*) {
          margin-inline-start: var(--p-spacing-static-xs) !important;
        }
        .label-after {
          display: inline-block;
          vertical-align: top;
        }
        input {
          all: unset;
          display: grid;
          width: calc(var(--_p-checkbox-scaling) * 1.75rem);
          height: calc(var(--_p-checkbox-scaling) * 1.75rem);
          margin-block: max(
            0px,
            calc(
              (var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2
            )
          );
          box-sizing: border-box;
          font: var(--p-typescale-sm) var(--p-font-porsche-next);
          background: var(--p-cb-bg);
          transition: background-color
              var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out),
            border-color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
          border: 1px solid var(--p-cb-border);
          border-radius: var(--p-cb-radius);
          pointer-events: var(--p-cb-pe);
        }
        input::before {
          content: "";
          grid-area: 1 / 1;
        }
        input::after {
          content: "";
          margin: calc(
            -1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2)
          );
          grid-area: 1 / 1;
        }
        input:focus-visible {
          outline: 2px solid var(--p-color-focus);
          outline-offset: 2px;
        }
        input:indeterminate::before {
          -webkit-mask: var(--p-cb-dash-mask);
          mask: var(--p-cb-dash-mask);
          background-color: var(--p-cb-indeterminate);
        }
        input:checked {
          background: var(--p-cb-checked);
        }
        input:checked::before {
          -webkit-mask: var(--p-cb-check-mask);
          mask: var(--p-cb-check-mask);
          background-color: var(--p-cb-icon-bg);
        }
        .root {
          display: grid;
          row-gap: var(--p-spacing-static-xs);
        }
        .wrapper {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
        }
        .input-wrapper {
          position: relative;
          align-items: center;
          display: grid;
          align-self: flex-start;
          min-height: var(--p-leading-normal);
          cursor: var(--p-cb-cursor, pointer);
          opacity: var(--p-cb-opacity);
        }
        .spinner,
        p-spinner {
          display: var(--p-cb-spinner-display);
        }
        .spinner {
          --p-spinner-size: calc(calc(var(--_p-checkbox-scaling) * 1.75rem) - 2px);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .label-wrapper {
          display: var(--p-cb-lw-display);
          position: var(--p-cb-lw-pos, static);
          width: var(--p-cb-lw-w, auto);
          height: var(--p-cb-lw-h, auto);
          padding: var(--p-cb-lw-pad, 0);
          margin: var(--p-cb-lw-m, 0);
          overflow: var(--p-cb-lw-ov, visible);
          clip: var(--p-cb-lw-clip, auto);
          white-space: var(--p-cb-lw-ws, normal);
          min-width: var(--p-cb-lw-minw);
          padding-top: var(--p-cb-lw-pt);
          padding-inline-start: var(--p-cb-lw-pis);
        }
        .label {
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          cursor: var(--p-cb-cursor, pointer);
          color: var(--p-color-primary);
          pointer-events: var(--p-cb-pe);
          opacity: var(--p-cb-opacity);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
            var(--p-ease-in-out);
          display: inline;
        }
        .label:empty {
          display: none;
        }
        .label:is(span) {
          cursor: unset;
          font-size: var(--p-typescale-xs);
          color: var(--p-color-contrast-high);
          margin-top: calc(-1 * var(--p-spacing-static-xs));
        }
        .label > slot[name="label"]::slotted(*) {
          display: inline !important;
        }
        .required {
          user-select: none;
        }
        .message {
          display: flex;
          gap: var(--p-spacing-static-xs);
          font: var(--p-font-weight-normal) var(--p-typescale-sm) /
            var(--p-leading-normal) var(--p-font-porsche-next);
          color: var(--p-cb-msg);
          opacity: var(--p-cb-msg-opacity);
          position: var(--p-cb-msg-pos);
          transition: color var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out),
            opacity var(--p-transition-duration, var(--p-duration-sm))
              var(--p-ease-in-out);
        }
        .message:empty {
          opacity: 0;
          position: absolute;
        }
        .message p-icon {
          display: var(--p-cb-icon-display);
        }
        .loading {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        }
        @media (forced-colors: active) {
          input {
            border-color: var(--p-cb-fc-border);
          }
          input:focus-visible {
            outline-color: Highlight;
          }
          input:indeterminate::before {
            background: CanvasText;
          }
          input:checked::before {
            background: CanvasText;
          }
        }
        @media (hover: hover) {
          input:hover {
            border-color: var(--p-cb-hover);
          }
          input:checked:hover {
            background-color: var(--p-cb-checked-hover);
            border-color: var(--p-cb-checked-hover-border);
          }
        }
        @media (min-width: 480px) {
          .label-wrapper {
            position: var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static));
            width: var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto));
            height: var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto));
            padding: var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0));
            margin: var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0));
            overflow: var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible));
            clip: var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto));
            white-space: var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal));
            min-width: var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw));
            padding-top: var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt));
            padding-inline-start: var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis));
          }
        }
        @media (min-width: 760px) {
          .label-wrapper {
            position: var(
              --p-cb-lw-s-pos,
              var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))
            );
            width: var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)));
            height: var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)));
            padding: var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)));
            margin: var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)));
            overflow: var(
              --p-cb-lw-s-ov,
              var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))
            );
            clip: var(
              --p-cb-lw-s-clip,
              var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))
            );
            white-space: var(
              --p-cb-lw-s-ws,
              var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))
            );
            min-width: var(
              --p-cb-lw-s-minw,
              var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw))
            );
            padding-top: var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)));
            padding-inline-start: var(
              --p-cb-lw-s-pis,
              var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis))
            );
          }
        }
        @media (min-width: 1000px) {
          .label-wrapper {
            position: var(
              --p-cb-lw-m-pos,
              var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static)))
            );
            width: var(
              --p-cb-lw-m-w,
              var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
            );
            height: var(
              --p-cb-lw-m-h,
              var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
            );
            padding: var(
              --p-cb-lw-m-pad,
              var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
            );
            margin: var(
              --p-cb-lw-m-m,
              var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
            );
            overflow: var(
              --p-cb-lw-m-ov,
              var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)))
            );
            clip: var(
              --p-cb-lw-m-clip,
              var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto)))
            );
            white-space: var(
              --p-cb-lw-m-ws,
              var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))
            );
            min-width: var(
              --p-cb-lw-m-minw,
              var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
            );
            padding-top: var(
              --p-cb-lw-m-pt,
              var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
            );
            padding-inline-start: var(
              --p-cb-lw-m-pis,
              var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
            );
          }
        }
        @media (min-width: 1300px) {
          .label-wrapper {
            position: var(
              --p-cb-lw-l-pos,
              var(
                --p-cb-lw-m-pos,
                var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static)))
              )
            );
            width: var(
              --p-cb-lw-l-w,
              var(
                --p-cb-lw-m-w,
                var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))
              )
            );
            height: var(
              --p-cb-lw-l-h,
              var(
                --p-cb-lw-m-h,
                var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))
              )
            );
            padding: var(
              --p-cb-lw-l-pad,
              var(
                --p-cb-lw-m-pad,
                var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))
              )
            );
            margin: var(
              --p-cb-lw-l-m,
              var(
                --p-cb-lw-m-m,
                var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))
              )
            );
            overflow: var(
              --p-cb-lw-l-ov,
              var(
                --p-cb-lw-m-ov,
                var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)))
              )
            );
            clip: var(
              --p-cb-lw-l-clip,
              var(
                --p-cb-lw-m-clip,
                var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto)))
              )
            );
            white-space: var(
              --p-cb-lw-l-ws,
              var(
                --p-cb-lw-m-ws,
                var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))
              )
            );
            min-width: var(
              --p-cb-lw-l-minw,
              var(
                --p-cb-lw-m-minw,
                var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))
              )
            );
            padding-top: var(
              --p-cb-lw-l-pt,
              var(
                --p-cb-lw-m-pt,
                var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))
              )
            );
            padding-inline-start: var(
              --p-cb-lw-l-pis,
              var(
                --p-cb-lw-m-pis,
                var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))
              )
            );
          }
        }
        @media (min-width: 1760px) {
          .label-wrapper {
            position: var(--p-cb-lw-xl-pos, var(--p-cb-lw-l-pos));
            width: var(--p-cb-lw-xl-w, var(--p-cb-lw-l-w));
            height: var(--p-cb-lw-xl-h, var(--p-cb-lw-l-h));
            padding: var(--p-cb-lw-xl-pad, var(--p-cb-lw-l-pad));
            margin: var(--p-cb-lw-xl-m, var(--p-cb-lw-l-m));
            overflow: var(--p-cb-lw-xl-ov, var(--p-cb-lw-l-ov));
            clip: var(--p-cb-lw-xl-clip, var(--p-cb-lw-l-clip));
            white-space: var(--p-cb-lw-xl-ws, var(--p-cb-lw-l-ws));
            min-width: var(--p-cb-lw-xl-minw, var(--p-cb-lw-l-minw));
            padding-top: var(--p-cb-lw-xl-pt, var(--p-cb-lw-l-pt));
            padding-inline-start: var(--p-cb-lw-xl-pis, var(--p-cb-lw-l-pis));
          }
        }
        @media (min-width: 1920px) {
          .label-wrapper {
            position: var(--p-cb-lw-xxl-pos, var(--p-cb-lw-xl-pos));
            width: var(--p-cb-lw-xxl-w, var(--p-cb-lw-xl-w));
            height: var(--p-cb-lw-xxl-h, var(--p-cb-lw-xl-h));
            padding: var(--p-cb-lw-xxl-pad, var(--p-cb-lw-xl-pad));
            margin: var(--p-cb-lw-xxl-m, var(--p-cb-lw-xl-m));
            overflow: var(--p-cb-lw-xxl-ov, var(--p-cb-lw-xl-ov));
            clip: var(--p-cb-lw-xxl-clip, var(--p-cb-lw-xl-clip));
            white-space: var(--p-cb-lw-xxl-ws, var(--p-cb-lw-xl-ws));
            min-width: var(--p-cb-lw-xxl-minw, var(--p-cb-lw-xl-minw));
            padding-top: var(--p-cb-lw-xxl-pt, var(--p-cb-lw-xl-pt));
            padding-inline-start: var(--p-cb-lw-xxl-pis, var(--p-cb-lw-xl-pis));
          }
        }
`;
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "disabled", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "loading", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "compact", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "state", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "message", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "label", 2);
  __decorateClass([
    n4({ attribute: "hide-label" })
  ], LitCheckbox.prototype, "hideLabel", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "checked", 2);
  __decorateClass([
    n4()
  ], LitCheckbox.prototype, "indeterminate", 2);
  LitCheckbox = __decorateClass([
    t3("p-checkbox")
  ], LitCheckbox);
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

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
