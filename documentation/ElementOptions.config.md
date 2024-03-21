# Element options
These are the options available for the elements included in `elementsSelected.*element*.options`

## `graphic`
### `graphic.options.showLogs`
#### type: `boolean`
By default, the `graphic` behaviour ignores any inline images; `showLogs` defines whether a log is printed to the console stating that the image has been ignored.

## `placeName`
### `placeName.options.addLink`
#### type: `boolean | string`
#### values: `false | 'none' | 'authority' | 'document'`
Defines whether to create a link when a place name is marked in the body of the text. `false` (boolean), `'none'` (string), or not including the option will *not* create the link; `'authority'` will link directly to any authority included in the `placeName` (or in the linked `placeName` stand-off element); `document` will link to the stand-off element elsewhere in the text ([`standOffMetada.showStandOffMetadata`](./TeiConverter.config.md#standoffmetadatashowstandoffmetadata) or [`standOffMetada.showPlaces`](./TeiConverter.config.md#standoffmetadatashowplaces) must be `true`)