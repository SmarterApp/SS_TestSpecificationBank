describe('TestSpecification Service', function() {
  var httpMock = null;
  var serviceMock = null;
  
  var unsavedTestSpecification = {
          "name" : "Test TestSpecification",
          "comment" : "testSpecification comment",
          "description" : "this is a test TestSpecification."
  };
  
  var existingTestSpecification = {
		  "id" : "testSpecification_id",
          "name" : "Test TestSpecification",
          "comment" : "testSpecification comment",
          "description" : "this is a test TestSpecification."
  };
  
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
    
  beforeEach(inject(function(TestSpecificationService, _$httpBackend_) {
      serviceMock = TestSpecificationService;
      httpMock = _$httpBackend_;
      httpMock.whenGET(/\.html/).respond("");      
  }));
  
  //make sure no expectations were missed in your tests (e.g. expectGET or expectPOST)
  afterEach(function() {
      httpMock.verifyNoOutstandingExpectation();
      httpMock.verifyNoOutstandingRequest();
  });
  
  it('should make PUT request when saving an existing testSpecification', function() {
      var httpResponse = "successful PUT";

      httpMock.expectPUT('testSpecification/testSpecification_id', {
          "id": "testSpecification_id",
          "name": "Test TestSpecification",
          "comment": "testSpecification comment",
          "description": "this is a test TestSpecification."
      }).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.save(existingTestSpecification);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("successful PUT");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make POST request when saving a new testSpecification', function() {
      var httpResponse = "successful POST";

      httpMock.expectPOST('testSpecification', {
          "name": "Test TestSpecification",
          "comment": "testSpecification comment",
          "description": "this is a test TestSpecification."
      }).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.save(unsavedTestSpecification);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("successful POST");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });

  it('should make correct GET request when getting a testSpecification', function() {
      var httpResponse = "found these testSpecifications";
      httpMock.expectGET(new RegExp('testSpecification/test-spec-id')).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.findById("test-spec-id");
      returnedPromise.then(function(response) {
          expect(response.data).toBe("found these testSpecifications");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make correct GET request when getting a testSpecification with excludeXml', function() {
      var httpResponse = "found these testSpecifications";
      httpMock.expectGET(new RegExp('testSpecification/test-spec-id(.*)excludeXml=true')).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.findById("test-spec-id",true);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("found these testSpecifications");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make correct GET request when searching for testSpecifications', function() {
      var httpResponse = "found these testSpecifications";
      httpMock.expectGET(new RegExp('testSpecification')).respond(201,httpResponse);
            
      var searchParams = { "name": "Math TestSpecification"};
      var returnedPromise = serviceMock.search(searchParams);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("found these testSpecifications");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make correct GET request when searching for testSpecifications2', function() {
      var httpResponse = "found these testSpecifications";
      httpMock.expectGET(new RegExp('testSpecification')).respond(201,httpResponse);
            
      var searchParams = { "name": "Test TestSpecification", "comment": "testSpecification comment", "description": "here's a description" };
      
      var returnedPromise = serviceMock.search(searchParams);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("found these testSpecifications");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make correct DELETE request when removing testSpecification', function() {
      var httpResponse = "successful DELETE";
      httpMock.expectDELETE('testSpecification/testSpecification_id').respond(201,httpResponse);
            
      var returnedPromise = serviceMock.remove(existingTestSpecification);
      returnedPromise.then(function(response) {
          expect(response.data).toBe("successful DELETE");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });
  
  it('should make POST request when requesting a new export package', function() {
      var httpResponse = "successful POST";
      httpMock.expectPOST('testSpecification/test-spec-id/exportPackage', {}).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.requestExportPackage("test-spec-id");
      returnedPromise.then(function(response) {
          expect(response.data).toBe("successful POST");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });

  it('should make correct request when getting spec purposes', function() {
      var httpResponse = "found these purposes";
      httpMock.expectGET(new RegExp('testSpecification/purpose')).respond(201,httpResponse);
            
      var returnedPromise = serviceMock.getSpecificationPurposes();
      returnedPromise.then(function(response) {
          expect(response.data).toBe("found these purposes");
          expect(response.errors).toEqual([]);
      });
      
      httpMock.flush();
  });

  it('should handle errors correctly from http responses', function() {
      var httpResponse = {messages: [ {"field1": "invalid field1"}, {"field2" : "invalid field2"} ] };

      httpMock.expectPUT('testSpecification/testSpecification_id', {
          "id": "testSpecification_id",
          "name": "Test TestSpecification",
          "comment": "testSpecification comment",
          "description": "this is a test TestSpecification."
      }).respond(500,httpResponse);
            
      var returnedPromise = serviceMock.save(existingTestSpecification);
      returnedPromise.then(function(response) {
          expect(response.data).toEqual({});
          expect(response.errors).toEqual([ "invalid field1", "invalid field2" ]);
      });
      
      httpMock.flush();
  });

});
