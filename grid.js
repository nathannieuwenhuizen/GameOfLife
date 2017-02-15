class Grid{
    constructor(width = 100, height = 100, rows = 30, colloms = 30,context){
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.colloms = colloms;
        this.points = [];
        this.livingPoints = [];
        
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
        this.cross(true);
        
    }
    
    SpawnBlock(mousePos)
    {
        var x = Math.round((mousePos.x-this.pointSize)/this.pointSize);
        var y = Math.round((mousePos.y-this.pointSize)/this.pointSize);
        var tempBlock = this.points[x][y];
        if(!tempBlock.alive)
            tempBlock.nextState = true;
        else
            tempBlock.nextState = false;
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
    cross(dutchAngle)
    {
        for(var x = 0; x < this.points.length; x++)
        {
            for(var y = 0; y < this.points[x].length; y++)
            {
                if(dutchAngle)
                {
                    if( x == y || x +y ==this.points[0].length || x == Math.round(this.points.length/2) || y == Math.round(this.points[0].length/2) )
                        this.points[x][y].nextState = true;
                    else
                        this.points[x][y].nextState = false;
                }
                else if(!dutchAngle)
                {
                    if(x == Math.round(this.points.length/2) || y == Math.round(this.points[0].length/2))
                        this.points[x][y].nextState = true;
                    else
                        this.points[x][y].nextState = false;
                        
                }
                
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
    
    declareSpecificGridArea( startPos, string)
    {
        var x= 0;
        var y = 0;
        console.log(string.length);
        for(var i = 0; i < string.length; i++)
        {
            if(string[i] == ",")
            {
                y++;
                x = 0;
            }
            else
                {
                    var tempPoint = this.points[startPos.x + x][startPos.y + y];
                    if(string[i] == "1")
                        tempPoint.nextState = true;
                }
            x++;
        }
    }
    
    renderGrid(context){
        this.livingPoints = [];
        for(var x = 0; x < this.points.length; x++)
        {            
            for(var y = 0; y < this.points[x].length; y++)
            {
                if(this.points[x][y].calculated)
                {
                    
                
                this.points[x][y].calculated = false;
                this.points[x][y].alive = this.points[x][y].nextState;
                this.renderPoint(this.points[x][y], context);
                
                }
            }
        }
        context.fill();
    }
    renderPoint(point,context)
    {
        if(point.alive)
                {
                    context.fillStyle = 'rgba(256,256,256,1)';
                    this.livingPoints.push(point);
                }
                else
                    context.fillStyle = 'rgba(0,0,0,1)';
                
                
                /*context.beginPath();
                context.arc(x*this.pointSize, y*this.pointSize,this.pointSize/2 -1,0,Math.PI*2);
                context.fill();
                context.closePath();*/
                context.fillRect(point.x*this.pointSize ,point.y*this.pointSize,this.pointSize-0,this.pointSize -0); 
    }
    LiveOrDie()
    {
        
        for(var i = 0; i < this.livingPoints.length; i++)
        {
           
                
                var n = this.getNeighbours(this.livingPoints[i].x,this.livingPoints[i].y,true,false).length;
                this.GameOfLife(this.livingPoints[i],n);
                
                
                this.deadNeighbours = this.getNeighbours(this.livingPoints[i].x,this.livingPoints[i].y ,false, true);
                
                for(var x = 0 ; x < this.deadNeighbours.length; x ++)
                {
                    this.temp = this.getNeighbours(this.deadNeighbours[x].x,this.deadNeighbours[x].y,true, false).length; 
                    this.GameOfLife(this.deadNeighbours[x],this.temp);  
                }
                
            
        }
    }
    GameOfLife(point, n)
    {
        if(point.alive)
        {
            if(n < 2 || n > 3 )
                point.nextState = false; 
        }
        else
        {
            if(n == 3)
                point.nextState = true;
        }
        point.calculated = true;
    }
    getNeighbours(x,y,state,filter)
    {
        var neighbours = [];
        for (var i = -1; i <= 1; i++)
        {
            for (var j = -1; j <= 1; j++)
            {
                if (i == 0 && j == 0)
                    continue;
                if (this.isOnGrid(x + i, y + j))
                    if(this.points[x+i][y+j].alive == state)
                        if(!filter || !this.points[x + i][ y + j].calculated)
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