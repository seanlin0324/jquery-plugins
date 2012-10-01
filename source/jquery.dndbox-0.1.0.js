// Drag and Drop Box v0.1.0 - jQuery Drag and Drop plugin
// (c) 2012 Sean Lin - http://seanlin0324.blogspot.tw/
// License: http://www.opensource.org/licenses/mit-license.php

;(function($) {
    $.fn.dndBox = function(settings,method ) {
        var _defaultSettings = {
            background: $(this).css('background'),
            dragColor: 'rgba(210, 250, 250, 0.8)',
            onDragover:'',
            onDrop: ''
        };
        
        //~ var init = function () { 
            //~ $(this).css({'background':   
        //~ };
        
        var _settings = $.extend(_defaultSettings, settings);
        
        var _handler = function() {
            document.ondragover = function(e){e.preventDefault();};
            document.ondrop = function(e){e.preventDefault();};
            
            $(this)
            .on('dragover', function (e) {
                $(e.target).css('background-color', _settings.dragColor);
                _settings.onDragover && (_settings.onDragover(e));
                e.stopPropagation();
                e.preventDefault();  
            })
            .on('drop',function (e) {
                $(e.target).css('background-color','rgba(255, 255, 255  , 0)');
                var files = e.originalEvent.dataTransfer.files;
                var subname = files[0].name.split('.').pop();
                _settings.onDrop && (_settings.onDrop(e));
                e.stopPropagation();
                e.preventDefault();
            })
            //~ .on('dragend',function (e) {
                //~ $(e.target).css('background-color','rgba(210, 250, 250, 0)');
                //~ console.log('end');
                //~ e.stopPropagation();
                //~ e.preventDefault();
            //~ })
            //~ .on('dragstart', function(e){
                //~ e.preventDefault();
            //~ });
            };
        return this.each(_handler);
    };
})(jQuery);
