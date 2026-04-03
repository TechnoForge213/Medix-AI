import { supabase } from "@/integrations/supabase/client";

export interface AnalyzeResponse {
  condition: string;
  advice: string;
}

export interface DietResponse {
  recommended: string[];
  avoid: string[];
}

export interface EmergencyResponse {
  emergency: boolean;
  message?: string;
}

async function edgeFn<T>(fnName: string, body: Record<string, string>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(fnName, {
    body,
  });

  if (error) {
    throw new Error(`API error: ${error.message}`);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as T;
}

export const analyzeSymptoms = (symptoms: string) =>
  edgeFn<AnalyzeResponse>("analyze", { symptoms });

export const getDiet = (condition: string) =>
  edgeFn<DietResponse>("diet", { condition });

export const checkEmergency = (symptoms: string) =>
  edgeFn<EmergencyResponse>("emergency", { symptoms });

export const getAiExplanation = (condition: string, symptoms: string) =>
  edgeFn<{ explanation: string }>("ai-explain", { condition, symptoms }).then(
    (d) => d.explanation
  );
