import FallingObject from "../objects/FallingObject";

export const renderObject = (ctx, canvas,image, object, objectProps, ) => {
    object.render();
    if (objectProps.x <= 0) {
        objectProps.x = 0;
    } else if (objectProps.x > canvas.width){
        objectProps.x = canvas.width
    }
};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

export function spawnFallingItem(ctx, canvas, itemObject, image) {
    let item = new FallingObject(ctx, canvas, image, itemObject.x, itemObject.y,  canvas.width/14, 10)
    item.render()
    if (itemObject.x === 0){
        resetPosition(itemObject, canvas)
    }
    if (itemObject.y < canvas.height){
        itemObject.y+= itemObject.speed
    } else {
        resetPosition(itemObject, canvas)
    }
}

export function resetPosition(object, canvas){
    object.x = Math.floor(Math.random() * canvas.width)
    object.y = Math.floor(Math.random() * -1000) 
}

export function collision(boatProps, boatWidth, object, objectWidth ) {
    return (
        boatProps.x + boatWidth >= object.x &&
        boatProps.x <= object.x + objectWidth &&
        boatProps.y + boatWidth >= object.y &&
        boatProps.y <= object.y + objectWidth
    )
}