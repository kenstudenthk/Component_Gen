import { Github } from "lucide-react";

export function AuthCTA() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-md px-6 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">ACCESS FULL LIBRARY</h2>
        <p className="mb-8 text-slate-400">Sign in to unlock all components</p>
        
        <div className="space-y-4">
          <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Send OTP Code
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="mx-4 flex-shrink-0 text-sm text-slate-500">Or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-slate-200 transition-colors">
            <Github className="size-4" />
            Continue with Google
          </button>
        </div>
        
        <p className="mt-6 text-sm text-slate-500">
          If you already have an account, we'll log you in
        </p>
      </div>
    </section>
  );
}