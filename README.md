# angular-intercom-mini
Bower Component for installing and using Intercom with AngularJS.


## Install

1. `bower install angular-intercom-mini`
2. Include the `intercom.js` script provided by this component into your app.
3. Add `angular-intercom-mini` as a module dependency to your app.


## Usage

````html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.js"></script>
<script src="app/bower_components/angular-intercom-mini/intercom.js"></script>

<script>
  angular
  	.module('YOUR-APP', ['intercom', '... others ...'])
  	.config( function(IntercomProvider) { IntercomProvider.init('YOUR-APP-ID') })
  	.directive('intercom', function(Intercom) {
  	  // Create a directive to watch user object and invoke Intercom.boot when it changes
  	})
  ;
</script>

````
Check the example.html file - usage is very easy


## License
MIT

