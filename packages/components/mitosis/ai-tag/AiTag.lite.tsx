import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({
  tagName: 'p-ai-tag',
});

const ZH_REGION: Record<string, string> = { CN: 'zhCN', HK: 'zhHK', TW: 'zhTW' };

const AI_TAG_TRANSLATIONS: Record<string, { short: string; long: string; generated: string; modified: string }> = {
  ar: {
    short: 'AI',
    long: 'الذكاء الاصطناعي',
    generated: 'مُنشأ بواسطة الذكاء الاصطناعي',
    modified: 'مُعدَّل بواسطة الذكاء الاصطناعي',
  },
  bg: {
    short: 'ИИ',
    long: 'изкуствен интелект',
    generated: 'генериран от изкуствен интелект',
    modified: 'модифициран от изкуствен интелект',
  },
  bs: { short: 'AI', long: 'vještačka inteligencija', generated: 'AI-generisano', modified: 'AI-modifikovano' },
  cs: { short: 'AI', long: 'umělá inteligence', generated: 'Vytvořeno AI', modified: 'Upraveno AI' },
  da: { short: 'KI', long: 'kunstig intelligens', generated: 'AI-genereret', modified: 'AI-modificeret' },
  de: { short: 'KI', long: 'künstliche Intelligenz', generated: 'KI-generiert', modified: 'KI-modifiziert' },
  el: {
    short: 'ΤΝ',
    long: 'τεχνητή νοημοσύνη',
    generated: 'Δημιουργημένο από ΤΝ',
    modified: 'Τροποποιημένο από ΤΝ',
  },
  en: { short: 'AI', long: 'artificial intelligence', generated: 'AI-generated', modified: 'AI-modified' },
  es: {
    short: 'IA',
    long: 'inteligencia artificial',
    generated: 'Generado por IA',
    modified: 'Modificado por IA',
  },
  et: { short: 'TI', long: 'tehisintellekt', generated: 'TI abil loodud', modified: 'TI abil muudetud' },
  fi: { short: 'AI', long: 'tekoäly', generated: 'Tekoälyn tuottama', modified: 'Tekoälyn muokkaama' },
  fr: {
    short: 'IA',
    long: 'intelligence artificielle',
    generated: 'Généré par une IA',
    modified: 'Modifié par une IA',
  },
  he: {
    short: 'AI',
    long: 'בינה מלאכותית',
    generated: 'נוצר על ידי בינה מלאכותית',
    modified: 'נערך באמצעות בינה מלאכותית',
  },
  hr: {
    short: 'UI',
    long: 'umjetna inteligencija',
    generated: 'Generirano uz pomoć UI',
    modified: 'Izmijenjeno uz pomoć UI',
  },
  hu: {
    short: 'MI',
    long: 'mesterséges intelligencia',
    generated: 'MI-generált',
    modified: 'MI-módosított',
  },
  is: {
    short: 'AI',
    long: 'gervigreind',
    generated: 'Búið til af gervigreind',
    modified: 'Breytt af gervigreind',
  },
  it: {
    short: 'IA',
    long: 'intelligenza artificiale',
    generated: "Generato dall'IA",
    modified: "Modificato dall'IA",
  },
  ja: { short: 'AI', long: '人工知能', generated: 'AIによる生成', modified: 'AIによる修正' },
  ko: { short: 'AI', long: '인공지능', generated: '인공지능 생성', modified: '인공지능 수정' },
  lt: { short: 'DI', long: 'dirbtinis intelektas', generated: 'DI sugeneruotas', modified: 'DI modifikuotas' },
  lv: { short: 'MI', long: 'mākslīgais intelekts', generated: 'MI ģenerēts', modified: 'MI pārveidots' },
  me: { short: 'AI', long: 'veštačka inteligencija', generated: 'AI-generisano', modified: 'AI-modifikovano' },
  mk: {
    short: 'ВИ',
    long: 'вештачка интелигенција',
    generated: 'Создадено од ВИ',
    modified: 'Изменето со ВИ',
  },
  mt: { short: 'AI', long: 'artificial intelligence', generated: 'AI-generated', modified: 'AI-modified' },
  no: { short: 'KI', long: 'kunstig intelligens', generated: 'KI-generert', modified: 'KI-modifisert' },
  nl: {
    short: 'AI',
    long: 'kunstmatige intelligentie',
    generated: 'Door AI gegenereerd',
    modified: 'Door AI gewijzigd',
  },
  pl: {
    short: 'SI',
    long: 'sztuczna inteligencja',
    generated: 'Wygenerowane przez SI',
    modified: 'Zmodyfikowane przez SI',
  },
  pt: {
    short: 'IA',
    long: 'inteligência artificial',
    generated: 'Gerado por IA',
    modified: 'Modificado por IA',
  },
  ro: {
    short: 'IA',
    long: 'inteligență artificială',
    generated: 'Generat cu ajutorul IA',
    modified: 'Modificat cu ajutorul IA',
  },
  ru: {
    short: 'ИИ',
    long: 'искусственный интеллект',
    generated: 'Сгенерировано ИИ',
    modified: 'Изменено ИИ',
  },
  sk: { short: 'AI', long: 'umelá inteligencia', generated: 'Vytvorené AI', modified: 'Upravené AI' },
  sl: { short: 'UI', long: 'umetna inteligenca', generated: 'Ustvarjeno z UI', modified: 'Spremenjeno z UI' },
  sr: { short: 'AI', long: 'veštačka inteligencija', generated: 'AI-generisano', modified: 'AI-modifikovano' },
  sv: { short: 'AI', long: 'artificiell intelligens', generated: 'AI-genererad', modified: 'AI-modifierad' },
  tr: {
    short: 'AI',
    long: 'yapay zeka',
    generated: 'Yapay zeka tarafından üretilmiş',
    modified: 'Yapay zeka tarafından değiştirilmiş',
  },
  uk: { short: 'ШІ', long: 'штучний інтелект', generated: 'Згенеровано ШІ', modified: 'Змінено ШІ' },
  zhCN: { short: 'AI', long: '人工智能', generated: 'AI生成', modified: 'AI润色' },
  zhHK: { short: 'AI', long: '人工智能', generated: '由 AI 生成的', modified: '經 AI 修改的' },
  zhTW: { short: 'AI', long: '人工智慧', generated: 'AI生成', modified: 'AI修改' },
};

export default function LitAiTag(props: { locale?: string; variant?: string }) {
  const state = useStore({
    get translation(): any {
      const locale = props.locale || 'en-US';
      const [language, region] = String(locale).replace(/-/g, '_').split('_');
      let key = language === 'nb' ? 'no' : language;
      if (language === 'zh' && region && ZH_REGION[region]) key = ZH_REGION[region];
      return AI_TAG_TRANSLATIONS[key] || AI_TAG_TRANSLATIONS.en;
    },
    get isAbbreviation(): any {
      return (props.variant || 'generated') === 'abbreviation';
    },
    get shortLabel(): string {
      return state.translation.short;
    },
    get longLabel(): string {
      return state.translation.long;
    },
    get copyLabel(): string {
      const variant = props.variant || 'generated';
      if (variant === 'modified') return state.translation.modified;
      return state.translation.generated;
    },
  });

  useStyle(`
    :host {
      display: inline-flex;
      vertical-align: top;
      white-space: nowrap;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    abbr {
      all: unset;
    }
    div {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 0 var(--p-spacing-static-sm) 0 var(--p-spacing-static-xs);
      border-radius: calc(var(--p-spacing-static-xs) + (var(--p-leading-normal) / 2));
      font-size: var(--p-typescale-2xs);
      color: var(--p-color-contrast-high);
      background: var(--p-color-frosted-strong);
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), backdrop-filter var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    div::before {
      content: "";
      width: 1rem;
      height: 1rem;
      background: var(--p-color-contrast-high);
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0"/></svg>') center/contain no-repeat;
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0"/></svg>') center/contain no-repeat;
    }
    @media (forced-colors: active) {
      div {
        outline: 1px solid transparent;
      }
      div::before {
        background: CanvasText;
      }
    }
  `);

  return (
    <div>
      {state.isAbbreviation ? (
        <abbr title={state.longLabel}>{state.shortLabel}</abbr>
      ) : (
        state.copyLabel
      )}
    </div>
  );
}
