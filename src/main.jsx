import React from 'react';
import { createRoot } from 'react-dom/client';
import { BatteryCharging, CircleDot, Leaf, Menu, MoveRight, Plus, Radio, ShieldCheck, SlidersHorizontal, Sparkles, Waves } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

const FloatingLines = React.lazy(() => import('./FloatingLines'));

gsap.registerPlugin(ScrollTrigger);

const img = (name) => `${import.meta.env.BASE_URL}${name}`;

const features = [
  { icon: Waves, title: 'ADAPTIVE ANC', cn: '自适应主动降噪', text: '实时感知环境，智能调节静噪深度' },
  { icon: CircleDot, title: 'SPATIAL AUDIO', cn: '沉浸式空间音频', text: '360° 环绕声场，身体与声音同步' },
  { icon: Leaf, title: 'ULTRA COMFORT', cn: '超轻量化设计', text: '仅 235g，云感佩戴体验' },
  { icon: BatteryCharging, title: '80H BATTERY', cn: '超长续航', text: '单次续航 80 小时，音乐不断电' },
];

const cards = [
  { className: 'detail-card light', image: '3.png', title: 'MINIMAL DESIGN', cn: '极简美学设计' },
  { className: 'detail-card cream', image: '4.png', title: 'PREMIUM MATERIALS', cn: '高端材质工艺' },
  { className: 'detail-card dark', image: '5.png', title: 'TRAVEL READY', cn: '便携收纳设计' },
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Aurora home">
        <span className="brand-mark">A</span>
        <span>AURORA</span>
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        {['HOME', 'FEATURES', 'DESIGN', 'TECHNOLOGY', 'SPECS', 'GALLERY'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="pill-button" href="#preorder">PRE-ORDER</a>
        <button className="icon-button" aria-label="Open menu"><Menu size={24} /></button>
      </div>
    </header>
  );
}

function Hero() {
  const [showLines, setShowLines] = React.useState(false);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    if (reduceMotion || saveData) return undefined;

    const load = () => setShowLines(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(load, 500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-three-bg" aria-hidden="true">
        {showLines && (
        <React.Suspense fallback={null}>
          <FloatingLines
            linesGradient={['#e945f5', '#6f6f6f', '#6a6a6a']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[4, 5, 4]}
            lineDistance={8.5}
            animationSpeed={0.42}
            interactive={false}
            bendRadius={8}
            bendStrength={-2}
            parallax={false}
            mixBlendMode="screen"
          />
        </React.Suspense>
        )}
      </div>
      <div className="hero-bg" />
      <div className="hero-copy">
        <div className="eyebrow hero-chip">NEW CONCEPT</div>
        <h1 className="hero-title">
          <span>AURORA</span>
          <span>ONE</span>
        </h1>
        <h2>沉浸新境界，静享纯粹之声</h2>
        <p>Immersive by design. Pure by nature.</p>
        <a className="cta" href="#features">EXPLORE MORE <MoveRight size={18} /></a>
      </div>
      <div className="hero-product-wrap">
        <img className="hero-product" src={img('1.png')} alt="Aurora One black over-ear headphones" />
      </div>
      <div className="scroll-cue">
        <span>SCROLL DOWN</span>
        <i />
      </div>
      <div className="side-dots" aria-hidden="true"><span /><span /><span /><span /></div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="feature-strip" id="features" aria-label="Main features">
      {features.map(({ icon: Icon, title, cn, text }) => (
        <article className="feature-item" key={title}>
          <Icon size={44} strokeWidth={1.35} />
          <h3>{title}</h3>
          <strong>{cn}</strong>
          <p>{text}</p>
        </article>
      ))}
    </section>
  );
}

function SoundSection() {
  return (
    <section className="sound-section reveal-section" id="technology">
      <div className="exploded-wrap image-reveal">
        <img className="exploded" src={img('2.png')} alt="Exploded acoustic driver construction of Aurora One headphones" />
      </div>
      <div className="section-copy">
        <span className="eyebrow">SOUND EXPERIENCE</span>
        <h3>每一个细节，<br />都为声音而生</h3>
        <p>全新定制 40mm 动圈单元，搭配高刚性复合振膜，<br />呈现更宽广的频响与更细腻的声音细节。</p>
        <a className="text-link" href="#design">MORE ABOUT SOUND <MoveRight size={16} /></a>
      </div>
    </section>
  );
}

function DesignCards() {
  return (
    <section className="card-grid reveal-section" id="design">
      {cards.map((card) => (
        <article className={card.className} key={card.title}>
          <div className="card-copy">
            <h3>{card.title}</h3>
            <p>{card.cn}</p>
            <button aria-label={`Open ${card.title}`}><Plus size={18} /></button>
          </div>
          <img src={img(card.image)} alt={card.title} />
        </article>
      ))}
      <article className="experience-card wide-card">
        <div>
          <h4>智能体验<br />无缝连接你的生活</h4>
          <ul>
            <li><Radio size={18} /> 双设备连接，电脑与手机自由切换</li>
            <li><ShieldCheck size={18} /> 低延迟游戏模式，音画同步</li>
            <li><SlidersHorizontal size={18} /> AURORA APP 自定义 EQ 与场景模式</li>
          </ul>
          <a className="cta small" href="#gallery">DISCOVER APP <MoveRight size={16} /></a>
        </div>
        <img src={img('6.png')} alt="Person wearing Aurora One headphones" />
      </article>
      <article className="style-card" id="gallery">
        <h3>选择你的风格</h3>
        <div className="swatches"><span>曜石黑</span><span>月光白</span><span>星际灰</span></div>
        <img src={img('7.png')} alt="Aurora One headphones color variants" />
      </article>
      <article className="buy-card" id="preorder">
        <span className="eyebrow">LIMITED DROP</span>
        <h3>AURORA ONE</h3>
        <p>新一代头戴式降噪耳机</p>
        <div className="price">¥1299 <em>限时预售</em></div>
        <ul>
          <li>预计交付时间：2026年7月</li>
          <li>享 12 期免息分期</li>
          <li>2 年品质服务</li>
        </ul>
        <a className="order-button" href="mailto:hello@aurora.example">立即预订 <Sparkles size={16} /></a>
      </article>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href="#home"><span className="brand-mark">A</span><span>AURORA</span></a>
        <p>AURORA 致力于打造兼具美学与科技的音频产品，让每一次聆听，都成为沉浸体验。</p>
        <small>© 2026 AURORA. All Rights Reserved.</small>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>产品</h4>
          <a href="#preorder">AURORA ONE</a>
          <a href="#gallery">AURORA LITE</a>
          <a href="#design">配件</a>
        </div>
        <div className="footer-column">
          <h4>支持</h4>
          <a href="#features">使用帮助</a>
          <a href="#technology">售后服务</a>
          <a href="#preorder">保修政策</a>
        </div>
        <div className="footer-column">
          <h4>关于</h4>
          <a href="#design">品牌故事</a>
          <a href="#gallery">新闻动态</a>
          <a href="mailto:hello@aurora.example">联系我们</a>
        </div>
        <div className="footer-column subscribe-column">
          <h4>订阅资讯</h4>
          <form className="subscribe-form">
            <input type="email" placeholder="输入你的邮箱" aria-label="输入你的邮箱" />
            <button type="button" aria-label="提交订阅"><MoveRight size={16} /></button>
          </form>
          <div className="social-links" aria-label="社交媒体">
            <a href="#home">IG</a>
            <a href="#home">微博</a>
            <a href="#home">微信</a>
            <a href="#home">抖音</a>
          </div>
          <div className="footer-legal">
            <a href="#home">隐私政策</a>
            <a href="#home">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function useAuroraAnimations() {
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } });
      opening
        .from('.site-header', { y: -36, autoAlpha: 0, duration: 1.1 })
        .from('.hero-chip', { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0, duration: 0.9 }, 0.15)
        .from('.hero-title span', {
          yPercent: 125,
          scaleX: 0.68,
          transformOrigin: 'left center',
          autoAlpha: 0,
          duration: 1.25,
          stagger: 0.16,
        }, 0.28)
        .from('.hero-copy h2, .hero-copy p, .hero-copy .cta', { y: 30, autoAlpha: 0, duration: 0.95, stagger: 0.12 }, 0.72)
        .from('.hero-product', { x: 180, y: -60, rotate: 6, scale: 1.12, autoAlpha: 0, duration: 1.45 }, 0.38)
        .from('.feature-strip', { y: 70, autoAlpha: 0, duration: 1.05 }, 1.02)
        .from('.feature-item', { y: 34, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.18);

      gsap.to('.hero-product', {
        y: -10,
        rotate: -0.35,
        duration: 5.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        const title = section.querySelector('.big-title, .section-title');
        const cards = section.querySelectorAll('.detail-card, .experience-card, .style-card, .buy-card');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
          defaults: { ease: 'power3.out' },
        });
        if (title) {
          tl.from(title, { x: -80, scaleX: 0.9, autoAlpha: 0, duration: 0.72, transformOrigin: 'left center' });
        }

        if (cards.length) {
          tl.from(cards, { y: 30, autoAlpha: 0, duration: 0.52, stagger: 0.07 }, '-=0.25');
        }
      });
    });

    return () => ctx.revert();
  }, []);
}

function App() {
  useAuroraAnimations();
  return (
    <>
      <Header />
      <main className="page-shell">
        <Hero />
        <FeatureStrip />
        <SoundSection />
        <DesignCards />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);