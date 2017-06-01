var application = angular.module("LaTeXMathematicsSymbols", []);

application.controller("SearchController", ["$scope", "$http", function SearchController($scope, $http) {
    $http.get("symbols.json").then(function (data) {
        $scope.symbols = data.data;
    });

}])