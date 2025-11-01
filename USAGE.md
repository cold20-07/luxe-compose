# AI Email Generation Usage Guide

## 🚀 Quick Start

Your email generation app is now powered by AI! Here's how to use it:

### 1. **Setup Required (Google Gemini API)**
- Add your Gemini API key to `.env`:
  ```
  VITE_GEMINI_API_KEY=your_gemini_api_key_here
  ```
- Restart your development server
- Enjoy real AI-generated emails!

## 📧 How It Works

### Input Parameters
- **Context**: Describe what your email is about
- **Tone**: Choose from Professional, Friendly, Firm, or Chaotic
- **Relationship**: Select who you're writing to (Colleague, Boss, Client, etc.)
- **Length**: Pick Short, Medium, or Long

### Output
- **3 Email Variations**: Each with different approaches
- **Copy to Clipboard**: One-click copying for each email
- **Subject Lines**: AI-generated subject lines for each variation

## 🔧 Technical Features

### AI Service Architecture
- **Primary**: Google Gemini 2.0 Flash Experimental (free tier, very cost-effective)
- **No Fallback**: Real AI generation only - no mock data
- **Extensible**: Easy to add more AI providers

### Error Handling
- Automatic retries with exponential backoff
- Graceful fallback to mock data
- User-friendly error messages
- Rate limit handling

### Performance
- Optimized prompts for faster generation
- Efficient token usage
- Response caching (can be added)

## 💰 Cost Estimation

### Google Gemini Pricing
- **Free Tier**: 15 requests per minute, 1,500 requests per day
- **Paid Tier**: ~$0.075 per 1M input tokens, ~$0.30 per 1M output tokens
- **Per Email Generation**: ~$0.0005-0.002 (very affordable!)
- **Monthly (100 emails)**: ~$0.05-0.20 (or free with free tier)

### Free Option
- **Gemini Free Tier**: 15 requests/minute, 1,500/day (perfect for most users)
- **Alternative**: Set up other AI providers like Hugging Face or local models

## 🛠️ Customization

### Adding New Tones
Edit `src/services/emailGenerator.ts` and add your tone to the system prompt:

```typescript
### YOUR_NEW_TONE
- Description of the tone
- Guidelines for writing
- Example sign-offs
```

### Adding New Relationships
Update `src/components/RelationshipSelect.tsx`:

```typescript
const options = [
  // ... existing options
  { value: "your_new_relationship", label: "Your New Relationship" },
];
```

### Adding New AI Providers
1. Implement in `src/services/alternativeAI.ts`
2. Add to the providers array in `emailGenerator.ts`
3. Add environment variable to `.env.example`

## 🔍 Troubleshooting

### Common Issues

**"Gemini API key is required"**
- The app requires a valid API key to function
- Add `VITE_GEMINI_API_KEY` to your `.env` file
- Get your free key at https://aistudio.google.com/app/apikey

**"Invalid Gemini API key"**
- Check your API key is correct
- Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure your Google Cloud project has the Generative AI API enabled

**"Rate limit exceeded"**
- Wait a moment and try again
- Consider upgrading from Gemini free tier
- The app will automatically retry

**"Failed to generate emails"**
- Check your internet connection
- Verify API key is valid
- Check browser console for detailed errors

### Debug Mode
Open browser console to see detailed logs:
- API requests and responses
- Error details
- Provider fallback information

## 🚀 Deployment

### Environment Variables for Production
```bash
# Required for Supabase (if using)
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
VITE_SUPABASE_URL=your_url

# Required for AI generation
VITE_GEMINI_API_KEY=your_gemini_key

# Optional alternatives
VITE_OPENAI_API_KEY=sk-your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
VITE_HUGGINGFACE_API_KEY=your_hf_key
```

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📈 Next Steps

### Potential Enhancements
- **Email Templates**: Pre-built templates for common scenarios
- **Tone Training**: Custom tone definitions
- **Multi-language**: Support for different languages
- **Email Scheduling**: Integration with calendar apps
- **Analytics**: Track email performance
- **Team Sharing**: Share generated emails with team members

### Integration Ideas
- **CRM Integration**: Connect with Salesforce, HubSpot
- **Email Clients**: Direct integration with Gmail, Outlook
- **Slack/Teams**: Generate emails from chat messages
- **Calendar**: Generate meeting follow-up emails

---

**Need Help?** Check the browser console for detailed error messages, or refer to the OpenAI API documentation for troubleshooting API-related issues.