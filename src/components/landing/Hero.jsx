export function Hero({ activeFilter, setActiveFilter }) {
  const filters = ['Categories', 'Full Apps', 'Custom Libraries', 'Tools'];

  return (
    <section className="py-20 md:py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
          Component Library
        </div>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Choose a component out of <span className="text-blue-500">93</span> to explore.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400">
          Each category contains ready-to-use components that you can copy directly into your Power Apps.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === activeFilter
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}