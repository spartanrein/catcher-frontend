export const renderBoat = (ctx, canvas, boatProps, image) => {
    let boat = new Boat(ctx, canvas, image, boatProps.x, boatProps.y, boatProps.width)
    boat.render();
    if (boatProps.x <= 0) {
        boatProps.x = 0;
    } else if (boatProps.x > canvas.width){
        boatProps.x = canvas.width
    }
};

class Boat {
    constructor(ctx, canvas, x, y, width, image) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.width = width;
        this.image = image;
    }
    render() {
        this.image.onload = () => {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
        }
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width)
    }
}

export default renderBoat