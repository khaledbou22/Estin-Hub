import { Moon, Sun } from "lucide-react";

interface Props {
  dark: boolean;
  toggle: () => void;
}

const DarkModeToggle = ({ dark, toggle }: Props) => (
  <button
    onClick={toggle}
    className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
    aria-label="Toggle dark mode"
  >
    {dark ? (
      <Sun size={20} className="text-muted-foreground" />
    ) : (
      <Moon size={20} className="text-muted-foreground" />
    )}
  </button>
);

export default DarkModeToggle;

