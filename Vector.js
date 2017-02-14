/*
Made by: Nathan Nieuwenhuizen
This is a simple 2D vector class that has a couple of inbuild functions.
*/
function Vector(x, y, alive) {
    //If it isn't declared a number, it automaticly is 0.
    this.x = x || 0;
    this.y = y || 0;
    this.alive = alive || false;
    this.nextState = this.alive;
}
//These functions make the code a lot more readable and easier to understand. 
Vector.prototype = {
    //Function that returns the distance between vectors in numbers.
    DistanceFrom: function (v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }, //This function changes the x and y of the vector making the hypotenuse equal 1.
    Normalizen: function () {
        if (this.x != 0 && this.y != 0) {
            var distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
            this.x /= distance;
            this.y /= distance;
        }
    }, //Multiplies the vector with a number.
    Multiply: function (number) {
        this.x *= number;
        this.y *= number;
    }, //Devides the vector with a number.
    Devide: function (number) {
        this.x /= number;
        this.y /= number;
    }, //Adds values to the vector.
    Add: function (numberX, numberY) {
        this.x += numberX;
        this.y += numberY;
    }
}