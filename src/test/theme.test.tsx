import { act, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { parseTheme, resolveTheme, ThemeProvider } from "@/lib/theme";

afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
  vi.restoreAllMocks();
});

describe("Appearance preferences", () => {
  it("keeps light mode light even when the system is dark", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });
  it("keeps dark mode dark even when the system is light", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
  });
  it("follows both system appearances", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });
  it("defaults an absent or invalid preference to system", () => {
    expect(parseTheme(null)).toBe("system");
    expect(parseTheme("invalid")).toBe("system");
  });
  it("reacts to a system appearance change", async () => {
    let change: (() => void) | undefined;
    const media = { matches: false, addEventListener: vi.fn((_event, callback) => { change = callback; }), removeEventListener: vi.fn() };
    vi.stubGlobal("matchMedia", () => media);
    const view = render(<ThemeProvider><span>Content</span></ThemeProvider>);
    await waitFor(() => expect(media.addEventListener).toHaveBeenCalled());
    act(() => { media.matches = true; change?.(); });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    view.unmount();
    expect(media.removeEventListener).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});