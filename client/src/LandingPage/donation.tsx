import { useState } from "react";
import {
  Heart,
  Calendar,
  Gift,
  Church,
  Users,
  DollarSign,
  Youtube,
  Globe,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import SEO from "@/components/SEO";

interface Program {
  id: string;
  title: string;
  badge: string;
  icon: any;
  date?: string;
  description: string;
  hashtag: string;
}

interface PaymentDetail {
  label: string;
  value: string;
  copyable?: boolean;
}

const DonationPage = () => {
  const [copiedText, setCopiedText] = useState<string>("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const programs: Program[] = [
    {
      id: "camp",
      title: "Camp Meeting",
      badge: "Annual Event",
      icon: Calendar,
      date: "September",
      description:
        "Join us for our annual camp meeting - a week of spiritual renewal, fellowship, and worship. Experience powerful messages, inspiring music, and connect with believers from across the region.",
      hashtag: "VIBANDA",
    },
    {
      id: "mission",
      title: "Mission Projects",
      badge: "Twice Yearly",
      icon: Heart,
      date: "December & May",
      description:
        "Support our local and international mission work. Your contributions help spread the gospel, build communities, and transform lives through practical ministry and outreach programs.",
      hashtag: "MISSION",
    },
    {
      id: "welfare",
      title: "Welfare Kit",
      badge: "Community Care",
      icon: Gift,
      description:
        "Help us provide essential supplies and support to families in need. Your donations fund food packages, clothing, medical supplies, and emergency assistance for struggling community members.",
      hashtag: "WELFARE",
    },
    {
      id: "chaplaincy",
      title: "Chaplaincy Program",
      badge: "Spiritual Care",
      icon: Users,
      description:
        "Support our chaplains as they minister in hospitals, prisons, schools, and other institutions. Your gifts enable pastoral care, counseling, and spiritual guidance where it's needed most.",
      hashtag: "CHAPLAINCY",
    },
    {
      id: "development",
      title: "Church Development",
      badge: "Infrastructure",
      icon: Church,
      description:
        "Contribute to the growth and maintenance of our church facilities. These funds support building projects, renovations, equipment upgrades, and creating welcoming spaces for worship and ministry.",
      hashtag: "DEVELOPMENT",
    },
  ];

  const tithesOfferings = [
    {
      id: "tithe",
      title: "Tithes",
      description:
        "Return your faithful tithe - 10% of your increase as outlined in Malachi 3:10. Support the ministry and operations of God's work.",
      hashtag: "TITHE",
    },
    {
      id: "offerings",
      title: "Combined Offerings",
      description:
        "Give your offerings for various church needs including missions, local church expenses, and special projects.",
      hashtag: "COMBINED",
    },
  ];

  const paymentDetails: PaymentDetail[] = [
    { label: "Payment Method", value: "Equity Bank Paybill" },
    { label: "Paybill Number", value: "247247", copyable: true },
    { label: "Account Format", value: "768769#[HASHTAG]", copyable: true },
  ];

  const socialMedia = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "http://www.youtube.com/@kyusdachurch",
      handle: "@kyusda",
      color: "text-red-600",
    },
    {
      name: "X (Twitter)",
      icon: FaXTwitter,
      url: "https://x.com/kyusdachurch?s=09",
      handle: "@kyusda",
      color: "text-slate-900",
    },
    {
      name: "Website",
      icon: Globe,
      url: "https://kyusda.org",
      handle: "kyusda.org",
      color: "text-blue-600",
    },
  ];

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
      <SEO title="Donate" description="Support our mission and programs through your generous donations." />
      {/* Programs Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
                Our Programs
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 mb-4">
              Where Your <em className="italic text-blue-600">Gift</em> Goes
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
              Choose a program to support. Each contribution directly impacts
              lives and advances God's kingdom work.
            </p>
          </div>

          {/* Programs Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className="group bg-white rounded-2xl border border-stone-200 p-6 sm:p-8
                           transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600">
                      <program.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-normal text-slate-900">
                        {program.title}
                      </h3>
                      <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                        {program.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {program.date && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{program.date}</span>
                  </div>
                )}

                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                  {program.description}
                </p>

                {/* Payment Info */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                      Account Number
                    </span>
                    <button
                      onClick={() => handleCopy(`768769#${program.hashtag}`)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                 bg-blue-50 text-blue-600 hover:bg-blue-100
                                 transition-colors text-sm font-mono"
                    >
                      <span>768769#{program.hashtag}</span>
                      {copiedText === `768769#${program.hashtag}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tithes & Offerings Section */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 mb-6 text-center">
              Tithes & Offerings
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {tithesOfferings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6
                             transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h4 className="font-serif text-lg font-normal text-slate-900">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100">
                    <button
                      onClick={() => handleCopy(`768769#${item.hashtag}`)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg
                                 bg-blue-50 text-blue-600 hover:bg-blue-100
                                 transition-colors text-sm font-mono"
                    >
                      <span>768769#{item.hashtag}</span>
                      {copiedText === `768769#${item.hashtag}` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-4">
              How to <em className="italic text-blue-600">Give</em>
            </h2>
            <p className="text-slate-600">
              Follow these simple steps to make your contribution via M-Pesa
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 p-8 mb-8">
            <div className="space-y-4">
              {paymentDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-blue-100 last:border-0"
                >
                  <span className="text-sm font-semibold text-slate-600">
                    {detail.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-mono font-semibold text-slate-900">
                      {detail.value}
                    </span>
                    {detail.copyable && (
                      <button
                        onClick={() => handleCopy(detail.value)}
                        className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                        aria-label={`Copy ${detail.label}`}
                      >
                        {copiedText === detail.value ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Steps */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { step: "1", text: "Go to M-Pesa menu" },
              { step: "2", text: "Select Lipa na M-Pesa > Paybill" },
              { step: "3", text: "Enter details and confirm" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-3">
                  {item.step}
                </div>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Important:</span> Always include
              the hashtag (e.g., #MISSION, #TITHE) in the account number to
              ensure your contribution is properly allocated.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-4">
              Stay <em className="italic text-blue-600">Connected</em>
            </h2>
            <p className="text-slate-600">
              Follow us online for updates, sermons, and community events
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-stone-200 p-6
                           hover:shadow-xl hover:border-blue-200 hover:-translate-y-1
                           transition-all duration-300 text-center"
              >
                <platform.icon
                  className={`w-10 h-10 ${platform.color} mx-auto mb-4`}
                />
                <h4 className="font-semibold text-slate-900 mb-1">
                  {platform.name}
                </h4>
                <p className="text-sm text-slate-500 mb-3">{platform.handle}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-blue-600 font-medium">
                  <span>Visit</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
