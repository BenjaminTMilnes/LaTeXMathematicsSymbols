# LaTeXMathematicsSymbols

This project is a simple tool for looking up the LaTeX commands for mathematical symbols, because sometimes
it isn't obvious what they are. This is the source code for the project - you can view and use the tool itself
here:

http://www.latexmathematicssymbols.com/

It's a simple project - there are only four files in it that really matter. The data about the LaTeX commands
is stored in a JSON file - symbols.json. There is only one page to the website - index.html - from which
you can browse through and search through all of the symbols in the data file. The page is run using an
AngularJS app - the code for which is in application.js. And there's also a stylesheet - style.css.

For each mathematical symbol the LaTeX command is given, as well as the Unicode code for it in MathML,
the HTML and MathML entities, and tags that are used for searching.
