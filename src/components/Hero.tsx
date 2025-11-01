import { motion } from "framer-motion";
import { Code, Rocket, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStartClick: () => void;
}

export const Hero = ({ onStartClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="relative z-20 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-primary">✉️</span>
            <span>EmailCraft</span>
          </div>
        </div>
      </nav>

      {/* Soft background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stop Staring at Blank Emails
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered email drafting that makes writing feel like magic. 
              Professional, personal, perfect—every time.
            </p>

            <Button
              onClick={onStartClick}
              size="lg"
              className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Start Writing <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Right side - Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="text-8xl">✉️</div>
          </motion.div>
        </div>
      </div>

      {/* Feature cards at bottom */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm border border-green-200 rounded-2xl p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-700" />
            </div>
            <span className="font-semibold text-foreground">Perfect Tone Every Time</span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-200 flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-700" />
            </div>
            <span className="font-semibold text-foreground">3 Variations Instantly</span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-amber-700" />
            </div>
            <span className="font-semibold text-foreground">Copy & Send in Seconds</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
