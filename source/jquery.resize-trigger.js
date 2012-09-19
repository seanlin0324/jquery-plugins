// ResizeTrigger v0.1.0 - jQuery resize trigger plugin
// (c) 2012 Sean Lin - http://seanlin0324.blogspot.tw/
// License: http://www.opensource.org/licenses/mit-license.php

;(function($) {
    $.fn.resizeTrigger = function(settings) {
        var _defaultSettings = {
            onEvent: function(){ console.log('resize end'); },
            intervals: 500
        };
        var _settings = $.extend(_defaultSettings, settings);
        var _handler = function() {
            
            $(this).resize(function () {
                registerEventTrigger(function(){
                    return _settings.onEvent();
                }, _settings.intervals, "resize");
            });
           
        };
        var registerEventTrigger = (function () {
            var timers = {};
            return function (callback, intervals, uniqueId) {
                if (!uniqueId) {
                  uniqueId = "registration";
                }
                if (timers[uniqueId]) {
                  clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, intervals);
            };
        })();
        return this.each(_handler);
    };
})(jQuery);
