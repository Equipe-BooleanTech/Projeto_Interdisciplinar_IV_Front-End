export interface RegisterIngredientDto {
    name: String;
    unit: String;
    price: String;
    quantity: String;
    description: String;
    sif?: String;
    supplier: String;
}

export interface RegisterIngredientResponseDto {
    statusCode: number;
    message?: string;
}