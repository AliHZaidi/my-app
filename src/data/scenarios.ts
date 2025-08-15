// Refactored: School and user responses are now separate fields

export interface ScenarioStepOption {
  user: string; // What the parent/user says
  schoolResponse: string; // School's reply to the user's choice
  feedback: string;
  outcome: string;
  isRecommended: boolean;
  responseType: 'cooperative' | 'neutral' | 'competitive';
  nextStep?: number;
  condition?: (history: { stepIndex: number; optionIndex: number }[]) => boolean;
}

export interface ScenarioStep {
  school: string; // School's line for this step
  options: ScenarioStepOption[];
  condition?: (history: { stepIndex: number; optionIndex: number }[]) => boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  background: string;
  steps: ScenarioStep[];
}

export const scenarios: Record<string, Scenario> = {
  'disagreeing-politely': {
    id: 'disagreeing-politely',
    title: 'Disagreeing Politely',
    description: 'Practice expressing disagreement with the team while maintaining a collaborative relationship',
    difficulty: 'Moderate',
    background: 'You\'re in an IEP meeting and the team suggests reducing your child\'s speech therapy from 30 minutes twice a week to 30 minutes once a week, citing "good progress." You disagree based on your observations at home.',
    steps: [
      {
        school: "Thank you for joining us today. We want to discuss your child's progress and our recommendation.",
        options: [
          {
            user: "Begin the meeting.",
            schoolResponse: "The team suggests reducing speech therapy. How do you respond?",
            feedback: "",
            outcome: "",
            isRecommended: true,
            responseType: 'neutral',
            nextStep: 1
          }
        ]
      },
      {
        school: "The team suggests reducing speech therapy. How do you respond?",
        options: [
          {
            user: "Ask for the data supporting the recommendation.",
            schoolResponse: "We have data showing progress. Would you like to review it together?",
            feedback: "Great, always ask for data.",
            outcome: "You review the data together.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 2
          },
          {
            user: "Accept the recommendation.",
            schoolResponse: "Thank you for your trust. We'll proceed.",
            feedback: "You may miss an opportunity to advocate.",
            outcome: "The team proceeds with the reduction.",
            isRecommended: false,
            responseType: 'neutral',
            nextStep: 3
          },
          {
            user: "Firmly state that you disagree and demand to keep current services.",
            schoolResponse: "We understand your concerns. Let's discuss as a team.",
            feedback: "Standing firm is sometimes necessary, but collaboration is key.",
            outcome: "The team discusses further.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 4
          }
        ]
      },
      {
        school: "After reviewing the data, you notice some gaps. What do you say?",
        condition: (history) => history[0]?.optionIndex === 0,
        options: [
          {
            user: "Share your observations from home.",
            schoolResponse: "Thank you for sharing. Let's discuss how to address these concerns.",
            feedback: "Sharing your perspective is important.",
            outcome: "The team considers your input.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 5
          },
          {
            user: "Say nothing.",
            schoolResponse: "If there are no further comments, we'll move on.",
            feedback: "It's best to speak up if you have concerns.",
            outcome: "The meeting moves on.",
            isRecommended: false,
            responseType: 'neutral',
            nextStep: 6
          },
          {
            user: "Point out the gaps and insist the data is insufficient for reduction.",
            schoolResponse: "We can review the data again and discuss your concerns.",
            feedback: "Being assertive can be helpful, but try to keep the conversation collaborative.",
            outcome: "The team reviews the data again.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 7
          }
        ]
      },
      {
        school: "The team moves on to the next agenda item. Do you want to revisit the speech therapy discussion?",
        condition: (history) => history[0]?.optionIndex === 1,
        options: [
          {
            user: "Yes, ask to revisit the speech therapy decision.",
            schoolResponse: "Of course, let's discuss your concerns.",
            feedback: "It's never too late to advocate.",
            outcome: "The team returns to the topic.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 2
          },
          {
            user: "No, let the meeting continue.",
            schoolResponse: "We'll proceed as planned.",
            feedback: "You may miss an opportunity to advocate.",
            outcome: "The meeting continues.",
            isRecommended: false,
            responseType: 'neutral'
          }
        ]
      },
      {
        school: "The conversation becomes tense. The team seems defensive. How do you proceed?",
        condition: (history) => history[0]?.optionIndex === 2,
        options: [
          {
            user: "Acknowledge the team's perspective and ask to review the data together.",
            schoolResponse: "Thank you for your openness. Let's look at the data.",
            feedback: "Acknowledging others can help reset the tone.",
            outcome: "The conversation becomes more collaborative.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 2
          },
          {
            user: "Continue to insist on your position.",
            schoolResponse: "We want to work together, but it's important to review all information.",
            feedback: "Staying rigid can make collaboration difficult.",
            outcome: "The team remains defensive.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 8
          },
          {
            user: "Withdraw from the discussion.",
            schoolResponse: "We can follow up later if you wish.",
            feedback: "Withdrawing may end the conversation but doesn't resolve the issue.",
            outcome: "The meeting moves on without resolution.",
            isRecommended: false,
            responseType: 'neutral'
          }
        ]
      },
      {
        school: "The team asks if you have any data or examples from home. How do you respond?",
        condition: (history) => history[1]?.optionIndex === 0 || history[1]?.optionIndex === undefined && history[0]?.optionIndex === 0,
        options: [
          {
            user: "Provide specific examples of your child's struggles at home.",
            schoolResponse: "Those examples are helpful. Let's see how we can support your child better.",
            feedback: "Specific examples help the team understand your concerns.",
            outcome: "The team discusses possible adjustments.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 9
          },
          {
            user: "Say you don't have any examples.",
            schoolResponse: "That's okay. If you think of anything later, please let us know.",
            feedback: "It's helpful to share examples, but you can always follow up.",
            outcome: "The team moves forward with the current information.",
            isRecommended: false,
            responseType: 'neutral',
            nextStep: 10
          },
          {
            user: "Refuse to provide examples and say the school should already know.",
            schoolResponse: "We do our best to monitor progress, but your input is valuable.",
            feedback: "Collaboration is more effective than confrontation.",
            outcome: "The team moves forward, but communication is strained.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 8
          }
        ]
      },
      {
        school: "The meeting moves on. Do you want to bring up your concerns later?",
        condition: (history) => history[1]?.optionIndex === 1,
        options: [
          {
            user: "Yes, bring up your concerns in an email after the meeting.",
            schoolResponse: "Thank you for following up. Let's schedule a time to discuss.",
            feedback: "Following up is better than staying silent.",
            outcome: "You get another chance to discuss.",
            isRecommended: true,
            responseType: 'cooperative'
          },
          {
            user: "No, let it go.",
            schoolResponse: "We'll proceed as planned.",
            feedback: "You may miss an opportunity to advocate.",
            outcome: "The meeting ends.",
            isRecommended: false,
            responseType: 'neutral'
          }
        ]
      },
      {
        school: "The team seems frustrated by your insistence. How do you respond?",
        condition: (history) => history[1]?.optionIndex === 2,
        options: [
          {
            user: "Acknowledge their effort and suggest working together to find a solution.",
            schoolResponse: "We appreciate your willingness to collaborate.",
            feedback: "Collaboration can help de-escalate tension.",
            outcome: "The conversation becomes more productive.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 5
          },
          {
            user: "Continue to push your point.",
            schoolResponse: "Let's try to keep the conversation constructive.",
            feedback: "Pushing too hard can damage relationships.",
            outcome: "The team becomes less receptive.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 8
          }
        ]
      },
      {
        school: "The meeting is tense. The team is less willing to compromise. What do you do?",
        condition: (history) => {
          const last = history[history.length - 1];
          return last && (
            last.optionIndex === 2 ||
            (history.length > 2 && history[2]?.optionIndex === 2)
          );
        },
        options: [
          {
            user: "Pause and suggest a break to regroup.",
            schoolResponse: "A break sounds good. Let's reconvene in a few minutes.",
            feedback: "Taking a break can help reset the tone.",
            outcome: "The conversation resumes more calmly.",
            isRecommended: true,
            responseType: 'cooperative',
            nextStep: 5
          },
          {
            user: "Double down on your demands.",
            schoolResponse: "We may need to end the meeting if we can't work together.",
            feedback: "Escalation rarely leads to positive outcomes.",
            outcome: "The meeting ends without resolution.",
            isRecommended: false,
            responseType: 'competitive'
          }
        ]
      },
      {
        school: "The team proposes a trial period with reduced services. What do you do?",
        condition: (history) => history[3]?.optionIndex === 0 || history[4]?.optionIndex === 0,
        options: [
          {
            user: "Agree to the trial but request a follow-up meeting to review progress.",
            schoolResponse: "That's a good idea. We'll schedule a follow-up.",
            feedback: "Setting a follow-up ensures accountability.",
            outcome: "A follow-up meeting is scheduled.",
            isRecommended: true,
            responseType: 'cooperative'
          },
          {
            user: "Say you need more time to consider the proposal.",
            schoolResponse: "Of course, take your time and let us know your decision.",
            feedback: "It's okay to ask for time to think.",
            outcome: "You have more time to decide.",
            isRecommended: false,
            responseType: 'neutral'
          },
          {
            user: "Decline the trial and insist on keeping current services.",
            schoolResponse: "We understand your concerns. Let's discuss as a team.",
            feedback: "Standing firm is sometimes necessary, but collaboration is key.",
            outcome: "The team discusses further.",
            isRecommended: false,
            responseType: 'competitive',
            nextStep: 8
          }
        ]
      },
      {
        school: "The team moves forward with the current information. Do you want to follow up later?",
        condition: (history) => history[4]?.optionIndex === 1,
        options: [
          {
            user: "Yes, send more information after the meeting.",
            schoolResponse: "Thank you, we'll review your input.",
            feedback: "Providing more information later is helpful.",
            outcome: "The team will consider your input.",
            isRecommended: true,
            responseType: 'cooperative'
          },
          {
            user: "No, let the team decide.",
            schoolResponse: "We'll proceed as planned.",
            feedback: "You may miss an opportunity to advocate.",
            outcome: "The meeting ends.",
            isRecommended: false,
            responseType: 'neutral'
          }
        ]
      }
    ]
  },
  // ...other scenarios...
};