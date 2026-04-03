import { Stethoscope, ShieldAlert, UtensilsCrossed, AlertTriangle, Apple, Ban, Brain } from "lucide-react";
import ResultCard from "@/components/ResultCard";
import EmptyCard from "@/components/EmptyCard";
import SkeletonCard from "@/components/SkeletonCard";
import type { AnalyzeResponse, DietResponse, EmergencyResponse } from "@/lib/api";

interface ResultsSectionProps {
  state: "idle" | "loading" | "success" | "error";
  result: AnalyzeResponse | null;
  diet: DietResponse | null;
  emergency: EmergencyResponse | null;
  explanation: string;
  error: string;
}

const ResultsSection = ({ state, result, diet, emergency, explanation, error }: ResultsSectionProps) => (
  <div className="w-full max-w-2xl space-y-4">
    {/* Loading */}
    {state === "loading" && (
      <div className="space-y-4" role="status" aria-label="Loading results">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )}

    {/* Error */}
    {state === "error" && (
      <ResultCard title="Error" icon={<AlertTriangle className="w-5 h-5" />} variant="emergency">
        <p>{error}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Please check your connection and try again. If the problem persists, try refreshing the page.
        </p>
      </ResultCard>
    )}

    {/* Success */}
    {state === "success" && result && (
      <>
        {emergency?.emergency && (
          <ResultCard title="Emergency Alert" icon={<AlertTriangle className="w-5 h-5" />} variant="emergency" delay={0}>
            <p className="font-semibold text-destructive">
              ⚠️ Seek immediate medical attention
            </p>
            {emergency.message && <p className="mt-1">{emergency.message}</p>}
          </ResultCard>
        )}

        <ResultCard title="Condition" icon={<Stethoscope className="w-5 h-5" />} delay={emergency?.emergency ? 100 : 0}>
          <p className="font-medium text-foreground">{result.condition}</p>
        </ResultCard>

        <ResultCard title="Advice" icon={<ShieldAlert className="w-5 h-5" />} delay={emergency?.emergency ? 200 : 100}>
          <p>{result.advice}</p>
        </ResultCard>

        {explanation && (
          <ResultCard title="AI Explanation" icon={<Brain className="w-5 h-5" />} delay={emergency?.emergency ? 300 : 200}>
            <div className="whitespace-pre-line">{explanation}</div>
          </ResultCard>
        )}

        {diet && (
          <ResultCard title="Diet Recommendation" icon={<UtensilsCrossed className="w-5 h-5" />} delay={emergency?.emergency ? 400 : 300}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Apple className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Recommended</span>
                </div>
                <ul className="space-y-1">
                  {diet.recommended.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Ban className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Avoid</span>
                </div>
                <ul className="space-y-1">
                  {diet.avoid.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-1.5">
                      <span className="text-destructive mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ResultCard>
        )}
      </>
    )}

    {/* Empty State */}
    {state === "idle" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <EmptyCard title="Condition" icon={<Stethoscope className="w-4 h-4" />} description="AI-detected condition will appear here" />
        <EmptyCard title="Advice" icon={<ShieldAlert className="w-4 h-4" />} description="Personalized advice will appear here" />
        <EmptyCard title="AI Explanation" icon={<Brain className="w-4 h-4" />} description="AI-powered explanation will appear here" />
        <EmptyCard title="Diet" icon={<UtensilsCrossed className="w-4 h-4" />} description="Diet recommendations will appear here" />
      </div>
    )}
  </div>
);

export default ResultsSection;
