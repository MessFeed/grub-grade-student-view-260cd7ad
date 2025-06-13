import { NavLink } from "react-router-dom";

export function Sidebar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    // Added transition-all, duration-300, and ease-in-out to animate changes
    const baseClasses = "text-left font-mono transition-all duration-300 ease-in-out transform";
    
    const activeClasses = "text-3xl font-bold text-white scale-105 tracking-[-0.02em]";
    const inactiveClasses = "text-2xl font-light text-muted-foreground tracking-widest";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-full p-8 flex flex-col justify-center">
      <div className="flex flex-col items-start space-y-6">
        <NavLink to="/dashboard" className={navLinkClass}>
          dashboard
        </NavLink>
        <NavLink to="/history" className={navLinkClass}>
          history
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
          settings
        </NavLink>
      </div>
    </aside>
  );
}