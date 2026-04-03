import { Activity } from "lucide-react";

const Header = () => (
  <div className="text-center mb-10 animate-fade-in-up">
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="p-2 rounded-xl bg-primary/10 glow-primary">
        <Activity className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gradient">
        MEDIX AI
      </h1>
    </div>
    <p className="text-muted-foreground text-base sm:text-lg">
      AI Healthcare Assistant
    </p>
  </div>
);

export default Header;
