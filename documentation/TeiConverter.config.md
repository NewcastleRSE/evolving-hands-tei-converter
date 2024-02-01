# useCustomBehaviours
## type: `boolean`
## scope: `global`
Defines whether *any* custom behaviour is applied to the transformation of the TEI file. If `false`, all other options will be ignored and the TEI file will be transformed using the `CETEIcean` defaults

# displayInlineGraphics
## type: `boolean`
## scope: `global`
Defines whether the transformation will attempt to render any inline graphics (i.e., `<graphic>` TEI elements). Can be used for simple page previews and displays. If `true`, uses the default behaviour in `CETEIcean`.

# teiFileStructure
## type: `string`
## values: `EvolvingHands | other`
## scope: `global`
Defines the expected structure of the TEI file being transformed. Used if the file has a particular structure that demands behaviours applied in a certain manner. For example, the `EvolvingHands` file structure encodes lines simply as an `<lb/>` element inside an `<ab>` -- in order for facsimile information to be recorded in the transformed file, these lines need to be encapsulated in a `<span>` before any information can be attached to the element. Other file structures might encode physical lines using the `<line>` element, for example, which will change the locus of the transformation (in a `line` behaviour rather than `ab`), and the need for an extra `<span>`