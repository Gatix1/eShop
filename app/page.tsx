import { ArrowUpRight, Headphones, Laptop, Menu, Mouse, Package, Search, ShoppingBag, Smartphone } from "lucide-react";

const categories = [
  { name: "Computers", icon: Laptop, detail: "Built for flow" },
  { name: "Mobiles", icon: Smartphone, detail: "Keep connected" },
  { name: "Components", icon: Package, detail: "Make it yours" },
  { name: "Peripherals", icon: Mouse, detail: "Fine-tune your setup" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#top" className="font-serif text-3xl tracking-[-0.04em] text-white">e<span className="text-acid">.</span>Shop</a>
        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-mist md:flex">
          <a href="#shop" className="transition hover:text-white">Shop</a>
          <a href="#categories" className="transition hover:text-white">Categories</a>
          <a href="#story" className="transition hover:text-white">About us</a>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Search" className="grid size-10 place-items-center rounded-full border border-white/10 text-mist transition hover:border-acid hover:text-acid"><Search size={17} strokeWidth={1.5} /></button>
          <button aria-label="Shopping bag" className="grid size-10 place-items-center rounded-full border border-white/10 text-mist transition hover:border-acid hover:text-acid"><ShoppingBag size={17} strokeWidth={1.5} /></button>
          <button aria-label="Open menu" className="grid size-10 place-items-center rounded-full border border-white/10 text-mist md:hidden"><Menu size={17} strokeWidth={1.5} /></button>
        </div>
      </nav>

      <section id="top" className="relative mx-auto grid max-w-[1400px] items-end gap-12 px-5 pb-24 pt-16 sm:px-8 md:min-h-[620px] md:grid-cols-[1.05fr_0.95fr] md:px-12 md:pt-28">
        <div className="pointer-events-none absolute -left-24 top-8 size-96 rounded-full bg-acid/10 blur-[120px]" />
        <div className="relative z-10">
          <p className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-acid"><span className="h-px w-8 bg-acid" />The considered hardware store</p>
          <h1 className="max-w-3xl font-serif text-[clamp(4.4rem,10vw,9rem)] leading-[0.79] tracking-[-0.065em] text-white">Make room<br /><em className="font-light text-acid">for better.</em></h1>
          <p className="mt-9 max-w-sm text-sm leading-7 text-mist">The tools, components, and everyday tech that make your space work harder and feel better.</p>
          <a href="#shop" className="mt-9 inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white transition hover:text-acid">Explore the collection <span className="grid size-10 place-items-center rounded-full bg-acid text-ink"><ArrowUpRight size={16} /></span></a>
        </div>
        <div className="relative aspect-[0.92] overflow-hidden rounded-[2px] border border-white/10 bg-[#161d18] md:aspect-[1.05]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_42%,rgba(183,255,60,.34),transparent_25%),linear-gradient(135deg,#18241d,#0b0e0c_55%,#243a22)]" />
          <div className="absolute -right-8 top-1/2 h-48 w-[125%] -rotate-[22deg] border-y border-acid/40 bg-black/20 shadow-[0_0_80px_rgba(183,255,60,.14)]" />
          <div className="absolute bottom-7 left-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60"><span className="size-1.5 rounded-full bg-acid" />New perspective on tech</div>
        </div>
      </section>

      <section id="categories" className="border-y border-white/10 bg-[#0b0e0c] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]"><div className="mb-8 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.25em] text-acid">Browse by need</p><h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-white">Find your fit.</h2></div><a href="#shop" className="hidden text-xs text-mist transition hover:text-acid sm:block">View all <ArrowUpRight className="ml-2 inline" size={14} /></a></div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">{categories.map(({ name, icon: Icon, detail }) => <a href="#shop" key={name} className="group bg-[#0b0e0c] p-5 transition hover:bg-[#121a13] sm:p-8"><Icon className="mb-12 text-mist transition group-hover:text-acid" size={25} strokeWidth={1} /><p className="text-base text-white">{name}</p><p className="mt-2 text-xs text-mist">{detail}</p></a>)}</div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12"><div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] uppercase tracking-[0.25em] text-acid">A sharper selection</p><h2 className="mt-4 max-w-sm font-serif text-5xl leading-[0.9] tracking-[-0.05em] text-white">Good design<br /><em className="font-light text-acid">does more.</em></h2><p className="mt-7 max-w-xs text-sm leading-7 text-mist">A small, intentional edit of gear for work, play, and everything in between.</p></div><div className="glass flex min-h-72 flex-col justify-between p-7 sm:p-10"><div className="flex justify-between"><span className="text-[10px] uppercase tracking-[0.24em] text-acid">Coming soon</span><Headphones size={21} className="text-mist" strokeWidth={1.2} /></div><div><h3 className="font-serif text-4xl text-white">Your next setup<br />starts here.</h3><p className="mt-4 text-sm text-mist">Product imagery and the first collection are on their way.</p></div></div></div></section>

      <footer id="story" className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-mist sm:flex-row"><span>e<span className="text-acid">.</span>Shop / Chișinău, Moldova</span><span>Better hardware, thoughtfully chosen</span></div></footer>
    </main>
  );
}
