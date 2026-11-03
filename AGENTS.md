<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- TypeScript runs strict but without noUncheckedIndexedAccess/exactOptionalPropertyTypes/noPropertyAccessFromIndexSignature/noImplicitReturns — demo data code relies on indexed access; keep these off unless refactoring all data access.
- Use the root ThemeProvider and shared ThemePicker for appearance; store only the device appearance preference locally and apply browser APIs after hydration to preserve SSR consistency.
- Keep navy banner/sidebar backgrounds stable while adapting surface and text tokens in dark mode, so photographic overlays retain contrast.
