import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateEmails } from '@/services/emailGenerator';
import { toast } from 'sonner';

export const TestEmailGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const runTest = async () => {
    setIsLoading(true);
    setResult('');
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const status = apiKey ? '✅ Gemini API key found' : '❌ No API key - generation will fail';
      
      const response = await generateEmails(
        'Following up on our meeting about the Q4 marketing strategy. We discussed the new campaign ideas and budget allocation.',
        'professional',
        'colleague',
        'medium'
      );

      setResult(`${status}\n\n${JSON.stringify(response, null, 2)}`);
      toast.success('Test completed successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`Error: ${errorMessage}`);
      toast.error('Test failed: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Test Email Generation Service</h3>
      <Button 
        onClick={runTest} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Testing...' : 'Run Test'}
      </Button>
      
      {result && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Result:</h4>
          <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};