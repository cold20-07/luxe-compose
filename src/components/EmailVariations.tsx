import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import type { Tone } from "./EmailCreator";

interface Email {
  subject: string;
  body: string;
  tone: Tone;
}

interface EmailVariationsProps {
  emails: Email[];
  isGenerating: boolean;
}

export const EmailVariations = ({ emails, isGenerating }: EmailVariationsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (email: Email, index: number) => {
    const fullEmail = `Subject: ${email.subject}\n\n${email.body}`;
    navigator.clipboard.writeText(fullEmail);
    setCopiedIndex(index);
    
    // Confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#60A5FA", "#93C5FD"],
    });

    toast.success("Copied to clipboard! 📧");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isGenerating) {
    return (
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="bg-card border border-border rounded-xl p-6 h-64 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex flex-col space-y-3">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
            </div>
            <div className="mt-12 flex justify-center items-center text-muted-foreground">
              <Mail className="w-5 h-5 mr-2 animate-pulse" />
              Crafting your perfect email...
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <Mail className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
          <p className="text-xl text-muted-foreground">
            Your AI-crafted emails will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {emails.map((email, index) => (
          <motion.div
            key={index}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Tone badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-2 flex-1">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <h3 className="font-bold text-lg leading-tight">
                  {email.subject}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground whitespace-nowrap ml-2">
                {email.tone}
              </span>
            </div>

            {/* Email content */}
            <p className="text-foreground/80 whitespace-pre-line leading-relaxed mb-4">
              {email.body}
            </p>

            {/* Copy button */}
            <Button
              onClick={() => handleCopy(email, index)}
              variant="outline"
              className="w-full"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
