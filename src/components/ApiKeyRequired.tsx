import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const ApiKeyRequired = () => {
  return (
    <Alert className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertTitle className="text-red-800">Gemini API Key Required</AlertTitle>
      <AlertDescription className="text-red-700 space-y-3">
        <p>
          To generate AI-powered emails, you need to add your Google Gemini API key to the environment variables.
        </p>
        
        <div className="space-y-2">
          <p className="font-medium">Quick Setup:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Get your free API key from Google AI Studio</li>
            <li>Add it to your <code className="bg-red-100 px-1 rounded">.env</code> file</li>
            <li>Restart your development server</li>
          </ol>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-100"
            onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Get API Key
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-100"
            onClick={() => window.open('/GEMINI_SETUP.md', '_blank')}
          >
            Setup Guide
          </Button>
        </div>

        <div className="bg-red-100 p-3 rounded text-sm">
          <p className="font-medium mb-1">Add this to your .env file:</p>
          <code className="block bg-white p-2 rounded border">
            VITE_GEMINI_API_KEY=your_api_key_here
          </code>
        </div>
      </AlertDescription>
    </Alert>
  );
};