/**
 * components/ThemeToggle.tsx
 *
 * Navbar-mounted button that flips between light and dark mode using
 * `useTheme()` from `@/lib/theme`. Renders a sun icon when the active
 * theme is dark (clicking reverts to light) and a moon icon when it is
 * light (clicking activates dark mode). Persists the choice via the
 * ThemeProvider's localStorage write-through.
 */
import { useTheme } from "@/lib/theme";
import clsx from "clsx";

export default function ThemeToggle() {
  const { effective, toggleTheme, mounted } = useTheme();
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center h-10 w-10 rounded-lg"
      />
    );
  }
  const isDark = effective === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "inline-flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-200",
        "hover:bg-[rgba(99,102,241,0.08)] dark:hover:bg-[rgba(129,140,248,0.10)]",
        "text-[#64748B] dark:text-[#A5B4FC]",
        "hover:text-[#4F46E5] dark:hover:text-[#818CF8]",
        "border border-transparent hover:border-[rgba(99,102,241,0.20)] dark:hover:border-[rgba(129,140,248,0.25)]",
        "focus:outline-none focus:ring-2 focus:ring-[rgba(99,102,241,0.30)] dark:focus:ring-[rgba(129,140,248,0.40)]",
      )}
    >
      {/* Sun icon — visible when active theme is dark (i.e. press to bring light) */}
      <svg
        className={clsx(
          "w-5 h-5 transition-all duration-200",
          isDark ? "opacity-0 scale-50" : "opacity-100 scale-100",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
        />
      </svg>

      {/* Moon icon — visible when active theme is light (i.e. press to bring dark) */}
      <svg
        className={clsx(
          "w-5 h-5 transition-all duration-200 absolute",
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-50",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        />
      </svg>
    </button>
  );
}
