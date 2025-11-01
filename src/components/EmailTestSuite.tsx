import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateEmails } from '@/services/emailGenerator';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, Play } from 'lucide-react';
import type { EmailRequest, EmailResponse } from '@/services/emailGenerator';

interface TestScenario {
  id: string;
  name: string;
  description: string;
  request: EmailRequest;
}

interface TestResult {
  scenario: TestScenario;
  success: boolean;
  response?: EmailResponse;
  error?: string;
  duration: number;
}

export const EmailTestSuite = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [debugMode, setDebugMode] = useState(false);

  const testScenarios: TestScenario[] = [
    // Different Contexts
    {
      id: 'meeting-followup',
      name: 'Meeting Follow-up',
      description: 'Following up on a business meeting',
      request: {
        context: 'Following up on our meeting about the Q4 marketing strategy. We discussed the new campaign ideas and budget allocation.',
        tone: 'professional',
        relationship: 'colleague',
        length: 'medium'
      }
    },
    {
      id: 'project-request',
      name: 'Project Request',
      description: 'Requesting help with a project',
      request: {
        context: 'I need your assistance with the website redesign project. Could you review the mockups and provide feedback by Friday?',
        tone: 'friendly',
        relationship: 'colleague',
        length: 'short'
      }
    },
    {
      id: 'client-proposal',
      name: 'Client Proposal',
      description: 'Sending a proposal to a client',
      request: {
        context: 'Thank you for your interest in our services. I\'m attaching our proposal for the digital transformation project we discussed.',
        tone: 'professional',
        relationship: 'client',
        length: 'long'
      }
    },
    {
      id: 'deadline-reminder',
      name: 'Deadline Reminder',
      description: 'Firm reminder about approaching deadline',
      request: {
        context: 'The project deliverables are due next Friday. We need to finalize the remaining tasks to meet our commitment.',
        tone: 'firm',
        relationship: 'colleague',
        length: 'short'
      }
    },
    {
      id: 'thank-you-note',
      name: 'Thank You Note',
      description: 'Expressing gratitude for help received',
      request: {
        context: 'Thank you so much for your help with the presentation yesterday. Your insights really made a difference.',
        tone: 'friendly',
        relationship: 'friend',
        length: 'short'
      }
    },
    // Different Relationships
    {
      id: 'boss-update',
      name: 'Boss Update',
      description: 'Status update to manager',
      request: {
        context: 'Here\'s the weekly progress report on the customer onboarding improvements. We\'ve completed 3 of 5 milestones.',
        tone: 'professional',
        relationship: 'boss',
        length: 'medium'
      }
    },
    {
      id: 'vendor-inquiry',
      name: 'Vendor Inquiry',
      description: 'Inquiry to a service provider',
      request: {
        context: 'We\'re looking for a new cloud hosting solution for our application. Could you provide pricing and feature details?',
        tone: 'professional',
        relationship: 'vendor',
        length: 'medium'
      }
    },
    {
      id: 'stranger-introduction',
      name: 'Cold Outreach',
      description: 'Introduction email to someone new',
      request: {
        context: 'I found your profile on LinkedIn and was impressed by your work in sustainable technology. I\'d love to connect and learn more.',
        tone: 'friendly',
        relationship: 'stranger',
        length: 'short'
      }
    },
    // Different Lengths
    {
      id: 'brief-update',
      name: 'Brief Update',
      description: 'Very short status update',
      request: {
        context: 'The bug fix has been deployed and tested successfully.',
        tone: 'professional',
        relationship: 'colleague',
        length: 'short'
      }
    },
    {
      id: 'detailed-explanation',
      name: 'Detailed Explanation',
      description: 'Comprehensive project explanation',
      request: {
        context: 'I need to explain the new authentication system we\'re implementing, including the technical architecture, security considerations, timeline, and impact on existing users.',
        tone: 'professional',
        relationship: 'colleague',
        length: 'long'
      }
    },
    // Edge Cases
    {
      id: 'chaotic-tone',
      name: 'Chaotic Tone Test',
      description: 'Testing the chaotic tone option',
      request: {
        context: 'The server crashed again and we need to fix it ASAP before the big presentation tomorrow!',
        tone: 'chaotic',
        relationship: 'colleague',
        length: 'medium'
      }
    },
    {
      id: 'complex-context',
      name: 'Complex Context',
      description: 'Multi-faceted business scenario',
      request: {
        context: 'We need to discuss the budget reallocation for Q1, coordinate with the design team on the new brand guidelines, and schedule the client presentation for next week. There are also some concerns about the timeline that we should address.',
        tone: 'professional',
        relationship: 'manager',
        length: 'long'
      }
    }
  ];

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);
    const testResults: TestResult[] = [];

    for (const scenario of testScenarios) {
      setCurrentTest(scenario.name);
      const startTime = Date.now();
      
      try {
        const response = await generateEmails(
          scenario.request.context,
          scenario.request.tone,
          scenario.request.relationship,
          scenario.request.length
        );
        const duration = Date.now() - startTime;
        
        testResults.push({
          scenario,
          success: true,
          response,
          duration
        });
        
        toast.success(`✅ ${scenario.name} - Success`);
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        testResults.push({
          scenario,
          success: false,
          error: errorMessage,
          duration
        });
        
        toast.error(`❌ ${scenario.name} - Failed`);
      }
      
      // Small delay between tests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setResults(testResults);
    setCurrentTest('');
    setIsRunning(false);
    
    const successCount = testResults.filter(r => r.success).length;
    toast.success(`Test Suite Complete: ${successCount}/${testResults.length} passed`);
  };

  const runSingleTest = async (scenario: TestScenario) => {
    setCurrentTest(scenario.name);
    const startTime = Date.now();
    
    try {
      const response = await generateEmails(
        scenario.request.context,
        scenario.request.tone,
        scenario.request.relationship,
        scenario.request.length
      );
      const duration = Date.now() - startTime;
      
      const result: TestResult = {
        scenario,
        success: true,
        response,
        duration
      };
      
      setResults(prev => [...prev.filter(r => r.scenario.id !== scenario.id), result]);
      toast.success(`✅ ${scenario.name} - Success (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      const result: TestResult = {
        scenario,
        success: false,
        error: errorMessage,
        duration
      };
      
      setResults(prev => [...prev.filter(r => r.scenario.id !== scenario.id), result]);
      toast.error(`❌ ${scenario.name} - Failed`);
    }
    
    setCurrentTest('');
  };

  const getResultForScenario = (scenarioId: string) => {
    return results.find(r => r.scenario.id === scenarioId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧪 Email Generation Test Suite
            <Badge variant={import.meta.env.VITE_GEMINI_API_KEY ? "default" : "destructive"}>
              {import.meta.env.VITE_GEMINI_API_KEY ? '✅ Gemini API' : '❌ No API Key'}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Test different contexts, relationships, tones, and lengths to ensure your AI email generation works perfectly.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 flex-wrap">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run All Tests ({testScenarios.length})
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setDebugMode(!debugMode)}
              className="flex items-center gap-2"
            >
              {debugMode ? '🔍 Debug ON' : '🔍 Debug OFF'}
            </Button>
            
            {results.length > 0 && (
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {results.filter(r => r.success).length} Passed
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <XCircle className="w-4 h-4" />
                  {results.filter(r => !r.success).length} Failed
                </span>
              </div>
            )}
          </div>

          {currentTest && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm font-medium">Currently testing: {currentTest}</span>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {testScenarios.map((scenario) => {
              const result = getResultForScenario(scenario.id);
              
              return (
                <Card key={scenario.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {scenario.name}
                          {result && (
                            result.success ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => runSingleTest(scenario)}
                          disabled={isRunning}
                        >
                          Test
                        </Button>
                        {result && !result.success && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => runSingleTest(scenario)}
                            disabled={isRunning}
                            className="text-orange-600 border-orange-300"
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                      <Badge variant="secondary">Tone: {scenario.request.tone}</Badge>
                      <Badge variant="secondary">To: {scenario.request.relationship}</Badge>
                      <Badge variant="secondary">Length: {scenario.request.length}</Badge>
                      {result && (
                        <Badge variant={result.success ? "default" : "destructive"}>
                          {result.duration}ms
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm bg-muted p-2 rounded mb-3">
                      <strong>Context:</strong> {scenario.request.context}
                    </div>

                    {result && (
                      <div className="space-y-2">
                        {result.success && result.response ? (
                          <div className="text-sm">
                            <strong className="text-green-600">✅ Generated {result.response.emails.length} email variations</strong>
                            <div className="mt-2 space-y-1">
                              {result.response.emails.map((email, idx) => (
                                <div key={idx} className="bg-green-50 p-2 rounded text-xs">
                                  <strong>{email.subject}</strong>
                                  <p className="text-muted-foreground truncate">{email.body.substring(0, 100)}...</p>
                                  {debugMode && (
                                    <div className="mt-1 text-xs text-gray-500">
                                      ID: {email.id}, Tone: {email.tone}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            <strong>❌ Error:</strong> {result.error}
                            {debugMode && (
                              <div className="mt-2 text-xs">
                                <div>Duration: {result.duration}ms</div>
                                <div>Scenario: {result.scenario.id}</div>
                                <div>Request: {JSON.stringify(result.scenario.request, null, 2)}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};