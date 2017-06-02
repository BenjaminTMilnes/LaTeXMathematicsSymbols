var application = angular.module("LaTeXMathematicsSymbols", []);

application.filter("symbolsNotNull", function () {
    return function (symbols) {
        var symbolsNotNull = [];

        for (var i = 0; i < symbols.length; i++) {
            if (symbols[i].LaTeXCommand != "") {
                symbolsNotNull.push(symbols[i]);
            }
        }

        return symbolsNotNull;
    };
});

application.filter("tagsNotNull", function () {
    return function (tags) {
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
        console.log("Search Terms: " + searchTerms);

        if (stringIsNullOrEmpty(searchTerms)) {
            return symbols;
        }
        else {
            var matchingSymbols = [];

            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                var titleContainsSearchTerms = stringContains(symbol.Title, searchTerms);
                var latexContainsSearchTerms = stringContains(symbol.LaTeXCommand, searchTerms);
                var unicodeContainsSearchTerms = stringContains(symbol.UnicodeCode, searchTerms);
                var htmlContainsSearchTerms = stringContains(symbol.HTMLEntity, searchTerms);
                var mathmlContainsSearchTerms = stringContains(symbol.MathMLEntity, searchTerms);
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
    $http.get("symbols.json").then(function (data) {
        $scope.symbols = data.data;
    });
}])