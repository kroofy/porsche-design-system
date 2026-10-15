import{a as b,T as d,b as c,D as $,N as f}from"./demos-BkDTeAY5.js";window.__PDS_DEMOS=b.map(e=>({tag:e.tag,stage:!!e.stage,variants:e.variants.map(t=>t.name)}));const m=["react","upstream"],S=()=>{const e=new URLSearchParams(location.hash.slice(1)),t=(e.get("targets")??m.join(",")).split(",").filter(s=>d.includes(s)),n=e.get("tag")??"button";return{tag:$.has(n)?n:"button",targets:t.length?t:m,theme:e.get("theme")==="dark"?"dark":"light",variant:e.get("variant")??void 0,filter:""}};let a=S();const T=()=>{const e=new URLSearchParams({tag:a.tag,targets:a.targets.join(","),theme:a.theme});a.variant&&e.set("variant",a.variant),history.replaceState(null,"",`#${e}`)},A=(e,t,n,s)=>{const o=new URLSearchParams({target:e,tag:t,theme:n});return s&&o.set("variant",s),`frame.html?${o}`},r=document.getElementById("app");r.innerHTML=`
  <header class="topbar">
    <div class="brand">
      <strong>PDS Mitosis playground</strong>
      <span>One <code>.lite.tsx</code> per component, compiled to React, Vue, Svelte, Angular and Lit (web components), next to upstream Stencil v4.8.0 from the Porsche CDN.</span>
    </div>
    <div class="controls">
      <fieldset class="theme" aria-label="Color scheme">
        <label><input type="radio" name="theme" value="light" /> Light</label>
        <label><input type="radio" name="theme" value="dark" /> Dark</label>
      </fieldset>
      <fieldset class="targets" aria-label="Targets">
        ${d.map(e=>`<label><input type="checkbox" name="target" value="${e}" /> ${c[e]}</label>`).join("")}
        <button type="button" class="all-targets">All</button>
      </fieldset>
    </div>
  </header>
  <div class="layout">
    <nav class="sidebar" aria-label="Components">
      <label class="search"><span class="sr-only">Filter components</span><input type="search" placeholder="Filter components" /></label>
      <div class="nav-groups"></div>
    </nav>
    <main class="main">
      <div class="main-head">
        <h1></h1>
        <div class="variant-picker" role="group" aria-label="Variant"></div>
      </div>
      <p class="note" hidden></p>
      <div class="columns"></div>
    </main>
  </div>
`;const D=r.querySelector(".nav-groups"),g=r.querySelector(".columns"),j=r.querySelector("h1"),q=r.querySelector(".variant-picker"),v=r.querySelector(".search input"),y=r.querySelector(".note");let w;fetch("verify-report.json").then(e=>e.ok?e.json():null).then(e=>{e&&(w=new Map(e.results.map(t=>[`${t.target}:${t.tag}`,t.status])),E())}).catch(()=>{});const x={ok:"renders",empty:"renders nothing",error:"render error"},L=()=>{const e=new Map;for(const t of b)a.filter&&!t.tag.includes(a.filter)||e.set(t.group,[...e.get(t.group)??[],t.tag]);D.innerHTML=[...e].map(([t,n])=>`
      <section>
        <h2>${t}</h2>
        <ul>${n.map(s=>`<li><a href="#" data-tag="${s}"${s===a.tag?' aria-current="page"':""}>p-${s}</a></li>`).join("")}</ul>
      </section>`).join("")};let k=0;const u=new Map;let p="";const E=()=>{k+=1,u.clear(),p="";const e=$.get(a.tag);if(!e)return;document.documentElement.classList.toggle("scheme-dark",a.theme==="dark"),y.hidden=!f[e.tag],y.textContent=f[e.tag]??"",j.innerHTML=`p-${e.tag} <small>${e.stage?"overlay · one variant per frame":`${e.variants.length} variants`}</small>`;const t=e.stage?(e.variants.find(n=>n.name===a.variant)??e.variants[0]).name:void 0;q.innerHTML=e.stage?e.variants.map(n=>`<button type="button" data-variant="${n.name}" aria-pressed="${n.name===t}">${n.name}</button>`).join(""):"",g.style.setProperty("--columns",String(a.targets.length)),g.innerHTML=a.targets.map(n=>{const s=A(n,e.tag,a.theme,t),o=w?.get(`${n}:${e.tag}`),l=o?`<span class="badge" data-status="${o}">${x[o]}</span>`:"";return`
        <section class="column" data-target="${n}">
          <header><h2>${c[n]} ${l}</h2><a href="${s}" target="_blank" rel="noopener" aria-label="Open ${c[n]} frame in a new tab">open ↗</a></header>
          <iframe title="${c[n]} p-${e.tag}" src="${s}" loading="eager" style="height:${e.stage?600:400}px"></iframe>
        </section>`}).join("")},i=()=>{T();for(const e of r.querySelectorAll('input[name="theme"]'))e.checked=e.value===a.theme;for(const e of r.querySelectorAll('input[name="target"]'))e.checked=a.targets.includes(e.value);L(),E()};window.addEventListener("message",e=>{const t=[...g.querySelectorAll("iframe")],n=t.find(s=>s.contentWindow===e.source);if(n&&(e.data?.type==="pds-frame-size"&&(n.style.height=`${Math.max(120,e.data.height)}px`),e.data?.type==="pds-frame-rows")){u.set(e.source,e.data.rows);const s=[];for(const l of u.values())l.forEach((M,h)=>{s[h]=Math.max(s[h]??0,M)});const o=s.join(",");if(o===p)return;p=o;for(const l of t)l.contentWindow?.postMessage({type:"pds-frame-min-rows",rows:s,generation:k},"*")}});r.addEventListener("click",e=>{const t=e.target,n=t.closest("a[data-tag]");if(n){e.preventDefault(),a={...a,tag:n.dataset.tag,variant:void 0},i();return}const s=t.closest("button[data-variant]");if(s){a={...a,variant:s.dataset.variant},i();return}t.closest(".all-targets")&&(a={...a,targets:[...d]},i())});r.addEventListener("change",e=>{const t=e.target;if(t.name==="theme"&&(a={...a,theme:t.value}),t.name==="target"){const n=d.filter(s=>s===t.value?t.checked:a.targets.includes(s));a={...a,targets:n.length?n:m}}i()});v.addEventListener("input",()=>{a={...a,filter:v.value.trim().toLowerCase()},L()});window.addEventListener("hashchange",()=>{a={...S(),filter:a.filter},i()});i();
