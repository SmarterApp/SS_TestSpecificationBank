describe('TestSpecificationSearchController ', function() {
  var scope = null;
  var state = null;
  var windowMock = null;
  var testSpecificationService = null;
  var q = null;
  
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
        
        // create controller
        $controller('TestSpecificationSearchController', {
            $scope : scope,
            $window : windowMock,
            loadedPurposes : { errors: [], data: {} },
            loadedStatuses : { errors: [], data: {} },
            testSpecificationService: TestSpecificationService,
      });
        
  }));

  it('calls correct service when search() called', function(){
      spyOn(testSpecificationService, "search");
      var searchParams = { "name": "searchName" };
      scope.searchSpecs(searchParams);
      expect(testSpecificationService.search).toHaveBeenCalledWith(searchParams);
  });
  
  it('calls correct service when requestExport() called', function(){
      spyOn(windowMock,"confirm").andReturn(true);    
      spyOn(testSpecificationService, "requestExportPackage").andCallThrough();
      spyOn(scope, "$broadcast").andCallThrough();

      var testSpecification = { "id":"test-spec-id", "name":"test-spec-name" };
      httpMock.expectPOST(/^testSpecification\/test-spec-id\/exportPackage/).respond(testSpecification);
      scope.requestExport(testSpecification);
      httpMock.flush();
      
      expect(testSpecificationService.requestExportPackage).toHaveBeenCalledWith("test-spec-id");
      expect(scope.$broadcast).toHaveBeenCalledWith('initiate-specification-search');
  });
  
  it('does not call service on requestExport() when user does not confirm', function(){
      spyOn(windowMock,"confirm").andReturn(false);    
      spyOn(testSpecificationService, "requestExportPackage").andCallThrough();
      spyOn(scope, "$broadcast").andCallThrough();

      var testSpecification = { "id":"test-spec-id", "name":"test-spec-name" };
      scope.requestExport(testSpecification);
      
      expect(testSpecificationService.requestExportPackage).not.toHaveBeenCalled();
      expect(scope.$broadcast).not.toHaveBeenCalledWith();
  });
  
  it('handles requestExport() errors correctly', function() {
      spyOn(windowMock,"confirm").andReturn(true);    
      spyOn(testSpecificationService, "requestExportPackage").andCallThrough();
      spyOn(scope, "$broadcast").andCallThrough();

      var testSpecification = { "id":"bad-spec-id", "name":"test-spec-name" };
      httpMock.expectPOST(/^testSpecification\/bad-spec-id\/exportPackage/).respond(400, {"messages" : {"exportFailure" : [ "could not export package" ] } });
      scope.requestExport(testSpecification);
      httpMock.flush();
      
      expect(testSpecificationService.requestExportPackage).toHaveBeenCalledWith("bad-spec-id");
      expect(scope.errors).toEqual( [ "could not export package" ] );
      expect(scope.$broadcast).not.toHaveBeenCalledWith('initiate-specification-search');
  });
  

});

