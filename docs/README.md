# Docs-Browser

The Docs-Browser is used to view project documentation across multiple branches. This document is made available to test that the Docs-Browser works on itself.

# Creating Documents

The Docs-Browser searches the `docs` folder in project branches for markdown documents (i.e., with an `.md` extension).  The naming conventions for documents is as follows:

1. Only alphanumeric and underscore characters are allowed in document names.
2. Document names must begin with an uppercase letter.  
3. Spaces must be replaced by hyphens.


# Markdown Extensions

The following markdown extensions are supported.

## MathJax

You may embed math inline using the `\(equation\)` syntax, and on a separate line using the `\[equation\]` syntax.  For example, when \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
  \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
