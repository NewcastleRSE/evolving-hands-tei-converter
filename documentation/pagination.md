# Pagination

The TEI Converter is capable of subdividing and selecting specific pages or page ranges for display from a larger TEI document. That division is based on the `<pb>` element that marks the start of a new page (*not* the start of a new image).

Pagination applies only to the display of pages, the entirety of the TEI document is still processed, which means that all metadata, custom events, internal references, should still be available, even if a single page is being shown. Conversely, it means that paginating has no positive impact on performance for larger documents and, on the contrary, is likely to add a some time to the page load. For smaller documents, this should be negligeable.

To use pagination, simply add a new attribute to the `<tei-converter>` element called `pageRange` like so:
```html
<tei-converter path="PATH/TO/TEI/FILE.xml" configPath="TeiConverter/TeiConverter.config.json" pageRange = ""/>
```
The value of `@pageRange` should be the the number of the first page to be shown and the last page to be shown, separated by a hyphen. So, if only the first two pages are to be shown, the value of `@pageRange` should be `1-2`. If only one page is to be shown, simply use the relevant page number rather than a range. If there are any errors with the page range, no pagination will take place and the entire document will be displayed. An error should appear in the log explaining the nature of the problem.
