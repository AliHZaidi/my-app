// This file defines custom scenarios for free-form, LLM-driven practice.

export interface IRPOption {
  type: 'interests' | 'rights' | 'power';
  text: string;
  textExplanation?: string; // <-- Add this to the interface
}

export interface CustomScenario {
  id: string;
  title: string;
  description: string;
  category?: string; // Optional, can be used for filtering
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  background: string;
  initialSchoolLine: string;
  initialOptions: IRPOption[];
  potentialOutcomes?: string[];
}

export const customScenarios: Record<string, CustomScenario> = {
  'custom-disagreement': {
    id: 'custom-disagreement',
    title: 'Disagreeing with the School',
    description: 'Practice expressing disagreement with the school in a free-form, realistic IEP meeting.',
    difficulty: 'Moderate',
    category: 'Advocacy & Communication', // Broader category
    background: 'You are in an IEP meeting. The school suggests reducing your child\'s speech therapy, citing "good progress." You disagree based on your observations at home.',
    initialSchoolLine: "Thank you for joining us today. We want to discuss your child's progress and our recommendation to reduce speech therapy.",
    initialOptions: [
      {
        type: 'interests',
        text: "I'd like to understand how this change will help my child and work together to find the best solution.",
        textExplanation: "This response seeks collaboration and focuses on shared goals, inviting the school to work together for the child's benefit."
      },
      {
        type: 'rights',
        text: "I want to review the data and documentation that supports this recommendation, as my child has a right to appropriate services.",
        textExplanation: "This response references your legal rights and requests evidence, emphasizing the importance of documentation and policy."
      },
      {
        type: 'power',
        text: "I do not agree with reducing services and insist that the current level of speech therapy be maintained.",
        textExplanation: "This response asserts your authority and makes a clear demand, signaling strong opposition to the proposed change."
      }
    ],
    potentialOutcomes: [
      "The school agrees to maintain current services.",
      "A compromise is reached, such as a trial period with additional data collection.",
      "The school reduces services, but with a plan to revisit soon.",
      "The parent requests mediation or files a formal complaint."
    ]
  },
  'custom-request-data': {
    id: 'custom-request-data',
    title: 'Requesting Data',
    description: 'Practice asking for supporting data or documentation in a free-form scenario.',
    difficulty: 'Easy',
    category: 'Advocacy & Documentation', // Broader category
    background: 'The school team makes a recommendation about your child\'s services. You want to see the data that supports their decision.',
    initialSchoolLine: "We recommend adjusting your child's services based on our progress monitoring. How would you like to respond?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we look at the progress data together to make sure we're all on the same page?",
        textExplanation: "This response encourages collaboration and transparency, inviting the school to review information together."
      },
      {
        type: 'rights',
        text: "I would like to see the formal assessment results and documentation supporting this recommendation.",
        textExplanation: "This response asserts your right to access records and requests formal documentation to support the school's decision."
      },
      {
        type: 'power',
        text: "I am not comfortable with this change and will not agree to it without seeing clear evidence.",
        textExplanation: "This response uses your authority to withhold agreement, making it clear that you require proof before proceeding."
      }
    ],
    potentialOutcomes: [
      "The school provides all requested data and documentation.",
      "A meeting is scheduled to review data together.",
      "The school agrees to delay changes until data is reviewed.",
      "The parent escalates the request to district administration."
    ]
  },
  'custom-transition': {
    id: 'custom-transition',
    title: 'Transition Planning',
    description: 'Practice advocating for your child’s needs as they prepare to transition to a new school or grade.',
    difficulty: 'Moderate',
    category: 'Planning & Change', // Broader category
    background: 'Your child is moving from elementary to middle school. You are concerned about how their supports will continue in the new environment. Respond to the school’s plan for transition.',
    initialSchoolLine: "We have a transition plan in place for your child as they move to middle school. Do you have any questions or concerns?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we discuss how my child’s strengths and interests will be supported in the new setting?",
        textExplanation: "This response focuses on collaboration and ensuring the child’s unique needs and interests are considered in the transition."
      },
      {
        type: 'rights',
        text: "I want to make sure all required supports and accommodations are documented in the IEP for the new school.",
        textExplanation: "This response references legal entitlements and the importance of documentation for continuity of services."
      },
      {
        type: 'power',
        text: "I am not comfortable with the plan as it stands and will request an advocate to join our next meeting.",
        textExplanation: "This response asserts your authority and signals you may escalate if your concerns are not addressed."
      }
    ],
    potentialOutcomes: [
      "The school agrees to add more details to the transition plan.",
      "A meeting is scheduled with the new school staff.",
      "The parent brings in an advocate for further support.",
      "The transition plan is revised to include additional supports."
    ]
  },
  'custom-behavior': {
    id: 'custom-behavior',
    title: 'Behavior Concerns',
    description: 'Practice addressing behavioral challenges and advocating for positive supports.',
    difficulty: 'Advanced',
    category: 'Behavior & Support', // Broader category
    background: 'The school reports ongoing behavioral issues and suggests disciplinary action. You want to ensure your child receives appropriate support, not just punishment.',
    initialSchoolLine: "We’ve noticed some challenging behaviors and are considering disciplinary measures. What are your thoughts?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we work together to understand what’s triggering these behaviors and find positive solutions?",
        textExplanation: "This response seeks collaboration and focuses on understanding root causes rather than just consequences."
      },
      {
        type: 'rights',
        text: "I’d like to review the behavior intervention plan and ensure it’s being followed as required.",
        textExplanation: "This response references your right to a proper plan and to hold the school accountable for its implementation."
      },
      {
        type: 'power',
        text: "I do not consent to disciplinary action and will seek legal advice if my child’s needs are not met.",
        textExplanation: "This response asserts your authority and signals a willingness to escalate if necessary."
      }
    ],
    potentialOutcomes: [
      "The school agrees to revise the behavior intervention plan.",
      "A functional behavior assessment is scheduled.",
      "The school proceeds with disciplinary action.",
      "The parent requests mediation or legal support."
    ]
  },
  'custom-language-barrier': {
    id: 'custom-language-barrier',
    title: 'Language Barrier',
    description: 'Practice advocating when there are communication or language barriers.',
    difficulty: 'Easy',
    category: 'Advocacy & Communication', // Broader category
    background: 'English is not your first language, and you feel some information is not being clearly explained. You want to ensure you fully understand the meeting.',
    initialSchoolLine: "We want to make sure you’re comfortable with everything discussed today. Do you have any questions?",
    initialOptions: [
      {
        type: 'interests',
        text: "Could we slow down and clarify some of the terms being used?",
        textExplanation: "This response encourages open communication and ensures everyone is on the same page."
      },
      {
        type: 'rights',
        text: "I would like an interpreter or translated documents to help me understand the process.",
        textExplanation: "This response asserts your right to accessible communication and information."
      },
      {
        type: 'power',
        text: "If I can’t get information in my language, I will contact the district office.",
        textExplanation: "This response uses your authority to demand proper accommodations."
      }
    ],
    potentialOutcomes: [
      "The school provides an interpreter or translated materials.",
      "The meeting is paused until communication needs are met.",
      "The parent escalates the issue to the district.",
      "The school makes extra effort to clarify terms and processes."
    ]
  },
  'custom-inclusion': {
    id: 'custom-inclusion',
    title: 'Inclusion in General Education',
    description: 'Practice advocating for your child’s participation in general education settings.',
    difficulty: 'Moderate',
    category: 'Inclusion & Placement', // Broader category
    background: 'The school suggests your child may do better in a separate classroom. You want your child included with peers as much as possible.',
    initialSchoolLine: "We believe a separate classroom may better meet your child’s needs. What are your thoughts?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we talk about supports that would help my child succeed in the general education classroom?",
        textExplanation: "This response seeks collaborative problem-solving to support inclusion."
      },
      {
        type: 'rights',
        text: "My child has a right to be educated with peers to the maximum extent appropriate.",
        textExplanation: "This response references legal protections for inclusion."
      },
      {
        type: 'power',
        text: "I do not agree with removing my child and will request an independent evaluation.",
        textExplanation: "This response asserts your authority and signals you may seek outside support."
      }
    ],
    potentialOutcomes: [
      "The school agrees to try additional supports in general education.",
      "An independent evaluation is scheduled.",
      "The parent requests mediation.",
      "The school maintains their recommendation for a separate classroom."
    ]
  },
  'custom-504-vs-iep': {
    id: 'custom-504-vs-iep',
    title: '504 Plan vs IEP Plan',
    description: 'Practice discussing the differences between a 504 plan and an IEP plan, and advocating for the most appropriate support for your child.',
    difficulty: 'Moderate',
    category: 'Services & Eligibility',
    background: 'Your child is struggling in school. The school suggests a 504 plan, but you believe your child may need an IEP for more comprehensive support. Respond to the school’s recommendation.',
    initialSchoolLine: "Based on our review, we think a 504 plan may be sufficient to support your child’s needs. What are your thoughts?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we discuss what supports would be available under each plan and how they would address my child's specific needs?",
        textExplanation: "This response encourages collaboration and ensures a thorough comparison of both plans."
      },
      {
        type: 'rights',
        text: "I would like to request a formal evaluation to determine if my child qualifies for an IEP under IDEA.",
        textExplanation: "This response asserts your right to a comprehensive evaluation and references legal protections."
      },
      {
        type: 'power',
        text: "I do not agree with the recommendation for a 504 plan and will pursue an independent evaluation.",
        textExplanation: "This response asserts your authority and signals you may seek outside support if necessary."
      }
    ],
    potentialOutcomes: [
      "The school agrees to conduct a formal evaluation for IEP eligibility.",
      "The parent and school collaborate to compare supports under both plans.",
      "The parent requests an independent evaluation.",
      "The school maintains their recommendation for a 504 plan."
    ]
  },
  'custom-cultural-differences': {
    id: 'custom-cultural-differences',
    title: 'Cultural Differences in Communication',
    description: 'Practice advocating for your child when cultural differences affect communication and understanding in meetings.',
    difficulty: 'Moderate',
    category: 'Communication & Advocacy',
    background: 'You feel that cultural differences are impacting how your concerns are understood by the school team. Respond to the school’s feedback.',
    initialSchoolLine: "We want to make sure we understand your perspective. Is there anything you’d like to share about your family’s background or needs?",
    initialOptions: [
      {
        type: 'interests',
        text: "I appreciate your openness. Can we discuss how cultural factors might influence my child's experience and learning?",
        textExplanation: "This response encourages open dialogue and mutual understanding."
      },
      {
        type: 'rights',
        text: "I want to ensure my child’s cultural background is respected and reflected in their educational plan.",
        textExplanation: "This response asserts your right to culturally responsive education."
      },
      {
        type: 'power',
        text: "If my concerns aren’t addressed, I will seek support from a community advocate.",
        textExplanation: "This response asserts your authority and signals you may escalate if necessary."
      }
    ],
    potentialOutcomes: [
      "The school incorporates cultural considerations into the plan.",
      "A community advocate joins future meetings.",
      "The parent feels more heard and understood.",
      "The school requests additional training on cultural competence."
    ]
  },
  'custom-transition-to-adulthood': {
    id: 'custom-transition-to-adulthood',
    title: 'Transition to Adulthood',
    description: 'Practice advocating for your child’s needs as they prepare to transition from high school to adulthood.',
    difficulty: 'Advanced',
    category: 'Transition & Planning',
    background: 'Your child is approaching graduation, and you want to ensure they have a strong transition plan for adulthood. Respond to the school’s proposed plan.',
    initialSchoolLine: "We’ve developed a transition plan to help your child prepare for life after high school. Do you have any questions or concerns?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we discuss how my child's strengths and interests will be supported in their transition to adulthood?",
        textExplanation: "This response focuses on collaboration and planning for the future."
      },
      {
        type: 'rights',
        text: "I want to make sure all required transition services are documented in the IEP.",
        textExplanation: "This response references legal entitlements and the importance of documentation."
      },
      {
        type: 'power',
        text: "I am not comfortable with the current plan and will request outside agencies to join our next meeting.",
        textExplanation: "This response asserts your authority and signals you may seek additional support."
      }
    ],
    potentialOutcomes: [
      "The school revises the transition plan to include more supports.",
      "Outside agencies are invited to participate.",
      "The parent requests mediation.",
      "The school maintains their original plan."
    ]
  },
  'custom-medical-needs': {
    id: 'custom-medical-needs',
    title: 'Medical Needs and School Supports',
    description: 'Practice advocating for your child’s medical needs and ensuring appropriate supports are in place.',
    difficulty: 'Moderate',
    category: 'Health & Supports',
    background: 'Your child has a medical condition that requires accommodations at school. Respond to the school’s proposed supports.',
    initialSchoolLine: "We’ve reviewed your child’s medical documentation and have some ideas for supports. What are your thoughts?",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we work together to ensure my child's medical needs are met throughout the school day?",
        textExplanation: "This response encourages collaboration and ongoing communication."
      },
      {
        type: 'rights',
        text: "I want to make sure all accommodations are documented and followed as required by law.",
        textExplanation: "This response asserts your right to legally mandated supports."
      },
      {
        type: 'power',
        text: "If my child's needs aren't met, I will escalate the issue to the district or seek legal advice.",
        textExplanation: "This response asserts your authority and signals you may escalate if necessary."
      }
    ],
    potentialOutcomes: [
      "The school agrees to add more medical supports.",
      "A health plan is developed and shared with staff.",
      "The parent requests outside medical consultation.",
      "The school maintains their proposed supports."
    ]
  },
  'custom-bullying': {
    id: 'custom-bullying',
    title: 'Addressing Bullying Concerns',
    description: 'Practice advocating for your child when bullying is reported at school.',
    difficulty: 'Moderate',
    category: 'Safety & Advocacy',
    background: 'Your child has reported being bullied at school. You want to ensure the school takes appropriate action and supports your child’s well-being.',
    initialSchoolLine: "We are aware of your concerns about bullying and want to discuss how we can address this situation.",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we work together to create a plan that ensures my child feels safe and supported at school?",
        textExplanation: "This response seeks collaboration and focuses on proactive solutions for your child's safety."
      },
      {
        type: 'rights',
        text: "I want to know what anti-bullying policies are in place and how the school will ensure my child's rights are protected.",
        textExplanation: "This response references your child's legal rights and the school's responsibility to provide a safe environment."
      },
      {
        type: 'power',
        text: "If the bullying continues, I will escalate this to the district and consider involving outside authorities.",
        textExplanation: "This response asserts your authority and signals you are prepared to take further action if needed."
      }
    ],
    potentialOutcomes: [
      "The school implements a safety plan and increases supervision.",
      "A meeting is scheduled with all parties involved.",
      "The parent escalates the issue to the district.",
      "The school provides counseling and support services."
    ]
  },
  'custom-transportation': {
    id: 'custom-transportation',
    title: 'Transportation Challenges',
    description: 'Practice advocating for your child’s transportation needs to and from school.',
    difficulty: 'Easy',
    category: 'Access & Logistics',
    background: 'Your child’s IEP includes transportation as a related service, but there have been issues with reliability and safety.',
    initialSchoolLine: "We understand there have been some transportation issues. Let’s discuss how we can resolve them.",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we review the transportation plan together and identify ways to improve reliability?",
        textExplanation: "This response encourages collaboration and problem-solving."
      },
      {
        type: 'rights',
        text: "My child has a right to safe and reliable transportation as part of their IEP.",
        textExplanation: "This response references legal entitlements and the school's responsibility."
      },
      {
        type: 'power',
        text: "If the issues continue, I will file a formal complaint with the district.",
        textExplanation: "This response asserts your authority and signals you are prepared to escalate if necessary."
      }
    ],
    potentialOutcomes: [
      "The transportation provider is changed or retrained.",
      "A new plan is developed to address reliability.",
      "The parent files a formal complaint.",
      "The school increases communication about transportation."
    ]
  },
  'custom-technology-access': {
    id: 'custom-technology-access',
    title: 'Technology and Accessibility',
    description: 'Practice advocating for your child’s access to technology and digital learning tools.',
    difficulty: 'Moderate',
    category: 'Access & Supports',
    background: 'Your child needs assistive technology to participate fully in class, but there have been delays in providing the necessary tools.',
    initialSchoolLine: "We are working on providing the assistive technology your child needs. Let’s discuss the current status and next steps.",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we set a timeline for when the technology will be available and discuss interim supports?",
        textExplanation: "This response seeks collaboration and practical solutions while waiting for technology."
      },
      {
        type: 'rights',
        text: "My child has a right to access the curriculum with appropriate technology as outlined in the IEP.",
        textExplanation: "This response references legal requirements for accessibility."
      },
      {
        type: 'power',
        text: "If the technology is not provided soon, I will request compensatory services.",
        textExplanation: "This response asserts your authority and signals you may seek additional support if delays continue."
      }
    ],
    potentialOutcomes: [
      "The school expedites the technology order.",
      "Interim supports are put in place.",
      "The parent requests compensatory services.",
      "The school provides training on the new technology."
    ]
  },
  'custom-mental-health': {
    id: 'custom-mental-health',
    title: 'Mental Health Supports',
    description: 'Practice advocating for mental health supports and services for your child.',
    difficulty: 'Advanced',
    category: 'Health & Well-being',
    background: 'Your child has been struggling with anxiety and depression, affecting their school performance. You want to ensure appropriate mental health supports are included in the IEP.',
    initialSchoolLine: "We understand your concerns about your child's mental health. Let’s discuss what supports might help.",
    initialOptions: [
      {
        type: 'interests',
        text: "Can we work together to identify supports and accommodations that address my child's mental health needs?",
        textExplanation: "This response encourages collaboration and a holistic approach to your child's well-being."
      },
      {
        type: 'rights',
        text: "I want to make sure mental health services are included in the IEP as required by law.",
        textExplanation: "This response references your child's right to appropriate services under IDEA."
      },
      {
        type: 'power',
        text: "If my child's needs aren't met, I will seek outside evaluation and support.",
        textExplanation: "This response asserts your authority and signals you may seek additional help if necessary."
      }
    ],
    potentialOutcomes: [
      "The IEP is updated to include mental health supports.",
      "The school provides counseling or referrals.",
      "The parent seeks outside evaluation.",
      "The school develops a crisis intervention plan."
    ]
  }
};