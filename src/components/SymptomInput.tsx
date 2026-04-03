import { Search, Stethoscope, Loader2, RotateCcw, Mic, MicOff } from "lucide-react";

interface SymptomInputProps {
  symptoms: string;
  onSymptomsChange: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isLoading: boolean;
  showReset: boolean;
  isListening: boolean;
  isVoiceSupported: boolean;
  onToggleVoice: () => void;
}

const SymptomInput = ({
  symptoms,
  onSymptomsChange,
  onAnalyze,
  onReset,
  isLoading,
  showReset,
  isListening,
  isVoiceSupported,
  onToggleVoice,
}: SymptomInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="w-full max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      <div className="glass rounded-2xl p-4 flex flex-col gap-3">
        <div className="relative">
          <textarea
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms... (e.g., headache, fever, fatigue)"
            className="w-full bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 pr-12 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px]"
            rows={3}
            aria-label="Symptom input"
            maxLength={500}
          />
          {isVoiceSupported && (
            <button
              onClick={onToggleVoice}
              className={`absolute right-3 top-3 p-1.5 rounded-lg transition-all ${
                isListening
                  ? "bg-primary/20 text-primary animate-pulse-glow"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
              title={isListening ? "Stop recording" : "Start voice input"}
              aria-label={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
          {!isVoiceSupported && (
            <Search className="absolute right-4 top-3.5 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          )}
        </div>

        {isListening && (
          <p className="text-xs text-primary animate-fade-in flex items-center gap-1.5" role="status">
            <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
            Listening... speak now
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onAnalyze}
            disabled={!symptoms.trim() || isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed glow-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>

          {showReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-accent/20 active:scale-[0.98] animate-fade-in"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;
