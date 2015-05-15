(function() {

	var module = angular.module('QuoteWall');

	module.controller('UserEditController', ["$scope", "$state", "$stateParams", "DataService",
		function($scope, $state, $stateParams, DataService) {

			$scope.formTitle = "New User";

			// Trying to edit a user?
			if($stateParams.userid) {
				
				$scope.formTitle = "Edit User";

				// Get the user.
				DataService.getUser($stateParams.userid).then(
					function(response) {
						$scope.user = response.data;
						$scope.dirtyUser = angular.copy($scope.user);
					});
			}
			
			$scope.cancelButton = function() {
				$state.go("users");
			};
		}]);
})();