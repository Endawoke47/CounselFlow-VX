import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Keyboard shortcut: Ctrl/Cmd + Shift + D
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative transition-all duration-300 hover:scale-105 hover:bg-accent/10 focus-ring"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode (Ctrl+Shift+D)`}
    >
      <div className="relative w-4 h-4">
        <Sun 
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
      <span className="sr-only">
        Toggle theme (Ctrl+Shift+D)
      </span>
    </Button>
  );
}
