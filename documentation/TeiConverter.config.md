# Global options

## useCustomBehaviours
### type: `boolean`
### scope: `global`
Defines whether *any* custom behaviour is applied to the transformation of the TEI file. If `false`, all other options will be ignored and the TEI file will be transformed using the `CETEIcean` defaults

## displayInlineGraphics
### type: `boolean`
### scope: `global`
Defines whether the transformation will attempt to render any inline graphics (i.e., `<graphic>` TEI elements). Can be used for simple page previews and displays. If `true`, uses the default behaviour in `CETEIcean`.

## teiFileStructure
### type: `string`
### values: `EvolvingHands | other`
### scope: `global`
Defines the expected structure of the TEI file being transformed. Used if the file has a particular structure that demands behaviours applied in a certain manner. For example, the `EvolvingHands` file structure encodes lines simply as an `<lb/>` element inside an `<ab>` -- in order for facsimile information to be recorded in the transformed file, these lines need to be encapsulated in a `<span>` before any information can be attached to the element. Other file structures might encode physical lines using the `<line>` element, for example, which will change the locus of the transformation (in a `line` behaviour rather than `ab`), and the need for an extra `<span>`.

## facsimileCoordinates
## type: `object`
## scope: `global`
An object containing two options about facsimile coordinates. These options are independent of each other, meaning that the client can receive the information in both ways simultaneously (or neither way).

## facsimileCoordinates.customEvents
### type: `boolean`
### scope: `global`
Defines whether the facsimile coordinate information is passed to the client as a custom event. The client must subscribe to an event called `drawBox` -- full instructions on how to do this [here](./drawBox.md).

## facsimileCoordinates.elementAttribute
### type: `boolean`
### scope: `global`
Defines whether the facsimile coordinate information is passed to the client as an attribute of the element that it refers to. Useful if the client prefers to control the firing of the event or needs to add additional information. The information is a JSON string included in the `line-data` attribute.

# Element options

## elementsSelected
### type: `object`
### scope: `global`
An object containing a list of the default `TEIConverter` behaviours to be applied to the document. *Excluding* an element applies the default `CETEIcean` behaviour -- to avoid this you need to overwrite the default behaviour for this element in `addCustomBehaviours`. Each key is the name of the *TEI* element (i.e., without the `tei-` prefix that appears in the HTML) that it refers to. Each element object contains options for fine-tuning of its behaviour, including whether or not to include the default behaviour and additional options of its implementation. These element leve options *will* be overwritten if they conflict with global level options (for example if the element `graphic` has been excluded but `displayInlineGraphics` is true, the default `graphic` behaviour will still be applied).

## elementsSelected.*element*.include
### type: `boolean`
### scope: `element`
Defines whether or not to include the default `TEIConverter` behaviour for *element*. If false, the element will be rendered with the `CETEIcean` defaults.

## elementsSelected.*element*.options
### type: `object`
### scope: `element`
An object with additional options for the *element* behaviour implementation. All options available for each element exist in the default `config`.