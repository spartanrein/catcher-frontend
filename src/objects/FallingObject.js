import BaseObject from "./BaseObject";

export default class FallingObject extends BaseObject {
    constructor(ctx, canvas, image, posX, posY, width, points){
        super(ctx, canvas, image, posX, posY, width)
        this.points = points
    }
}