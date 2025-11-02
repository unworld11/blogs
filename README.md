# ML Vlogs

Plain-text landing page for the ML Vlogs project.

## Deploying to Vercel

1. Install the Vercel CLI if you don't already have it:
   ```bash
   npm install -g vercel
   ```
2. Log in (or create an account) from the CLI:
   ```bash
   vercel login
   ```
3. From the project root (`/Users/vedantasp/blogs`), run:
   ```bash
   vercel deploy
   ```
   - Accept the defaults when prompted for project name, framework, and directory.
   - The included `vercel.json` tells Vercel to treat `index.html` and `styles.css` as static assets, so no build step is needed.
4. When you're ready for production, run:
   ```bash
   vercel deploy --prod
   ```

You can also push this repository to GitHub and import it in the Vercel dashboard; the same configuration applies.
