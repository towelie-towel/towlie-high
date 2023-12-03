export interface Product {
    id: number;
    name: string;
    description: string;
    image_id: number;
    price: number;
    currency: string;
    priority: number;
    active: boolean;
    deleted: boolean;
    stock: number;
    category_id: number;
    primary_image: Image;
    secondary_images: Image[];
    category: Category
}

export interface Category {
    id: number,
    name: string,
    priority: number,
}

export interface Image {
    id: number,
    url: string,
    blur: string,
    size_mb: number,
    color: string,
}