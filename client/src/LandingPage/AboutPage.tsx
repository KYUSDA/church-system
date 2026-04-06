import SEO from "@/components/SEO";

/* ── Types ── */
interface DayEvent {
  day: string;
  short: string;
  dayIndex: number;
  events: string[];
}

/* ── Weekly Calendar Data ── */
const weekSchedule: DayEvent[] = [
  { day: "Sunday", short: "Sun", dayIndex: 0, events: ["ADD EVENT NAME"] },
  { day: "Monday", short: "Mon", dayIndex: 1, events: ["ADD EVENT NAME"] },
  { day: "Tuesday", short: "Tue", dayIndex: 2, events: ["ADD EVENT NAME"] },
  { day: "Wednesday", short: "Wed", dayIndex: 3, events: ["ADD EVENT NAME"] },
  { day: "Thursday", short: "Thu", dayIndex: 4, events: ["ADD EVENT NAME"] },
  { day: "Friday", short: "Fri", dayIndex: 5, events: ["ADD EVENT NAME"] },
  { day: "Saturday", short: "Sat", dayIndex: 6, events: ["ADD EVENT NAME"] },
];

/* ── Mission / Vision / Purpose ── */
const mvp = [
  {
    label: "Mission",
    icon: "🎯",
    text: "To glorify God by making disciples of all nations — baptizing, teaching, and equipping every believer to live out the fullness of Christ.",
  },
  {
    label: "Vision",
    icon: "👁️",
    text: "A Spirit-filled community where every person is known, loved, and growing — transforming families, neighbourhoods, and nations for God's kingdom.",
  },
  {
    label: "Purpose",
    icon: "✨",
    text: "We exist to worship God wholeheartedly, build authentic community, and serve the world with the love of Jesus Christ.",
  },
];

/* ── History milestones ── */
const milestones = [
  {
    year: "1990",
    text: "Kyusda fellowship founded with a small group of believers.",
  },
  {
    year: "1998",
    text: "First permanent church building dedicated to the Lord.",
  },
  { year: "2005", text: "Launched community outreach and welfare programmes." },
  {
    year: "2012",
    text: "Expanded to multiple family units across the region.",
  },
  {
    year: "2020",
    text: "Embraced digital ministry, reaching thousands online.",
  },
  {
    year: "Today",
    text: "A thriving congregation committed to growth and service.",
  },
];

/* ── Social links ── */
const socials = [
  {
    label: "YouTube",
    href: "http://www.youtube.com/@kyusdachurch",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    bg: "bg-red-500 hover:bg-red-600",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/kyusdachurch?s=09",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    bg: "bg-slate-800 hover:bg-slate-900",
  },
];

/* ── Helpers ── */
const Section = ({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 ${className}`}
  >
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

const Eyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
      {label}
    </span>
  </div>
);

/* ── Page ── */
export default function About() {
  const todayIndex = new Date().getDay();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url('/back5.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <SEO title="About Us" description="Learn about Kyusda Church's mission, vision, history, and weekly services." />
      {/* ══ HERO ══ */}
      <div
        className="relative overflow-hidden text-white"
        style={{ minHeight: "60vh" }}
      >
        {/* Church background image — replace with your actual image */}
        <img
          src="/kyusda2.jpg"
          alt="Kyusda Church"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-32">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-blue-300 mb-4">
            About Us
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6">
            Welcome to <em className="italic text-blue-300">Kyusda</em>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            A community built on faith, rooted in love, and committed to serving
            God and one another with excellence.
          </p>

          {/* Social buttons */}
          <div className="flex gap-3">
            {socials.map(({ label, href, icon, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-colors ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MISSION / VISION / PURPOSE ══ */}
      <Section id="mission">
        <Eyebrow label="Who We Are" />
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-12">
          Our Mission, Vision &{" "}
          <em className="italic text-blue-600">Purpose</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mvp.map(({ label, icon, text }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 flex flex-col gap-4"
            >
              {/* <span className="text-3xl">{icon}</span> */}
              <h3 className="font-serif text-xl font-semibold text-slate-800">
                {label}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ HISTORY ══ */}
      <Section id="history" className="bg-white/60 backdrop-blur-sm">
        <Eyebrow label="Our Story" />
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-12">
          A History of <em className="italic text-blue-600">Faith</em>
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />
          <div className="flex flex-col gap-8">
            {milestones.map(({ year, text }, i) => (
              <div
                key={i}
                className="sm:pl-12 relative flex flex-col sm:flex-row gap-3 sm:gap-6 items-start"
              >
                <div className="hidden sm:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-600 text-white items-center justify-center text-[10px] font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-stone-100 flex-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    {year}
                  </span>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ WEEKLY SERVICES / CALENDAR TABLE ══ */}
      <Section id="services">
        <Eyebrow label="Calendar of Events" />
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-4">
          Weekly <em className="italic text-blue-600">Services</em>
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Today's schedule is highlighted in blue.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest w-32">
                  Day
                </th>
                <th className="text-left px-6 py-4 font-semibold text-xs uppercase tracking-widest">
                  Events
                </th>
              </tr>
            </thead>
            <tbody>
              {weekSchedule.map(({ day, dayIndex, events }, i) => {
                const isToday = dayIndex === todayIndex;
                return (
                  <tr
                    key={day}
                    className={`border-t border-stone-100 transition-colors
                      ${
                        isToday
                          ? "bg-blue-50"
                          : i % 2 === 0
                            ? "bg-white"
                            : "bg-stone-50/50"
                      }`}
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                        <span
                          className={
                            isToday
                              ? "text-blue-700 font-semibold"
                              : "text-slate-700"
                          }
                        >
                          {day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] bg-blue-600 text-white rounded-full px-2 py-0.5 font-medium">
                            Today
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {events.length > 0 ? (
                          events.map((ev, j) => (
                            <span
                              key={j}
                              className={`text-xs rounded-full px-3 py-1 font-medium
                                ${
                                  isToday
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-stone-100 text-slate-600"
                                }`}
                            >
                              {ev}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-300 text-xs italic">
                            No events
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ══ WHERE TO FIND US ══ */}
      <Section id="location" className="bg-white/60 backdrop-blur-sm">
        <Eyebrow label="Where to Find Us" />
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-10">
          Visit <em className="italic text-blue-600">Kyusda</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                Address
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                KUTUS-KERUGOYA ROAD
                <br />
                KUTUS
                <br />
                KIRINYAGA, KENYA
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                Contact
              </p>
              <p className="text-slate-700 text-sm">(+254) 797 138885</p>
              <p className="text-slate-700 text-sm">kyusdachurch@gmail.com</p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socials.map(({ label, href, icon, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium transition-colors ${bg}`}
                  >
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 h-72 md:h-full min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6234789863315!2d37.31768627572789!3d-0.5662437352646084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182629b5a37f6381%3A0x859cebe37dc37639!2sKirinyaga%20University!5e0!3m2!1sen!2ske!4v1773558431202!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kyusda Church Location"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
