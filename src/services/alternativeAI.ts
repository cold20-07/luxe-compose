import type { EmailRequest, EmailResponse } from './emailGenerator';

// Alternative AI service implementations
export class AlternativeAIService {
  private readonly ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
  private readonly HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

  async generateWithAnthropic(request: EmailRequest): Promise<EmailResponse> {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not found');
    }

    const systemPrompt = this.getSystemPrompt();
    const userPrompt = this.getUserPrompt(request);

    const response = await fetch(this.ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response from Anthropic API');
    }

    return this.parseAIResponse(aiResponse);
  }

  async generateWithHuggingFace(request: EmailRequest): Promise<EmailResponse> {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('Hugging Face API key not found');
    }

    // Note: This is a simplified implementation
    // For production, you'd want to use a more sophisticated model
    const prompt = `Generate 3 professional email variations for: ${request.context}`;

    const response = await fetch(this.HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    
    // This would need to be adapted based on the specific model's response format
    throw new Error('Hugging Face integration not fully implemented. Please use Gemini API.');
  }

  private getSystemPrompt(): string {
    return `You are an expert email writing assistant. Generate 3 professional email variations in JSON format with this structure:
{
  "emails": [
    {"id": 1, "tone": "professional", "subject": "...", "body": "..."},
    {"id": 2, "tone": "friendly", "subject": "...", "body": "..."},
    {"id": 3, "tone": "firm", "subject": "...", "body": "..."}
  ]
}`;
  }

  private getUserPrompt(request: EmailRequest): string {
    return `Context: ${request.context}
Tone: ${request.tone}
Relationship: ${request.relationship}
Length: ${request.length}

Generate 3 email variations based on this context.`;
  }

  private parseAIResponse(aiResponse: string): EmailResponse {
    try {
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const emailData = JSON.parse(cleanedResponse);
      
      if (!emailData.emails || !Array.isArray(emailData.emails) || emailData.emails.length !== 3) {
        throw new Error('Invalid response format from AI');
      }

      return emailData;
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Failed to parse email data from AI response');
    }
  }


}

export const alternativeAIService = new AlternativeAIService();