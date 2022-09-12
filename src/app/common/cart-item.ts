import { Product } from "./product";

export class CartItem
{
    id: number=0;
    name: string="";
    imgUrl: string="";
    unitPrice: number=0;
    quantity: number=0;

    constructor(product: Product)
    {
        this.id = product.id;
        this.name = product.name;
        this.imgUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1.
    }
}
