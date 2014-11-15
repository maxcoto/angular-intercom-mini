/*
 * angular-intercom service v0.0.1
 * (c) 2013 Maximiliano Perez Coto http://about.me/maxiperezc
 * License: MIT
 */

!function(module, angular, undefined) {
  'use strict';

  angular.module('ngIntercom', ['intercom']);

  module.value('IntercomSettings', {});

  module.provider('IntercomService', function() {
    var createScript = function ($document, appId, callback) {
      var scriptTag = $document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = 'https://widget.intercom.io/widget/' + appId;
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
          callback();
        }
      };
      scriptTag.onload = callback;
      var s = $document.getElementsByTagName('head')[0];
      s.appendChild(scriptTag);
    };

    var intercomBootstrap = function () {
      var Intercom = function(){
        Intercom.c(arguments)
      };
      Intercom.q = [];
      Intercom.c = function(args){
        Intercom.q.push(args)
      };
      return Intercom;
    };

    this.$get = ['$document', '$timeout', '$q', '$window',
      function($document, $timeout, $q, $window) {
        return {
          init: function(appId) {
            var deferred = $q.defer();
            $window.Intercom = intercomBootstrap();

            var onScriptLoad = function(callback) {
              $timeout(function(){
                deferred.resolve($window.Intercom);
              });
            };
            createScript($document[0], appId, onScriptLoad);
            return deferred.promise;
          }
        }
      }
    ];
  });

  module.provider('Intercom', function() {

    var appID = null;
    this.init = function(_appID) { appID = _appID };

    this.$get = ['IntercomService', 'IntercomSettings', function(IntercomService, IntercomSettings) {
      var _options = {};
      var intercomObj = false;

      angular.extend(_options, IntercomSettings);
      var invoke = function(){
         if (!intercomObj){
           return;
         }
        intercomObj.apply(undefined, arguments);
      };


      return {
        boot: function(options) {
          IntercomService.init(appID).then(function(intercom) {
            options = options || _options;
            angular.extend(options, { app_id: appID });

            intercom('boot', options);
            intercomObj = intercom;
          });
        },

        track: function(eventName, options) {
          invoke('trackEvent', eventName, options);
        },

        shutdown: function(){
          invoke('shutdown');
        },

        update: function(arg){
          invoke('update', arg);
        },

        reattach_activator: function(){
          invoke('reattach_activator');
        },

        hide: function(){
          invoke('hide');
        },

        show: function(){
          invoke('show');
        },

        onShow: function(cb){
          invoke('onShow', cb);
        },

        onHide: function(cb){
          invoke('onHide', cb);
        },

        onActivatorClick: function(cb){
          invoke('onActivatorClick');
        },

        invoke: invoke
      };

    }];
  });

}(angular.module('intercom',[]), angular);
