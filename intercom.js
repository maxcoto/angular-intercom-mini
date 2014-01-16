/*
 * angular-intercom service v0.0.0
 * (c) 2013 Maximiliano Perez Coto http://about.me/maxiperezc
 * License: MIT
 */

!function(module, angular, undefined) {
  'use strict';

  angular.module('ngIntercom', ['intercom']);

  module.value('IntercomSettings', {});

  module.provider('IntercomService', function() {
    function createScript($document, callback) {
      var scriptTag = $document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = 'https://static.intercomcdn.com/intercom.v1.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
          callback();
        }
      };
      scriptTag.onload = callback;
      var s = $document.getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
    }

    this.$get = ['$document', '$timeout', '$q', '$window',
      function($document, $timeout, $q, $window) {
        var deferred = $q.defer();
        var onScriptLoad = function(callback) {
          $timeout(function(){
            deferred.resolve($window.Intercom);
          });
        };
        createScript($document[0], onScriptLoad);
        return deferred.promise;
      }
    ];
  });

  module.provider('Intercom', function() {

    var appID = null;
    this.init = function(_appID) { appID = _appID };

    this.$get = ['IntercomService', 'IntercomSettings', function(IntercomService, IntercomSettings) {
      var _options = {};
      angular.extend(_options, IntercomSettings);

      return {
        boot: function(options) {
          IntercomService.then(function(intercom) {
            options = options || _options;
            angular.extend(options, { app_id: appID });
            intercom('boot', options);
          });
        }
      };

    }];
  });

}(angular.module('intercom',[]), angular);
