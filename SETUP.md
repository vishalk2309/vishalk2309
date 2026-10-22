# Install on your GitHub profile

1. Create a **public** repository named exactly `vishalk2309` under the account `vishalk2309`, or open that repository if it already exists.
2. Copy `README.md` and the entire `assets/` folder into the repository root. Keep filenames and capitalization unchanged. Uploading only the README will leave the artwork missing.
3. Commit the files, then visit [your profile](https://github.com/vishalk2309).

The committed profile artwork displays without a build step, GitHub Actions workflow, token, or external hosting. Keep `scripts/` and `profile.config.json` with the profile so you can regenerate it after editing.

## Customize the design

The layout takes its visual direction from the second supplied video: a deep burgundy palette, cream serif headings, fine gold borders, an arched portrait and editorial project cards. The projects are EngiSync and AI Workhub, a Jira-inspired workspace currently being built for real-time project collaboration.

- Edit your name, links, photo settings, skills and project descriptions in `profile.config.json`.
- Edit colors and layout in `scripts/render-artwork.cjs`. The same renderer is used for the personal profile and downloadable starter.
- Run `node scripts/build-profile.cjs` from the repository root with Node.js installed. This rebuilds the 12 section SVGs and three local navigation badges.
- The README, links and accessible image descriptions are generated from the configuration. Edit the config and rebuild instead of editing generated files.
- The `<picture>` elements select stacked artwork on screens up to 600 pixels wide. Each section also includes a desktop fallback image.
- The SVGs use local system fonts. Their appearance can vary slightly between operating systems.
- The portrait source is `assets/profile.jpeg`. It is embedded into the hero SVGs so the image does not depend on a separate request when those graphics load. To change it, replace that JPEG, update `photo` in the configuration, and rebuild. An empty photo path displays your initials.
- Portfolio, repositories and GitHub navigation badges are stored in `assets/`; they do not depend on a badge service.

Only the existing portfolio and GitHub URLs are included. Add LinkedIn, email and individual project repository links once you have the exact destinations. The EngiSync button previously pointed to the portfolio home page; projects now have clearly labelled portfolio and repository links below them.

## Live activity

The statistics and language cards use `github-readme-stats.vercel.app`; the contribution calendar uses `ghchart.rshah.org`. These third-party services may be cached, unavailable or rate-limited. Each card links to GitHub, and a permanent activity link appears below them. Counts and credentials are not hard-coded into the artwork.

## Share the template with reel viewers

Give viewers `share/github-profile-starter.zip` and `share/GitHub-Profile-Guide.pdf`. The starter has its own `profile.config.json` and generic artwork; it does not include the portrait or project claims from this personal profile. Viewers personalize the configuration and build with Node.js before uploading to their own profile repository.

`share/INSTAGRAM-REEL-KIT.md` contains a reel script, caption, pinned comment, reply text and publishing instructions. Upload the share files to GitHub or another public download location before using those links in your reel.

To rebuild the distributable after changing the source artwork or guide:

```powershell
node scripts/package-starter.cjs
Compress-Archive -LiteralPath .preview/github-profile-starter -DestinationPath share/github-profile-starter.zip -Force
```

The PDF is included when it already exists in `share/`. The editable guide source is `share/GITHUB-PROFILE-GUIDE.md`; `node scripts/build-guide-html.cjs` regenerates its printable HTML version. Use a browser's Print → Save as PDF to export a revised PDF.

## References

GitHub documents [profile READMEs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) and recommends [relative paths for repository images](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images). This profile keeps its design assets in the repository using those relative paths.
