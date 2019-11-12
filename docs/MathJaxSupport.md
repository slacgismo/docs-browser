# This is a page to test and document the MathJax API usage and markdown conversion

### This SHOULD NOT work because it's not properly escaped
When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]

```bash
# raw version of the above
When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
```

### This SHOULD work because we escape the beginning and ending backslashes
When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
\\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\\]

```bash
# raw version of the above
When \\(a \ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
\\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\\]
```

### This should also work
When $a \ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

### MathJax API gotchas
- The MathJax API is executed as soon as the script finishes loading. Any content on the page will be immediately processed
- Dynamic content is not handled immediately, therefore, when new pages are dynamically loaded into the DOM we need to tell MathJax to re-process the page i.e. typeset.

```javascript
// tell MathJax to re-typeset the page
MathJax.typeset();
```
