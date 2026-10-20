import "./work.css";
import Reveal from "./Reveal";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wk">
      <Reveal />
      {children}
    </div>
  );
}
