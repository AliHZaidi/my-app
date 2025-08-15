import type { NextRequest } from 'next/server'
import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

// Ensure the logs directory exists
const dbDir = path.resolve(process.cwd(), 'logs')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir)
}
const dbPath = path.join(dbDir, 'simulation_logs.db')

// Initialize SQLite database and table if not exists
const db = new Database(dbPath)
db.exec(`
  CREATE TABLE IF NOT EXISTS simulation_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    scenario_id TEXT,
    parent_choices TEXT,
    outcome_scores TEXT,
    start_time TEXT,
    end_time TEXT,
    elapsed_seconds INTEGER,
    user_agent TEXT,
    meta TEXT
  )
`)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const {
      scenarioId,
      parentChoices,
      outcomeScores,
      startTime,
      endTime,
      elapsedSeconds,
      meta
    } = data

    const userAgent = req.headers.get('user-agent') || ''

    const stmt = db.prepare(`
      INSERT INTO simulation_logs (
        timestamp, scenario_id, parent_choices, outcome_scores, start_time, end_time, elapsed_seconds, user_agent, meta
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(
      new Date().toISOString(),
      scenarioId || null,
      JSON.stringify(parentChoices ?? []),
      JSON.stringify(outcomeScores ?? []),
      startTime ? String(startTime) : null,
      endTime ? String(endTime) : null,
      typeof elapsedSeconds === 'number' ? elapsedSeconds : null,
      userAgent,
      JSON.stringify(meta ?? {})
    )

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to log simulation', details: String(error) }),
      { status: 500 }
    )
  }
}