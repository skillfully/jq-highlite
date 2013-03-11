/**
 * 
 */

(function(jQuery, $) {

  jQuery.log = function(msg) {
    console.log(msg);
  };
  
  jQuery.fn.highlite = function(options) {
    options = $.extend(true, {}, jQuery.fn.highlite.defaults, options);
    
    var _checkCookieFn = function() {
      var cookie = document.cookie,
          regexp = new RegExp(options.cparam);
      if (!cookie.match(regexp) && navigator.cookieEnabled) {
      // cookie doesn't exists, so we set an empty one
        _writeCookieFn();
        return true;
      } else if (cookie.match(regexp) && navigator.cookieEnabled) {
      // cookie exists
        return true;
      } else {
      // cookie doesn't exists and browser disallows writing cookies
        return false;
      }
    };
    var _readCookieFn = function() {
      var regexpStr = options.cparam + '="(\\w+)"',
          regexp = new RegExp(regexpStr),
          cookies,
          cvalue;
      if ( _checkCookieFn() ) {
        cookies = document.cookie;
        cvalue = regexp.exec(cookies);
        //cvalue = RegExp.$1;
        $.log(cookies + ' ' + RegExp.$1);
        return RegExp.$1
      } else {
        return false;
      }
    };
    var _writeCookieFn = function(txt) {
      var expires = new Date(),
          txt = typeof txt !== 'undefined' ? txt : '';
    // set expiration time
      expires.setMinutes(expires.getMinutes() + options.expTime);
    // write cookie if it's possible
      if (navigator.cookieEnabled) {
        document.cookie = options.cparam + '="' + txt + '"; expires=' + expires.toGMTString();
        return true;
      } else {
        return false;
      }
    };
    var _formSubmitFn = function(event) {
      var txt = $(options.searchTxt).val();
      _writeCookieFn(txt);
    };
    
    return this.each(function(index) {
      $(this)
        .find(options.searchTxt[index])
          .keypress(function() {
            
          })
        .end()
        .find(options.searchForm[index])
          .submit(function(event) {
            _formSubmitFn(event);
          });
      _readCookieFn();
      return $(this);
    });
  };
  
  jQuery.fn.highlite.defaults = {
    color: '#ff0',
    cparam: 'lsearch',
    searchTxt: ["#search input[type='text']"],
    searchForm:["form"],
    resultSel: ["#results"],
    expTime: 5
  };
})(jQuery, jQuery);

$(document).ready(function() {
  $('body').highlite();
});
