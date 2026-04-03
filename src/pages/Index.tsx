import { useState, useCallback } from "react";
import { analyzeSymptoms, getDiet, checkEmergency, getAiExplanation, AnalyzeResponse, DietResponse, EmergencyResponse } from "@/lib/api";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import Header from "@/components/Header";
import SymptomInput from "@/components/SymptomInput";
import ResultsSection from "@/components/ResultsSection";
import Disclaimer from "@/components/Disclaimer";

type AppState = "idle" | "loading" | "success" | "error";

const Index = () => {
  const [symptoms, setSymptoms] = useState("");
  const [state, setState] = useState<AppState>("idle");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [diet, setDiet] = useState<DietResponse | null>(null);
  const [emergency, setEmergency] = useState<EmergencyResponse | null>(null);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const onVoiceResult = useCallback((text: string) => {
    setSymptoms((prev) => (prev ? prev + " " + text : text));
  }, []);

  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition(onVoiceResult);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setState("loading");
    setError("");
    setResult(null);
    setDiet(null);
    setEmergency(null);
    setExplanation("");

    try {
      const [analyzeData, emergencyData] = await Promise.all([
        analyzeSymptoms(symptoms.trim()),
        checkEmergency(symptoms.trim()),
      ]);

      setResult(analyzeData);
      setEmergency(emergencyData);

      const [dietResult, explanationResult] = await Promise.allSettled([
        getDiet(analyzeData.condition),
        getAiExplanation(analyzeData.condition, symptoms.trim()),
      ]);

      if (dietResult.status === "fulfilled") setDiet(dietResult.value);
      if (explanationResult.status === "fulfilled") setExplanation(explanationResult.value);

      setState("success");
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setState("error");
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setState("idle");
    setResult(null);
    setDiet(null);
    setEmergency(null);
    setExplanation("");
    setError("");
  };

  const toggleVoice = () => {
    isListening ? stopListening() : startListening();
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-4 py-10 sm:py-16">
      <Header />
      <SymptomInput
        symptoms={symptoms}
        onSymptomsChange={setSymptoms}
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        isLoading={state === "loading"}
        showReset={state !== "idle"}
        isListening={isListening}
        isVoiceSupported={isSupported}
        onToggleVoice={toggleVoice}
      />
      <ResultsSection
        state={state}
        result={result}
        diet={diet}
        emergency={emergency}
        explanation={explanation}
        error={error}
      />
      <Disclaimer />
    </main>
  );
};

export default Index;
