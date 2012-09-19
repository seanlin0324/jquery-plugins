;(function($) {
    $.fn.resizeTrigger = function(settings) {
        var _defaultSettings = {
            trigger: ''
        };
        var _settings = $.extend(_defaultSettings, settings);
        var _handler = function() {
            
            $(this).resize(function () {
                registerEventTrigger(function(){
                    return _settings.onEvent();
                }, 500, "resize");
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
