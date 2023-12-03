import { NextResponse } from 'next/server';
import { conn } from '~/lib/db';


export async function GET() {
    try {
        const query = {
            text: `
                SELECT *
                FROM categories 
                ORDER BY id ASC
            `,
            values: [],
        }
        const response = await conn.query(query);
        return NextResponse.json(response.rows);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}