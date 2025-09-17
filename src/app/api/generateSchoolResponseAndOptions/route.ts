import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { scenarioBackground, schoolLine, parentHistory, irpType } = body

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not set' }), { status: 500 })
  }
  //const lastSchoolResponse = body.lastSchoolResponse || "The school team has not yet responded to the parent's latest message."

  const irpDescriptionMap: Record<'interests' | 'rights' | 'power', string> = {
    interests: "The parent is focusing on interests: shared goals, collaboration, and mutual benefit.",
    rights: "The parent is focusing on rights: legal entitlements, policies, and rules.",
    power: "The parent is focusing on power: authority, leverage, or demands."
  };
  const irpDescription = irpDescriptionMap[irpType as 'interests' | 'rights' | 'power'] || "";

  const prompt = `
You are simulating a realistic IEP meeting as the school team.
Scenario background: ${scenarioBackground}
Parent history: ${parentHistory.map((entry: { user: string }) => `Parent: ${entry.user}`).join('\n')}
Previous school response:  ${schoolLine}
IRP context: ${irpDescription}

First, respond as the school team to the parent's latest message in a way that matches the IRP type (${irpType}). 
Ask clarifying questions, provide information, or suggest next steps that align with the IRP approach.


Then, generate 3 possible next parent responses, each demonstrating a different IRP approach:
- One focused on interests
- One focused on rights
- One focused on power

Ensure that the parent options are not repeats of previous statements, and that they move the conversation forward in a meaningful way. Each option should be concise and reflect the parent's perspective based on the IRP type.
All responses should be one sentence at most. They should be short and concise. 

**Important:** Each parent response should directly address any questions, requests, or suggestions made in the previous school response. Make the conversation feel natural and connected, as in a real meeting.

Then, generate the projected school response to each of these parent options, simulating how the school team would likely respond, based on the chosen IRP type. Ask clarifying questions, provide information, or suggest next steps that align with the IRP approach.
Return your output as a JSON object with this shape:

{
  "schoolResponse": "<school response>",
  "options": [
    { "type": "interests", "text": "<parent option>", "likelySchoolResponse": "<school response to interests option>", "textExplanation": "<explanation of interests option. What the response does, what it emphasizes, and how it moves the conversation forward.>" },
    { "type": "rights", "text": "<parent option>", "likelySchoolResponse": "<school response to rights option>", "textExplanation": "<explanation of rights option. What the response does, what it emphasizes, and how it moves the conversation forward.>" },
    { "type": "power", "text": "<parent option>", "likelySchoolResponse": "<school response to power option>", "textExplanation": "<explanation of power option. What the response does, what it emphasizes, and how it moves the conversation forward.>" }
  ]
}

Ensure the JSON is valid and well-formed. Do not include any additional text or explanations outside of the JSON structure.
Only output valid JSON.
  `

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are simulating a school team in an IEP meeting. You are designed to give responses that move the conversation forward to a conclusion. Be respectful and concise, but do not be afraid to push back on the parent.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.6
      })
    })

    const data = await response.json()
    const llmContent = data.choices?.[0]?.message?.content || ''

    // Try to extract JSON if LLM wraps it in extra text
    let jsonString = llmContent
    const match = llmContent.match(/\{[\s\S]*\}/)
    if (match) {
      jsonString = match[0]
    }

    let parsed = null
    try {
      parsed = JSON.parse(jsonString)
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Failed to parse LLM output: ' + String(e), details: llmContent }), { status: 500 })
    }

    return new Response(JSON.stringify(parsed), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to generate response', details: error }), { status: 500 })
  }
}