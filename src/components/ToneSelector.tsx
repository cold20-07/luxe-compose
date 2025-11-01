import { Briefcase, Smile, Shield, Flame } from "lucide-react";
import type { Tone } from "./EmailCreator";

interface ToneSelectorProps {
  tone: Tone;
  onToneChange: (tone: Tone) => void;
}

export const ToneSelector = ({ tone, onToneChange }: ToneSelectorProps) => {
  const tones: Array<{ value: Tone; label: string; icon: any; color: string }> = [
    { value: "professional", label: "Professional", icon: Briefcase, color: "from-blue-500 to-blue-600" },
    { value: "friendly", label: "Friendly", icon: Smile, color: "from-orange-500 to-orange-600" },
    { value: "firm", label: "Firm", icon: Shield, color: "from-red-500 to-red-600" },
    { value: "chaotic", label: "Chaotic", icon: Flame, color: "from-purple-500 via-pink-500 to-orange-500" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium mb-4">
        Select Your Tone
      </label>
      <div className="flex flex-wrap gap-3">
        {tones.map((t) => {
          const Icon = t.icon;
          const isSelected = tone === t.value;
          
          return (
            <button
              key={t.value}
              onClick={() => onToneChange(t.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
