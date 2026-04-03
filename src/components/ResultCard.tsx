import { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  variant?: "default" | "emergency";
  delay?: number;
}

const ResultCard = ({ title, icon, children, variant = "default", delay = 0 }: ResultCardProps) => {
  const isEmergency = variant === "emergency";

  return (
    <div
      className={`glass-card rounded-xl p-5 opacity-0 animate-fade-in-up ${
        isEmergency ? "border-destructive/40 glow-emergency animate-emergency" : ""
      }`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={isEmergency ? "text-destructive" : "text-primary"}>{icon}</span>
        <h3 className={`font-semibold text-sm uppercase tracking-wider ${
          isEmergency ? "text-destructive" : "text-muted-foreground"
        }`}>
          {title}
        </h3>
      </div>
      <div className="text-card-foreground text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export default ResultCard;
