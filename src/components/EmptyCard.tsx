import { ReactNode } from "react";

interface EmptyCardProps {
  title: string;
  icon: ReactNode;
  description: string;
}

const EmptyCard = ({ title, icon, description }: EmptyCardProps) => (
  <div className="glass-card rounded-xl p-5 opacity-60">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-muted-foreground">{icon}</span>
      <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default EmptyCard;
