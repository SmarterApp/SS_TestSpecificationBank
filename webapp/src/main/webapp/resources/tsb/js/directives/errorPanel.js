tsb.directive("errorPanel", function(){
    return {
        restrict:"A",
        scope:{
            // @ = always interpreted as String by angular
            errorList:'=',
            alwaysExpanded:'@', // whether to display the +/- toggleable panel
            relativeWidth:'@' // whether the error panel should be the width of the page
        },
        transclude :true,
        templateUrl: 'resources/tsb/partials/error-panel.html',
        controller: function($scope, $attrs) {
            $scope.isAlwaysExpanded = function() {
                return $scope.alwaysExpanded == 'true';
            };

            $scope.isRelativeWidth = function() {
                return $scope.relativeWidth == 'true';
            };

            $scope.toggleErrors = function() {
                $scope.showErrors = !$scope.showErrors;
            };

            $scope.showErrors = $scope.isAlwaysExpanded();
        }
    };
});
