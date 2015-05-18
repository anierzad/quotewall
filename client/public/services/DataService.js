(function() {

	var module = angular.module('QuoteWall');
	var apiBaseUrl = 'http://localhost:8000/api/';

	module.factory('DataService', ['$http', '$q', function($http, $q) {

		// Users API.
		var getUsers = function() {
			return $http.get(apiBaseUrl + 'users/');
		};

		var getUser = function(userId) {
			return $http.get(apiBaseUrl + 'users/' + userId);
		};

		var createUser = function(user) {
			return $http.post(apiBaseUrl + 'users/', user);
		};

		var updateUser = function(user) {
			return $http.put(apiBaseUrl + 'users/', user);
		};

		// Quotes API.
		var getQuotes = function() {
			
			var quotes;

			var promises = [];

			return $http.get(apiBaseUrl + 'quotes').then(function(response) {

				quotes = response.data;

				angular.forEach(quotes, function(quote) {
					promises.push(
						$http.get(apiBaseUrl + 'quoteparts?quoteid=' + quote._id).then(function(response) {
							quote.quoteParts = response.data;

							angular.forEach(quote.quoteParts, function(quotePart) {
									promises.push(
										$http.get(apiBaseUrl + 'users/' + quotePart.author_id).then(function(response) {
											quotePart.author = response.data;
										}));
								});
						}));
				});
				return $q.all(promises).then(
					function() {
						return quotes;
					});
				});
		};

		var getQuote = function(quoteId) {

			var quote;

			var promises = [];

			return $http.get(apiBaseUrl + 'quotes/' + quoteId).then(
				function(response) {
					quote = response.data;
					promises.push(
						$http.get(apiBaseUrl + 'quoteparts?quoteid=' + quote._id).then(function(response) {
							quote.quoteParts = response.data;

							angular.forEach(quote.quoteParts, function(quotePart) {
									promises.push(
										$http.get(apiBaseUrl + 'users/' + quotePart.author_id).then(function(response) {
											quotePart.author = response.data;
										}));
								});
						}));

					return $q.all(promises).then(
						function() {
							return quote;
						});
				});
		};

		var createQuote = function(quote) {

			var quoteId;

			var promises = [];

			return $http.post(apiBaseUrl + 'quotes/').then(
				function(response) {
					quoteId = response.data;
					
					angular.forEach(quote.quoteParts, function(quotePart) {

						quotePart.quote_id = quoteId;

						promises.push($http.post(apiBaseUrl + 'quoteparts/', quotePart));
					});

					return $q.all(promises).then(
						function() {
							return quoteId;
						});
				});
		};

		return {
			getUsers: getUsers,
			getUser: getUser,
			createUser: createUser,
			updateUser: updateUser,

			getQuotes: getQuotes,
			getQuote: getQuote,
			createQuote: createQuote
		};
	}]);

})();
