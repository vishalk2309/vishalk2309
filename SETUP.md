# Install on your GitHub profile

1. Create a **public** repository named exactly `vishalk2309` under the account `vishalk2309`, or open that repository if it already exists.
2. Copy `README.md` and the entire `assets/` folder into the repository root. Keep filenames and capitalization unchanged. Uploading only the README will leave the artwork missing.
3. Commit the files, then visit [your profile](https://github.com/vishalk2309).

No build step, GitHub Actions workflow, token, or external hosting is needed for the profile artwork. The `scripts/` folder is optional when uploading; keep it if you want to regenerate the design later.

## Customize the design

The layout takes its visual direction from the supplied video: oversized typography, a dark background, blue and red accents, bordered cards, a technology orbit and a developer pass. The profile uses Vishal's existing name, technologies and project descriptions. The VK monogram is an illustration, not a portrait.

- Edit text, colors and artwork in `scripts/build-profile.cjs`.
- Run `node scripts/build-profile.cjs` from the repository root with Node.js installed. This rebuilds all 12 SVG files, including the mobile layouts.
- Update links and accessible image descriptions in `README.md` when changing profile content.
- The `<picture>` elements select stacked artwork on screens up to 600 pixels wide. Each section also includes a desktop fallback image.
- The SVGs use local system fonts. Their appearance can vary slightly between operating systems.
- To use a real portrait, add a photo you own to `assets/` and adjust the hero/developer-pass artwork.

Only the existing portfolio and GitHub URLs are included. Add LinkedIn, email and individual project repository links once you have the exact destinations. The EngiSync button previously pointed to the portfolio home page; projects now have clearly labelled portfolio and repository links below them.

## Live activity

The statistics and language cards use `github-readme-stats.vercel.app`; the contribution calendar uses `ghchart.rshah.org`. These third-party services may be cached, unavailable or rate-limited. Each card links to GitHub, and a permanent activity link appears below them. Counts and credentials are not hard-coded into the artwork.

## Reference

GitHub documents [profile READMEs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) and recommends [relative paths for repository images](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images). This profile keeps its design assets in the repository using those relative paths.
