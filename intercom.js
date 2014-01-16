/*
 * angular-intercom service v0.0.0
 * (c) 2013 Maximiliano Perez Coto http://about.me/maxiperezc
 * License: MIT
 */

// TODO - refactor the obfuscated JS.

angular.module('angular-intercom', []).factory('$intercom', ['$window', function ($window) {
  return {
    init: function(app_id, user) {
      $window.intercomSettings = {
        app_id: app_id,
        name: user.name,
        email: user.email,
        created_at: Math.round(+new Date(user.created_at)/1000)
      };

      var w = $window;
      var ic = w.Intercom;

      if( typeof ic === "function" ) {
        ic('reattach_activator');
        ic('update', intercomSettings);
      } else {

        var d = $window.document;
        
        var i = function() {
          i.c(arguments);
        };
        
        i.q = [];
        
        i.c = function(args) {
          i.q.push(args);
        };
        
        w.Intercom = i;

        var l = function(){
          var s = d.createElement('script');
          s.type='text/javascript';
          s.async=true;
          s.src='https://static.intercomcdn.com/intercom.v1.js';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s,x);
        };

        l();
        if( w.attachEvent ){
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    }
  };

}]);
