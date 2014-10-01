describe('Home Controller ', function() {
  var scope = null;
  var location = null;
  var path = null;
  
  //you need to indicate your module in a test  
  beforeEach(module('tsb', function($provide) {
      return $provide.decorator('$state', function () {
          return {
              transitionTo: function (path) {
                  return {};
              }
          };
      });
  }));
 
  beforeEach(inject(function($rootScope, _$location_, $controller) {
	    //create a scope object for us to use.
      location = _$location_;
	  	scope = $rootScope.$new();
	  	path = "/localhost";
	  	
	  	homeController = $controller('HomeController', {
		      $scope : scope
	    });
  }));
  
  it('verify home controller changes path correctly', function() {
      scope.go(path);
	  expect(location.path()).toBe(path);
  });
});

