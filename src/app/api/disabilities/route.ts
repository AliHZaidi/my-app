import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { DisabilityData } from '@/types/accommodations';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), 'src/app/accommodations/accommodation_jsons');
    const files = fs.readdirSync(directoryPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const disabilities: DisabilityData[] = [];
    
    for (const file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent) as DisabilityData;
      disabilities.push(data);
    }
    
    return NextResponse.json(disabilities);
  } catch (error) {
    console.error('Error loading disabilities:', error);
    return NextResponse.json(
      { error: 'Failed to load disabilities data' },
      { status: 500 }
    );
  }
}