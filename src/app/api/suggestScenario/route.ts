import type { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const { suggestion } = await req.json()
  const logDir = path.resolve(process.cwd(), 'logs')
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)
  const logPath = path.join(logDir, 'scenario_suggestions.jsonl')
  fs.appendFileSync(logPath, JSON.stringify({ suggestion, timestamp: new Date().toISOString() }) + '\n')
  return new Response(JSON.stringify({ success: true }), { status: 200 })
}