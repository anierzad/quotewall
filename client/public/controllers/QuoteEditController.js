(function() {

	var module = angular.module('QuoteWall');

	module.controller('QuoteEditController', ['$scope', '$state', '$stateParams', 'DataService',
		function($scope, $state, $stateParams, DataService) {

			$scope.upButton = function(quotePart) {

				// Not first?
				if(quotePart.order > 0) {
					var previousQuotePart;
					var currentPosition = quotePart.order;

					angular.forEach($scope.dirtyQuote.quoteParts, function(arrayQuotePart) {
						if(arrayQuotePart.order === quotePart.order - 1) {
							previousQuotePart = arrayQuotePart;
							return;
						}
					});

					quotePart.order = previousQuotePart.order;
					previousQuotePart.order = currentPosition;
				}
			};

			$scope.downButton = function(quotePart) {
				
				// Not last?
				if(quotePart.order < $scope.dirtyQuote.quoteParts.length - 1) {
					var nextQuotePart;
					var currentPosition = quotePart.order;

					angular.forEach($scope.dirtyQuote.quoteParts, function(arrayQuotePart) {
						if(arrayQuotePart.order === quotePart.order + 1) {
							nextQuotePart = arrayQuotePart;
							return;
						}
					});

					quotePart.order = nextQuotePart.order;
					nextQuotePart.order = currentPosition;
				}
			};

			$scope.addButton = function() {

				// Init if needed.
				if(!$scope.dirtyQuote.quoteParts) {
					$scope.dirtyQuote.quoteParts = [];
				}

				$scope.dirtyQuote.quoteParts.push({ order: $scope.dirtyQuote.quoteParts.length });
			};

			$scope.quote = {};
			$scope.dirtyQuote = {};

			DataService.getUsers().then(
				function(response) {
					$scope.users = response.data;
				});

			// Trying to edit a quote?
			if($stateParams.quoteid) {
				$scope.formTitle = 'Edit Quote';
				DataService.getQuote($stateParams.quoteid).then(
					function(data) {
						$scope.quote = data;
						$scope.dirtyQuote = angular.copy($scope.quote);
					});
			} else {
				$scope.formTitle = 'New Quote';
				$scope.addButton();
			}
		}]);
})();