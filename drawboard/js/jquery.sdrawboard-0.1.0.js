// Drag and Drop Box v0.1.0 - jQuery Drag and Drop plugin
// (c) 2012 Sean Lin - http://seanlin0324.blogspot.tw/
// License: http://www.opensource.org/licenses/mit-license.php

;(function($) {
    $.fn.sdrawboard = function(settings,method ) {
        var _defaultSettings = {
            tools:'',
            toData:function () {return false}
        };
        var self = this,
        drawing = false,
        oldPos = [0,0],
        ctx;

        var _settings = $.extend(_defaultSettings, settings);
        
        var _handler = function() {
            var tools = _settings.tools;
            //document.ondragover = function(e){e.preventDefault();};
            //document.ondrop = function(e){e.preventDefault();};
            

            //setDragEvent();
            ctx = $(self)[0].getContext('2d');
            ctx.fillStyle = 'white';
            ctx.lineWidth = _settings.lineWidth;
            ctx.strokeStyle = "black";
            ctx.lineCap = "round" ;
          

            $(self)
            .on('mousedown', function (e) {
                drawing = true;
                obj_offset = $(self).offset();
                oldPos = [
                    (e.clientX - obj_offset.left), 
                    (e.clientY - obj_offset.top) + $("body").scrollTop()];
                console.log('d');
                e.stopPropagation();
                e.preventDefault();  
            })
            
            .on('mousemove',function (e) {
                if(drawing) {
                    var newPos = [
                        e.clientX - obj_offset.left,
                        e.clientY - obj_offset.top + $("body").scrollTop()
                    ];
                    drawLine(oldPos, newPos);
                    oldPos = newPos;
                }
                e.stopPropagation();
                e.preventDefault();
            })
            .on('mouseup',function (e) {
                drawing = false;
                e.stopPropagation();
                e.preventDefault();
            })
            .on('mouseleave', function(e){
                drawing = false;
                e.stopPropagation();
                e.preventDefault();
            });

            $(tools).children(".clear").on('click', function () {
                ctx.clearRect(0, 0, $(self).width(), $(self).height() );
            });
            $(tools).children(".eraser").on('click', function () {
                ctx.globalCompositeOperation = "destination-out";
                ctx.strokeStyle = "rgba(0,0,0,1)";
            });
            $(tools).children(".pen_black").on('click', function () {
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = "black";
            });

        };
        return this.each(_handler);

        function drawLine(oldPos, newPos) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(oldPos[0], oldPos[1]);
            ctx.lineTo(newPos[0], newPos[1]);
            ctx.closePath;
            ctx.stroke();
            ctx.restore();
        }
    };

})(jQuery);