# Math

You may include mathematical formulae and equations using Latex AMS math syntax. See https://mathjax.org/ for details.

## Inline math

To embed an inline mathematical expression, use the `$math $` or `\\( math \\)` expressions.  For example, `when $a \ne 0$` displays "when $a \ne 0$" and `for \\(ax^2 + bx + c = 0\\)` displays "\\(ax^2 + bx + c = 0\\)".

If you wish to present a dollar sign in your text, you must use `\$` to avoid embedding a math expression unintentionally.

## Equations

To embed an equation line, use the $$ equation $$ or `\\[ equation \\]` syntax.
For example, `when $$a \ne 0$$` displays "when $$a \ne 0$$" and `for \\[ax^2 + bx + c = 0\\]` displays "\\[ax^2 + bx + c = 0\\]".

## Equation numbers

You may use the standard Latex AMS math expressions for most Latex features. For example, the following creates a numbered equation, e.g.,
\\begin{equation}
    x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}
    \\label{eq:example}
\\end{equation}
which can then be referenced as Equation (\\ref{eq:example}).