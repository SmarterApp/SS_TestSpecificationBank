tsb.controller('TestSpecificationSearchController', ['$scope', '$state', 'loadedPurposes', 'loadedStatuses', 'TestSpecificationService', 'CurrentUserService', 'PollingService',
     function TestSpecificationSearchController($scope, $state, loadedPurposes, loadedStatuses, TestSpecificationService, CurrentUserService, PollingService) {
        $scope.searchResponse = {};
        $scope.specPurposes = loadedPurposes.data;
        $scope.exportStatuses = loadedStatuses.data;
        $scope.retiredOptions = [ { key:true, label:"Retired" }, { key:false, label:"Active" } ];
    
        if(!$state.current.searchParams) {
            $scope.searchParams = {"name":"", "type":"", "sortKey":"name,version,purpose", "sortDir":"asc,desc,asc", "currentPage": 1};
        }else{
            $scope.searchParams = $state.current.searchParams;
        }
        
        TestSpecificationService.isAdminUser().then(function(response) {
        	$scope.isAdminUser = response.data;
        });

  		$scope.postProcessSpecs = function(spec) {
  			if (spec.exportPackage && (spec.exportPackage.status != 'COMPLETE' && spec.exportPackage.status != 'FAILED')) {
  				PollingService.stopPolling('exportPoll-' + spec.name);
  				PollingService.startPolling('exportPoll-' + spec.name, TestSpecificationService.getBaseUrl() + TestSpecificationService.getResource() + '/' + spec.id, null, function(response) {
  					spec.exportPackage = response.data.exportPackage;
  		  			if (spec.exportPackage.status == 'COMPLETE' || spec.exportPackage.status == 'FAILED') {
  		  				PollingService.stopPolling('exportPoll-' + spec.name);
  						//$scope.refreshInfo();
  		  			}
  				});
  			}
        };
        
        $scope.searchSpecs = function(params){
            params.tenantId = CurrentUserService.getTenantId();
            params.tenantSet = CurrentUserService.getTenantId();
            params.excludeXml = true;
            return TestSpecificationService.search(params);
        };
        
        $scope.view = function(testSpecification) {
            $state.transitionTo("testspecificationview", {testSpecificationId:testSpecification.id});
        };  
        
        $scope.retireSpec = function(testSpecification,undoRetirement) {
            if (undoRetirement || confirm("Would you like to retire this specification?")) {
                TestSpecificationService.retireTestSpecification(testSpecification.id,undoRetirement).then(function(response) {
                    $scope.errors = response.errors;
                    if (!$scope.errors || $scope.errors.length == 0) {
                        $scope.$broadcast('initiate-specification-search');
                    }
                });
            }
        };  
        
        $scope.requestExport = function(testSpecification) {
            if (confirm("Would you like to request a Test Package for this specification?")) {
                TestSpecificationService.requestExportPackage(testSpecification.id).then(function(response) {
                    $scope.errors = response.errors;
                    if (!$scope.errors || $scope.errors.length == 0) {
                        $scope.$broadcast('initiate-specification-search');
                    }
                });
            }
        };

     }]);