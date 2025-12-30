class Cell {
    constructor(x, y, size, index) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.visited = false;
        this.walls = [true, true, true, true]; // top, right, bottom, left
        this.index = index;
    }

    show() {
        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(this.x * this.size, this.y * this.size, this.size, this.size);
        }

        if (this.index === stack[stack.length - 1]) {
            noStroke();
            fill(66, 135, 245);
            rect(this.x * this.size, this.y * this.size, this.size, this.size);
        }

        stroke(255);
        strokeWeight(1);

        if (this.walls[0]) {
            // top wall
            line(
                this.x * this.size,
                this.y * this.size,
                (this.x + 1) * this.size,
                this.y * this.size
            );
        }
        if (this.walls[1]) {
            // right wall
            line(
                (this.x + 1) * this.size,
                this.y * this.size,
                (this.x + 1) * this.size,
                (this.y + 1) * this.size
            );
        }
        if (this.walls[2]) {
            // bottom wall
            line(
                (this.x + 1) * this.size,
                (this.y + 1) * this.size,
                this.x * this.size,
                (this.y + 1) * this.size
            );
        }
        if (this.walls[3]) {
            // left wall
            line(
                this.x * this.size,
                (this.y + 1) * this.size,
                this.x * this.size,
                this.y * this.size
            );
        }
    }
}
