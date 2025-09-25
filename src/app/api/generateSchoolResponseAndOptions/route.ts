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
  const lastParentMessage = parentHistory[parentHistory.length - 1]?.user || ''
  const recentHistory = parentHistory.slice(-2).map((entry: { user: string }) => `Parent: ${entry.user}`).join('\n')

  const prompt = `
You are simulating a realistic IEP meeting as the school team. Stay in character and keep the conversation focused on IEP topics. DO NOT break character or mention that you are an AI.

Scenario background: ${scenarioBackground}
Recent conversation:
${recentHistory}
Previous school response: ${schoolLine}
IRP context: ${irpDescription}

Your task:
1. Carefully read the parent's latest message: "${lastParentMessage}"
2. Respond as the school team, directly addressing the parent's concerns, questions, or requests. Reference relevant laws (such as IDEA) or best practices if appropriate, in a way that is understandable to parents.
3. Make your response concise (one or two sentences), realistic, and connected to the conversation so far.

Next, generate three possible parent responses (one for each IRP type: interests, rights, power) that would be plausible next steps in this conversation. Each option should:
- Directly address the school team's latest message.
- Be concise and realistic.
- Move the conversation forward in a meaningful way.
- Not repeat previous statements.

For each parent option, generate the likely school team response, and provide a brief explanation of the parent option.

Return your output as a JSON object with this shape:

{
  "schoolResponse": "<school response>",
  "options": [
    { "type": "interests", "text": "<parent option>", "likelySchoolResponse": "<school response to interests option>", "textExplanation": "<explanation of interests option>" },
    { "type": "rights", "text": "<parent option>", "likelySchoolResponse": "<school response to rights option>", "textExplanation": "<explanation of rights option>" },
    { "type": "power", "text": "<parent option>", "likelySchoolResponse": "<school response to power option>", "textExplanation": "<explanation of power option>" }
  ]
}

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