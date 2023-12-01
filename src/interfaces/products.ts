export interface Product {
    id: number;
    name: string;
    description: string;
    primary_images_id: number;
    price: number;
    currency: string;
    priority: number;
    active: boolean;
    deleted: boolean;
    stock: number;
    categories_id: number;
    primary_image: Image;
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
    blur_data_url: string,
    name: string,
    size_mb: number,
    color: string,
}