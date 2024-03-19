export default class BaseObject {
    constructor(ctx, canvas, image, posX, posY, width ){
        this.ctx = ctx;
        this.canvas = canvas;
        this.image = image;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
    }

    render(){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.width)
    }
}