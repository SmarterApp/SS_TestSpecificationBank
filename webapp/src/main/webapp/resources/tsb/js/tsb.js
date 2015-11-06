// global variables 
// TODO is there a better way to inject these?
var baseUrl =  '';
var tsbComponentName =  '';

if(document.getElementById('baseUrl')){
    baseUrl = document.getElementById('baseUrl').value;
}
if(document.getElementById('tsbComponentName')){
    tsbComponentName = document.getElementById('tsbComponentName').value;
}
// end global variables

function safeApply($scope, fn) {
    ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
}


var tsb = angular.module('tsb', ['ui.state','ui.bootstrap','ngCookies','ui.select2','xeditable','ui.sortable', 'blueimp.fileupload']);
tsb.config(['$stateProvider','$urlRouterProvider','$provide','$httpProvider', function($stateProvider, $urlRouterProvider, $provide,$httpProvider) {
    // necessary fix to get select2 <input> tags to work
    // taken from: https://github.com/angular/angular.js/issues/5219
    $provide.decorator('inputDirective', ['$delegate', function($delegate) {
        angular.forEach($delegate, function(linkDirective) {
            var _compile = linkDirective.compile;
            linkDirective.compile = function(element, attrs) {
                if (!attrs.uiSelect2) {
                    return _compile.apply(this, arguments);
                }
            };
        });
        return $delegate;
    }]);
    

  //register the interceptor as a service
  $provide.factory('myHttpInterceptor', function($q) {
		return {
	     'responseError': function(rejection) {
	    	if(rejection.status == 0){
	    		location.reload();
	    	}
	 	    return $q.reject(rejection);
	      }
	    };
  	});
  $httpProvider.interceptors.push('myHttpInterceptor');
  
tsb.run(function(editableOptions) {
		  editableOptions.theme = 'bs2';
});
        
$stateProvider
.state('home', {
        url: "/home", 
        resolve: {
        	navLinks :homeSearchNavResolver,
        }, 
        views: {
            "tsbview": {
                templateUrl: 'resources/tsb/partials/home.html',
                controller: 'HomeController'
            }
        }
    }).state('testspecificationsearch', {
        url: "/testspecificationsearch", 
        resolve: {
            navLinks: homeSearchNavResolver,
            loadedPurposes: specPurposeResolver,
            loadedStatuses: exportStatusResolver
        }, 
        views: {
            "tsbview": {
                templateUrl: 'resources/tsb/partials/test-specification-search.html',
                controller: 'TestSpecificationSearchController'
            }
        }
    }).state('testspecificationview', {
        url: "/testspecificationview/{testSpecificationId}", 
        resolve: {
            loadedData:specResolver
        },
        views: {
            "tsbview": {
                templateUrl: 'resources/tsb/partials/test-specification-view.html',
                controller: 'TestSpecificationViewController'
            }
        }
    }).state('noTenant', {
        url: "/subscription-needed", 
        resolve: {
            navLinks :noNavResolver
        }, 
        views: {
            "tsbview": {
                templateUrl: 'resources/tsb/partials/no-tenant.html'
            }
        }
    }).state('401', {
        url: "/login-error", 
        resolve: {
        	navLinks :noNavResolver
        }, 
        views: {
            "tsbview": {
                templateUrl: 'resources/tsb/partials/error_401.html'
            }
        }
    });   
}]).run(['$state', function ($state) {
   $state.transitionTo('home');
}]);

tsb.filter('joinBy', function () {
    return function (input,delimiter) {
        return (input || []).join(delimiter || ',');
    };
});

//Added Resolver code for Navigation
var homeSearchNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
	NavigationService.addNavLink("Home","home", {});
}];

var noNavResolver =  ['$stateParams','NavigationService', function ($stateParams, NavigationService) {
	NavigationService.clearMe();
}];

// required field resolvers
var specResolver = ['$stateParams','TestSpecificationService', function ($stateParams, TestSpecificationService) {
    if($stateParams.testSpecificationId) {
        return TestSpecificationService.findById($stateParams.testSpecificationId,true); 
    }
    return { data:{}, errors:[] };
}];
var specPurposeResolver = ['TestSpecificationService', function (TestSpecificationService) {
    return TestSpecificationService.getSpecificationPurposes();
}];

var exportStatusResolver = ['TestSpecificationService', function (TestSpecificationService) {
    return TestSpecificationService.getExportStatuses();
}];

