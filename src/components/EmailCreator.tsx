import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToneSelector } from "./ToneSelector";
import { RelationshipSelect } from "./RelationshipSelect";
import { LengthSlider } from "./LengthSlider";
import { EmailVariations } from "./EmailVariations";
import { generateEmails } from "@/services/emailGenerator";
import { toast } from "sonner";
import { ApiKeyRequired } from "./ApiKeyRequired";

export type Tone = "professional" | "friendly" | "firm" | "chaotic";
export type Relationship = "colleague" | "manager" | "client" | "friend" | "boss" | "vendor" | "stranger";
export type EmailLength = "short" | "medium" | "long";

interface EmailCreatorProps {
  onBack?: () => void;
}

export const EmailCreator = ({ onBack }: EmailCreatorProps) => {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [relationship, setRelationship] = useState<Relationship>("colleague");
  const [length, setLength] = useState<EmailLength>("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [emails, setEmails] = useState<Array<{ subject: string; body: string; tone: Tone }>>([]);

  // Keyboard shortcut: Ctrl+Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isGenerating && context.trim()) {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [context, isGenerating]);

  const handleGenerate = async () => {
    // Validate context
    if (!context.trim()) {
      toast.error("Please provide some context for your email");
      return;
    }

    setIsGenerating(true);
    setEmails([]); // Clear previous results
    
    try {
      const response = await generateEmails(context, tone, relationship, length);

      if (response?.emails && Array.isArray(response.emails)) {
        // Transform the response to match the expected format
        const emailsWithTone = response.emails.map((email) => ({
          subject: email.subject,
          body: email.body,
          tone: email.tone as Tone
        }));
        setEmails(emailsWithTone);
        toast.success("Emails generated! ✨");
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || "Failed to generate emails. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const charCount = context.length;
  const maxChars = 500;
  const charPercentage = (charCount / maxChars) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className="text-primary">✉️</span>
                <span>Good Mail</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
              <span>Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl+Enter</kbd> to generate</span>
              <span className={`px-2 py-1 rounded text-xs ${import.meta.env.VITE_GEMINI_API_KEY ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {import.meta.env.VITE_GEMINI_API_KEY ? '✅ Gemini API' : '❌ No API Key'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold">Create Your Email</h2>
            <p className="text-muted-foreground mt-2">Fill in the details and let AI craft perfect emails for you</p>
          </motion.div>

          {/* API Key Warning */}
          {!import.meta.env.VITE_GEMINI_API_KEY && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <ApiKeyRequired />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left side - Input controls */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <label className="block text-sm font-medium mb-2">
                  What's your email about? *
                </label>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="E.g., Following up on our meeting about the Q4 marketing strategy..."
                  className="min-h-[150px] resize-none"
                  maxLength={maxChars}
                  aria-label="Email context"
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className={`text-sm ${charPercentage > 90 ? "text-destructive" : charPercentage > 70 ? "text-warning" : "text-muted-foreground"}`}>
                    {charCount} / {maxChars}
                  </span>
                  {!context.trim() && (
                    <span className="text-xs text-destructive">Required field</span>
                  )}
                </div>
              </div>

              <ToneSelector tone={tone} onToneChange={setTone} />
              <RelationshipSelect relationship={relationship} onRelationshipChange={setRelationship} />
              <LengthSlider length={length} onLengthChange={setLength} />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !context.trim() || !import.meta.env.VITE_GEMINI_API_KEY}
                size="lg"
                className="w-full shadow-md hover:shadow-lg transition-all"
                aria-label="Generate email variations"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Crafting your emails...
                  </>
                ) : !import.meta.env.VITE_GEMINI_API_KEY ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    API Key Required
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Perfect Emails
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground sm:hidden">
                Tip: Press Ctrl+Enter to generate quickly
              </p>
            </div>

            {/* Right side - Email variations */}
            <EmailVariations emails={emails} isGenerating={isGenerating} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
