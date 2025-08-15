import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { previousScores, potentialOutcomes, lastExchange } = await req.json()

  const prompt = `
Given the previous scores for each possible IEP meeting outcome, and the most recent parent and school exchange, update the scores to reflect how close the conversation is to each outcome. For each outcome, give a score from 0 (not close at all) to 100 (very close), and a one-sentence explanation. Also, make sure that you don't overestimate how close an outcome really is. Only score highly if it seems like that outcome is truly highly likely. Return valid JSON in this format:

[
  { "outcome": "<outcome text>", "score": <0-100>, "explanation": "<one sentence>" },
  ...
]

Previous scores:
${JSON.stringify(previousScores, null, 2)}

Most recent exchange:
Parent: ${lastExchange.user}
School: ${lastExchange.school}

Possible outcomes:
${potentialOutcomes.map((o: any) => `- ${o}`).join('\n')}
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert IEP facilitator.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 900,
      temperature: 0.2
    })
  })

  const data = await response.json()
  let llmContent = (data.choices?.[0]?.message?.content || '').trim()

  let parsed = null
  try {
    // Try parsing the whole output first
    parsed = JSON.parse(llmContent)
  } catch {
    // Try to extract the first valid JSON array
    const match = llmContent.match(/\[\s*{[\s\S]*?}\s*\]/)
    if (match) {
      try {
        parsed = JSON.parse(match[0])
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Failed to parse extracted JSON array', details: llmContent }), { status: 500 })
      }
    } else {
      return new Response(JSON.stringify({ error: 'No valid JSON array found in LLM output', details: llmContent }), { status: 500 })
    }
  }

  return new Response(JSON.stringify(parsed), { status: 200 })
}