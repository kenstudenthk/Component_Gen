import { ArrowRight, Hammer, Gift } from "lucide-react";

export function Offers() {
  return (
    <section className="py-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Builders Bundle */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-8 transition-all hover:border-white/20">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-blue-500/20 blur-2xl"></div>
            <div className="mb-6 inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400">
              <Hammer className="mr-2 size-4" /> Builders Bundle
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">Stop building from scratch. Ship faster.</h3>
            <p className="mb-6 text-slate-400">Get everything</p>
            
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">$139</span>
              <span className="text-lg text-slate-500 line-through">$218</span>
              <span className="ml-2 inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">36% OFF</span>
            </div>
            
            <div className="mb-6">
              <p className="mb-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Offer Ends In</p>
              <div className="flex gap-2">
                {['0 Days', '0 Hrs', '0 Mins', '0 Secs'].map((t, i) => (
                  <div key={i} className="flex flex-col items-center justify-center rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                    <span className="text-lg font-bold text-white">{t.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase text-slate-500">{t.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-slate-200 transition-colors">
              Click to unlock deal <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Free Bonus Component */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-8 transition-all hover:border-white/20">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-purple-500/20 blur-2xl"></div>
            <div className="mb-6 inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-400">
              <Gift className="mr-2 size-4" /> Free Bonus Component
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white leading-tight">Subscribe to my newsletter and get the Animated Pill Tab component for free</h3>
            
            <div className="mt-auto pt-8">
              <div className="flex rounded-lg bg-white/5 p-1 border border-white/10">
                <input type="email" placeholder="Email address" className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 outline-none" />
                <button className="flex items-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                  Join <ArrowRight className="ml-2 size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}