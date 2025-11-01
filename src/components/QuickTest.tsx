import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateEmails } from '@/services/emailGenerator';
import { toast } from 'sonner';

export const QuickTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const runQuickTest = async () => {
    setIsLoading(true);
    setResult('');
    
    try {
      console.log('Running quick test...');
      const response = await generateEmails(
        'Quick test to verify the API is working correctly.',
        'professional',
        'colleague',
        'short'
      );

      setResult(`✅ SUCCESS!\n\nGenerated ${response.emails.length} emails:\n\n${response.emails.map((email, idx) => `${idx + 1}. ${email.subject}\n${email.body.substring(0, 100)}...`).join('\n\n')}`);
      toast.success('Quick test passed! 🎉');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`❌ FAILED: ${errorMessage}`);
      toast.error('Quick test failed');
      console.error('Quick test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-card max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">🚀 Quick API Test</h3>
      <Button 
        onClick={runQuickTest} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Testing...' : 'Test Gemini API'}
      </Button>
      
      {result && (
        <div className="mt-4">
          <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96 whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};