
isColliding(mo) {
    return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
}

/**
 * Checks if the object is colliding from the side with another object.
 * @param {MovableObject} mo - The other movable object to check collision with.
 * @returns {boolean} True if the objects are colliding from the side, otherwise false.
 */
isCollidingFromSide(mo) {
    let isCollidingFromLeft = this.x + this.width - 10 >= mo.x &&
        this.x + this.width - 10 <= mo.x + mo.width &&
        this.y < mo.y + mo.height &&
        this.y + this.height > mo.y;
    let isCollidingFromRight = this.x + 10 <= mo.x + mo.width &&
        this.x + 10 >= mo.x &&
        this.y < mo.y + mo.height &&
        this.y + this.height > mo.y;
    return isCollidingFromLeft || isCollidingFromRight;
}

/**
 * Checks if the object is colliding from the top with another object.
 * @param {MovableObject} mo - The other movable object to check collision with.
 * @returns {boolean} True if the objects are colliding from the top, otherwise false.
 */
isCollidingFromTop(mo) {
    let isCollidingFromTop = this.y + this.height >= mo.y &&
        this.y + this.height <= mo.y + mo.height &&
        this.x + 50 < mo.x + mo.width &&
        this.x + this.width - 50 > mo.x;
    return isCollidingFromTop;
}

isCollidingNormal(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
}

    // isColliding(mo) {
    //     // Berücksichtige das Padding
    //     let paddingLeft = 40;
    //     let paddingTop = 40;
    
    //     // Berechne die Kollisionsbereiche unter Berücksichtigung des Paddings
    //     let fromLeft = this.x + this.width - paddingLeft >= mo.x && this.x + paddingLeft <= mo.x + mo.width && this.y < mo.y + mo.height && this.y + this.height > mo.y;
    //     let fromRight = this.x <= mo.x + mo.width && this.x + this.width - paddingLeft >= mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y;
    //     let fromTop = this.y + this.height - paddingTop >= mo.y && this.y + paddingTop <= mo.y + mo.height && this.x < mo.x + mo.width && this.x + this.width > mo.x;
    
    //     // Überprüfe die Kollision
    //     if (fromLeft || fromRight) {
    //         return fromLeft || fromRight;
    //     } else if (fromTop) {
    //         this.isCollidingFromTop = true;
    //         return !fromLeft || !fromRight;
    //     }
    // }