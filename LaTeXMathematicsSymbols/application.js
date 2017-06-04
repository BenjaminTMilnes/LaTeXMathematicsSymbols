var application = angular.module("LaTeXMathematicsSymbols", []);

application.filter("symbolsNotNull", function () {
    return function (symbols) {
        if (!symbols) {
            return symbols;
        }

        var symbolsNotNull = [];

        for (var i = 0; i < symbols.length; i++) {
            if (symbols[i].LaTeX != "") {
                symbolsNotNull.push(symbols[i]);
            }
        }

        return symbolsNotNull;
    };
});

application.filter("tagsNotNull", function () {
    return function (tags) {
        if (!tags) {
            return tags;
        }

        var tagsNotNull = [];

        for (var i = 0; i < tags.length; i++) {
            if (tags[i] != "") {
                tagsNotNull.push(tags[i]);
            }
        }

        return tagsNotNull;
    };
});

function stringContains(string1, string2) {
    return (string1.indexOf(string2) >= 0);
}

function stringIsNullOrEmpty(string) {
    return (!string || /^\s*$/.test(string));
}

application.filter("searchSymbols", function () {
    return function (symbols, searchTerms) {
        if (stringIsNullOrEmpty(searchTerms)) {
            return symbols;
        }
        else {
            var matchingSymbols = [];

            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                var titleContainsSearchTerms = stringContains(symbol.Title, searchTerms);
                var latexContainsSearchTerms = stringContains(symbol.LaTeX, searchTerms);
                var unicodeContainsSearchTerms = stringContains(symbol.Unicode, searchTerms);
                var htmlContainsSearchTerms = stringContains(symbol.HTML, searchTerms);
                var mathmlContainsSearchTerms = stringContains(symbol.MathML, searchTerms);
                var tagsContainSearchTerms = false;

                for (var j = 0; j < symbol.Tags.length; j++) {
                    var tag = symbol.Tags[j];
                    if (stringContains(tag, searchTerms)) {
                        tagsContainSearchTerms = true;
                    }
                }

                if (titleContainsSearchTerms || latexContainsSearchTerms || unicodeContainsSearchTerms || htmlContainsSearchTerms || mathmlContainsSearchTerms || tagsContainSearchTerms) {
                    matchingSymbols.push(symbol);
                }
            }

            return matchingSymbols;
        }
    }
});

application.directive("katex", function () {
    return {
        restrict: "E",
        link: function (scope, element, attributes) {
            var latex = attributes.latex;
            if (typeof (katex) === "undefined") {
                require(["katex"], function (katex) {
                    katex.render(latex, element[0]);
                });
            }
            else {
                katex.render(latex, element[0]);
            }
        }
    }
});

application.controller("SearchController", ["$scope", "$http", function SearchController($scope, $http) {

    $scope.symbols = [];

    $http.get("symbols.json").then(function (response) {
        Array.prototype.push.apply($scope.symbols, response.data);
    });

    $http.get("greek.json").then(function (response) {
        Array.prototype.push.apply($scope.symbols, response.data);
    });

}])