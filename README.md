# YUVAN GPT — free AI starter

The light-blue YUVAN GPT website uses OpenRouter's free-model router for AI replies.

## Publish it
1. Create a GitHub account and a new repository named `yuvan-gpt`.
2. Upload `index.html`, `package.json`, `README.md`, and the `api` folder containing `chat.js`.
3. Import the repository into Vercel and deploy.
4. Create a free OpenRouter account at https://openrouter.ai/ and create an API key at https://openrouter.ai/keys.
5. In Vercel, open Project Settings → Environment Variables. Add:
   - Name: `OPENROUTER_API_KEY`
   - Value: your OpenRouter secret key
6. Save and redeploy. Test the Vercel website URL and share it.

## Important
- The OpenRouter `openrouter/free` router selects from available free models. Free model access is rate-limited and can be busy or unavailable.
- Current free-model limits can change. Check https://openrouter.ai/collections/free-models/ for current options and limits.
- Keep the API key private. Never put it in `index.html`, GitHub, or a message to anyone.
- Vercel's free hosting plan also has usage limits and terms. Do not use this starter for high-traffic commercial service without checking them.
