class Grid{
    constructor(width = 100, height = 100, rows = 30, colloms = 30,context){
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.colloms = colloms;
        this.points = [];
        this.pointSize;
        
        this.makeGrid(this.rows,this.colloms);        
    }
    
    makeGrid(rows, colloms)
    {
        this.pointSize = this.width/rows;
        this.points = [];
        for(var x=0; x < rows; x++)
        {
            this.points.push([]);
            this.points[x].push( new Array(colloms));
            for(var y=0; y < colloms; y++)
            {
                this.points[x][y] = new Vector(x,y,false);
            }
        }
        this.circle();
        //this.begin();
    }
    
    SpawnBlock(mousePos)
    {
        var x = Math.round((mousePos.x-this.pointSize)/this.pointSize);
        var y = Math.round((mousePos.y-this.pointSize)/this.pointSize);
        var tempBlock = this.points[x][y];
        if(!tempBlock.alive)
            tempBlock.alive = tempBlock.nextState = true;
        else
            tempBlock.alive = tempBlock.nextState = false;
    }
    begin()
    {
        for(var x = 0; x < this.points.length; x++)
        {
            for(var y = 0; y < this.points[x].length; y++)
            {
                if( (x+y)%2 == 0 )
                    this.points[x][y].nextState = true;
                else
                    this.points[x][y].nextState = false;
            }
        }
    }
    cross()
    {
        for(var x = 0; x < this.points.length; x++)
        {
            for(var y = 0; y < this.points[x].length; y++)
            {
                if( x == y || x +y ==this.points[0].length )
                    this.points[x][y].nextState = true;
                else
                    this.points[x][y].nextState = false;
            }
        }
    }
    circle()
    {
        var middlePoint= this.points[Math.round(this.points.length/2)][Math.round(this.points[0].length/2)];
        console.log(middlePoint);
        for(var x = 0; x < this.points.length; x++)
        {
            for(var y = 0; y < this.points[x].length; y++)
            {
                var dist = this.points[x][y].DistanceFrom(middlePoint);
                if( dist > middlePoint.x -11 && dist < middlePoint.x - 10)
                    this.points[x][y].nextState = true;
                else
                    this.points[x][y].nextState = false;
            }
        }
    }
    
    update(context){
        for(var x = 0; x < this.points.length; x++)
        {            
            for(var y = 0; y < this.points[x].length; y++)
            {
                this.points[x][y].alive = this.points[x][y].nextState;
                
                if(this.points[x][y].alive)
                    context.fillStyle = 'rgba(256,256,256,1)';
                else
                    context.fillStyle = 'rgba(0,0,0,1)';
                
            
                /*context.beginPath();
                context.arc(x*this.pointSize, y*this.pointSize,this.pointSize/2 -1,0,Math.PI*2);
                context.fill();
                context.closePath();*/
                context.fillRect(x*this.pointSize ,y*this.pointSize,this.pointSize-0,this.pointSize -0);                
            }
        }
        context.fill();
        
        
    }
    LiveOrDie()
    {
        
        for(var i = 0; i < this.points.length; i++)
        {
            for(var j = 0; j < this.points[i].length; j++)
            {

                var n = this.getLivingNeighbours(this.points[i][j].x,  this.points[i][j].y).length;
                if(this.points[i][j].alive)
                {
                    if(n < 2 || n > 3 )
                        this.points[i][j].nextState = false; 
                }
                else
                {
                    if(n == 3)
                        this.points[i][j].nextState = true;
                }
            }
        }
    }
    
    getLivingNeighbours(x,y)
    {
        var neighbours = [];
        for (var i = -1; i <= 1; i++)
        {
            for (var j = -1; j <= 1; j++)
            {
                if (i == 0 && j == 0)
                    continue;
                if (this.isOnGrid(x + i, y + j))
                    if(this.points[x+i][y+j].alive == true)
                        neighbours.push(this.points[x + i][ y + j]);                
            }
        }
        return neighbours;
    }
    isOnGrid(x,y)
    {
        return x >= 0 && x <= this.points.length-1 && y >= 0 && y <= this.points[0].length-1;
    }
}