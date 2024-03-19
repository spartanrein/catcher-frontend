export function ItemMovement(ctx, itemObj, image) {
    let data = new Item(itemObj.x, itemObj.y, image);
    data.draw(ctx);
    itemObj.x += itemObj.dx;
    itemObj.y += itemObj.dy;
}

class Item {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image
    }
    draw(ctx) {
        this.image.onload = () => {
            ctx.drawImage(this.image, 0, 0, 100, 100)
        };
        this.ctx.drawImage(this.image, this.x, 350, 100, 100)
    }
}