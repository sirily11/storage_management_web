export interface AbstractStorageItem {
    id: number;
    uuid: string;
    name: string;
    description: string;
    author: number;
    author_name: string;
    category_name: string;
    column: number;
    row: number;
    position: string;
    images: AbstractItemImage[]
    price: number;
    unit: string;
}

export interface AbstractItemImage {
    id: number;
    image: string
}


export interface Base {
    id: number;
    name: string;
}

export interface Author extends Base {
    description?: string;
}

export interface Series extends Base {
    description?: string;
}

export interface Category extends Base {

}

export interface Location {
    name: string;
    id: number;
    country?: string;
    city?: string;
    street?: string;
    building?: string;
    unit?: string;
    room_number?: string;
    latitude?: number,
    longitude?: number
}

export interface Position {
    name: string;
    id: number;
    position: string;
    description: string;
    image?: string
}

export interface ImageObject {
    id?: number;
    image: string;
    item: number;
}

export interface FileObject {
    id?: number;
    file: string;
    item: number;

}

export interface DetailStorageItem extends Base {
    created_time: string;
    author_name: Author;
    series_name: Series;
    category_name: Category;
    price: number;
    qr_code: string;
    location_name: Location;
    position_name: Position;
    images: string[];
    files: string[];
    row: number;
    column: number;
    uuid: string;
    description: string;
    files_objects: FileObject[];
    images_objects: ImageObject[];
    unit: string;
    quantity: number;
}

/**
 * Interface for create item
 */
export interface PublishStorageItem {
    name?: string;
    description?: string;
    price?: number;
    qr_code?: string;
    column?: number;
    row?: number;
    author_id?: number;
    series_id?: number;
    category_id?: number;
    location_id?: number;
    position_id?: number;
    unit: string;
}

export interface Settings {
    categories: Category[],
    series: Series[],
    authors: Author[],
    locations: Location[],
    positions: Position[]
}
