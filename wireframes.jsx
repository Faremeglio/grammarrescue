/* global React */
const { useState, useEffect } = React;

/* =========================================================
   SHARED WIREFRAME PRIMITIVES
   Sketchy, low-fi vibe. B&W with optional pastel accents.
   ========================================================= */

const ink = '#141414';
const subInk = '#5a5a5a';
const paper = '#FBFAF7';
const lav = '#EDE7FA';
const pink = '#FBE6EE';
const yellow = '#FBF3D4';
const blue = '#E2ECF8';
const mint = '#E1F0E4';

/* dashed image placeholder */
function Img({ label = 'illustration', h = 200, w = '100%', tone = 'paper', tilt = 0, style = {} }) {
  const fills = { paper, lav, pink, yellow, blue, mint };
  return (
    <div
      style={{
        width: w,
        height: h,
        background: fills[tone] || paper,
        border: `1.5px dashed ${ink}`,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: subInk,
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 11,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        transform: `rotate(${tilt}deg)`,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.35 }}
      >
        <line x1="0" y1="100" x2="100" y2="0" stroke={ink} strokeWidth="0.4" />
      </svg>
      <span style={{ background: fills[tone] || paper, padding: '4px 10px', borderRadius: 8, position: 'relative' }}>
        {label}
      </span>
    </div>
  );
}

/* sketchy box (card) */
function Box({ children, pad = 20, radius = 18, tone = 'paper', dashed = false, style = {} }) {
  const fills = { paper: '#fff', lav, pink, yellow, blue, mint, ink };
  return (
    <div
      style={{
        background: fills[tone] || '#fff',
        border: `${dashed ? '1.5px dashed' : '1.5px solid'} ${ink}`,
        borderRadius: radius,
        padding: pad,
        color: tone === 'ink' ? '#fff' : ink,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* handwritten accent */
function Hand({ children, size = 28, color = ink, rotate = -3, style = {} }) {
  return (
    <span
      style={{
        fontFamily: '"Caveat", "Patrick Hand", cursive',
        fontSize: size,
        color,
        display: 'inline-block',
        transform: `rotate(${rotate}deg)`,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* placeholder text bar */
function Bar({ w = '100%', h = 12, dark = false, style = {} }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: dark ? ink : '#dcdad3',
        borderRadius: 99,
        ...style,
      }}
    />
  );
}

function Lines({ count = 3, widths = ['100%', '92%', '78%'] }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Bar key={i} w={widths[i % widths.length]} h={9} />
      ))}
    </div>
  );
}

/* badge / chip */
function Chip({ children, tone = 'paper', dashed = false }) {
  const fills = { paper: '#fff', lav, pink, yellow, blue, mint, ink };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 14px',
        background: fills[tone] || '#fff',
        border: `${dashed ? '1.2px dashed' : '1.2px solid'} ${ink}`,
        borderRadius: 99,
        fontSize: 13,
        color: tone === 'ink' ? '#fff' : ink,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

/* CTA button (sketchy) */
function CTA({ children, primary = true, size = 'md' }) {
  const sizes = {
    sm: { pad: '10px 18px', fs: 13 },
    md: { pad: '14px 26px', fs: 15 },
    lg: { pad: '18px 34px', fs: 17 },
  };
  const s = sizes[size];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: s.pad,
        background: primary ? ink : '#fff',
        color: primary ? '#fff' : ink,
        border: `1.5px solid ${ink}`,
        borderRadius: 99,
        fontSize: s.fs,
        fontWeight: 600,
        boxShadow: primary ? `4px 4px 0 ${ink}` : 'none',
        position: 'relative',
      }}
    >
      {children}
      <span style={{ fontSize: s.fs + 2 }}>→</span>
    </span>
  );
}

/* section heading w/ optional sketchy underline */
function H({ children, size = 40, underline = false, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: '"Archivo", "Helvetica Neue", system-ui, sans-serif',
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: -0.5,
        margin: 0,
        color: ink,
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
      {underline && (
        <svg
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          style={{ position: 'absolute', left: 0, bottom: -8, width: '100%', height: 10 }}
        >
          <path d="M2 8 Q 50 2, 100 7 T 198 6" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </h2>
  );
}

/* decorative scribble */
function Star({ size = 18, color = ink, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path
        d="M12 2 L13.5 9 L21 10 L15 14 L17 21 L12 17 L7 21 L9 14 L3 10 L10.5 9 Z"
        fill={color}
      />
    </svg>
  );
}

function Squiggle({ w = 60, color = ink, style = {} }) {
  return (
    <svg width={w} height={12} viewBox="0 0 60 12" style={style}>
      <path
        d="M2 6 Q 10 0, 18 6 T 34 6 T 50 6 T 58 6"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* sticky-note arrow callout */
function Note({ children, color = yellow, rotate = -4 }) {
  return (
    <div
      style={{
        background: color,
        border: `1.2px solid ${ink}`,
        padding: '10px 14px',
        borderRadius: 10,
        fontFamily: '"Caveat", cursive',
        fontSize: 18,
        color: ink,
        transform: `rotate(${rotate}deg)`,
        display: 'inline-block',
        lineHeight: 1.1,
        maxWidth: 220,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   COUNTDOWN (used by all three, styled differently per direction)
   ============================================================ */
function Countdown({ tone = 'lav', big = false }) {
  const fills = { paper: '#fff', lav, pink, yellow, blue, mint };
  const unit = (n, l) => (
    <div
      style={{
        background: fills[tone],
        border: `1.5px solid ${ink}`,
        borderRadius: big ? 16 : 12,
        padding: big ? '18px 22px' : '12px 16px',
        textAlign: 'center',
        minWidth: big ? 96 : 72,
      }}
    >
      <div style={{ fontSize: big ? 44 : 30, fontWeight: 800, fontFamily: '"Archivo", system-ui', lineHeight: 1 }}>
        {n}
      </div>
      <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: subInk, marginTop: 6 }}>
        {l}
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: big ? 12 : 8, alignItems: 'center' }}>
      {unit('07', 'дней')}
      <span style={{ fontSize: 32, color: subInk }}>:</span>
      {unit('14', 'часов')}
      <span style={{ fontSize: 32, color: subInk }}>:</span>
      {unit('22', 'мин')}
      <span style={{ fontSize: 32, color: subInk }}>:</span>
      {unit('05', 'сек')}
    </div>
  );
}

/* =========================================================
   WIREFRAME A — CALM SPLIT
   Classic edtech, vertical rhythm, hero is text-left / image-right.
   Subtle pastel zones. Conservative.
   ========================================================= */
function WireframeA() {
  return (
    <div style={{ background: paper, color: ink, fontFamily: '"Archivo", "Helvetica Neue", system-ui, sans-serif', width: 1200 }}>
      {/* HEADER */}
      <div style={{ padding: '20px 48px', borderBottom: `1.2px solid ${ink}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: lav, border: `1.5px solid ${ink}`, display: 'grid', placeItems: 'center', fontWeight: 800 }}>GR</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Grammar Rescue</span>
        </div>
        <nav style={{ display: 'flex', gap: 22, fontSize: 14, color: subInk }}>
          <span>О интенсиве</span><span>Как проходит</span><span>Программа</span><span>Для кого</span><span>Цена</span><span>FAQ</span>
        </nav>
        <CTA size="sm">Записаться</CTA>
      </div>

      {/* HERO */}
      <section style={{ padding: '60px 48px 80px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            <Chip tone="lav">для 9 класса</Chip>
            <Chip tone="yellow">формат ОГЭ</Chip>
          </div>
          <h1 style={{ fontSize: 64, lineHeight: 1.02, margin: 0, letterSpacing: -1.5, fontWeight: 800 }}>
            Скорая помощь по{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              английской<br />грамматике
              <Hand size={42} rotate={-4} color={ink} style={{ position: 'absolute', right: -90, top: 8 }}>перед ОГЭ</Hand>
            </span>
          </h1>
          <p style={{ fontSize: 20, color: subInk, lineHeight: 1.45, marginTop: 28, maxWidth: 520 }}>
            <b style={{ color: ink, background: lav, padding: '0 6px' }}>3 дня</b> до экзамена, чтобы быстро повторить главное, разобрать типичные ошибки и почувствовать себя увереннее.
          </p>
          <p style={{ fontSize: 15, color: subInk, marginTop: 18, maxWidth: 520 }}>
            Каждый <b style={{ color: ink }}>вечер в 19:00</b> — час онлайн-разбора. Утром — задания в чате. Перед сном — короткие шпаргалки.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <CTA size="lg">Записаться на интенсив</CTA>
            <CTA size="lg" primary={false}>Посмотреть программу</CTA>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
            <Chip>3 дня</Chip><Chip>1 час вечером</Chip><Chip>формат ОГЭ</Chip><Chip>шпаргалки included</Chip><Chip>для 9 класса</Chip>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Img label="schoolgirl + books + exam sheet" h={460} tone="lav" />
          <Note color={yellow} rotate={6}>1 час<br/>в 19:00 ✦</Note>
          <div style={{ position: 'absolute', top: 18, right: 18 }}>
            <Star size={28} />
          </div>
          <div style={{ position: 'absolute', top: -10, right: -10 }}>
            <Note color={pink} rotate={-8}>+ PDF<br/>шпаргалки</Note>
          </div>
        </div>
      </section>

      {/* COUNTDOWN BAND */}
      <section style={{ padding: '48px 48px', background: '#fff', borderTop: `1.2px solid ${ink}`, borderBottom: `1.2px solid ${ink}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
        <div>
          <H size={36}>До ОГЭ осталось<br/>совсем немного</H>
          <p style={{ marginTop: 14, color: subInk, fontSize: 15, maxWidth: 440 }}>
            Сейчас не время учить всё с нуля. Сейчас важно быстро повторить то, что чаще встречается в заданиях.
          </p>
          <div style={{ marginTop: 22 }}><CTA>Успеть повторить грамматику</CTA></div>
        </div>
        <div><Countdown tone="lav" big /></div>
      </section>

      {/* DAILY RHYTHM — 3 cards */}
      <section style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <H size={42} underline>Как проходит день на интенсиве</H>
          <p style={{ color: subInk, marginTop: 20, fontSize: 16, maxWidth: 580, marginInline: 'auto' }}>
            Минимум хаоса, максимум пользы: короткий понятный ритм.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Утро', 'Получаем задание в чате', 'Короткая подборка заданий в формате ОГЭ.', mint],
            ['19:00', 'Онлайн-разбор с преподавателем', 'Разбираем задания, объясняем простым языком.', lav],
            ['Перед сном', 'Повторяем по шпаргалкам', 'PDF-шпаргалки, закрепляем правила.', pink],
          ].map(([time, title, text, tone], i) => (
            <Box key={i} pad={26} tone="paper" style={{ position: 'relative' }}>
              <div style={{ display: 'inline-block', background: tone, padding: '6px 14px', borderRadius: 99, border: `1.2px solid ${ink}`, fontSize: 13, fontWeight: 600 }}>{time}</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 18, lineHeight: 1.15 }}>{title}</div>
              <p style={{ color: subInk, fontSize: 14, marginTop: 12, lineHeight: 1.5 }}>{text}</p>
              <Img label="step ill." h={120} tone="paper" style={{ marginTop: 18 }} />
              <div style={{ position: 'absolute', top: -10, left: -10, width: 28, height: 28, borderRadius: 99, background: ink, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
            </Box>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}><CTA>Хочу такой план подготовки</CTA></div>
      </section>

      {/* PROGRAM — 3 big day cards */}
      <section style={{ padding: '80px 48px', background: '#fff', borderTop: `1.2px solid ${ink}` }}>
        <H size={42}>Что успеем за 3 дня</H>
        <p style={{ color: subInk, marginTop: 14, fontSize: 16, maxWidth: 620 }}>
          Интенсив собран вокруг реальных задач ОГЭ: тестовая грамматика, письмо и устная часть.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 36 }}>
          {[
            ['День 1', 'Грамматика в формате ОГЭ', 'Времена, формы глаголов, порядок слов, типичные ловушки.', 'Тестовая часть', lav],
            ['День 2', 'Письменная часть без досадных ошибок', 'Конструкции, чтобы избежать ошибок в письме.', 'Письмо', yellow],
            ['День 3', 'Устная часть: говорим проще', 'Фразы и конструкции для увереннее речи.', 'Говорение', pink],
          ].map(([day, title, text, badge, tone], i) => (
            <Box key={i} pad={28}>
              <div style={{ fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk }}>{day}</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 10, lineHeight: 1.15 }}>{title}</div>
              <p style={{ color: subInk, fontSize: 14, marginTop: 14, lineHeight: 1.55 }}>{text}</p>
              <div style={{ marginTop: 18 }}><Chip tone={i===0?'lav':i===1?'yellow':'pink'}>{badge}</Chip></div>
            </Box>
          ))}
        </div>
        <Box pad={18} tone="mint" style={{ marginTop: 24, display: 'flex', gap: 14, alignItems: 'center' }}>
          <Star size={20} />
          <span style={{ fontSize: 15 }}>После каждого дня участники получают шпаргалки для повторения.</span>
        </Box>
      </section>

      {/* AUDIENCE — checklist */}
      <section style={{ padding: '80px 48px' }}>
        <H size={42}>Узнаёшь себя?</H>
        <p style={{ color: subInk, marginTop: 14, fontSize: 16, maxWidth: 620 }}>
          Если до экзамена осталось мало времени, а грамматика всё ещё путается.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 30 }}>
          {[
            'Ребёнок путает времена и формы глаголов',
            'В тестовой части часто ошибки «по невнимательности»',
            'Письмо даётся тяжело',
            'В устной части ребёнок боится говорить',
            'До экзамена осталось мало времени',
            'Нужна понятная структура: утром, вечером, перед сном',
            'Хочется не паниковать, а спокойно пройти последние дни',
          ].map((t, i) => (
            <Box key={i} pad={18} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, border: `1.5px solid ${ink}`, borderRadius: 8, flexShrink: 0, display: 'grid', placeItems: 'center', background: lav }}>✓</div>
              <div style={{ fontSize: 15, lineHeight: 1.4 }}>{t}</div>
            </Box>
          ))}
        </div>
        <Box pad={22} tone="lav" style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>Это не марафон на месяц. Это короткая грамматическая перезагрузка перед экзаменом.</span>
        </Box>
      </section>

      {/* OUTCOMES */}
      <section style={{ padding: '80px 48px', background: '#fff', borderTop: `1.2px solid ${ink}` }}>
        <H size={42}>Что будет после интенсива</H>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 32 }}>
          {[
            'Понятнее, где ребёнок теряет баллы',
            'Повторены ключевые грамматические темы',
            'Есть шпаргалки для финального повторения',
            'Больше уверенности перед экзаменом',
          ].map((t, i) => (
            <Box key={i} pad={22} tone={[lav, pink, yellow, blue][i] === lav ? 'lav' : [lav, pink, yellow, blue][i] === pink ? 'pink' : [lav, pink, yellow, blue][i] === yellow ? 'yellow' : 'blue'}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{i + 1}</div>
              <div style={{ fontSize: 15, marginTop: 12, lineHeight: 1.35 }}>{t}</div>
            </Box>
          ))}
        </div>
        <p style={{ color: subInk, marginTop: 28, fontSize: 14, maxWidth: 620 }}>
          Мы не обещаем «пятёрку за 3 дня». Но помогаем быстро и спокойно повторить то, что реально может повлиять на результат.
        </p>
      </section>

      {/* TEACHER */}
      <section style={{ padding: '80px 48px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
        <Img label="teacher portrait" h={360} tone="pink" />
        <div>
          <H size={42}>Кто ведёт интенсив</H>
          <p style={{ marginTop: 16, color: subInk, fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>
            Преподаватель английского языка с опытом подготовки школьников к экзаменам. Грамматика простым языком: без перегруза и бесконечных правил.
          </p>
          <div style={{ marginTop: 20, fontSize: 22, fontWeight: 700 }}>Анастасия</div>
          <div style={{ fontSize: 14, color: subInk }}>преподаватель английского языка</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            <Chip tone="lav">грамматика простым языком</Chip>
            <Chip tone="yellow">подготовка к экзаменам</Chip>
            <Chip tone="pink">фокус на типичных ошибках</Chip>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '80px 48px', background: '#fff', borderTop: `1.2px solid ${ink}` }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <H size={42}>Стоимость участия</H>
        </div>
        <Box pad={40} tone="lav" style={{ maxWidth: 560, marginInline: 'auto', textAlign: 'center', position: 'relative' }}>
          <Note color={yellow} rotate={-10}>мест мало!</Note>
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -2 }}>1990 ₽</div>
          <div style={{ color: subInk, fontSize: 14 }}>за 3-дневный интенсив</div>
          <div style={{ display: 'grid', gap: 10, marginTop: 24, textAlign: 'left' }}>
            {['3 дня подготовки', 'задания утром', 'онлайн-разборы в 19:00', 'PDF-шпаргалки после каждого дня', 'материалы в чате', 'фокус на формате ОГЭ', 'поддержка и структура'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 15 }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: ink, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12 }}>✓</span>
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}><CTA size="lg">Записаться за 1990 ₽</CTA></div>
          <p style={{ color: subInk, fontSize: 13, marginTop: 16 }}>Количество мест ограничено.</p>
        </Box>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 48px' }}>
        <H size={42}>Частые вопросы</H>
        <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
          {[
            'Подойдёт ли интенсив, если ребёнок слабый в грамматике?',
            'Будет ли запись разбора?',
            'Сколько времени нужно в день?',
            'Это только для ОГЭ?',
            'Что делать после оплаты?',
          ].map((q, i) => (
            <Box key={i} pad={20} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>{q}</span>
              <span style={{ fontSize: 24 }}>+</span>
            </Box>
          ))}
        </div>
      </section>

      {/* FINAL CTA + FORM */}
      <section style={{ padding: '80px 48px', background: lav, borderTop: `1.5px solid ${ink}` }}>
        <div style={{ textAlign: 'center' }}>
          <H size={52}>Успей повторить грамматику<br/>до экзамена</H>
          <p style={{ color: subInk, marginTop: 18, fontSize: 17, maxWidth: 580, marginInline: 'auto' }}>
            3 дня, понятный план, вечерние разборы и шпаргалки.
          </p>
          <div style={{ marginTop: 28 }}><CTA size="lg">Записаться на интенсив</CTA></div>
          <p style={{ color: subInk, fontSize: 13, marginTop: 14 }}>Старт скоро. Не откладывайте подготовку на последний вечер.</p>
        </div>
        <Box pad={32} style={{ marginTop: 48, maxWidth: 640, marginInline: 'auto', background: '#fff' }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Оставьте заявку</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Имя родителя', 'Имя ученика', 'Телефон', 'Email'].map(p => (
              <div key={p} style={{ border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14 }}>{p}</div>
            ))}
          </div>
          <div style={{ marginTop: 12, border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14 }}>Удобный способ связи</div>
          <div style={{ marginTop: 12, border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14, height: 80 }}>Комментарий / вопрос</div>
          <div style={{ marginTop: 18, textAlign: 'center' }}><CTA size="md">Оставить заявку</CTA></div>
        </Box>
      </section>

      {/* FOOTER */}
      <div style={{ padding: '28px 48px', borderTop: `1.2px solid ${ink}`, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: subInk }}>
        <span>© Grammar Rescue · 2026</span>
        <span>Контакты · Политика · Оферта</span>
      </div>
    </div>
  );
}

/* =========================================================
   WIREFRAME B — CAROUSEL STORIES
   Instagram-карусельный ритм. Пронумерованные «истории».
   Горизонтальные ленты дней, более playful, больше handwritten.
   ========================================================= */
function WireframeB() {
  return (
    <div style={{ background: paper, color: ink, fontFamily: '"Archivo", "Helvetica Neue", system-ui, sans-serif', width: 1200 }}>
      {/* HEADER — pill nav */}
      <div style={{ padding: '20px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Star size={22} />
          <span style={{ fontWeight: 800, fontSize: 20 }}>Grammar Rescue</span>
          <Hand size={20} rotate={-6} style={{ marginLeft: 4 }}>скорая помощь!</Hand>
        </div>
        <nav style={{ display: 'flex', gap: 4, padding: 4, border: `1.2px solid ${ink}`, borderRadius: 99, background: '#fff' }}>
          {['Интенсив', 'Как', 'Программа', 'Кому', 'Цена'].map((n, i) => (
            <span key={i} style={{ padding: '8px 16px', borderRadius: 99, fontSize: 13, background: i === 0 ? ink : 'transparent', color: i === 0 ? '#fff' : ink, fontWeight: 600 }}>{n}</span>
          ))}
        </nav>
        <CTA size="sm">Записаться</CTA>
      </div>

      {/* HERO — carousel of 4 story cards */}
      <section style={{ padding: '40px 36px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>история · 1 / 4</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 99, border: `1.5px solid ${ink}`, display: 'grid', placeItems: 'center' }}>←</div>
            <div style={{ width: 38, height: 38, borderRadius: 99, border: `1.5px solid ${ink}`, background: ink, color: '#fff', display: 'grid', placeItems: 'center' }}>→</div>
          </div>
        </div>
        {/* progress bars */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {[1, 1, 0, 0].map((f, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: f ? ink : '#ddd9cf' }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {/* Story 1 — What */}
          <Box pad={24} tone="lav" style={{ minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', background: ink, color: '#fff', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>ЧТО ЭТО</div>
              <div style={{ fontSize: 30, fontWeight: 800, marginTop: 18, lineHeight: 1.05 }}>
                Скорая помощь<br/>по <span style={{ background: '#fff', padding: '0 4px' }}>грамматике</span><br/>перед <span style={{ textDecoration: 'underline wavy 2px' }}>ОГЭ</span>
              </div>
            </div>
            <Img label="books" h={120} tone="paper" />
          </Box>

          {/* Story 2 — For whom */}
          <Box pad={24} tone="pink" style={{ minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', background: ink, color: '#fff', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>ДЛЯ КОГО</div>
              <div style={{ fontSize: 30, fontWeight: 800, marginTop: 18, lineHeight: 1.1 }}>9 класс</div>
              <div style={{ fontSize: 14, color: subInk, marginTop: 8, lineHeight: 1.4 }}>
                кому нужно быстро повторить главное и снизить тревогу
              </div>
            </div>
            <div>
              <Hand size={32} rotate={-4}>можно и родителям ☻</Hand>
            </div>
          </Box>

          {/* Story 3 — How */}
          <Box pad={24} tone="yellow" style={{ minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-block', background: ink, color: '#fff', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>КАК ПРОХОДИТ</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 18, lineHeight: 1.1 }}>3 дня · 1 час<br/>в 19:00</div>
              <div style={{ display: 'grid', gap: 10, marginTop: 16, fontSize: 13 }}>
                <div>☀ утром — задания в чате</div>
                <div>● 19:00 — онлайн-разбор</div>
                <div>☾ перед сном — шпаргалки</div>
              </div>
            </div>
          </Box>

          {/* Story 4 — What to do */}
          <Box pad={24} tone="ink" style={{ minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
            <div>
              <div style={{ display: 'inline-block', background: '#fff', color: ink, padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>ЧТО ДЕЛАТЬ</div>
              <div style={{ fontSize: 30, fontWeight: 800, marginTop: 18, lineHeight: 1.1, color: '#fff' }}>Записаться<br/>за <span style={{ background: yellow, color: ink, padding: '0 6px' }}>1990 ₽</span></div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', background: '#fff', color: ink, borderRadius: 99, fontWeight: 700, justifyContent: 'center' }}>
              На интенсив →
            </div>
          </Box>
        </div>

        {/* badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28, justifyContent: 'center' }}>
          <Chip tone="lav">3 дня</Chip>
          <Chip tone="pink">1 час вечером</Chip>
          <Chip tone="yellow">формат ОГЭ</Chip>
          <Chip tone="mint">шпаргалки included</Chip>
          <Chip tone="blue">для 9 класса</Chip>
        </div>
      </section>

      {/* COUNTDOWN — sticker style */}
      <section style={{ padding: '50px 36px', borderTop: `1.5px dashed ${ink}`, borderBottom: `1.5px dashed ${ink}`, textAlign: 'center', position: 'relative' }}>
        <Hand size={28} rotate={-3} style={{ position: 'absolute', left: 60, top: 30 }}>тссс,<br/>время идёт</Hand>
        <H size={36}>До ОГЭ осталось <span style={{ background: pink, padding: '0 8px' }}>совсем немного</span></H>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}><Countdown tone="yellow" big /></div>
        <div style={{ marginTop: 22 }}><CTA>Успеть повторить грамматику</CTA></div>
      </section>

      {/* DAILY RHYTHM — horizontal timeline */}
      <section style={{ padding: '80px 36px' }}>
        <H size={42} underline>Один день на интенсиве</H>
        <p style={{ color: subInk, marginTop: 18, fontSize: 16, maxWidth: 580 }}>
          Минимум хаоса. Тебе не нужно «найти время» — расписание уже встроено.
        </p>

        {/* timeline track */}
        <div style={{ marginTop: 50, position: 'relative' }}>
          <svg width="100%" height="20" style={{ position: 'absolute', top: 40, left: 0 }}>
            <path d="M0 10 Q 400 -10, 800 10 T 1130 10" stroke={ink} strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
          </svg>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
            {[
              ['08:00', 'Утро', 'Получаем задание в чате', 'Короткая подборка в формате ОГЭ.', mint, '☀'],
              ['19:00', 'Вечер', 'Онлайн-разбор с преподом', 'Простым языком, без академичности.', lav, '●'],
              ['22:00', 'Ночь', 'Повторяем по шпаргалкам', 'PDF, 10 минут, закрываем день.', pink, '☾'],
            ].map(([time, when, title, text, tone, sym], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 88, height: 88, borderRadius: 99, background: tone, border: `1.5px solid ${ink}`, marginInline: 'auto', display: 'grid', placeItems: 'center', fontSize: 36, position: 'relative', zIndex: 2 }}>{sym}</div>
                <div style={{ marginTop: 18, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk }}>{when} · {time}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{title}</div>
                <p style={{ color: subInk, fontSize: 14, marginTop: 8, lineHeight: 1.5, maxWidth: 280, marginInline: 'auto' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}><CTA>Хочу такой план подготовки</CTA></div>
      </section>

      {/* PROGRAM — scrollable horizontal cards */}
      <section style={{ padding: '60px 0 80px 36px', background: '#fff', borderTop: `1.2px solid ${ink}` }}>
        <div style={{ paddingRight: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 30 }}>
          <H size={42}>Программа на 3 дня</H>
          <span style={{ fontSize: 13, color: subInk }}>← листай →</span>
        </div>
        <div style={{ display: 'flex', gap: 18, overflow: 'visible' }}>
          {[
            ['День 1', 'Грамматика в формате ОГЭ', 'Времена, формы глаголов, порядок слов, типичные ловушки.', 'Тестовая часть', lav],
            ['День 2', 'Письменная часть без ошибок', 'Конструкции, чтобы избежать ошибок в письме.', 'Письмо', yellow],
            ['День 3', 'Устная часть: говорим проще', 'Фразы и конструкции для увереннее речи.', 'Говорение', pink],
            ['Бонус', 'Финальные шпаргалки', 'Подборка PDF для финального повторения.', 'PDF', mint],
          ].map(([day, title, text, badge, tone], i) => (
            <Box key={i} pad={26} tone="paper" style={{ width: 290, flexShrink: 0 }}>
              <div style={{ display: 'inline-block', background: tone, padding: '6px 14px', borderRadius: 99, border: `1.2px solid ${ink}`, fontSize: 12, fontWeight: 700 }}>{day}</div>
              <Img label="day visual" h={130} tone="paper" style={{ marginTop: 14 }} />
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 14, lineHeight: 1.2 }}>{title}</div>
              <p style={{ color: subInk, fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>{text}</p>
              <div style={{ marginTop: 14 }}><Chip>{badge}</Chip></div>
            </Box>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section style={{ padding: '80px 36px' }}>
        <H size={42}>Узнаёшь себя?</H>
        <Hand size={24} rotate={-3} style={{ marginLeft: 16 }}>отметь галочкой</Hand>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 30 }}>
          {[
            ['Путаются времена и формы глаголов', lav],
            ['Ошибки «по невнимательности»', pink],
            ['Письмо даётся тяжело', yellow],
            ['Боится говорить на устной', blue],
            ['Мало времени до экзамена', mint],
            ['Нужна структура: утро / вечер / сон', lav],
            ['Хочется не паниковать', pink],
          ].map(([t, tone], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16, border: `1.5px solid ${ink}`, borderRadius: 14, background: '#fff' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, border: `1.5px solid ${ink}`, background: tone, flexShrink: 0 }}/>
              <span style={{ fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* OUTCOMES — sticker board */}
      <section style={{ padding: '80px 36px', background: '#fff', borderTop: `1.2px solid ${ink}` }}>
        <H size={42}>После интенсива</H>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 36, justifyContent: 'center' }}>
          {[
            ['Понятнее, где теряются баллы', lav, -3],
            ['Повторены ключевые темы', pink, 2],
            ['Шпаргалки на руках', yellow, -2],
            ['Больше уверенности', mint, 3],
          ].map(([t, tone, rot], i) => (
            <div key={i} style={{ background: tone, border: `1.5px solid ${ink}`, padding: '32px 28px', borderRadius: 16, transform: `rotate(${rot}deg)`, width: 220, fontSize: 18, fontWeight: 700, lineHeight: 1.25, boxShadow: `5px 5px 0 ${ink}` }}>
              {t}
            </div>
          ))}
        </div>
        <p style={{ color: subInk, marginTop: 36, fontSize: 14, textAlign: 'center', maxWidth: 580, marginInline: 'auto' }}>
          Не обещаем «пятёрку за 3 дня». Помогаем повторить то, что реально повлияет на результат.
        </p>
      </section>

      {/* TEACHER — polaroid */}
      <section style={{ padding: '80px 36px', textAlign: 'center' }}>
        <H size={42}>Кто ведёт интенсив</H>
        <div style={{ marginTop: 40, display: 'inline-block', background: '#fff', padding: 18, paddingBottom: 24, border: `1.5px solid ${ink}`, boxShadow: `6px 6px 0 ${ink}`, transform: 'rotate(-2deg)' }}>
          <Img label="Anastasia" h={300} w={280} tone="pink" />
          <Hand size={24} rotate={1} style={{ display: 'block', marginTop: 12 }}>Анастасия</Hand>
          <div style={{ fontSize: 12, color: subInk, marginTop: 4 }}>преподаватель английского</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
          <Chip tone="lav">грамматика простым языком</Chip>
          <Chip tone="yellow">подготовка к экзаменам</Chip>
          <Chip tone="pink">фокус на типичных ошибках</Chip>
        </div>
      </section>

      {/* PRICING — playful */}
      <section style={{ padding: '80px 36px', background: lav, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', maxWidth: 1000, marginInline: 'auto' }}>
          <div>
            <H size={42}>Стоимость</H>
            <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1, marginTop: 18 }}>1990 ₽</div>
            <Hand size={28} rotate={-4} style={{ marginTop: 8 }}>за весь интенсив</Hand>
            <p style={{ color: subInk, marginTop: 24, fontSize: 14 }}>Количество мест ограничено.</p>
            <div style={{ marginTop: 22 }}><CTA size="lg">Записаться за 1990 ₽</CTA></div>
          </div>
          <Box pad={28}>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Что входит:</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {['3 дня подготовки', 'задания утром', 'онлайн-разборы в 19:00', 'PDF-шпаргалки после каждого дня', 'материалы в чате', 'фокус на формате ОГЭ', 'поддержка и структура'].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14 }}>
                  <span>✓</span>{t}
                </div>
              ))}
            </div>
          </Box>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 36px' }}>
        <H size={42}>FAQ</H>
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            ['Подойдёт, если ребёнок слабый?', 'Да, фокус — быстро повторить главное.'],
            ['Будет запись разбора?', 'Да, запись доступна.'],
            ['Сколько времени в день?', '~30 мин утром, 1 ч вечером, 15 мин перед сном.'],
            ['Это только для ОГЭ?', 'Основной фокус — ОГЭ, но полезно всем.'],
            ['Что делать после оплаты?', 'Доступ в чат с заданиями и материалами.'],
          ].map(([q, a], i) => (
            <Box key={i} pad={20}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{q}</div>
              <p style={{ color: subInk, fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{a}</p>
            </Box>
          ))}
        </div>
      </section>

      {/* FINAL CTA + FORM */}
      <section style={{ padding: '90px 36px', background: ink, color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.5 }}>
            Успей <span style={{ background: yellow, color: ink, padding: '0 8px' }}>повторить</span><br/>
            грамматику до экзамена
          </div>
          <p style={{ color: '#bbb', marginTop: 22, fontSize: 17, maxWidth: 560, marginInline: 'auto' }}>
            3 дня, понятный план, вечерние разборы и шпаргалки.
          </p>
        </div>
        <Box pad={28} style={{ marginTop: 44, maxWidth: 640, marginInline: 'auto', background: '#fff', color: ink }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Оставьте заявку →</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Имя родителя', 'Имя ученика', 'Телефон', 'Email'].map(p => (
              <div key={p} style={{ border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14 }}>{p}</div>
            ))}
          </div>
          <div style={{ marginTop: 10, border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14 }}>Способ связи</div>
          <div style={{ marginTop: 10, border: `1.2px solid ${ink}`, borderRadius: 10, padding: '12px 14px', color: subInk, fontSize: 14, height: 68 }}>Комментарий</div>
          <div style={{ marginTop: 16, textAlign: 'center' }}><CTA>Оставить заявку</CTA></div>
        </Box>
      </section>

      {/* sticky mobile CTA hint */}
      <div style={{ padding: '18px 36px', background: '#fff', borderTop: `1.5px dashed ${ink}`, display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', fontSize: 12, color: subInk }}>
        <span style={{ fontFamily: 'monospace' }}>// на mobile: sticky CTA «Записаться» внизу</span>
      </div>
    </div>
  );
}

/* =========================================================
   WIREFRAME C — EDITORIAL URGENCY
   Asymmetric magazine grid. Огромная типографика.
   Таймер встроен в hero. Меньше пастели — больше типографики.
   ========================================================= */
function WireframeC() {
  return (
    <div style={{ background: paper, color: ink, fontFamily: '"Archivo", "Helvetica Neue", system-ui, sans-serif', width: 1200 }}>
      {/* HEADER — minimal, left-aligned */}
      <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${ink}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>Grammar<br/>Rescue</div>
          <Squiggle w={40} />
          <span style={{ fontSize: 12, color: subInk, fontFamily: 'monospace' }}>vol.01 · ОГЭ edition</span>
        </div>
        <nav style={{ display: 'flex', gap: 24, fontSize: 13, color: ink, fontWeight: 500 }}>
          <span>01 / интенсив</span><span>02 / как</span><span>03 / программа</span><span>04 / цена</span><span>05 / faq</span>
        </nav>
        <CTA size="sm">Записаться</CTA>
      </div>

      {/* HERO — magazine, asymmetric */}
      <section style={{ padding: '40px 56px 60px', position: 'relative' }}>
        <div style={{ fontSize: 12, color: subInk, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          № 001 · скорая помощь · 3 дня · 9 класс
        </div>
        <h1 style={{ fontSize: 132, fontWeight: 900, lineHeight: 0.92, letterSpacing: -4.5, margin: 0 }}>
          Грамматика<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 400, fontFamily: '"Caveat", "Patrick Hand", cursive', fontSize: 124 }}>
            перед ОГЭ
          </span><br/>
          за 3 дня.
        </h1>

        {/* meta strip */}
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 40, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}`, padding: '24px 0' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk }}>что это</div>
            <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.4 }}>
              Короткий онлайн-интенсив по английской грамматике перед ОГЭ для 9 класса.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk }}>как проходит</div>
            <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.4 }}>
              Утром — задание. <b>19:00</b> — разбор. Перед сном — шпаргалка.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk }}>до старта</div>
            <div style={{ marginTop: 8 }}><Countdown tone="paper" /></div>
          </div>
        </div>

        {/* CTA + badges row */}
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <CTA size="lg">Записаться на интенсив</CTA>
            <CTA size="lg" primary={false}>Программа</CTA>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Chip>3 дня</Chip><Chip>1 час</Chip><Chip>ОГЭ</Chip><Chip>PDF</Chip><Chip>9 класс</Chip>
          </div>
        </div>

        {/* Floating hero image */}
        <div style={{ position: 'absolute', right: 56, top: 110, transform: 'rotate(4deg)' }}>
          <Img label="student" h={200} w={180} tone="lav" />
        </div>
      </section>

      {/* URGENCY band — black, big timer */}
      <section style={{ background: ink, color: '#fff', padding: '60px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase' }}>срочно</div>
            <h2 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, letterSpacing: -1.5, marginTop: 12, color: '#fff' }}>
              До ОГЭ —<br/>совсем немного.
            </h2>
            <p style={{ color: '#bbb', marginTop: 20, fontSize: 16, lineHeight: 1.5, maxWidth: 420 }}>
              Сейчас не время учить всё с нуля. Сейчас важно быстро повторить то, что чаще встречается в заданиях.
            </p>
            <div style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 26px', background: '#fff', color: ink, borderRadius: 99, fontWeight: 700 }}>
              Успеть повторить →
            </div>
          </div>
          <div style={{ background: '#1f1f1f', border: `1.5px solid ${yellow}`, padding: 36, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: yellow, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>обратный отсчёт</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              {[['07','дней'],['14','часов'],['22','мин'],['05','сек']].map(([n, l], i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'ui-monospace, monospace', letterSpacing: -3 }}>{n}</div>
                  <div style={{ fontSize: 11, color: '#aaa', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 8 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DAILY RHYTHM — editorial 3-column with rule lines */}
      <section style={{ padding: '90px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 50 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 02 / как</div>
          <H size={64} style={{ lineHeight: 0.95 }}>День на интенсиве —<br/><span style={{ fontStyle: 'italic' }}>три коротких касания.</span></H>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1.5px solid ${ink}` }}>
          {[
            ['08:00', 'Утро', 'Получаем задание в чате', 'Короткая подборка в формате ОГЭ. Без лишней теории.'],
            ['19:00', 'Вечер', 'Онлайн-разбор', 'Объясняем простым языком, разбираем типичные ошибки.'],
            ['22:00', 'Перед сном', 'Шпаргалки', 'PDF-шпаргалка, 10 минут, закрываем день.'],
          ].map(([time, when, title, text], i) => (
            <div key={i} style={{ padding: '36px 24px', borderRight: i < 2 ? `1.5px solid ${ink}` : 'none' }}>
              <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: -3 }}>{i + 1}</div>
              <div style={{ fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', color: subInk, marginTop: 16 }}>{when} · {time}</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8, lineHeight: 1.15 }}>{title}</div>
              <p style={{ color: subInk, fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAM — long-form list */}
      <section style={{ padding: '90px 56px', background: '#fff', borderTop: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 50 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 03 / программа</div>
          <H size={64} style={{ lineHeight: 0.95 }}>Что успеем<br/>за <span style={{ background: lav, padding: '0 10px' }}>3 дня</span>.</H>
        </div>
        <div style={{ display: 'grid', gap: 0 }}>
          {[
            ['01', 'День 1', 'Грамматика в формате ОГЭ', 'Времена, формы глаголов, порядок слов, типичные ловушки тестовой части.', 'Тестовая', lav],
            ['02', 'День 2', 'Письменная часть без ошибок', 'Конструкции, которые помогают избежать ошибок в письме. Что портит работу.', 'Письмо', yellow],
            ['03', 'День 3', 'Устная часть: говорим проще', 'Фразы и грамматика, чтобы отвечать увереннее и делать меньше ошибок в речи.', 'Говорение', pink],
          ].map(([num, day, title, text, badge, tone], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1.3fr 2fr 150px', alignItems: 'center', gap: 24, padding: '32px 0', borderTop: `1px solid ${ink}`, borderBottom: i === 2 ? `1.5px solid ${ink}` : 'none' }}>
              <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>{num}</div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>{day}</div>
                <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, lineHeight: 1.15 }}>{title}</div>
              </div>
              <p style={{ color: subInk, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{text}</p>
              <div style={{ textAlign: 'right' }}><Chip tone={i === 0 ? 'lav' : i === 1 ? 'yellow' : 'pink'}>{badge}</Chip></div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 28, fontSize: 14, color: subInk, fontStyle: 'italic' }}>
          † После каждого дня — PDF-шпаргалки для повторения.
        </p>
      </section>

      {/* AUDIENCE — pull-quote driven */}
      <section style={{ padding: '90px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 50 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 04 / для кого</div>
          <H size={64} style={{ lineHeight: 0.95 }}>Узнаёшь<br/>себя?</H>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: `1px solid ${ink}` }}>
          {[
            'Ребёнок путает времена и формы глаголов',
            'В тестовой части часто ошибки «по невнимательности»',
            'Письмо даётся тяжело: непонятно, как писать без ошибок',
            'В устной части ребёнок боится говорить и сбивается',
            'До экзамена осталось мало времени',
            'Нужна понятная структура: утро / вечер / перед сном',
            'Хочется не паниковать, а спокойно пройти последние дни',
          ].map((t, i) => (
            <div key={i} style={{ padding: '24px 24px 24px 0', borderBottom: `1px solid ${ink}`, borderRight: i % 2 === 0 ? `1px solid ${ink}` : 'none', paddingLeft: i % 2 === 1 ? 24 : 0, display: 'flex', alignItems: 'center', gap: 14, fontSize: 17, fontWeight: 500 }}>
              <span style={{ fontFamily: 'monospace', color: subInk, fontSize: 13 }}>{String(i + 1).padStart(2, '0')}</span>
              {t}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: 40, background: lav, border: `1.5px solid ${ink}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -20, left: 40, fontSize: 80, fontFamily: 'serif', lineHeight: 1, color: ink }}>“</div>
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, paddingLeft: 40 }}>
            Это не марафон на месяц.<br/>Это короткая <em>грамматическая перезагрузка</em> перед экзаменом.
          </div>
        </div>
      </section>

      {/* OUTCOMES — numbered list */}
      <section style={{ padding: '90px 56px', background: '#fff', borderTop: `1.5px solid ${ink}` }}>
        <H size={64}>После интенсива.</H>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 40, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }}>
          {[
            'Понятнее, где ребёнок теряет баллы',
            'Повторены ключевые грамматические темы',
            'Шпаргалки для финального повторения',
            'Больше уверенности перед экзаменом',
          ].map((t, i) => (
            <div key={i} style={{ padding: '32px 24px', borderRight: i < 3 ? `1px solid ${ink}` : 'none' }}>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1 }}>0{i + 1}</div>
              <div style={{ marginTop: 18, fontSize: 16, lineHeight: 1.4, fontWeight: 500 }}>{t}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 14, color: subInk, fontStyle: 'italic', maxWidth: 580 }}>
          Не обещаем «пятёрку за 3 дня». Помогаем повторить то, что реально повлияет на результат.
        </p>
      </section>

      {/* TEACHER */}
      <section style={{ padding: '90px 56px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }}>
        <Img label="teacher portrait" h={420} tone="lav" />
        <div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 05 / преподаватель</div>
          <H size={64} style={{ marginTop: 10 }}>Анастасия.</H>
          <p style={{ marginTop: 24, fontSize: 17, color: ink, lineHeight: 1.5, maxWidth: 520 }}>
            Преподаватель английского языка с опытом подготовки школьников к экзаменам. Объясняет грамматику простым языком — без перегруза, академичности и бесконечных правил.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
            <Chip tone="lav">грамматика простым языком</Chip>
            <Chip tone="yellow">подготовка к экзаменам</Chip>
            <Chip tone="pink">фокус на типичных ошибках</Chip>
          </div>
        </div>
      </section>

      {/* PRICING — single bold card */}
      <section style={{ padding: '90px 56px', background: yellow, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: ink }}>§ 06 / цена</div>
            <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.85, letterSpacing: -8, marginTop: 20 }}>1990<span style={{ fontSize: 96 }}> ₽</span></div>
            <div style={{ fontSize: 18, marginTop: 10 }}>за весь 3-дневный интенсив</div>
            <div style={{ marginTop: 32 }}><CTA size="lg">Записаться за 1990 ₽</CTA></div>
            <p style={{ marginTop: 14, fontSize: 13, color: subInk }}>Количество мест ограничено — чтобы сохранить живой формат разбора.</p>
          </div>
          <Box pad={28} tone="paper">
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Что входит</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {['3 дня подготовки', 'Задания утром в чате', 'Онлайн-разборы в 19:00', 'PDF-шпаргалки после каждого дня', 'Материалы и поддержка в чате', 'Фокус на формате ОГЭ', 'Структура: что делать утром, вечером и перед сном'].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 15, paddingBottom: 12, borderBottom: i < 6 ? `1px dashed ${ink}` : 'none' }}>
                  <span style={{ fontFamily: 'monospace', color: subInk, fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </div>
              ))}
            </div>
          </Box>
        </div>
      </section>

      {/* FAQ — clean list */}
      <section style={{ padding: '90px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, marginBottom: 40 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 07 / faq</div>
          <H size={64}>Частые вопросы.</H>
        </div>
        <div style={{ borderTop: `1.5px solid ${ink}` }}>
          {[
            ['Подойдёт ли интенсив, если ребёнок слабый в грамматике?', 'Да, если задача — быстро повторить главное. Мы не учим английский с нуля.'],
            ['Будет ли запись разбора?', 'Да, запись доступна, если не получится быть онлайн.'],
            ['Сколько времени нужно в день?', '~30 минут утром, 1 час вечером и 10–15 минут перед сном.'],
            ['Это только для ОГЭ?', 'Основной фокус — ОГЭ. Но полезно всем, кому нужно быстро повторить школьную грамматику.'],
            ['Что делать после оплаты?', 'Доступ в чат с заданиями, разборами и материалами.'],
          ].map(([q, a], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr 40px', gap: 24, padding: '24px 0', borderBottom: `1px solid ${ink}`, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'monospace', color: subInk, fontSize: 13 }}>{String(i + 1).padStart(2, '0')}.</span>
              <span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{q}</span>
              <span style={{ fontSize: 15, color: subInk, lineHeight: 1.5 }}>{a}</span>
              <span style={{ fontSize: 22, textAlign: 'right' }}>+</span>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL — full bleed */}
      <section style={{ padding: '120px 56px 100px', background: lav, borderTop: `1.5px solid ${ink}`, position: 'relative' }}>
        <Star size={80} style={{ position: 'absolute', top: 40, right: 80, transform: 'rotate(20deg)' }} />
        <Hand size={36} rotate={-3} style={{ position: 'absolute', top: 80, left: 80 }}>последний шанс</Hand>
        <h2 style={{ fontSize: 140, fontWeight: 900, lineHeight: 0.9, letterSpacing: -5, margin: 0, textAlign: 'center' }}>
          Успеть<br/><span style={{ fontStyle: 'italic', fontFamily: '"Caveat", cursive', fontWeight: 400, fontSize: 130 }}>повторить.</span>
        </h2>
        <p style={{ textAlign: 'center', marginTop: 30, fontSize: 18, maxWidth: 560, marginInline: 'auto', color: subInk }}>
          3 дня, понятный план, вечерние разборы и шпаргалки — чтобы подойти к ОГЭ спокойнее.
        </p>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <CTA size="lg">Записаться на интенсив</CTA>
        </div>
        <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: subInk }}>Старт скоро. Не откладывайте подготовку на последний вечер.</p>
      </section>

      {/* FORM */}
      <section style={{ padding: '80px 56px', background: paper }}>
        <Box pad={36} style={{ maxWidth: 720, marginInline: 'auto' }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: subInk }}>§ 08 / заявка</div>
          <div style={{ fontWeight: 800, fontSize: 36, marginTop: 8, letterSpacing: -1 }}>Оставьте заявку</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
            {['Имя родителя', 'Имя ученика', 'Телефон', 'Email'].map(p => (
              <div key={p} style={{ borderBottom: `1.5px solid ${ink}`, padding: '14px 4px', color: subInk, fontSize: 14 }}>{p}</div>
            ))}
          </div>
          <div style={{ marginTop: 14, borderBottom: `1.5px solid ${ink}`, padding: '14px 4px', color: subInk, fontSize: 14 }}>Удобный способ связи</div>
          <div style={{ marginTop: 14, borderBottom: `1.5px solid ${ink}`, padding: '14px 4px', color: subInk, fontSize: 14, minHeight: 60 }}>Комментарий / вопрос</div>
          <div style={{ marginTop: 24 }}><CTA size="lg">Оставить заявку</CTA></div>
          <p style={{ fontSize: 12, color: subInk, marginTop: 14 }}>† После отправки: «Спасибо! Мы свяжемся с вами и отправим информацию об участии».</p>
        </Box>
      </section>

      {/* FOOTER */}
      <div style={{ padding: '32px 56px', borderTop: `1.5px solid ${ink}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: subInk }}>
        <span>© Grammar Rescue · 2026 · vol. 01</span>
        <span style={{ fontFamily: 'monospace' }}>made with care · contacts · оферта</span>
      </div>
    </div>
  );
}

window.WireframeA = WireframeA;
window.WireframeB = WireframeB;
window.WireframeC = WireframeC;
