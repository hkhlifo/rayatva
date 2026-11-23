'use client';

import {
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type ElementType,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
    type ReactNode
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export interface CardNavLink {
    label: string;
    href?: string;
    ariaLabel?: string;
}

export interface CardNavItem {
    label: string;
    description?: string;
    bgColor?: string;
    textColor?: string;
    links?: CardNavLink[];
}

export interface CardNavCta {
    label: string;
    href?: string;
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
}

export interface CardNavProps {
    logo?: string | ReactNode;
    logoAlt?: string;
    logoHref?: string;
    items?: CardNavItem[];
    cta?: CardNavCta;
    theme?: 'dark' | 'light';
    surface?: 'glass' | 'solid';
    openOn?: 'click' | 'hover';
    cardEffect?: 'rise' | 'unfold' | 'fade';
    stagger?: number;
    bounce?: number;
    speed?: number;
    cardHeight?: number;
    maxWidth?: number;
    accentColor?: string;
    menuLabel?: boolean;
    intro?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    linkComponent?: ElementType;
    onLinkClick?: (link: CardNavLink, item: CardNavItem, event: ReactMouseEvent<HTMLElement>) => void;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
}

interface AnchorProps {
    className: string;
    'aria-label'?: string;
    tabIndex?: number;
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
}

const THEMES: Record<string, Record<string, string>> = {
    dark: {
        '--cn-panel': 'rgba(22, 16, 14, 0.88)',
        '--cn-solid': '#160F0D',
        '--cn-edge': 'rgba(255, 224, 205, 0.16)',
        '--cn-highlight': 'rgba(255, 255, 255, 0.10)',
        '--cn-shadow': '0 30px 80px -28px rgba(0, 0, 0, 0.78), 0 10px 28px -14px rgba(241, 90, 36, 0.20)',
        '--cn-text': '#FFF7F0',
        '--cn-muted': 'rgba(255, 239, 228, 0.62)',
        '--cn-hover': 'rgba(241, 90, 36, 0.13)',
        '--cn-ring': '#FF7A45',
        '--cn-tile': 'linear-gradient(145deg, rgba(61, 39, 30, 0.98) 0%, rgba(31, 21, 18, 0.98) 58%, rgba(23, 16, 14, 0.98) 100%)',
        '--cn-tile-rim': 'inset 0 0 0 1px rgba(255, 225, 207, 0.10), inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 35px -22px rgba(0,0,0,0.9)',
        '--cn-cta': 'linear-gradient(135deg, #FF7846 0%, #F15A24 52%, #D94316 100%)',
        '--cn-cta-ink': '#FFFFFF',
        '--cn-cta-shadow': 'inset 0 1px 0 rgba(255,255,255,0.32), 0 8px 24px -8px rgba(241,90,36,0.72)',
        '--cn-cta-hover': 'brightness(1.12) saturate(1.08)'
    },
    light: {
        '--cn-panel': 'rgba(255, 249, 244, 0.94)',
        '--cn-solid': '#FFF9F4',
        '--cn-edge': 'rgba(67, 39, 27, 0.12)',
        '--cn-highlight': 'rgba(255, 255, 255, 0.96)',
        '--cn-shadow': '0 24px 60px -28px rgba(60, 34, 23, 0.30)',
        '--cn-text': '#251914',
        '--cn-muted': 'rgba(37, 25, 20, 0.62)',
        '--cn-hover': 'rgba(241, 90, 36, 0.09)',
        '--cn-ring': '#F15A24',
        '--cn-tile': 'linear-gradient(145deg, #FFFFFF 0%, #FFF7F0 100%)',
        '--cn-tile-rim': 'inset 0 0 0 1px rgba(67,39,27,0.09), 0 12px 28px -20px rgba(67,39,27,0.28)',
        '--cn-cta': 'linear-gradient(135deg, #FF7846 0%, #F15A24 100%)',
        '--cn-cta-ink': '#FFFFFF',
        '--cn-cta-shadow': '0 8px 22px -9px rgba(241,90,36,0.55)',
        '--cn-cta-hover': 'brightness(1.06)'
    }
};

const ROOT =
    'group/cn fixed inset-x-0 top-0 z-50 mx-auto h-[var(--cn-bar)] w-full max-w-[var(--cn-max)] text-[14px] leading-[1.4] tracking-[-0.01em] [font-family:var(--cn-font-family)] [-webkit-tap-highlight-color:transparent]';
const PANEL =
    'absolute inset-x-0 top-0 z-10 h-[var(--cn-bar)] overflow-visible rounded-[var(--cn-radius)] border-0 bg-transparent shadow-none';
const BAR =
    'relative z-[2] box-border grid h-[var(--cn-bar)] grid-cols-[1fr_auto_1fr] items-center px-6 group-data-[narrow]/cn:grid-cols-[auto_1fr_auto]';
const MENU =
    'inline-flex h-[calc(var(--cn-bar)_-_var(--cn-inset)*2)] cursor-pointer items-center gap-[11px] justify-self-start rounded-[calc(var(--cn-radius)_-_var(--cn-inset))] border border-transparent pl-[16px] pr-[14px] [background:none] [font-family:inherit] [font-size:inherit] font-semibold tracking-[0.01em] text-[var(--cn-text)] outline-none transition-all duration-300 ease-[ease] hover:border-white/[0.08] hover:[background:var(--cn-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cn-ring)] data-[icon-only]:w-[calc(var(--cn-bar)_-_var(--cn-inset)*2)] data-[icon-only]:justify-center data-[icon-only]:p-0 group-data-[narrow]/cn:col-[3] group-data-[narrow]/cn:row-[1] group-data-[narrow]/cn:justify-self-end';
const BURGER = 'relative h-[12px] w-[19px] drop-shadow-[0_0_7px_rgba(255,122,69,0.35)]';
const LINE_TOP =
    'absolute left-0 top-[2.25px] h-[1.5px] w-full rounded-[2px] bg-current transition-[top,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/cn:top-[5.25px] group-data-[open]/cn:rotate-45 motion-reduce:transition-none';
const LINE_BOTTOM =
    'absolute left-0 top-[8.25px] h-[1.5px] w-full rounded-[2px] bg-current transition-[top,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/cn:top-[5.25px] group-data-[open]/cn:-rotate-45 motion-reduce:transition-none';
const MENU_LABEL = 'relative inline-grid overflow-hidden';
const WORD_OPEN =
    '[grid-area:1/1] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/cn:-translate-y-[110%] motion-reduce:transition-none';
const WORD_CLOSE =
    '[grid-area:1/1] translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/cn:translate-y-0 motion-reduce:transition-none';
const LOGO =
    'inline-flex h-[var(--cn-logo)] items-center justify-self-center text-[var(--cn-text)] no-underline drop-shadow-[0_0_16px_rgba(255,122,69,0.16)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cn-ring)] [&_img]:block [&_img]:h-full [&_img]:w-auto [&_svg]:block [&_svg]:h-full [&_svg]:w-auto group-data-[narrow]/cn:col-[1] group-data-[narrow]/cn:row-[1] group-data-[narrow]/cn:justify-self-start group-data-[narrow]/cn:pl-[14px]';
const CTA =
    'inline-flex h-[calc(var(--cn-bar)_-_var(--cn-inset)*2)] justify-self-end cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-[21px] [background:var(--cn-cta)] [box-shadow:var(--cn-cta-shadow)] [font-family:inherit] [font-size:inherit] font-semibold text-[var(--cn-cta-ink)] no-underline outline-none transition-[filter] duration-200 ease-[ease] hover:[filter:var(--cn-cta-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cn-ring)]';
const CTA_WIDE =
    'flex h-[46px] w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-white/20 px-[16px] [background:var(--cn-cta)] [box-shadow:var(--cn-cta-shadow)] [font-family:inherit] [font-size:inherit] font-semibold text-[var(--cn-cta-ink)] no-underline outline-none transition-[filter] duration-200 ease-[ease] hover:[filter:var(--cn-cta-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cn-ring)]';
const CONTENT =
    'invisible absolute inset-x-0 top-[var(--cn-bar)] box-border flex flex-col gap-[var(--cn-gap)] px-[var(--cn-inset)] pb-[var(--cn-inset)] [perspective:900px] group-data-[shown]/cn:visible';
const CARDS = 'flex gap-[var(--cn-gap)] group-data-[narrow]/cn:flex-col';
const CARD =
    'group/card relative isolate box-border flex min-h-[var(--cn-card)] min-w-0 flex-[1_1_0] origin-top flex-col gap-[18px] overflow-hidden rounded-[calc(var(--cn-radius)_-_var(--cn-inset))] border border-white/[0.04] px-[19px] pb-[17px] pt-[19px] [background:var(--cn-tile)] [box-shadow:var(--cn-tile-rim)] text-[var(--cn-text)] will-change-[transform,opacity] data-[tinted]:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.16),0_4px_10px_-4px_rgba(0,0,0,0.45)] group-data-[narrow]/cn:min-h-0 group-data-[narrow]/cn:flex-none group-data-[narrow]/cn:gap-[10px] group-data-[narrow]/cn:px-[14px] group-data-[narrow]/cn:pb-[12px] group-data-[narrow]/cn:pt-[14px]';
const CARD_HEAD = 'flex flex-col gap-[4px]';
const LABEL = 'text-[18px] font-bold tracking-[-0.035em]';
const DESCRIPTION =
    'm-0 max-w-[28ch] text-[13px] leading-[1.55] text-[var(--cn-muted)] group-data-[tinted]/card:text-inherit group-data-[tinted]/card:opacity-70';
const LINKS =
    'm-0 mt-auto flex list-none flex-col gap-[2px] p-0 group-data-[narrow]/cn:flex-row group-data-[narrow]/cn:flex-wrap group-data-[narrow]/cn:gap-x-[16px] group-data-[narrow]/cn:gap-y-[2px]';
const LINK =
    'group/link inline-flex cursor-pointer items-center gap-[9px] rounded-md border-0 px-1 py-[5px] -ml-1 [background:none] [font-family:inherit] text-[14px] font-medium text-inherit no-underline opacity-[0.82] outline-none transition-opacity duration-200 ease-[ease] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cn-ring)]';
const ARROW = 'relative inline-block h-[14px] w-[14px] flex-none overflow-hidden';
const ARROW_OUT =
    'absolute inset-0 h-full w-full transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-[110%] group-hover/link:-translate-y-[110%] group-focus-visible/link:translate-x-[110%] group-focus-visible/link:-translate-y-[110%] motion-reduce:transition-none';
const ARROW_IN =
    'absolute inset-0 h-full w-full -translate-x-[110%] translate-y-[110%] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-focus-visible/link:translate-x-0 group-focus-visible/link:translate-y-0 motion-reduce:transition-none';

const DEFAULT_ITEMS: CardNavItem[] = [
    {
        label: 'Discover',
        description: 'The vision, philosophy and people shaping RAYATVA.',
        links: [
            { label: 'About RAYATVA', href: '/#about' },
            { label: 'What We Provide', href: '/#services' }
        ]
    },
    {
        label: 'Build & Grow',
        description: 'Turn ambitious ideas into brands and digital experiences.',
        links: [
            { label: 'Brand & Business Growth', href: '/#services' },
            { label: 'Web Development', href: '/#services' },
            { label: 'Digital Marketing', href: '/#services' },
            { label: 'Book a Service', href: '/#booking' }
        ]
    },
    {
        label: 'Learn',
        description: 'Practical skills, creative confidence and new opportunities.',
        links: [
            { label: 'Video Editing Course', href: '/#courses' },
            { label: 'Explore Courses', href: '/#courses' }
        ]
    }
];

const NARROW = 560;
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const easeOut = (t: number) => 1 - (1 - t) ** 3;

const contrastInk = (color?: string): string | null => {
    const hex = String(color || '')
        .trim()
        .replace('#', '');
    if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return null;
    const full =
        hex.length === 3
            ? hex
                .split('')
                .map(c => c + c)
                .join('')
            : hex;
    const channel = (index: number) => {
        const value = parseInt(full.slice(index, index + 2), 16) / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
    return luminance > 0.36 ? '#121016' : '#ffffff';
};

const CardNav = ({
    logo,
    logoAlt = 'Rayatva Logo',
    logoHref = '/Rayatva MainLogo.png',
    items = DEFAULT_ITEMS,
    cta,
    theme = 'dark',
    openOn = 'click',
    cardEffect = 'rise',
    stagger = 0.12,
    bounce = 0.3,
    speed = 1,
    cardHeight = 190,
    maxWidth = 1120,
    accentColor,
    menuLabel = true,
    intro = true,
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    linkComponent: LinkComponentProp = 'a',
    onLinkClick,
    ariaLabel = 'Main',
    className = '',
    style
}: CardNavProps) => {
    const LinkComponent = LinkComponentProp as unknown as React.FC<Record<string, unknown>>;
    const contentId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLButtonElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const engineRef = useRef<{ wake: () => void; refresh: () => void } | null>(null);
    const leaveRef = useRef(0);
    const barRef = useRef<HTMLDivElement>(null);
    const introRef = useRef(intro);
    const [openState, setOpenState] = useState(defaultOpen);
    const [narrow, setNarrow] = useState(false);
    const [shown, setShown] = useState(defaultOpen);

    const controlled = openProp !== undefined;
    const hasCta = Boolean(cta);
    const open = controlled ? openProp : openState;

    
    const settings = {
        open,
        cardEffect,
        stagger: clamp(stagger, 0, 0.3),
        bounce: clamp(bounce, 0, 1),
        speed: clamp(speed, 0.2, 3)
    };
    const settingsRef = useRef(settings);
    settingsRef.current = settings;

    const palette = THEMES[theme] ?? THEMES.dark;
    const vars: Record<string, string> = {
        ...palette,
        '--cn-max': `${maxWidth}px`,
        '--cn-bar': '75px',
        '--cn-inset': '9px',
        '--cn-gap': '8px',
        '--cn-radius': '23px',
        '--cn-logo': '42px',
        '--cn-card': `${cardHeight}px`,
        '--cn-font-family': 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif'
    };
    if (accentColor) {
        vars['--cn-cta'] = accentColor;
        vars['--cn-cta-ink'] = contrastInk(accentColor) || '#ffffff';
        vars['--cn-cta-shadow'] = 'inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 6px 16px -6px rgba(0, 0, 0, 0.45)';
        vars['--cn-cta-hover'] = 'brightness(1.08)';
    }

    const setOpen = (next: boolean) => {
        if (next === open) return;
        if (!controlled) setOpenState(next);
        onOpenChange?.(next);
    };
    const setOpenRef = useRef(setOpen);
    setOpenRef.current = setOpen;

    useEffect(() => {
        const panel = panelRef.current;
        const content = contentRef.current;
        if (!panel || !content) return undefined;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        const state = { p: settingsRef.current.open ? 1 : 0, v: 0, height: content.offsetHeight, bar: 60 };
        let raf = 0;
        let last = 0;

        const render = () => {
            const s = settingsRef.current;
            state.bar = parseFloat(getComputedStyle(panel).getPropertyValue('--cn-bar')) || 60;
            panel.style.height = `${state.bar + Math.max(0, state.p) * state.height}px`;
            const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
            const count = cards.length;
            const lag = count > 1 ? Math.min(s.stagger, 0.7 / (count - 1)) : 0;
            const span = 1 - lag * (count - 1);
            cards.forEach((card, index) => {
                const local = clamp((state.p - index * lag) / Math.max(span, 0.05), 0, 1);
                const e = easeOut(local);
                if (s.cardEffect === 'unfold') {
                    card.style.transform = `translateY(${(1 - e) * -10}px) rotateX(${(1 - e) * -72}deg)`;
                    card.style.opacity = `${clamp(local * 1.8, 0, 1)}`;
                    card.style.filter = '';
                } else if (s.cardEffect === 'fade') {
                    card.style.transform = `translateY(${(1 - e) * 6}px)`;
                    card.style.opacity = `${e}`;
                    card.style.filter = e < 0.999 ? `blur(${(1 - e) * 6}px)` : '';
                } else {
                    card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
                    card.style.opacity = `${e}`;
                    card.style.filter = '';
                }
            });
        };

        const tick = (now: number) => {
            raf = 0;
            const s = settingsRef.current;
            const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
            last = now;
            const target = s.open ? 1 : 0;
            if (reduce) {
                state.p = target;
                state.v = 0;
            } else {
                const k = 160 * s.speed * s.speed;
                const zeta = s.open ? 1 - 0.68 * s.bounce : 1;
                const steps = Math.ceil(dt / (1 / 240));
                const h = dt / steps;
                for (let i = 0; i < steps; i++) {
                    state.v += (-k * (state.p - target) - 2 * zeta * Math.sqrt(k) * state.v) * h;
                    state.p += state.v * h;
                }
            }
            const done = Math.abs(state.p - target) < 0.0005 && Math.abs(state.v) < 0.002;
            if (done) {
                state.p = target;
                state.v = 0;
            }
            render();
            if (done && target === 0) setShown(false);
            if (!done) raf = requestAnimationFrame(tick);
        };

        const wake = () => {
            if (!raf) {
                last = 0;
                raf = requestAnimationFrame(tick);
            }
        };

        engineRef.current = {
            wake,
            refresh: () => {
                state.height = content.offsetHeight;
                render();
            }
        };

        render();
        const observer = new ResizeObserver(() => {
            state.height = content.offsetHeight;
            render();
        });
        observer.observe(content);

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            engineRef.current = null;
        };
    }, [items.length, hasCta, narrow]);

    useLayoutEffect(() => {
        if (open) setShown(true);
        engineRef.current?.refresh();
        engineRef.current?.wake();
    }, [open]);

    useEffect(() => {
        engineRef.current?.refresh();
    });

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return undefined;
        const measure = () => setNarrow(root.offsetWidth < NARROW);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target;
            if (target instanceof Node && rootRef.current?.contains(target)) return;
            setOpenRef.current(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setOpenRef.current(false);
            menuRef.current?.focus();
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    useEffect(() => () => window.clearTimeout(leaveRef.current), []);

    useLayoutEffect(() => {
        const panel = panelRef.current;
        const bar = barRef.current;
        if (!panel || !bar || !introRef.current) return;
        introRef.current = false;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const width = panel.offsetWidth;
        const height = panel.offsetHeight;
        const radius = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 18;
        panel.animate(
            [
                { clipPath: `inset(0px ${Math.max(0, (width - height) / 2)}px round ${height / 2}px)`, opacity: 0 },
                { clipPath: `inset(0px 0px round ${radius}px)`, opacity: 1 }
            ],
            { duration: 820, easing: EASE_OUT, fill: 'backwards' }
        );
        Array.from(bar.children).forEach((child, index) => {
            child.animate(
                [
                    { opacity: 0, transform: 'translateY(8px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ],
                { duration: 560, delay: 220 + index * 70, easing: EASE_OUT, fill: 'backwards' }
            );
        });
    }, []);

    const hover = openOn === 'hover';

    const onPointerEnter = (event: ReactPointerEvent) => {
        if (!hover || event.pointerType === 'touch') return;
        window.clearTimeout(leaveRef.current);
        setOpen(true);
    };

    const onPointerLeave = (event: ReactPointerEvent) => {
        if (!hover || event.pointerType === 'touch') return;
        window.clearTimeout(leaveRef.current);
        leaveRef.current = window.setTimeout(() => setOpenRef.current(false), 160);
    };

    const anchor = (target: CardNavLink | CardNavCta, props: AnchorProps, children: ReactNode) => {
        if (!target.href) {
            return (
                <button type="button" {...props}>
                    {children}
                </button>
            );
        }
        return (
            <LinkComponent href={target.href} {...props}>
                {children}
            </LinkComponent>
        );
    };

    const ctaButton = (target: CardNavCta, wide: boolean) =>
        anchor(
            target,
            {
                className: wide ? CTA_WIDE : CTA,
                tabIndex: wide && !open ? -1 : undefined,
                onClick: event => {
                    target.onClick?.(event);
                    if (wide) setOpen(false);
                }
            },
            target.label
        );

    return (
        <div
            ref={rootRef}
            className={[ROOT, className].filter(Boolean).join(' ')}
            data-open={open ? '' : undefined}
            data-shown={shown || open ? '' : undefined}
            data-narrow={narrow ? '' : undefined}
            style={{ ...vars, ...style } as CSSProperties}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            <nav ref={panelRef} className={PANEL} aria-label={ariaLabel}>
                <div ref={barRef} className={BAR}>
                    <button
                        ref={menuRef}
                        type="button"
                        className={MENU}
                        data-icon-only={menuLabel ? undefined : ''}
                        aria-expanded={open}
                        aria-controls={contentId}
                        aria-label={menuLabel ? undefined : open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen(!open)}
                    >
                        <span className={BURGER} aria-hidden="true">
                            <span className={LINE_TOP} />
                            <span className={LINE_BOTTOM} />
                        </span>
                        {menuLabel && (
                            <span className={MENU_LABEL}>
                                <span className={WORD_OPEN} aria-hidden={open}>
                                    Menu
                                </span>
                                <span className={WORD_CLOSE} aria-hidden={!open}>
                                    Close
                                </span>
                            </span>
                        )}
                    </button>

                    {logo && (
                        <LinkComponent href={logoHref} className={LOGO} aria-label={logoAlt}>
                            {typeof logo === 'string' ? <img src={logo} alt="" draggable={false} /> : logo}
                        </LinkComponent>
                    )}

                    {cta && !narrow && ctaButton(cta, false)}
                </div>

                <div ref={contentRef} id={contentId} className={CONTENT} aria-hidden={!open}>
                    <div className={CARDS}>
                        {items.map((item, index) => (
                            <div
                                key={`${item.label}-${index}`}
                                ref={element => {
                                    cardRefs.current[index] = element;
                                }}
                                className={CARD}
                                data-tinted={item.bgColor ? '' : undefined}
                                style={item.bgColor ? { background: item.bgColor, color: item.textColor } : undefined}
                            >
                                <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 -z-0 h-28 w-28 rounded-full bg-[#F15A24]/10 blur-3xl transition-all duration-500 group-hover/card:bg-[#F15A24]/25" />
                                <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#F15A24]/35 to-transparent" />
                                <div className={CARD_HEAD + ' relative z-[1]'}>
                                    <span className={LABEL}>{item.label}</span>
                                    {item.description && <p className={DESCRIPTION}>{item.description}</p>}
                                </div>
                                <ul className={LINKS + ' relative z-[1]'}>
                                    {(item.links ?? []).map((link, linkIndex) => (
                                        <li key={`${link.label}-${linkIndex}`}>
                                            {anchor(
                                                link,
                                                {
                                                    className: LINK,
                                                    'aria-label': link.ariaLabel,
                                                    tabIndex: open ? undefined : -1,
                                                    onClick: event => {
                                                        onLinkClick?.(link, item, event);
                                                        setOpen(false);
                                                    }
                                                },
                                                <>
                                                    <span className={ARROW} aria-hidden="true">
                                                        <HugeiconsIcon className={ARROW_OUT} icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
                                                        <HugeiconsIcon className={ARROW_IN} icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
                                                    </span>
                                                    {link.label}
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {cta && narrow && (
                        <div
                            ref={element => {
                                cardRefs.current[items.length] = element;
                            }}
                        >
                            {ctaButton(cta, true)}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
