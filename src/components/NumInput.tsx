import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpHint } from "./HelpHint";
import type { TooltipEntry } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  tooltip?: TooltipEntry;
  helper?: string;
  helperColor?: string;
}

export const NumInput = ({ label, value, onChange, tooltip, helper, helperColor }: Props) => {
  const [raw, setRaw] = useState(String(value));

  // Se il valore cambia dall'esterno (es. reset, fetch live, WACC auto-calcolato)
  // e non corrisponde a ciò che l'utente sta digitando, risincronizza.
  useEffect(() => {
    if (parseFloat(raw) !== value) setRaw(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (v: string) => {
    // Ammette: vuoto, segno meno isolato, cifre, un solo punto decimale
    if (/^-?\d*\.?\d*$/.test(v)) {
      setRaw(v);
      const parsed = parseFloat(v);
      if (!Number.isNaN(parsed)) onChange(parsed);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{label}</Label>
        <HelpHint entry={tooltip} />
      </div>
      <Input
        type="text"
        inputMode="decimal"
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setRaw(String(value))}
        className="rounded-sm font-mono-fin text-right h-9"
      />
      {helper && <p className={cn("text-[10px]", helperColor ?? "text-muted-foreground")}>{helper}</p>}
    </div>
  );
};

interface TextProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  tooltip?: TooltipEntry;
}

export const TextInput = ({ label, value, onChange, tooltip }: TextProps) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{label}</Label>
      <HelpHint entry={tooltip} />
    </div>
    <Input value={value} onChange={(e) => onChange(e.target.value)} className="rounded-sm h-9" />
  </div>
);
