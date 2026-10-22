# Build your own GitHub profile

A practical guide to personalizing the profile design shown in the reel.

**You need:** a GitHub account, a laptop or desktop computer, a text editor such as VS Code, and [Node.js](https://nodejs.org/en/download). Git is optional for the upload method below. You do not need npm packages, paid hosting or an API key.

**Your workflow:** download the starter → edit your details → build the images → upload to your own profile repository.

## 1. Download and extract the starter

Download `github-profile-starter.zip` from the link shared with the reel. Extract it before editing. Open the extracted folder in your editor.

The folder should contain:

```text
github-profile-starter/
├── README.md
├── START-HERE.md
├── profile.config.json
├── assets/
└── scripts/
    ├── build-profile.cjs
    └── render-artwork.cjs
```

`README.md` is your generated profile. `START-HERE.md` is this guide. The `assets` folder contains the graphics. Change your details in `profile.config.json`, then rebuild; editing the generated README alone will not change text drawn inside the graphics.

## 2. Add your own details

Open `profile.config.json`. Replace `YOUR_USERNAME` with your GitHub username, without `@` or a full URL. For example, if your profile address is `https://github.com/riya-dev`, your username is `riya-dev`.

Change these fields using your real information. This is an example of part of the file; keep the other fields too:

```json
{
  "username": "riya-dev",
  "firstName": "RIYA",
  "lastName": "SHARMA",
  "role": "Frontend Developer",
  "focus": "FRONTEND / WEB / UI",
  "status": "OPEN TO COLLABORATE",
  "tagline": "Building useful, accessible web experiences.",
  "summary": "I build web applications and share what I learn.",
  "website": "https://github.com/riya-dev",
  "websiteLabel": "github.com/riya-dev"
}
```

Use your portfolio URL for `website`. If you do not have a portfolio, use your own GitHub profile URL. `websiteLabel` is the short address printed on the contact graphic.

Keep JSON double quotes and commas in place. Do not add a comma after the last item in an object. Your editor will usually highlight invalid JSON.

## 3. Personalize skills and projects

In the same configuration file, edit:

| Field | What it controls |
| --- | --- |
| `about` | Three short focus or introduction entries |
| `toolbelt` | Technologies listed below your hero |
| `orbitLabels` | Six short labels around the technology orbit |
| `toolbox` | Six skill cards: category, name and detail |
| `projects` | Two project cards, descriptions, technology tags and optional links |
| `showStats` | Optional external GitHub statistics cards; defaults to `false` |

Keep **three** `about` entries, **six** `toolbox` entries, **six** `orbitLabels` and **two** projects. The layout is designed for those counts.

For each project, write two short description lines. Example:

```json
{
  "name": "TASKFLOW",
  "subtitle": "PROJECT MANAGEMENT / IN DEVELOPMENT",
  "lines": [
    "Building a workspace to manage projects.",
    "Organize tasks and collaborate with a team."
  ],
  "tags": "REACT + YOUR BACKEND",
  "url": "https://github.com/riya-dev/taskflow"
}
```

Use projects and skills that are yours. Mark unfinished projects as in development. Leave `url` as an empty string if there is no public project link yet; the build will omit that link.

Keep names, headings and descriptions short. Aim for project names under about 22 characters and each description line under about 42 characters. Check the SVGs after building, especially if you have a long name.

## 4. Add your photo, or keep your initials

The starter uses your initials until you add a photo. To use one:

1. Put your JPG, JPEG or PNG in `assets/`. For example: `assets/photo.jpg`.
2. Find its pixel dimensions in the file's image information or properties.
3. Update `photo` in the configuration. This example is for an image that is 1200 pixels wide and 1600 pixels tall:

```json
"photo": {
  "path": "assets/photo.jpg",
  "width": 1200,
  "height": 1600,
  "crop": null
}
```

Use the dimensions of your actual image. The photo is embedded into the SVG graphics when you build. Replacing the photo file alone will not update graphics that were already built.

If the automatic center crop cuts off your face, you can choose a crop using `[x, y, width, height]` in original image pixels. For the example image above, `[0, 0, 1200, 1000]` selects the upper part of the photo. Rebuild and preview after changing it.

To use initials instead, set `photo.path` to an empty string.

## 5. Build and preview

Install Node.js if it is not already installed, then reopen your terminal or editor. Open a terminal **inside the extracted starter folder**, where `profile.config.json` is located.

Check that Node.js is available, then build:

```powershell
node --version
node scripts/build-profile.cjs
```

The build creates your `README.md`, desktop and mobile section graphics, and local navigation badges. No `npm install` is needed.

Open the files below in a browser to check the artwork:

- `assets/01-hero.svg` and `assets/01-hero-mobile.svg`
- `assets/04-projects.svg` and `assets/04-projects-mobile.svg`
- `assets/05-connect.svg` and `assets/05-connect-mobile.svg`

Check your name, photo crop, project descriptions, skills and URLs. If text is crowded, shorten it in the config and build again. To change colors or the layout itself, edit `scripts/render-artwork.cjs`; changing the config is enough for normal personalization.

## 6. Open your GitHub profile repository

Your profile repository must be **public** and have **exactly the same name as your GitHub username**. Its root must contain a nonempty `README.md`. This is how [GitHub profile READMEs](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) work.

Example: the account `riya-dev` needs the repository `riya-dev/riya-dev`. A repository called `my-profile` will not appear as that account's profile README.

**If the repository already exists:** open it and continue to the upload step. You do not need another repository or another `git init`. Save a copy of your current README before replacing it if you want to keep its content.

**If it does not exist:** create a repository on GitHub, enter your exact username as its name, select Public, and initialize it with a README.

## 7. Upload using the GitHub website

This is the route that does not require Git commands.

1. Open your profile repository on GitHub in a desktop browser.
2. Select **Add file → Upload files**.
3. From the extracted starter folder, drag in `README.md`, the entire `assets` folder, the entire `scripts` folder and `profile.config.json`.
4. Check that `README.md` is at the repository root and images are inside `assets/`. Upload the contents of the starter, not an extra wrapper folder and not the ZIP itself.
5. Commit the changes to the repository's default branch.
6. Visit `https://github.com/YOUR_USERNAME`, replacing `YOUR_USERNAME` with your real username.

Keep `scripts/` and `profile.config.json` in your repository so you can customize it again later. The displayed profile needs the generated README and graphics; the scripts do not run automatically on GitHub.

GitHub also documents [uploading files from the website](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## 8. Optional: publish using Git

If you prefer Git, first create or find your own profile repository as described above. In a terminal, replace the username below and clone that repository into a new folder:

```powershell
$githubUser = "YOUR_USERNAME"
git clone "https://github.com/$githubUser/$githubUser.git" github-profile
```

If you already have a clone, use that existing folder instead of cloning again. In File Explorer or Finder, copy the **built** `README.md`, `assets/`, `scripts/` and `profile.config.json` from your extracted starter into the clone. Allow the updated files to replace their old versions. Keep the clone's existing `.git` folder.

Open a terminal inside that clone. Check that the changes and remote are the ones you expect, then commit and push:

```powershell
git status
git remote -v
git add README.md assets scripts profile.config.json
git commit -m "Personalize GitHub profile"
git push
```

GitHub may ask you to sign in. Use its supported sign-in flow. If Git asks for a commit identity, configure your own Git name and email before retrying the commit.

## 9. Update it later

Edit `profile.config.json`, run `node scripts/build-profile.cjs` again, preview the changes, then upload or commit the rebuilt files. Editing generated files directly can be overwritten by the next build.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Profile README does not appear | Repository is public, name matches your username, and a nonempty `README.md` is at the root on the default branch. |
| Images are broken | Upload the entire `assets/` folder with the README. Preserve filenames and capitalization. |
| The profile still has placeholder text | Edit the configuration, rebuild locally and upload the rebuilt files. |
| The new photo does not appear | Check its path and dimensions, rebuild the SVGs and upload the changed artwork. |
| `node` is not recognized | Install Node.js, reopen your terminal, and try `node --version`. |
| A JSON error appears | Check quotes, commas and brackets in `profile.config.json`. |
| Text overflows a card | Shorten the name or description and rebuild. |
| `Cannot overwrite ... with itself` | Source and destination are the same folder. If you are already in the updated clone, skip copying. Otherwise copy from the extracted starter into the clone. |
| `nothing to commit, working tree clean` | Changes may be in the starter folder rather than the clone, or those same files are already committed. |
| `not a git repository` | Open the terminal inside your existing clone, where `.git` is located. |
| Push is rejected after remote updates | Run `git pull --rebase`, resolve any reported conflicts, then push. |
| Optional stats are missing | Stats use a third-party service and can fail or be cached. Leave `showStats` false for the built-in GitHub activity link. |

Before sharing your finished profile, click every link and check that the name, photo, username, skills and projects all describe you.
