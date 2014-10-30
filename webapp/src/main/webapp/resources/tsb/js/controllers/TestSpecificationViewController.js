tsb.controller('TestSpecificationViewController',['$scope','$state', 'loadedData', 'TestSpecificationService', 'ProgmanService', 'PollingService',
    function($scope, $state, loadedData, TestSpecificationService, ProgmanService, PollingService) {
        $scope.errors = loadedData.errors;
		$scope.testSpecification = loadedData.data;
        $scope.specXmlUrl = TestSpecificationService.getBaseUrl() + TestSpecificationService.getResource() + '/' + $scope.testSpecification.id + '/specXml';
        $scope.tenantIdSet = angular.copy($scope.testSpecification.tenantSet);
		$scope.addingTenantIndicator = false;
		$scope.deletingTenantIndicator = false;
        
        $scope.isSubmitted = function() {
        	return ($scope.testSpecification.exportPackage && ($scope.testSpecification.exportPackage.status == 'SUBMITTED' || $scope.testSpecification.exportPackage.status == 'PENDING_ITEM_EXPORT' 
        	|| $scope.testSpecification.exportPackage.status == 'PENDING_PACKAGE_CREATION' || $scope.testSpecification.exportPackage.status == 'PENDING_SFTP'));
        };
		
		$scope.getTenants = function() {
			$scope.tenantSet = [];
			for (var i = 0; i < $scope.tenantIdSet.length; i++) {
				tenantId = $scope.tenantIdSet[i];
				ProgmanService.findTenant(tenantId).then(function(response) {
					$scope.tenantSet.push(response.data);
				});
			}
			$scope.addingTenantIndicator = false;
			$scope.deletingTenantIndicator = false;
		};
		$scope.getTenants();
		
		$scope.addTenantToList = function() {
			$scope.addingTenantIndicator = true;
			if($scope.tenantIdSet == null) {
				$scope.tenantIdSet = [];
			}
			if($scope.selectedTenant && $scope.tenantIdSet.indexOf($scope.selectedTenant.id) == -1) {
				$scope.tenantIdSet.push($scope.selectedTenant.id);
			}
			$scope.selectedTenant = "";
			TestSpecificationService.updateTenantSet($scope.testSpecification.id, $scope.tenantIdSet).then(function(response) {
				$scope.errors = response.errors;
				if (!$scope.errors || $scope.errors.length == 0) {
					$scope.getTenants();
				}
				$scope.testSpecification.tenantSet = angular.copy($scope.tenantIdSet);
			});
        };
        
		$scope.removeTenantFromList = function(tenantId) {
			$scope.deletingTenantIndicator = true;
			var index = $scope.tenantIdSet.indexOf(tenantId);
			if(index > -1) {
				$scope.tenantIdSet.splice(index, 1);
			}
			TestSpecificationService.updateTenantSet($scope.testSpecification.id, $scope.tenantIdSet).then(function(response) {
				$scope.errors = response.errors;
				if (!$scope.errors || $scope.errors.length == 0) {
					$scope.getTenants();
				}
				$scope.testSpecification.tenantSet = angular.copy($scope.tenantIdSet);
			});
        };
        
        $scope.retry = function(testSpecificationId) {
            TestSpecificationService.retryExportPackage(testSpecificationId).then(function(response) {
                $scope.errors = response.errors;
                if (!$scope.errors || $scope.errors.length == 0) {
                    $scope.testSpecification = response.data;
                    $scope.pollForStatusUpdates();
                }
            });
        };
        
  		$scope.pollForStatusUpdates = function() {
			PollingService.stopPolling('exportPoll-' + $scope.testSpecification.name);
			PollingService.startPolling('exportPoll-' + $scope.testSpecification.name, TestSpecificationService.getBaseUrl() + TestSpecificationService.getResource() + '/' + $scope.testSpecification.id, null, function(response) {
				$scope.testSpecification.exportPackage = response.data.exportPackage;
				$scope.isSubmitted();
	  			if ($scope.testSpecification.exportPackage.status == 'COMPLETE' || $scope.testSpecification.exportPackage.status == 'FAILED') {
	  				PollingService.stopPolling('exportPoll-' + $scope.testSpecification.name);
	  			}
			});
        };

        TestSpecificationService.isAdminUser().then(function(response) {
        	$scope.isAdminUser = response.data;
        });
        
		$scope.back = function() {
			$scope.actionButton = 'cancel';
			$state.transitionTo("testspecificationsearch");
		};
		
		$scope.edit = function() {
            $scope.originalSelectedTenantName = angular.copy($scope.selectedTenant);
		    $scope.editableForm.$show();
		};
		
		$scope.cancel = function() {
            $scope.messages = {};
            $scope.errors = [];
			$scope.selectedTenant = "";
            $scope.selectedTenantType = null;
            $scope.editableForm.$cancel();
            $scope.tenantIdSet = angular.copy($scope.testSpecification.tenantSet);
            $scope.getTenants();
		};
		
  		$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    		if ($scope.editableForm.$dirty && $scope.actionButton != 'cancel') {
    			if(!confirm("You have unsaved changes. Are you sure you want to leave this page?")){
    				event.preventDefault();
    			}
	    	}
  		});
  		
	}]);

