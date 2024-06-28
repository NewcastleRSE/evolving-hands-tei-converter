# Styling the transcription for display

Styling the TEI elements works in exactly the same way as styling any other HTML element. Simply target the element name (or any of its attributes or classes) and add them to your CSS stylesheet. The TEI elements usually mantain their name, prefixed by `tei-`. So, for example, if you want to style the TEI element `<title>`, your CSS selector would simply be `tei-title: { }`.

## Default styling
This repository includes a sample stylesheet for the most common styling of TEI elements. It is available [here](/static/style.css) -- feel free to use it as a base, or take the selectors that you need. This stylesheet is a slightly modified version of the one offered by [CETEIcean](https://github.com/TEIC/CETEIcean).

## Styling required in the standards document
Please note that a few behaviours defined by the standards document are exclusively style related and are, therefore, not covered by the TEI converter. They have been, however, covered by the sample stylesheet available in the repository. If you do not use the sample stylesheet, remember to add the required styling to your stylesheet. Elements currently affected by this are:
- `<foreign>`
- `<hi>`
