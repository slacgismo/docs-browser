# Math

You may include mathematical formulae and equations using Latex AMS math syntax. See https://mathjax.org/ for details.

## Inline math

To embed an inline mathematical expression, use the `$math $` or `\\( math \\)` expressions.  For example, "when $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$" and "when \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\)" are both valid.

If you wish to present a dollar sign in your text, you must use `\$` to avoid embedding a math expression unintentionally.

## Equations

To embed an equation line, use the $$ equation $$ or `\\[ equation \\]` syntax.
"the solutions to a quadratic equation are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$"
and
"the solutions to a quadratic equation are \\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\\]"
are both valid.

## Equation numbers

You may use the standard Latex AMS math expressions to use other Latex features. For example, the following creates a numbered equation:
\\begin{equation}
    x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}
\\end{equation}