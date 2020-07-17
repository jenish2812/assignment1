/* Map Technology Copyright (C) 2011 DougX.net, used with permission */

var g_map_backgroundColor = "#eeeeee";        // background to draw map on
var g_map_borderColor = "#ffffff";            // state border color
var g_map_highlightBorderColor = "white";  // highlighted state border color

var g_map_baseRGB = [180, 180, 180];          // state color default
var g_map_highlightRGB = [11,32,57];       // state color when highlighted

var g_map_isIE9 = false;      // must detect IE9 for proper mouse position

var g_StateMap = null;
var theStates = null;

var g_map_canvas;
var g_map_context;
var g_map_renderInterval;


var initMap = function()
{
    g_map_canvas = document.getElementById('map_canvas');

    if (!g_map_canvas.getContext)
    {
        return;
    }

    g_map_context = g_map_canvas.getContext('2d');
    g_map_context.font = "bold 12px sans-serif";
    g_map_context.lineWidth = 1;

    var agent = navigator.userAgent;
    if ( agent.indexOf("MSIE") != -1 )
        g_map_isIE9 = true;

    inittheStates();
    g_map_context.fillStyle = g_map_backgroundColor;
    g_map_context.fillRect(0,0,g_map_canvas.width,g_map_canvas.height);
    g_map_renderInterval = setInterval(renderLoop, 10);

    g_map_canvas.addEventListener('mousemove', onMouseMove, false);
    g_map_canvas.addEventListener('mousedown', onMouseDown, false);

}

var onMouseMove = function(e)
{
    var x;
    var y;

    if (e.offsetX || e.offsetX == 0)
    {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if (e.layerX || e.layerX == 0)
    {
        x = e.layerX;
        y = e.layerY;

    }


    if ( g_map_isIE9 )
    {
        x = e.x;
        y = e.y;
    }

    /*---end generic mouse event processing---*/

    y = g_map_canvas.height - y;   // translate to map y coord

    var highState = null;
    for ( var i in g_StateMap )
    {
        var found = isPointInState(x,y,g_StateMap[i]);

        if ( found && (highState == null))
        {
            highState = g_StateMap[i];
        }
        else
        {
            g_StateMap[i].mouseOut();
        }
    }

    if ( highState != null )
        highState.mouseIn();
}

var onMouseDown = function(e)
{
    e.preventDefault();

    var x;
    var y;

    if (e.offsetX || e.offsetX == 0)
    {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if (e.layerX || e.layerX == 0)
    {
        x = e.layerX;
        y = e.layerY;
    }

    if ( g_map_isIE9 )
    {
        x = e.x;
        y = e.y;
    }


    /*---end generic mouse event processing---*/

    y = g_map_canvas.height - y;           //translate to map y coord


    for ( var i in g_StateMap )
    {
        var found = isPointInState(x,y,g_StateMap[i]);

        if ( found )
        {
            g_StateMap[i].mouseClick(x,y,g_StateMap[i]);
            break;
        }
    }

}

var renderLoop = function()
{
    var highState = null;
    for ( var i in g_StateMap )
    {
        if ( ! g_StateMap[i].highlighted )
            g_StateMap[i].draw();
        else
            highState = g_StateMap[i];
    }
    if ( highState != null )
    {
        highState.draw();
    }
}

var poly = function()
{
    this.ptX = null;
    this.ptY = null;
}

var isPointInState = function(x,y,state)
{
    for ( var i = 0; i < state.polys.length; ++i)
    {
        var p = state.polys[i];

        if (isPointInInPoly(x,y,p))
        {
            return 1;
        }
    }
    return 0;
}


var isPointInInPoly = function(x,y,p)
{
    var nodeCount = 0;
    var xValues = p.ptX;
    var yValues = p.ptY;

    var numPoints = xValues.length;

    for ( var i = 0; i < numPoints; ++i )
    {
        var Aindex = i;
        var Bindex = i+1;

        if ( i == numPoints - 1 )
            Bindex = 0;

        var Ax = xValues[Aindex];
        var Ay = yValues[Aindex];
        var Bx = xValues[Bindex];
        var By = yValues[Bindex];

        if (( Ax >= x ) && (Bx >= x ))
        {
            continue;
        }

        if (Ay == By)
        {
            continue;
        }

        if (( y > Ay  )&& (y > By ))
        {
            continue;
        }

        if (( y < Ay ) && (y < By ))
        {
            continue;
        }

        if ( Ay > By )
        {
            if ( y == Ay )
            {
                continue;
            }
        }
        else
        {
            if ( y == By )
            {
                continue;
            }
        }
        if ( Ax < Bx )
        {
            var m = (By - Ay)/(Bx - Ax);
            var alpha = ((y - Ay)/m) + Ax;
            if ( alpha > x )
            {
                continue;
            }
        }
        else
        {
            var m = (Ay - By)/(Ax - Bx);
            var alpha = ((y - By)/m) + Bx;
            if ( alpha > x )
            {
                continue;
            }
        }

        nodeCount++;
    }

    return ( nodeCount % 2 )
}

var State = function(abbrev, capsName, fullname, id)
{
    this.nameAbbrev = abbrev;
    this.nameCAPS = capsName;
    this.nameFull = fullname;
    this.id = id;

    this.winner = null;

    this.polys = [];

    this.colorBorder = g_map_borderColor;
    this.colorBorderHighlight = g_map_highlightBorderColor;

    this.rgbColorHighlight = g_map_highlightRGB;
    this.rgbColor = g_map_baseRGB;

    this.renderCount = -1;
    this.gradientOffset = 15;
    this.highlighted = false;
    this.counted = false;

    this.onClick = null;
}

State.prototype.mouseClick = function(x,y,state)
{
    if ( this.onClick != null )
    {
        this.onClick(x,y,state);
    }
}

State.prototype.draw = function()
{

    var fillColor;
    var borderColor;

    if ( this.renderCount == 0 )
    {
        return;
    }
    else if ( this.renderCount < 0 )
    {
        this.myIdle = false;
        this.renderCount++;

        var sourceR = this.rgbColor[0];
        var sourceG = this.rgbColor[1];
        var sourceB = this.rgbColor[2];

        var targetR = this.rgbColor[0];
        var targetG = this.rgbColor[1];
        var targetB = this.rgbColor[2];

        var stepR = (targetR - sourceR) / this.gradientOffset;
        var stepG = (targetG - sourceG) / this.gradientOffset;
        var stepB = (targetB - sourceB) / this.gradientOffset;

        var r = Math.floor(targetR + ( stepR * this.renderCount ));
        var g = Math.floor(targetG + ( stepG * this.renderCount ));
        var b = Math.floor(targetB + ( stepB * this.renderCount ));

        fillColor = "rgb(" + r + "," + g + "," + b + ")";
    }
    else
    {
        this.renderCount--;

        var targetR = this.rgbColor[0];
        var targetG = this.rgbColor[1];
        var targetB = this.rgbColor[2];

        var sourceR = this.rgbColor[0];
        var sourceG = this.rgbColor[1];
        var sourceB = this.rgbColor[2];

        var stepR = (targetR - sourceR) / this.gradientOffset;
        var stepG = (targetG - sourceG) / this.gradientOffset;
        var stepB = (targetB - sourceB) / this.gradientOffset;

        var r = Math.floor(targetR - ( stepR * this.renderCount ));
        var g = Math.floor(targetG - ( stepG * this.renderCount ));
        var b = Math.floor(targetB - ( stepB * this.renderCount ));

        fillColor = "rgb(" + r + "," + g + "," + b + ")";
    }

    if ( this.highlighted )
        borderColor = this.colorBorderHighlight;
    else
        borderColor = this.colorBorder;

    g_map_context.strokeStyle = borderColor;
    g_map_context.fillStyle = fillColor;

    for ( var i = 0; i < this.polys.length; ++i)
    {
        g_map_context.beginPath();

        for ( var j = 0; j < this.polys[i].ptX.length; ++j )
        {
            var x = this.polys[i].ptX[j];
            var y = this.polys[i].ptY[j];

            y = g_map_canvas.height - y;

            if ( j == 0 )
                g_map_context.moveTo(x,y);
            else
                g_map_context.lineTo(x,y);
        }

        g_map_context.closePath();

        g_map_context.fill();

        g_map_context.stroke();
    }
}

// call this function after you have changed color settings within your custom click cb to make the map render them
// set 'highlight' (boolean) the current state should be filled highlighted or not

State.prototype.updateColor = function(highlight)
{
    if ( highlight == undefined || highlight == false )
        this.renderCount = -1 * this.gradientOffset;
    else
        this.renderCount = this.gradientOffset;
}

State.prototype.mouseIn = function()
{
    if ( !this.highlighted )
    {
        this.renderCount = this.gradientOffset;
        setStateResults(this.id);
    }

    this.highlighted = true;
    this.counted = true;
}

State.prototype.mouseOut = function()
{
    if ( this.highlighted )
    {
        this.renderCount = this.gradientOffset * -1;
    }

    this.highlighted = false;
}

var onLoad = function() {
    initMap();

    for (var i=0;i<theStates.length;i++)
    {
        console.log(theStates[i].nameFull)
    }
}