import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import type { Relationship } from "./EmailCreator";

interface RelationshipSelectProps {
  relationship: Relationship;
  onRelationshipChange: (relationship: Relationship) => void;
}

export const RelationshipSelect = ({ relationship, onRelationshipChange }: RelationshipSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Array<{ value: Relationship; label: string }> = [
    { value: "colleague", label: "Colleague" },
    { value: "manager", label: "Manager" },
    { value: "boss", label: "Boss" },
    { value: "client", label: "Client" },
    { value: "vendor", label: "Vendor" },
    { value: "friend", label: "Friend" },
    { value: "stranger", label: "Stranger" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium mb-4">
        Who are you writing to?
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-background border border-input rounded-lg hover:border-ring transition-colors"
        >
          <span>
            {options.find((o) => o.value === relationship)?.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 overflow-hidden z-20 bg-popover border border-border rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onRelationshipChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
              >
                <span>{option.label}</span>
                {relationship === option.value && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
