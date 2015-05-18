(function() {

	var module = angular.module('QuoteWall');

	module.controller('UserEditController', ['$scope', '$state', '$stateParams', 'DataService',
		function($scope, $state, $stateParams, DataService) {

			$scope.formTitle = 'New User';
			$scope.user = {};
			$scope.dirtyUser = {};

			// Trying to edit a user?
			if($stateParams.userid) {
				
				$scope.formTitle = 'Edit User';

				// Get the user.
				DataService.getUser($stateParams.userid).then(
					function(response) {
						$scope.user = response.data;
						$scope.dirtyUser = angular.copy($scope.user);
					});
			}

			$scope.saveButton = function() {

				if($scope.formTitle === 'New User') {

					// Create new user.
					DataService.createUser($scope.dirtyUser).then(
						function(response) {

							// Go to newly created user.
							$state.go('users', { userid: response.data });
						},
						function(response) {

							console.log('Error: ' + response.data);
						});
				} else {

					// Update user.
					DataService.updateUser($scope.dirtyUser).then(
						function(response) {

							// Go to updated user.
							$state.go('users', { userid: response.data });
						});
				}
			};

			$scope.resetButton = function() {

				// Copy original user to clear changes.
				$scope.dirtyUser = angular.copy($scope.user);
			};

			$scope.cancelButton = function() {

				// Go to user list.
				$state.go('users');
			};
		}]);
})();