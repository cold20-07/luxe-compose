import { useState } from "react";
import type { EmailLength } from "./EmailCreator";

interface LengthSliderProps {
  length: EmailLength;
  onLengthChange: (length: EmailLength) => void;
}

export const LengthSlider = ({ length, onLengthChange }: LengthSliderProps) => {
  const lengths: Array<{ value: EmailLength; label: string; position: number }> = [
    { value: "short", label: "Short", position: 0 },
    { value: "medium", label: "Medium", position: 50 },
    { value: "long", label: "Long", position: 100 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium mb-6">
        Email Length
      </label>

      <div className="space-y-6">
        {/* Buttons */}
        <div className="flex gap-3">
          {lengths.map((l) => (
            <button
              key={l.value}
              onClick={() => onLengthChange(l.value)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                length === l.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
