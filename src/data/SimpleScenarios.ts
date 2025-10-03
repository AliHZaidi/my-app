// This file defines static, multiple-choice versions of the same scenarios as CustomScenarios.ts

export interface SimpleScenarioStep {
  question: string;
  answers: {
    text: string;
    feedback: {
      positive: string;
      negative: string;
    };
  }[];
}

export interface SimpleScenario {
  id: string;
  title: string;
  background: string;
  steps: SimpleScenarioStep[];
}

// Now each answer includes both positive and negative feedback

export const simpleScenarios: Record<string, SimpleScenario> = {
  'custom-disagreement': {
    id: 'custom-disagreement',
    title: 'Disagreeing with the Team',
    background: "You are in an IEP meeting. The team suggests reducing your child's speech therapy, citing good progress. You disagree based on your observations at home.",
    steps: [
      {
        question: "The school says: 'We want to discuss your child's progress and our recommendation to reduce speech therapy.' How do you respond?",
        answers: [
          {
            text: "Ask for more details about the recommendation.",
            feedback: {
              positive: "Good! Asking for details helps you understand the team's reasoning and opens the door for a collaborative discussion.",
              negative: "However, you may miss the chance to immediately share your own concerns or observations, and the team may feel you are only questioning their expertise."
            }
          },
          {
            text: "Share your observations from home.",
            feedback: {
              positive: "Sharing your perspective helps the team see the full picture and can validate your child's needs.",
              negative: "If you only share your view, you might not address the team's specific data or reasoning, and the team may feel you are dismissing their expertise."
            }
          },
          {
            text: "State that you do not agree and want to keep services the same.",
            feedback: {
              positive: "Being direct can be effective and shows your position clearly, which may prompt the team to reconsider.",
              negative: "This approach may create tension or shut down collaborative discussion, and the team may feel you are not open to compromise."
            }
          }
        ]
      },
      {
        question: "The team provides data showing progress. What do you do next?",
        answers: [
          {
            text: "Request a trial period before making changes.",
            feedback: {
              positive: "A trial period allows for more data and a careful decision, showing you are open to compromise.",
              negative: "It may delay needed changes if the team feels confident in their recommendation, and could be seen as indecisive."
            }
          },
          {
            text: "Agree to reduce services.",
            feedback: {
              positive: "If you feel comfortable, agreeing is fine and shows trust in the team, which can strengthen relationships.",
              negative: "You may regret agreeing if your concerns weren't fully addressed, and it may be hard to reverse the decision later."
            }
          },
          {
            text: "Request mediation.",
            feedback: {
              positive: "Mediation is an option if you cannot reach agreement, and can provide a neutral space for discussion.",
              negative: "It can be time-consuming and may escalate conflict if not needed, and may make the team defensive."
            }
          }
        ]
      },
      {
        question: "After the meeting, you still feel uneasy about the decision. What is your next step?",
        answers: [
          {
            text: "Follow up with the team via email to clarify your concerns.",
            feedback: {
              positive: "Following up ensures your concerns are documented and gives the team a chance to respond thoughtfully.",
              negative: "Email communication may be less effective than in-person discussion and could prolong resolution."
            }
          },
          {
            text: "Request another meeting to revisit the decision.",
            feedback: {
              positive: "Requesting another meeting shows you are proactive and committed to your child's needs.",
              negative: "It may be seen as repetitive and could frustrate the team if not approached collaboratively."
            }
          },
          {
            text: "Accept the decision and monitor your child's progress.",
            feedback: {
              positive: "Monitoring progress allows you to gather more evidence and intervene if needed.",
              negative: "If you wait too long, it may be harder to reverse the decision or address issues that arise."
            }
          }
        ]
      }
    ]
  },
  'custom-request-data': {
    id: 'custom-request-data',
    title: 'Requesting Data',
    background: "The school team makes a recommendation about your child's services. You want to see the data that supports their decision.",
    steps: [
      {
        question: "The school says: 'We recommend adjusting your child's services based on our progress monitoring.' How do you respond?",
        answers: [
          {
            text: "Ask to review the progress data together.",
            feedback: {
              positive: "Reviewing data together encourages transparency and builds trust.",
              negative: "It may take extra meeting time and could delay decisions if the data is not readily available."
            }
          },
          {
            text: "Request formal assessment results.",
            feedback: {
              positive: "Formal assessments provide important information for decisions and ensure objectivity.",
              negative: "Formal assessments may take time and may not be immediately available, possibly delaying support."
            }
          },
          {
            text: "Decline changes until you see clear evidence.",
            feedback: {
              positive: "It's reasonable to wait for evidence before agreeing to changes, ensuring decisions are data-driven.",
              negative: "This may be seen as uncooperative and could slow down needed support or strain relationships."
            }
          }
        ]
      },
      {
        question: "The school shares some data. What do you do next?",
        answers: [
          {
            text: "Ask clarifying questions about the data.",
            feedback: {
              positive: "Clarifying questions help ensure you understand the information and can advocate effectively.",
              negative: "Too many questions may be perceived as challenging the team's expertise or slowing the process."
            }
          },
          {
            text: "Request a meeting to review all documentation.",
            feedback: {
              positive: "A meeting can help address all your concerns and ensure everyone is on the same page.",
              negative: "Scheduling another meeting may delay decisions and require more time from everyone."
            }
          },
          {
            text: "Escalate your request to the district.",
            feedback: {
              positive: "Escalation is an option if you feel your requests aren't being met and can bring in additional support.",
              negative: "It may strain relationships with the school team and slow down the process or create adversarial dynamics."
            }
          }
        ]
      },
      {
        question: "You receive conflicting data from different sources. What do you do?",
        answers: [
          {
            text: "Request an independent evaluation.",
            feedback: {
              positive: "Independent evaluations can provide an unbiased perspective and clarify discrepancies.",
              negative: "This may take time and could be costly, and the school may not always accept outside results."
            }
          },
          {
            text: "Ask for a team meeting to discuss all data sources.",
            feedback: {
              positive: "Team meetings encourage collaboration and shared understanding.",
              negative: "If not well facilitated, meetings can become contentious or unproductive."
            }
          },
          {
            text: "Accept the school's interpretation and move forward.",
            feedback: {
              positive: "Moving forward can help your child access support sooner.",
              negative: "You may miss opportunities to advocate for more appropriate services if you don't address discrepancies."
            }
          }
        ]
      }
    ]
  },
  'custom-transition': {
    id: 'custom-transition',
    title: 'Transition Planning',
    background: "Your child is moving from elementary to middle school. You are concerned about how their supports will continue in the new environment.",
    steps: [
      {
        question: "The school says: 'We have a transition plan in place for your child as they move to middle school. Do you have any questions or concerns?'",
        answers: [
          {
            text: "Ask how your child's strengths will be supported.",
            feedback: {
              positive: "Focusing on strengths helps ensure a positive transition and builds your child's confidence.",
              negative: "You may need to also address specific needs or concerns for a complete plan, or risk missing important supports."
            }
          },
          {
            text: "Request all supports be documented in the IEP.",
            feedback: {
              positive: "Documentation is key for continuity of services and accountability.",
              negative: "Too much focus on paperwork may slow down the planning process or overwhelm the team."
            }
          },
          {
            text: "Request an advocate join the next meeting.",
            feedback: {
              positive: "An advocate can help you feel supported during transitions and ensure your voice is heard.",
              negative: "Bringing in an advocate may make the team feel defensive or change the meeting dynamic."
            }
          }
        ]
      },
      {
        question: "The team discusses the plan. What do you do next?",
        answers: [
          {
            text: "Schedule a meeting with new school staff.",
            feedback: {
              positive: "Meeting staff helps build relationships and understanding, easing the transition.",
              negative: "It may be hard to coordinate schedules and get everyone together, possibly delaying planning."
            }
          },
          {
            text: "Ask for more details in the transition plan.",
            feedback: {
              positive: "More details can help ensure nothing is missed and all needs are addressed.",
              negative: "Requesting too many details may overwhelm the team or delay the process."
            }
          },
          {
            text: "Request revisions to include additional supports.",
            feedback: {
              positive: "Revisions may be needed to address all concerns and ensure a strong plan.",
              negative: "Frequent revisions can slow down implementation and frustrate the team."
            }
          }
        ]
      },
      {
        question: "Your child is anxious about the move. What do you do?",
        answers: [
          {
            text: "Ask for social-emotional supports in the transition plan.",
            feedback: {
              positive: "Social-emotional supports can help your child adjust and feel confident.",
              negative: "If not implemented well, these supports may not be effective."
            }
          },
          {
            text: "Connect with other parents for advice.",
            feedback: {
              positive: "Parent networks can provide valuable insights and emotional support.",
              negative: "Advice from others may not always fit your child's unique needs."
            }
          },
          {
            text: "Wait and see how your child adjusts before taking action.",
            feedback: {
              positive: "Observing your child can help you respond to actual needs.",
              negative: "Waiting may allow problems to develop before you intervene."
            }
          }
        ]
      }
    ]
  },
  'custom-behavior': {
    id: 'custom-behavior',
    title: 'Behavior Concerns',
    background: "The school reports ongoing behavioral issues and suggests disciplinary action. You want to ensure your child receives appropriate support, not just punishment.",
    steps: [
      {
        question: "The school says: 'We’ve noticed some challenging behaviors and are considering disciplinary measures. What are your thoughts?'",
        answers: [
          {
            text: "Ask to understand triggers and find positive solutions.",
            feedback: {
              positive: "Understanding triggers helps address root causes and can lead to effective interventions.",
              negative: "Focusing only on triggers may overlook other important factors or broader patterns."
            }
          },
          {
            text: "Review the behavior intervention plan.",
            feedback: {
              positive: "Reviewing the plan ensures it's being followed and can identify areas for improvement.",
              negative: "If the plan is not effective, simply reviewing it won't solve the problem and may delay needed changes."
            }
          },
          {
            text: "Do not consent to disciplinary action and seek legal advice.",
            feedback: {
              positive: "Legal advice is a good step if you feel your child's needs aren't met and can protect your rights.",
              negative: "This may escalate the situation and create an adversarial relationship with the school, making collaboration harder."
            }
          }
        ]
      },
      {
        question: "The team discusses possible supports. What do you do next?",
        answers: [
          {
            text: "Request a functional behavior assessment.",
            feedback: {
              positive: "Assessments can help identify effective supports and guide interventions.",
              negative: "Assessments take time and may delay the implementation of needed supports."
            }
          },
          {
            text: "Ask to revise the behavior intervention plan.",
            feedback: {
              positive: "Revisions may be needed to address current challenges and improve outcomes.",
              negative: "Constantly revising the plan without giving it time to work may be counterproductive and confusing."
            }
          },
          {
            text: "Request mediation or legal support.",
            feedback: {
              positive: "Mediation or legal support may help resolve disagreements and clarify rights.",
              negative: "This could escalate the situation and make collaboration more difficult or adversarial."
            }
          }
        ]
      },
      {
        question: "Your child continues to struggle despite interventions. What do you do?",
        answers: [
          {
            text: "Request outside professional consultation.",
            feedback: {
              positive: "Outside professionals can offer new perspectives and strategies.",
              negative: "The school may not always accept outside recommendations, and it could be costly."
            }
          },
          {
            text: "Ask for a team meeting to review all interventions.",
            feedback: {
              positive: "Team meetings encourage collaboration and shared problem-solving.",
              negative: "If not well facilitated, meetings can become contentious or unproductive."
            }
          },
          {
            text: "Consider alternative placements.",
            feedback: {
              positive: "Alternative placements may better meet your child's needs.",
              negative: "Changing placements can be disruptive and may not address underlying issues."
            }
          }
        ]
      }
    ]
  },
  'custom-language-barrier': {
    id: 'custom-language-barrier',
    title: 'Language Barrier',
    background: "English is not your first language, and you feel some information is not being clearly explained. You want to ensure you fully understand the meeting.",
    steps: [
      {
        question: "The school says: 'We want to make sure you’re comfortable with everything discussed today. Do you have any questions?'",
        answers: [
          {
            text: "Ask to clarify terms being used.",
            feedback: {
              positive: "Clarifying terms helps ensure understanding and supports informed decision-making.",
              negative: "Asking too many questions may slow down the meeting or make you feel self-conscious."
            }
          },
          {
            text: "Request an interpreter or translated documents.",
            feedback: {
              positive: "Interpreters and translations are your right and can help you fully participate.",
              negative: "There may be a delay in providing these services, and not all terms may be translated accurately."
            }
          },
          {
            text: "Contact the district office if needs aren't met.",
            feedback: {
              positive: "Escalation is an option if communication needs aren't met and can bring in additional support.",
              negative: "This may delay resolution and could be seen as confrontational, possibly straining relationships."
            }
          }
        ]
      },
      {
        question: "The team responds to your request. What do you do next?",
        answers: [
          {
            text: "Pause the meeting until communication needs are met.",
            feedback: {
              positive: "Pausing ensures you are fully informed and protects your rights.",
              negative: "This may frustrate the team and prolong the meeting or delay decisions."
            }
          },
          {
            text: "Accept extra efforts to clarify terms.",
            feedback: {
              positive: "Extra effort from the team can help bridge gaps and shows goodwill.",
              negative: "Relying on extra efforts may not be a sustainable solution and could lead to misunderstandings."
            }
          },
          {
            text: "Escalate the issue to the district.",
            feedback: {
              positive: "Escalation may be needed if needs are not met and can bring in additional resources.",
              negative: "This could damage relationships and create a more adversarial situation, possibly slowing progress."
            }
          }
        ]
      },
      {
        question: "You still feel confused after the meeting. What do you do?",
        answers: [
          {
            text: "Request a written summary in your preferred language.",
            feedback: {
              positive: "Written summaries can clarify information and provide a reference.",
              negative: "Translation may take time and not all details may be included."
            }
          },
          {
            text: "Ask a trusted friend or advocate to attend future meetings.",
            feedback: {
              positive: "Support from others can help you feel more confident and ensure understanding.",
              negative: "Bringing others may change the meeting dynamic or make the team defensive."
            }
          },
          {
            text: "Continue attending meetings and ask questions as needed.",
            feedback: {
              positive: "Active participation helps you stay informed and advocate for your child.",
              negative: "If communication barriers persist, you may not get all the information you need."
            }
          }
        ]
      }
    ]
  },
  'custom-inclusion': {
    id: 'custom-inclusion',
    title: 'Inclusion in General Education',
    background: "The team suggests your child may do better in a separate classroom. You want your child included with peers as much as possible.",
    steps: [
      {
        question: "The school says: 'We believe a separate classroom may better meet your child’s needs. What are your thoughts?'",
        answers: [
          {
            text: "Ask about supports for success in general education.",
            feedback: {
              positive: "Supports can help your child succeed with peers and promote inclusion.",
              negative: "If the supports are not well-defined, this may not address your concerns or lead to effective inclusion."
            }
          },
          {
            text: "Reference your child's right to inclusion.",
            feedback: {
              positive: "Legal rights protect your child's access to general education and ensure equity.",
              negative: "Focusing only on rights may overlook the child's individual needs or the team's concerns."
            }
          },
          {
            text: "Request an independent evaluation.",
            feedback: {
              positive: "Independent evaluations can provide additional perspectives and clarify needs.",
              negative: "This may delay the process and create tension with the school or team."
            }
          }
        ]
      },
      {
        question: "The team discusses placement options. What do you do next?",
        answers: [
          {
            text: "Try additional supports in general education.",
            feedback: {
              positive: "Trying supports first is often a good step and shows willingness to collaborate.",
              negative: "If the supports are insufficient, this may not resolve the issue or meet your child's needs."
            }
          },
          {
            text: "Request mediation.",
            feedback: {
              positive: "Mediation can help resolve disagreements and clarify everyone's perspective.",
              negative: "It may be a lengthy process and could escalate tensions or delay decisions."
            }
          },
          {
            text: "Accept the team's recommendation for a separate classroom.",
            feedback: {
              positive: "Accepting may be appropriate if all options are considered and the placement meets your child's needs.",
              negative: "You may regret accepting if it limits your child's opportunities or social development."
            }
          }
        ]
      },
      {
        question: "Your child expresses sadness about being separated from peers. What do you do?",
        answers: [
          {
            text: "Request social supports and peer interaction opportunities.",
            feedback: {
              positive: "Social supports can help your child feel included and build friendships.",
              negative: "If not implemented well, these supports may not be effective or may be limited."
            }
          },
          {
            text: "Ask for regular review of placement and progress.",
            feedback: {
              positive: "Regular reviews ensure your child's needs are being met and allow for adjustments.",
              negative: "Frequent reviews may be time-consuming and could frustrate the team."
            }
          },
          {
            text: "Accept the placement and focus on academic progress.",
            feedback: {
              positive: "Focusing on academics can help your child succeed in their current environment.",
              negative: "Neglecting social needs may impact your child's overall well-being."
            }
          }
        ]
      }
    ]
  },
  'custom-504-vs-iep': {
    id: 'custom-504-vs-iep',
    title: '504 Plan vs IEP Plan',
    background: "Your child is struggling in school. The team suggests a 504 plan, but you believe your child may need an IEP for more comprehensive support.",
    steps: [
      {
        question: "The school says: 'Based on our review, we think a 504 plan may be sufficient to support your child’s needs. What are your thoughts?'",
        answers: [
          {
            text: "Discuss supports under each plan.",
            feedback: {
              positive: "Comparing plans helps ensure your child's needs are met and promotes informed decision-making.",
              negative: "This may require additional meetings and could delay support if consensus is not reached."
            }
          },
          {
            text: "Request a formal evaluation for IEP eligibility.",
            feedback: {
              positive: "Formal evaluations determine eligibility for an IEP and ensure appropriate services.",
              negative: "This process can be lengthy and may delay needed services or frustrate the team."
            }
          },
          {
            text: "Pursue an independent evaluation.",
            feedback: {
              positive: "Independent evaluations can provide additional information and clarify needs.",
              negative: "This may not be accepted by the school and could create conflict or delay decisions."
            }
          }
        ]
      },
      {
        question: "The team responds to your request. What do you do next?",
        answers: [
          {
            text: "Collaborate to compare supports.",
            feedback: {
              positive: "Collaboration helps find the best solution and builds positive relationships.",
              negative: "If the team is uncooperative, this may not be effective and could lead to frustration."
            }
          },
          {
            text: "Request an independent evaluation.",
            feedback: {
              positive: "Independent evaluations may be needed if you disagree and can clarify eligibility.",
              negative: "This could delay the process and create tension or confusion."
            }
          },
          {
            text: "Accept the team's recommendation for a 504 plan.",
            feedback: {
              positive: "Accepting may be appropriate if it meets your child's needs and provides adequate support.",
              negative: "You may regret accepting if it limits your child's access to services or doesn't address all needs."
            }
          }
        ]
      },
      {
        question: "You notice your child is still struggling after the plan is implemented. What do you do?",
        answers: [
          {
            text: "Request a review of the plan and possible changes.",
            feedback: {
              positive: "Reviewing the plan ensures it is meeting your child's needs and allows for adjustments.",
              negative: "Frequent reviews may be time-consuming and could frustrate the team."
            }
          },
          {
            text: "Seek outside support or tutoring.",
            feedback: {
              positive: "Outside support can provide additional help and address gaps.",
              negative: "It may be costly and not always coordinated with the school's efforts."
            }
          },
          {
            text: "Wait to see if things improve over time.",
            feedback: {
              positive: "Sometimes changes take time to show results.",
              negative: "Waiting may allow problems to worsen before you intervene."
            }
          }
        ]
      }
    ]
  },
  'custom-cultural-differences': {
    id: 'custom-cultural-differences',
    title: 'Cultural Differences in Communication',
    background: "You feel that cultural differences are impacting how your concerns are understood by the school team.",
    steps: [
      {
        question: "The school says: 'We want to make sure we understand your perspective. Is there anything you’d like to share about your family’s background or needs?'",
        answers: [
          {
            text: "Discuss how cultural factors influence your child's experience.",
            feedback: {
              positive: "Open dialogue helps build understanding and can improve the team's responsiveness.",
              negative: "If cultural factors are not well understood, this may not be effective or could lead to misunderstandings."
            }
          },
          {
            text: "Request your child's background be respected in the plan.",
            feedback: {
              positive: "Cultural responsiveness is important in education and supports equity.",
              negative: "This request may be seen as vague or subjective, and may not lead to concrete changes."
            }
          },
          {
            text: "Seek support from a community advocate.",
            feedback: {
              positive: "Advocates can help ensure your concerns are addressed and provide cultural context.",
              negative: "Involving an advocate may change the dynamic of the meetings or make the team defensive."
            }
          }
        ]
      },
      {
        question: "The team responds to your concerns. What do you do next?",
        answers: [
          {
            text: "Incorporate cultural considerations into the plan.",
            feedback: {
              positive: "Inclusion of culture supports your child's success and promotes understanding.",
              negative: "If not done thoughtfully, this may lead to misunderstandings or tokenism."
            }
          },
          {
            text: "Request additional training for the team.",
            feedback: {
              positive: "Training can improve cultural competence and benefit all students.",
              negative: "The team may be resistant to additional training or see it as unnecessary."
            }
          },
          {
            text: "Invite a community advocate to future meetings.",
            feedback: {
              positive: "Advocates can help bridge communication gaps and support your family.",
              negative: "This may change the dynamic of the meetings and could be seen as confrontational."
            }
          }
        ]
      },
      {
        question: "You feel your concerns are still not understood. What do you do?",
        answers: [
          {
            text: "Request a meeting with a cultural liaison.",
            feedback: {
              positive: "A liaison can help facilitate understanding and communication.",
              negative: "Not all schools have liaisons, and scheduling may be difficult."
            }
          },
          {
            text: "Document your concerns and share them in writing.",
            feedback: {
              positive: "Written documentation ensures your concerns are clear and on record.",
              negative: "Written communication may lack nuance and could be misinterpreted."
            }
          },
          {
            text: "Continue attending meetings and advocate for your child.",
            feedback: {
              positive: "Persistence can lead to change and ensures your voice is heard.",
              negative: "If issues persist, you may feel frustrated or unsupported."
            }
          }
        ]
      }
    ]
  },
  'custom-transition-to-adulthood': {
    id: 'custom-transition-to-adulthood',
    title: 'Transition to Adulthood',
    background: "Your child is approaching graduation, and you want to ensure they have a strong transition plan for adulthood.",
    steps: [
      {
        question: "The school says: 'We’ve developed a transition plan to help your child prepare for life after high school. Do you have any questions or concerns?'",
        answers: [
          {
            text: "Discuss how strengths and interests will be supported.",
            feedback: {
              positive: "Planning for strengths helps with a successful transition and builds confidence.",
              negative: "Neglecting to address weaknesses or challenges may lead to an unbalanced plan."
            }
          },
          {
            text: "Request all transition services be documented in the IEP.",
            feedback: {
              positive: "Documentation ensures services are provided and supports accountability.",
              negative: "Overemphasis on documentation may bureaucratize the process and lose sight of the student."
            }
          },
          {
            text: "Request outside agencies join the next meeting.",
            feedback: {
              positive: "Outside agencies can provide additional support and resources.",
              negative: "This may complicate scheduling and require additional coordination."
            }
          }
        ]
      },
      {
        question: "The team discusses the transition plan. What do you do next?",
        answers: [
          {
            text: "Revise the plan to include more supports.",
            feedback: {
              positive: "Revisions may be needed for a strong plan and to address all needs.",
              negative: "Too many revisions can lead to confusion and lack of clarity in the plan."
            }
          },
          {
            text: "Invite outside agencies to participate.",
            feedback: {
              positive: "Collaboration with agencies can help with transition and provide expertise.",
              negative: "Agencies may have different priorities or approaches, which could complicate the plan."
            }
          },
          {
            text: "Request mediation.",
            feedback: {
              positive: "Mediation can help resolve disagreements and clarify everyone's perspective.",
              negative: "It may be a lengthy process and could escalate tensions or delay decisions."
            }
          }
        ]
      },
      {
        question: "Your child is unsure about future plans. What do you do?",
        answers: [
          {
            text: "Request career counseling and exploration activities.",
            feedback: {
              positive: "Career counseling can help your child identify interests and set goals.",
              negative: "If not tailored to your child, these activities may not be effective."
            }
          },
          {
            text: "Connect with adult service agencies early.",
            feedback: {
              positive: "Early connections can smooth the transition and provide ongoing support.",
              negative: "Agencies may have waitlists or limited resources."
            }
          },
          {
            text: "Wait to see what your child expresses interest in.",
            feedback: {
              positive: "Allowing your child to explore can lead to self-discovery.",
              negative: "Waiting may delay planning and limit available options."
            }
          }
        ]
      }
    ]
  },
  'custom-medical-needs': {
    id: 'custom-medical-needs',
    title: 'Medical Needs and School Supports',
    background: "Your child has a medical condition that requires accommodations at school. Respond to the team’s proposed supports.",
    steps: [
      {
        question: "The school says: 'We’ve reviewed your child’s medical documentation and have some ideas for supports. What are your thoughts?'",
        answers: [
          {
            text: "Work together to ensure medical needs are met.",
            feedback: {
              positive: "Collaboration helps ensure your child's needs are addressed and builds trust.",
              negative: "If the team is uncooperative, this may not be effective and could delay support."
            }
          },
          {
            text: "Request all accommodations be documented and followed.",
            feedback: {
              positive: "Documentation is key for legal compliance and accountability.",
              negative: "Overemphasis on documentation may bureaucratize the process and lose sight of the student."
            }
          },
          {
            text: "Escalate to the district or seek legal advice if needs aren't met.",
            feedback: {
              positive: "Escalation is an option if needs are not met and can bring in additional resources.",
              negative: "This could damage relationships and create a more adversarial situation, possibly slowing progress."
            }
          }
        ]
      },
      {
        question: "The team discusses medical supports. What do you do next?",
        answers: [
          {
            text: "Add more medical supports.",
            feedback: {
              positive: "Additional supports may be needed for your child's safety and well-being.",
              negative: "Too many supports may overwhelm the student or be seen as unnecessary."
            }
          },
          {
            text: "Develop a health plan and share with staff.",
            feedback: {
              positive: "Health plans help staff understand your child's needs and ensure consistency.",
              negative: "If not followed, a health plan may give false assurance and not protect the student."
            }
          },
          {
            text: "Request outside medical consultation.",
            feedback: {
              positive: "Outside consultation can provide expert advice and clarify needs.",
              negative: "This may not be accepted by the school and could create conflict or delay decisions."
            }
          }
        ]
      },
      {
        question: "You notice staff are not following the health plan. What do you do?",
        answers: [
          {
            text: "Document incidents and share with the team.",
            feedback: {
              positive: "Documentation ensures issues are clear and can prompt corrective action.",
              negative: "Frequent documentation may be seen as adversarial and could strain relationships."
            }
          },
          {
            text: "Request a meeting to review the health plan.",
            feedback: {
              positive: "Meetings can clarify expectations and improve compliance.",
              negative: "If not well facilitated, meetings may not lead to meaningful change."
            }
          },
          {
            text: "Contact the district nurse or medical coordinator.",
            feedback: {
              positive: "District staff can provide oversight and ensure compliance.",
              negative: "Involving more staff may complicate communication and delay resolution."
            }
          }
        ]
      }
    ]
  },
  // Add this to your simpleScenarios object in SimpleScenarios.ts

'custom-bullying': {
  id: 'custom-bullying',
  title: 'Addressing Bullying Concerns',
  background: "Your child has reported being bullied at school. You want to ensure the school takes appropriate action and supports your child’s well-being.",
  steps: [
    {
      question: "The school says: 'We are aware of your concerns about bullying and want to discuss how we can address this situation.' How do you respond?",
      answers: [
        {
          text: "Ask to work together on a safety plan for your child.",
          feedback: {
            positive: "Collaborating on a safety plan shows you are proactive and focused on solutions.",
            negative: "It may take time to develop and implement a plan, and you may need to follow up to ensure it's enforced."
          }
        },
        {
          text: "Request information about the school's anti-bullying policies.",
          feedback: {
            positive: "Knowing the policies helps you understand your child's rights and the school's responsibilities.",
            negative: "Policies alone may not address your child's immediate needs or feelings of safety."
          }
        },
        {
          text: "State you will escalate to the district if the issue continues.",
          feedback: {
            positive: "Escalating can prompt faster action if previous steps haven't worked.",
            negative: "It may strain your relationship with the school and could make collaboration harder."
          }
        }
      ]
    },
    {
      question: "The school agrees to create a safety plan and asks what specific concerns you have. What do you do?",
      answers: [
        {
          text: "Share specific incidents and your child's feelings.",
          feedback: {
            positive: "Sharing details helps the team understand the situation and tailor the plan to your child's needs.",
            negative: "It may be difficult to talk about these incidents, and you may feel emotional during the discussion."
          }
        },
        {
          text: "Request regular check-ins with your child.",
          feedback: {
            positive: "Regular check-ins can help monitor your child's well-being and ensure the plan is working.",
            negative: "This may require extra effort from staff and may not catch every issue."
          }
        },
        {
          text: "Ask for increased adult supervision in problem areas.",
          feedback: {
            positive: "Increased supervision can help prevent further incidents and make your child feel safer.",
            negative: "Staffing limitations may make this difficult to implement consistently."
          }
        }
      ]
    },
    {
      question: "After a few weeks, your child reports that bullying has decreased, but some issues remain. What is your next step?",
      answers: [
        {
          text: "Request a follow-up meeting to review and adjust the safety plan.",
          feedback: {
            positive: "Reviewing and adjusting the plan shows you are committed to ongoing improvement.",
            negative: "Frequent meetings may be time-consuming and could frustrate the team if not approached collaboratively."
          }
        },
        {
          text: "Encourage your child to continue reporting any incidents.",
          feedback: {
            positive: "Encouraging your child to speak up helps them feel empowered and keeps you informed.",
            negative: "Your child may feel uncomfortable or fear retaliation, so ongoing support is important."
          }
        },
        {
          text: "Contact the district office to report ongoing concerns.",
          feedback: {
            positive: "Involving the district can bring additional resources and oversight.",
            negative: "Escalating may strain your relationship with the school and could make collaboration harder."
          }
        }
      ]
    }
  ]
},
'custom-technology-access': {
  id: 'custom-technology-access',
  title: 'Technology and Accessibility',
  background: "Your child needs assistive technology to participate fully in class, but there have been delays in providing the necessary tools.",
  steps: [
    {
      question: "The school says: 'We are working on providing the assistive technology your child needs. Let’s discuss the current status and next steps.' How do you respond?",
      answers: [
        {
          text: "Ask for a clear timeline and discuss interim supports.",
          feedback: {
            positive: "Requesting a timeline and interim supports helps ensure your child isn't left without help and keeps the process moving.",
            negative: "You may need to follow up to ensure the timeline is met, and interim supports may not fully meet your child's needs."
          }
        },
        {
          text: "Remind the team that your child has a right to access the curriculum with appropriate technology.",
          feedback: {
            positive: "Referencing rights can help ensure the school fulfills its obligations and takes the issue seriously.",
            negative: "It may be seen as confrontational if not balanced with collaboration, and could slow down problem-solving."
          }
        },
        {
          text: "Request compensatory services if technology is not provided soon.",
          feedback: {
            positive: "Requesting compensatory services can help your child make up for lost learning time.",
            negative: "It may require additional meetings and documentation, and could delay immediate solutions."
          }
        }
      ]
    },
    {
      question: "The school provides a timeline but there are further delays. What do you do?",
      answers: [
        {
          text: "Request regular updates and written communication about progress.",
          feedback: {
            positive: "Regular updates keep you informed and create accountability.",
            negative: "Frequent communication may be time-consuming and could strain relationships if not handled collaboratively."
          }
        },
        {
          text: "Ask for alternative or temporary technology solutions.",
          feedback: {
            positive: "Temporary solutions can help your child continue learning while waiting for the correct technology.",
            negative: "Alternatives may not fully meet your child's needs and could be less effective."
          }
        },
        {
          text: "File a formal complaint with the district or state.",
          feedback: {
            positive: "Filing a complaint can prompt faster action if other steps fail.",
            negative: "It may escalate the situation and affect your relationship with the school."
          }
        }
      ]
    },
    {
      question: "Once the technology is provided, your child struggles to use it effectively. What is your next step?",
      answers: [
        {
          text: "Request training for your child and staff on how to use the technology.",
          feedback: {
            positive: "Training ensures everyone can use the technology effectively and supports your child's success.",
            negative: "Arranging training may take additional time and resources."
          }
        },
        {
          text: "Monitor your child's progress and provide feedback to the team.",
          feedback: {
            positive: "Monitoring and feedback help the team make adjustments and ensure the technology is working as intended.",
            negative: "It may take time to see improvements, and ongoing communication is needed."
          }
        },
        {
          text: "Ask for an evaluation to see if different technology is needed.",
          feedback: {
            positive: "An evaluation can help identify the best tools for your child and address ongoing challenges.",
            negative: "Additional evaluations may delay support and require more meetings."
          }
        }
      ]
    }
  ]
},
'custom-transportation': {
  id: 'custom-transportation',
  title: 'Transportation Challenges',
  background: "Your child’s IEP includes transportation as a related service, but there have been issues with reliability and safety.",
  steps: [
    {
      question: "The school says: 'We understand there have been some transportation issues. Let’s discuss how we can resolve them.' How do you respond?",
      answers: [
        {
          text: "Review the transportation plan together and suggest improvements.",
          feedback: {
            positive: "Reviewing the plan encourages collaboration and problem-solving to address the issues.",
            negative: "It may take time to see improvements and require ongoing communication and follow-up."
          }
        },
        {
          text: "Remind the team that your child has a right to safe and reliable transportation.",
          feedback: {
            positive: "Referencing rights can ensure the school takes the issue seriously and fulfills its obligations.",
            negative: "It may come across as confrontational if not balanced with collaboration, and could slow down problem-solving."
          }
        },
        {
          text: "Say you will file a formal complaint if issues continue.",
          feedback: {
            positive: "Filing a complaint can prompt action if other steps fail and bring additional oversight.",
            negative: "It may escalate the situation and affect your relationship with the school."
          }
        }
      ]
    },
    {
      question: "The school agrees to make changes to the transportation plan. What do you do next?",
      answers: [
        {
          text: "Request regular updates on transportation performance.",
          feedback: {
            positive: "Regular updates keep you informed and create accountability for the school.",
            negative: "Frequent communication may be time-consuming and could strain relationships if not handled collaboratively."
          }
        },
        {
          text: "Ask for a backup plan in case transportation fails again.",
          feedback: {
            positive: "A backup plan ensures your child is not left without transportation if issues arise.",
            negative: "It may be difficult for the school to provide alternative arrangements on short notice."
          }
        },
        {
          text: "Monitor the situation and document any further issues.",
          feedback: {
            positive: "Documentation helps track patterns and provides evidence if further action is needed.",
            negative: "It may take time to gather enough information to prompt additional changes."
          }
        }
      ]
    },
    {
      question: "Despite changes, problems with transportation continue. What is your next step?",
      answers: [
        {
          text: "Request a meeting with district transportation officials.",
          feedback: {
            positive: "Involving district officials can bring additional resources and oversight to resolve the issue.",
            negative: "It may take time to schedule and may escalate the situation."
          }
        },
        {
          text: "File a formal complaint with the district or state.",
          feedback: {
            positive: "A formal complaint can prompt a thorough review and corrective action.",
            negative: "It may further strain your relationship with the school and could take time to resolve."
          }
        },
        {
          text: "Seek alternative transportation options outside the school.",
          feedback: {
            positive: "Alternative options may provide more reliable service for your child.",
            negative: "This may be costly and the school may not reimburse you without prior agreement."
          }
        }
      ]
    }
  ]
},'custom-mental-health': {
  id: 'custom-mental-health',
  title: 'Mental Health Supports',
  background: "Your child has been struggling with anxiety and depression, affecting their school performance. You want to ensure appropriate mental health supports are included in the IEP.",
  steps: [
    {
      question: "The school says: 'We understand your concerns about your child's mental health. Let’s discuss what supports might help.' How do you respond?",
      answers: [
        {
          text: "Work together to identify supports and accommodations.",
          feedback: {
            positive: "Collaboration ensures your child's needs are addressed holistically and encourages buy-in from the team.",
            negative: "It may take time to find the right supports and require ongoing adjustments as your child's needs change."
          }
        },
        {
          text: "Request that mental health services be included in the IEP.",
          feedback: {
            positive: "Including services in the IEP makes them a formal part of your child's support plan and ensures accountability.",
            negative: "It may require additional evaluations or meetings, and the school may have limited resources."
          }
        },
        {
          text: "Say you will seek outside evaluation and support if needs aren't met.",
          feedback: {
            positive: "Seeking outside support can provide additional resources and perspectives for your child.",
            negative: "It may be costly and could complicate coordination with the school team."
          }
        }
      ]
    },
    {
      question: "The school agrees to add some supports, but your child is still struggling. What do you do next?",
      answers: [
        {
          text: "Request a review of the IEP and consider additional services.",
          feedback: {
            positive: "Reviewing the IEP ensures it remains responsive to your child's needs and allows for timely adjustments.",
            negative: "Frequent reviews may be time-consuming and could frustrate the team if not approached collaboratively."
          }
        },
        {
          text: "Ask for regular check-ins with a counselor or social worker.",
          feedback: {
            positive: "Regular check-ins can help monitor your child's well-being and provide ongoing support.",
            negative: "Staffing limitations may make it difficult to provide frequent check-ins."
          }
        },
        {
          text: "Request a functional behavioral assessment.",
          feedback: {
            positive: "An assessment can help identify triggers and guide effective interventions.",
            negative: "Assessments take time and may delay the implementation of new supports."
          }
        }
      ]
    },
    {
      question: "Your child begins to improve, but you want to ensure continued support. What is your next step?",
      answers: [
        {
          text: "Request regular progress updates from the school.",
          feedback: {
            positive: "Progress updates help you stay informed and allow for early intervention if issues arise again.",
            negative: "Frequent updates may require extra effort from staff and could be difficult to maintain long-term."
          }
        },
        {
          text: "Ask for a crisis plan to be included in the IEP.",
          feedback: {
            positive: "A crisis plan prepares the team to respond quickly if your child's mental health needs escalate.",
            negative: "Developing a crisis plan may require additional meetings and careful planning."
          }
        },
        {
          text: "Continue outside counseling and coordinate with the school.",
          feedback: {
            positive: "Coordinating with outside providers ensures a consistent approach and maximizes support for your child.",
            negative: "Coordination may be challenging due to privacy concerns or differing approaches."
          }
        }
      ]
    }
  ]
}
};