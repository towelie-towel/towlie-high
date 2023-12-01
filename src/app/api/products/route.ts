import { NextResponse, type NextRequest } from 'next/server';
import { getPlaiceholder } from '~/helpers/plaiceholder';
import { conn } from '~/lib/db';
import { supabase } from '~/lib/supabase';

const BUCKET_NAME = 'images';
const FOLDER_NAME = 'products';

export async function GET() {
    try {
        const query = {
            text: `
                SELECT 
                    p.*, 
                    JSON_BUILD_OBJECT(
                        'id', i.id,
                        'url', i.url,
                        'blur_data_url', i.blur_data_url,
                        'name', i.name,
                        'size_mb', i.size_mb,
                        'color', i.color
                    ) as primary_image,
                    JSON_BUILD_OBJECT(
                        'id', c.id,
                        'name', c.name,
                        'priority', c.priority
                    ) as category
                FROM products p
                    JOIN images i on p.primary_images_id = i.id
                    JOIN categories c on p.categories_id = c.id
                ORDER BY p.id ASC
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

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const primaryImage = formData.get("primaryImage") as File;
        const description = formData.get("description") as string;
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const stock = formData.get("stock") as string;
        const categoryName = formData.get("category") as string;
        const color = formData.get("color") as string;


        const currentDate = new Date();
        const uniqueName = `${name.split(" ").join("")}-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;

        const primaryImgBuffer = Buffer.from(await primaryImage.arrayBuffer());
        const { base64: primaryImgBase64, color: primaryImgColor } = await getPlaiceholder(primaryImgBuffer);
        const { data: primaryImageURL, error: uploadError } =
            await supabase.storage
                .from(BUCKET_NAME)
                .upload(`${FOLDER_NAME}/${uniqueName}.jpg`, primaryImgBuffer)
                .catch(error => {
                    console.log(error)
                    return { data: null, error: error }
                });


        console.log(primaryImageURL, primaryImgColor)
        console.log(await supabase.storage.from(BUCKET_NAME).list())

        /* const query = {
            text: `SELECT insert_product_with_images($1, $2, $3, $4, $5, $6, $7, $8)`,
            values: [name, description, primaryImage, secondaryImages, price, stock, categoryName, color],
        }
        const response = await conn.query(query); */

        return NextResponse.json(primaryImgBase64);
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}