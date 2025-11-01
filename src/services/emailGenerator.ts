export interface EmailRequest {
  context: string;
  tone: string;
  relationship: string;
  length: string;
}

export interface EmailVariation {
  id: number;
  tone: string;
  subject: string;
  body: string;
}

export interface EmailResponse {
  emails: EmailVariation[];
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const SYSTEM_PROMPT = `You are an expert email writing assistant. Generate exactly 3 email variations based on the user's input.

TONE GUIDELINES:
- Professional: Formal, proper grammar, "Best regards," structured, complete sentences
- Friendly: Warm, conversational, contractions OK, "Cheers," approachable, shorter sentences  
- Firm: Direct, assertive, clear boundaries, "Regards," no fluff, active voice
- Chaotic: Unhinged but functional, random EMPHASIS!!!, internet slang mixed with corporate speak, emojis

LENGTH GUIDELINES:
- Brief: 3-5 sentences, 50-100 words max
- Moderate: 2-3 paragraphs, 100-200 words
- Detailed: 3-5 paragraphs, 200-350 words, use bullet points if listing items

RELATIONSHIP affects formality:
- Boss: Most formal, respectful, "I appreciate your consideration"
- Colleague: Collaborative, "Let's" and "we" language
- Client: Professional with warmth, customer-service oriented
- Vendor: Business-focused, clear expectations
- Friend: Most casual, personal touches OK
- Stranger: Polite and professional, brief self-intro

CRITICAL RULES:
- Return ONLY valid JSON, no markdown formatting, no code blocks
- No placeholder text like [Name], [Date], [Company]
- Use \\n\\n for paragraph breaks in body text
- Subject lines must be 6-8 words, specific and clear
- End emails with sign-off word only (no "Sincerely, John Smith" - just "Sincerely,")
- Make each variation GENUINELY different, not just word-swapped
- Every email must be copy-paste ready

Return in this EXACT JSON format:
{
  "emails": [
    {
      "id": 1,
      "tone": "professional",
      "subject": "Clear subject line here",
      "body": "Email body with proper formatting.\\n\\nUse double line breaks for paragraphs.\\n\\nEnd with sign-off word,"
    },
    {
      "id": 2,
      "tone": "friendly",
      "subject": "Subject line",
      "body": "Body text..."
    },
    {
      "id": 3,
      "tone": "firm",
      "subject": "Subject line",
      "body": "Body text..."
    }
  ]
}`;

export async function generateEmails(
  context: string,
  tone: string,
  relationship: string,
  length: string
): Promise<EmailResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing API key. Please add VITE_GEMINI_API_KEY to your .env file. Get a free key at https://aistudio.google.com/app/apikey');
  }

  if (!context || context.trim().length < 10) {
    throw new Error('Please provide more context about your email (at least 10 characters)');
  }

  const userPrompt = `Generate 3 email variations for:

Context: ${context}
Tone preference: ${tone}
Relationship: ${relationship}
Length: ${length}

Remember: Return ONLY valid JSON with the exact structure specified. No markdown, no code blocks, just pure JSON.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: SYSTEM_PROMPT + '\n\n' + userPrompt,
          }],
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file.');
      }
      
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    
    // Clean up the response - remove markdown code blocks if present
    const cleanedText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    let emailResponse: EmailResponse;
    try {
      emailResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedText);
      throw new Error('AI returned invalid JSON. Please try again.');
    }

    // Validate response structure
    if (!emailResponse.emails || !Array.isArray(emailResponse.emails)) {
      throw new Error('Invalid email response structure');
    }

    if (emailResponse.emails.length !== 3) {
      throw new Error(`Expected 3 email variations, got ${emailResponse.emails.length}`);
    }

    // Validate each email
    emailResponse.emails.forEach((email, index) => {
      if (!email.subject || !email.body || !email.tone) {
        throw new Error(`Email variation ${index + 1} is missing required fields`);
      }
      // Ensure id is set
      email.id = index + 1;
    });

    return emailResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating emails');
  }
}

// Helper function to regenerate a single variation
export async function regenerateEmailVariation(
  context: string,
  tone: string,
  relationship: string,
  length: string,
  variationIndex: number
): Promise<EmailVariation> {
  const response = await generateEmails(context, tone, relationship, length);
  return response.emails[variationIndex] || response.emails[0];
}