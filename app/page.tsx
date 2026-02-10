const images = {
  hero: "https://picsum.photos/seed/dugaja-hero/1800/900",
  about: "https://picsum.photos/seed/dugaja-about/520/700",
  experience: "https://picsum.photos/seed/dugaja-experience/420/520",
  work: [
    "https://picsum.photos/seed/dugaja-work-1/500/720",
    "https://picsum.photos/seed/dugaja-work-2/520/700",
    "https://picsum.photos/seed/dugaja-work-3/430/620",
    "https://picsum.photos/seed/dugaja-work-4/480/640",
    "https://picsum.photos/seed/dugaja-work-5/420/520",
    "https://picsum.photos/seed/dugaja-work-6/460/580",
    "https://picsum.photos/seed/dugaja-work-7/520/680",
    "https://picsum.photos/seed/dugaja-work-8/420/640"
  ],
  gallery: [
    "https://picsum.photos/seed/dugaja-gallery-1/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-2/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-3/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-4/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-5/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-6/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-7/800/1000",
    "https://picsum.photos/seed/dugaja-gallery-8/800/1000"
  ],
  avatars: [
    "https://picsum.photos/seed/dugaja-avatar-1/120/120",
    "https://picsum.photos/seed/dugaja-avatar-2/120/120",
    "https://picsum.photos/seed/dugaja-avatar-3/120/120"
  ]
};

const galleryTags = [
  "Portrait",
  "Instant",
  "Black & White",
  "Studio",
  "Couples",
  "Editorial",
  "Street",
  "Details"
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

export default function HomePage() {
  return (
    <main id="home" className="bg-zinc-200 text-zinc-950">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-3 sm:px-5 sm:py-5">
        <div className="bg-white">
          <header className="animate-in-up px-5 pt-6 sm:px-10 sm:pt-10">
            <h1 className="font-display text-[2.4rem] uppercase leading-[0.82] tracking-tight sm:text-[5rem] lg:text-[7rem]">
              DUGAJA E FOTOGRAFISË
            </h1>
            <p className="mt-3 text-[0.72rem] uppercase tracking-[0.22em] text-zinc-700 sm:text-xs">
              Analog Photography Studio — Shkodër
            </p>

            <nav aria-label="Primary" className="mt-6 border-y border-zinc-200 py-3">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.65rem] uppercase tracking-[0.24em] sm:text-[0.7rem]">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-sm px-1 py-1 transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          <section className="animate-in-up animation-delay-100 px-5 pb-8 pt-8 sm:px-10 sm:pb-12 sm:pt-10">
            <h2 className="font-display max-w-5xl text-[2.2rem] uppercase leading-[0.85] tracking-tight sm:text-[4.2rem] lg:text-[6.2rem]">
              PHOTOGRAPHY MADE SLOWLY.
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-zinc-700 sm:text-base">
              Film, instant, and handcrafted portraits in the historic heart of Shkodër.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-black bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Book a Session
              </a>
              <a
                href="#work"
                className="text-xs font-semibold uppercase tracking-[0.16em] underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                See Work
              </a>
            </div>
          </section>

          <section className="animate-in-up animation-delay-200">
            <img src={images.hero} alt="Wide studio banner" className="h-[36vw] min-h-[260px] w-full object-cover lg:min-h-[420px]" />
          </section>

          <section id="about" className="animate-in-up animation-delay-300 grid gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-20">
            <div>
              <h2 className="font-display text-[3rem] uppercase leading-[0.82] sm:text-[5rem]">ABOUT</h2>
              <article className="mt-8 max-w-[220px] border border-zinc-200 bg-zinc-50 p-2">
                <img src={images.about} alt="Portrait from the studio" className="aspect-[4/5] w-full object-cover" />
              </article>
            </div>
            <div className="max-w-3xl self-center">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">The studio</p>
              <p className="mt-4 text-base leading-relaxed text-zinc-800 sm:text-lg">
                Dugaja e Fotografisë is an independent analog photography studio based in Shkodër. We work with film,
                instant photography, and natural light to create portraits and stories that feel honest, physical, and
                timeless.
                <br />
                <br />
                In a world of filters and speed, we choose process: fewer images, more meaning. Each session is
                collaborative, calm, and intentional — designed to capture character, not performance.
              </p>
              <p className="mt-6 text-sm font-medium text-zinc-700">By appointment • Walk-ins welcome when open.</p>
            </div>
          </section>

          <section id="work" className="animate-in-up animation-delay-400 relative overflow-hidden bg-zinc-900 px-5 py-12 sm:px-10 sm:py-16 lg:py-24">
            <img src={images.work[0]} alt="Recent work background" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative z-10">
              <div className="pointer-events-none select-none font-display text-[3.3rem] uppercase leading-[0.8] text-white sm:text-[6rem] lg:flex lg:justify-between lg:text-[10rem]">
                <span>RECENT</span>
                <span>WORK</span>
              </div>
              <p className="mt-2 max-w-xl text-sm text-white/85">
                Selected film portraits, instant frames, and studio sessions.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
                {images.work.slice(1).map((image, index) => (
                  <img key={image} src={image} alt={`Recent work ${index + 1}`} className="aspect-[4/5] w-full border border-white/30 object-cover" />
                ))}
              </div>

              <div className="relative mt-8 hidden h-[640px] lg:block">
                {images.work.slice(1).map((image, index) => {
                  const positions = [
                    "left-[3%] top-[6%] w-[19%]",
                    "left-[24%] top-[28%] w-[17%]",
                    "left-[44%] top-[12%] w-[18%]",
                    "left-[63%] top-[34%] w-[17%]",
                    "left-[79%] top-[10%] w-[16%]",
                    "left-[9%] top-[54%] w-[16%]",
                    "left-[33%] top-[58%] w-[20%]"
                  ];

                  return (
                    <img
                      key={image}
                      src={image}
                      alt={`Recent work ${index + 1}`}
                      className={`absolute ${positions[index]} border border-white/30 object-cover shadow-2xl transition duration-300 hover:-translate-y-1`}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <section id="experiences" className="animate-in-up animation-delay-500 bg-black px-5 py-12 text-white sm:px-10 sm:py-16">
            <h2 className="font-display text-[3rem] uppercase leading-[0.82] sm:text-[5rem]">EXPERIENCES</h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr] lg:items-end">
              <img src={images.experience} alt="Studio experience thumbnail" className="h-52 w-52 border border-white/20 object-cover sm:h-64 sm:w-64" />
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="font-display text-6xl leading-none">7+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-300">Years of analog practice</p>
                </div>
                <div>
                  <p className="font-display text-6xl leading-none">270+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-300">Sessions &amp; projects</p>
                </div>
                <div>
                  <p className="font-display text-6xl leading-none">12+</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-300">Collaborations &amp; exhibitions</p>
                </div>
              </div>
            </div>
          </section>

          <section id="gallery" className="animate-in-up animation-delay-[600ms] px-5 py-12 sm:px-10 sm:py-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-[3rem] uppercase leading-[0.82] sm:text-[5rem]">GALLERY</h2>
              <a
                href="#"
                className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                SEE ALL
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.gallery.map((image, index) => (
                <figure key={image} className="group relative overflow-hidden">
                  <img
                    src={image}
                    alt={`${galleryTags[index]} gallery image`}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <figcaption className="absolute inset-x-2 bottom-2 bg-black/70 px-2 py-1 text-xs font-medium uppercase tracking-[0.08em] text-white">
                    {galleryTags[index]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="animate-in-up animation-delay-700 px-5 py-12 sm:px-10 sm:py-16">
            <blockquote className="max-w-5xl text-[1.35rem] leading-tight sm:text-3xl">
              “We had the privilege of working with Dugaja e Fotografisë, and were impressed by the ability to put
              subjects at ease and translate a simple moment into a photograph with real depth.”
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {images.avatars.map((avatar, index) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt={`Client avatar ${index + 1}`}
                    className="h-12 w-12 border border-zinc-300 object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">— Client / Feature</p>
            </div>
          </section>

          <section id="contact" className="animate-in-up animation-delay-800 border-t border-zinc-200 px-5 pb-8 pt-14 sm:px-10 sm:pb-10 sm:pt-20">
            <div className="relative inline-block">
              <h2 className="font-display text-[3.2rem] uppercase leading-[0.8] sm:text-[6rem] lg:text-[8.2rem]">CONTACT</h2>
              <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white px-4 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-zinc-700 sm:text-xs">
                Got a project in mind? Don’t hesitate to reach out.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="grid gap-4 text-sm sm:text-base">
                <p>
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">Location</span>
                  Rruga G’juhadol, Shkodër
                </p>
                <p>
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">Sessions</span>
                  By appointment
                </p>
                <p>
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">Instagram</span>
                  @dugaja_e_fotografise
                </p>
                <p>
                  <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">Email</span>
                  hello@dugajaefotografise.com
                </p>
              </div>

              <form className="grid gap-3" action="#" method="post">
                <label className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Name
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 w-full border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1 w-full border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-fit items-center border border-black bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Send
                </button>
              </form>
            </div>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-5 py-5 text-[0.62rem] uppercase tracking-[0.14em] text-zinc-600 sm:px-10">
            <p>© Dugaja e Fotografisë</p>
            <div className="flex items-center gap-3">
              <a href="#home" className="transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Home
              </a>
              <span>•</span>
              <a href="#gallery" className="transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Gallery
              </a>
              <span>•</span>
              <a href="#contact" className="transition hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
