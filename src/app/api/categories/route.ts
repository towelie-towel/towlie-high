import { NextResponse } from 'next/server';
import sql from '~/lib/db';


export async function GET() {
    try {
        const response = await sql`
            SELECT *
            FROM categories 
            ORDER BY id ASC
        `;
        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}