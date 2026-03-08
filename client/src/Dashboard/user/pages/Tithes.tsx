function Tithes() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
          Upcoming Feature
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
          Tithes & Offerings
          <span className="block text-blue-600 italic mt-2">Coming Soon</span>
        </h1>

        {/* Description */}
        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
          We're working on a secure and seamless giving experience. This page
          will allow members to conveniently return tithes and give offerings
          online.
        </p>

        {/* Subtle Divider */}
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-8" />

        {/* Footer Note */}
        <p className="text-sm text-slate-400">
          Thank you for your patience as we prepare this feature.
        </p>
      </div>
    </section>
  );
}

export default Tithes;
