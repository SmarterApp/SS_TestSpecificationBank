tsb.controller('HomeController', ['$scope','$location', '$state', 'VersionService',
    function HomeController($scope,$location, $state, VersionService) {
        
        VersionService.getBuildInfo().then(function(response) {
            $scope.buildInfo = response.data;
        });
            
        $scope.go = function(path){
            $location.path(path);
        };
    }
]);
