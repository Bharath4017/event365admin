export interface FrameManagementDataModel {
    colorList: ColorList[];
    frameStyleList: FrameStyleList[];
    collectionList: CollectionList[];
    categoryList: CategoryList[];
}

interface CategoryList {
    category_id: number;
    category_name: string;
}

interface CollectionList {
    collection_id: number;
    collection_name: string;
}

interface FrameStyleList {
    style_id: number;
    style_name: string;
    status: string;
}

interface ColorList {
    color_id: number;
    color_name: string;
    color_hex_code: string;
    status: string;
}