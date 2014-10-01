describe('TestSpecificationViewController ', function() {
  var scope = null;
  var state = null;
  var windowMock = null;
  var testSpecificationService = null;
  var q = null;
  
  var wiTenant = {
		  "id" : "wiTenantId",
		  "name" : "WI",
		  "description" : "state of WI"
  };
  
  var unsavedTestSpecification = {
	      "tenantId" : "tenantId",
	      "purpose" : "ADMINISTRATION",
	      "comment" : "comment",
	      "identifier" : "id",
	      "description" : "description"
	  };
  
  var savedTestSpecification = {
	      "id" : "testSpecId",
	      "tenantId" : "tenantId",
	      "purpose" : "ADMINISTRATION",
	      "comment" : "comment",
	      "identifier" : "id",
	      "description" : "description",
	      "tenantSet" : [wiTenant]
	  };
  
  //you need to indicate your module in a test  
  beforeEach(module('tsb', function($provide) {
      return $provide.decorator('$state', function () {
          return {
              transitionTo: function (path) {
                  return {};
              },
          };
      });
  }));
   
  beforeEach(inject(function($rootScope, $controller, $injector, $state, $window, $http, $q, TestSpecificationService) {
        //create a scope object for us to use.
        scope = $rootScope.$new();
        
        // set up expected http requests
        httpMock = $injector.get('$httpBackend');
        httpMock.whenGET(/\.html/).respond("");
        httpMock.expectGET(/^testSpecification\/isAdminUser/).respond(true);
        
        // initiate required variables
        state = $state;
        state.current = {};
        testSpecificationService = TestSpecificationService;
        windowMock = $window;
        q = $q;
        
        var mockForm = {};
        mockForm.$setPristine = function(){};
        scope.editableForm = mockForm;
        
        // create controller
        $controller('TestSpecificationViewController', {
            $scope : scope,
            $window : windowMock,
            loadedData : { errors: [], data: {} },
            loadedPurposes : { errors: [], data: {} },
            loadedStatuses : { errors: [], data: {} },
            testSpecificationService: TestSpecificationService
      });
        
  }));
  
  it('adds tenant to tenantSet', function() {
	  scope.testSpecification = savedTestSpecification;
      scope.selectedTenant = wiTenant;
      
      httpMock.expectPUT(/^testSpecification\/testSpecId\/updateTenantSet/).respond(wiTenant);;
      httpMock.expectGET(/^progman\/tenant\/wiTenantId/).respond(wiTenant);
      scope.addTenantToList();
      httpMock.flush();
      
      expect(scope.testSpecification.tenantSet.length).toBe(1);
      expect(scope.selectedTenant).toBe("");
  });

  it('removes tenant to tenantSet', function() {
	  scope.testSpecification = savedTestSpecification;
      scope.selectedTenant = wiTenant;
      expect(scope.testSpecification.tenantSet.length).toBe(1);
      
      scope.tenantIdSet = scope.testSpecification.tenantSet;
      httpMock.expectPUT(/^testSpecification\/testSpecId\/updateTenantSet/).respond(wiTenant);;
      httpMock.expectGET(/^progman\/tenant/).respond(wiTenant)
      scope.removeTenantFromList("wiTenantId");
      httpMock.flush();
      
      //expect(scope.testSpecification.tenantSet).toBe([]);
  });

});

