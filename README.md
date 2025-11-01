# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/85a1d3b2-b5eb-4556-bd96-620795d4e119

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/85a1d3b2-b5eb-4556-bd96-620795d4e119) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env and add your API keys (see API Setup section below)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## API Setup

This project uses AI services to generate emails. You have several options:

### Option 1: Google Gemini API (Recommended)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add to your `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Option 2: Development Mode

**Note:** An API key is required for the app to function. Mock data has been removed to ensure you always get real AI-generated emails.

### Option 3: Alternative AI Services

You can also use:

- **OpenAI**: Add `VITE_OPENAI_API_KEY` to your `.env`
- **Anthropic Claude**: Add `VITE_ANTHROPIC_API_KEY` to your `.env`
- **Hugging Face**: Add `VITE_HUGGINGFACE_API_KEY` to your `.env`

### Cost Considerations

- **Google Gemini 2.0 Flash Experimental**: Free tier with 15 requests/minute, then ~$0.075 per 1M input tokens
- **Typical email generation**: ~$0.0005-0.002 per request (very cost-effective!)
- **OpenAI GPT-4o-mini**: ~$0.15 per 1M input tokens (more expensive)
- **Free option**: Gemini free tier (15 requests/minute, 1,500/day)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/85a1d3b2-b5eb-4556-bd96-620795d4e119) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
