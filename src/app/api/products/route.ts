import { NextResponse, type NextRequest } from 'next/server';
import { env } from '~/env';
import { getPlaiceholder } from '~/helpers/plaiceholder';
import { type Image } from '~/interfaces';
import { conn } from '~/lib/db';
import { supabase } from '~/lib/supabase';

const BUCKET_NAME = 'products';

export async function GET() {
    try {
        const query = {
            text: `
                SELECT
                    p.*,
                    JSON_AGG(JSON_BUILD_OBJECT(
                        'id', si.id,
                        'url', si.url,
                        'blur', si.blur,
                        'size_mb', si.size_mb,
                        'color', si.color
                    )) as secondary_images,
                    JSON_BUILD_OBJECT(
                        'id', c.id,
                        'name', c.name,
                        'priority', c.priority
                    ) as category,
                    JSON_BUILD_OBJECT(
                        'id', pi.id,
                        'url', pi.url,
                        'blur', pi.blur,
                        'size_mb', pi.size_mb,
                        'color', pi.color
                    ) as primary_image
                FROM products p
                    JOIN images pi on p.image_id = pi.id
                    LEFT JOIN images si on p.id = si.product_id
                    JOIN categories c on p.category_id = c.id
                GROUP BY p.id, c.id, pi.id
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
        const primaryImageFile = formData.get("primary_image") as File;
        const secondaryImagesFiles = formData.getAll("secondary_images") as File[];
        const description = formData.get("description") as string;
        const name = formData.get("name") as string;
        const currency = (formData.get("currency") as string) ?? "CUP";
        const price = formData.get("price") as string;
        const stock = formData.get("stock") as string;
        const categoryName = formData.get("category_name") as string;

        const primaryImage: Partial<Image> = {};
        const secondaryImages: Array<Partial<Image>> = [];

        const currentDate = new Date();
        const uniqueName = `${generateSlug(name)}-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;

        const primaryImgBuffer = Buffer.from(await primaryImageFile.arrayBuffer());
        const { base64: primaryImgBase64, color: primaryImgColor } = await getPlaiceholder(primaryImgBuffer);
        const { data: primaryImageURL } =
            await supabase.storage
                .from(BUCKET_NAME)
                .upload(`${uniqueName}.jpg`, primaryImgBuffer)
        primaryImage.url = `${env.SUPABASE_URL}/storage/v1/object/public/products/${primaryImageURL?.path}`;
        primaryImage.size_mb = (primaryImageFile.size / (1024 * 1024));
        primaryImage.blur = primaryImgBase64;
        primaryImage.color = primaryImgColor.hex;

        for (const imageFile of secondaryImagesFiles) {
            const secondaryImage: Partial<Image> = {};
            const secondaryImgBuffer = Buffer.from(await imageFile.arrayBuffer());

            const { base64: secondaryImgBase64, color: secondaryImgColor } = await getPlaiceholder(secondaryImgBuffer);
            const { data: secondaryImageURL } =
                await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(`${uniqueName}-${secondaryImages.length + 1}.jpg`, secondaryImgBuffer)
            secondaryImage.url = `${env.SUPABASE_URL}/storage/v1/object/public/products/${secondaryImageURL?.path}`;
            secondaryImage.size_mb = (imageFile.size / (1024 * 1024));
            secondaryImage.blur = secondaryImgBase64;
            secondaryImage.color = secondaryImgColor.hex;
            secondaryImages.push(secondaryImage);
            console.log("file uploaded", secondaryImage)
        }

        const query = {
            text: `SELECT insert_product($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            values: [name, description, price, currency, stock, categoryName, generateSlug(name), name.toLowerCase().replace(/\s+/g, '_'), primaryImage, secondaryImages],
        }
        const response = await conn.query(query);

        return NextResponse.json(response.rows[0]);
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}

function generateSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, '-');
}
