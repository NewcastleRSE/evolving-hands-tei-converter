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
Defines whether the facsimile coordinate information is passed to the client as a custom event. The client must subscribe to an event called `drawBox` -- full instructions on how to do this [here](./customEvents/drawBox.md).

## facsimileCoordinates.elementAttribute
### type: `boolean`
### scope: `global`
Defines whether the facsimile coordinate information is passed to the client as an attribute of the element that it refers to. Useful if the client prefers to control the firing of the event or needs to add additional information. The information is a JSON string included in the `line-data` attribute.

## choice
### type: `object`
### scope: `global`
An object containing two objects (`abbreviations` and `corrections`) that define a set of options for how to render and transform `<choice>` elements, used when two possible readings are available.

## choice.abbreviations
### type: `object`
### scope: `global`
An object containing options on how to render `<choice>` elements containing abbreviations.

## choice.abbreviations.render
### type: `string`
### values: `event | inline`
### scope: `global`
Defines whether abbreviations should be shown inline with the body of the document, or given as an object in custom event ([`choiceHover`](/documentation/customEvents/choiceHover.md)).

## choice.abbreviations.marker
### type: `array | string`
### scope: `global`
If [`choice.abbreviations.render`](#choiceabbreviationsrender) is `inline`, defines what typographical elements should mark it. The first element will appear before the expanded abbreviation, the second element will appear after it.

## choice.abbreviations.useOriginal
### type: `boolean`
### scope: `global`
If [`choice.abbreviations.render`](#choiceabbreviationsrender) is `event` defines which version to use in the body of the text (i.e., abbreviated or expanded version).

## choice.corrections
### type: `object`
### scope: `global`
An object containing options on how to render `<choice>` elements containing corrections.

## choice.corrections.render
### type: `string`
### values: `event | inline`
### scope: `global`
Defines whether corrections should be shown inline with the body of the document, or given as an object in custom event ([`choiceHover`](/documentation/customEvents/choiceHover.md)).

## choice.corrections.marker
### type: `array | string`
### scope: `global`
If [`choice.corrections.render`](#choicecorrectionsrender) is `inline`, defines what typographical elements should mark it. The first element will appear before the expanded abbreviation, the second element will appear after it.

## choice.corrections.useOriginal
### type: `boolean`
### scope: `global`
If [`choice.corrections.render`](#choicecorrectionsrender) is `event` defines which version to use in the body of the text (i.e., abbreviated or expanded version).

## notes
### type: `object`
### scope: `global`
An object containing a set of options for the various types of existing notes (editorial and bibliographic). The options are identical but can be applied independently to each type of note.

## notes.bibliographicNotes
### type: `object`
### scope: `global`
Options about the behaviours associated with bibliographic notes (`<seg type="bibliographicNote-target-text">`)

## notes.bibligraphicNotes.include
### type: `boolean`
### scope: `global`
Whether or not to include notes in rendering. Default is `true`. If `false`, all other options are ignored.

## notes.bibligraphicNotes.render
### type: `string`
### values: `event | inline | endnote`
### scope: `global`
Defines how to render the notes. `event` creates a new custom event `noteHover` which can be subscribed by the client and adds a class `.event` to the anchor in the body of the text -- full instructions on how to do this [here](./customEvents/noteHover.md); `inline` adds the content of the note immediately after the anchor in the body of the text, with a class `.note-event` for styling; `endnote` creates a `div` at the end of the text with a list of all notes and adds cross-referencing links to the body of the text.

## notes.bibliographicNotes.structured
### type: `boolean`
### scope: `global`
If `true` and the content of the note is structured (for example, as in a `<bibl>`) it attempts to return the data in a structure format. If `false`, it returns only the text contents of the note. Only relevant if [`notes.bibligraphicNotes.render`](#notesbibligraphicnotesrenders) is `event`

## notes.editorialNotes
### type: `object`
### scope: `global`
Options about the behaviours associated with editorial notes (`<seg type="editorialNote-target-text">`)

## notes.editorialNotes.include
### type: `boolean`
### scope: `global`
The same as [`notes.bibliographicNotes.include`](#notesbibligraphicnotesinclude) but for editorial notes.

## notes.editorialNotes.render
### type: `string`
### values: `event | inline | endnote`
### scope: `global`
The same as [`notes.bibliographicNotes.render`](#notesbibligraphicnotesrender) but for editorial notes.

## notes.editorialNotes.structured
### type: `boolean`
### scope: `global`
The same as [`notes.bibliographicNotes.structured`](#notesbibligraphicnotesstructured) but for editorial notes.

## orgData
## type: `object`
## scope: `global`
An object containing two options about how to pass organisation data. These options are independent of each other, meaning that the client can receive the information in both ways simultaneously (or neither way).

## orgData.customEvents
### type: `boolean`
### scope: `global`
Defines whether the organisation data is passed to the client as a custom event. The client must subscribe to an event called `orgHover` -- full instructions on how to do this [here](./customEvents/orgHover.md).

## orgData.elementAttribute
### type: `boolean`
### scope: `global`
Defines whether the organisation data is passed to the client as an attribute of the element that it refers to. Useful if the client prefers to control the firing of the event or needs to add additional information. The information is a JSON string included in the `org-data` attribute.

## placeData
## type: `object`
## scope: `global`
An object containing two options about how to pass place data. These options are independent of each other, meaning that the client can receive the information in both ways simultaneously (or neither way).

## placeData.customEvents
### type: `boolean`
### scope: `global`
Defines whether the place data is passed to the client as a custom event. The client must subscribe to an event called `placeHover` -- full instructions on how to do this [here](./customEvents/placeHover.md).

## placeData.elementAttribute
### type: `boolean`
### scope: `global`
Defines whether the place data is passed to the client as an attribute of the element that it refers to. Useful if the client prefers to control the firing of the event or needs to add additional information. The information is a JSON string included in the `place-data` attribute.

## persData
## type: `object`
## scope: `global`
An object containing two options about how to pass names data. These options are independent of each other, meaning that the client can receive the information in both ways simultaneously (or neither way).

## persData.customEvents
### type: `boolean`
### scope: `global`
Defines whether the names data is passed to the client as a custom event. The client must subscribe to an event called `persHover` -- full instructions on how to do this [here](./customEvents/persHover.md).

## persData.elementAttribute
### type: `boolean`
### scope: `global`
Defines whether the names data is passed to the client as an attribute of the element that it refers to. Useful if the client prefers to control the firing of the event or needs to add additional information. The information is a JSON string included in the `pers-data` attribute.

## standOffMetadata
### type: `boolean`
### scope: `global`
Gives a set of options for the display of the metadata included in the `<standOff>` element, such as a list of peoples or places mentioned in the document.

## standOffMetadata.showStandOffMetadata
### type: `boolean`
### scope: `global`
Defines whether to display *any* of the data stored in the `<standOff>` element; specific metadata to display needs to be active in the options below;

## standOffMetadata.showOrgs
### type: `boolean`
### scope: `global`
Defines whether to display any list of organisation information included in the metadata. [`standOffMetadata.showStandOffMetadata`](#standoffmetadatashowstandoffmetadata) must be true for the information to be displayed.

## standOffMetadata.showPeople
### type: `boolean`
### scope: `global`
Defines whether to display any list of people information included in the metadata. [`standOffMetadata.showStandOffMetadata`](#standoffmetadatashowstandoffmetadata) must be true for the information to be displayed.

## standOffMetadata.showPlaces
### type: `boolean`
### scope: `global`
Defines whether to display any list of place information included in the metadata. [`standOffMetadata.showStandOffMetadata`](#standoffmetadatashowstandoffmetadata) must be true for the information to be displayed.

## standOffMetadata.standOffPosition
### type: `string`
### values: `'top' | 'bottom'`
### scope: `global`
Defines whether to append the metadata in the `<standOff>` element to the top or the bottom of the TEI container. If any other value is set for this option, the `<standOff>` element will not be rendered and an error will be thrown in the console.

# Element options

## elementsSelected
### type: `object`
### scope: `global`
An object containing a list of the default `TEIConverter` behaviours to be applied to the document. *Excluding* an element applies the default `CETEIcean` behaviour -- to avoid this you need to overwrite the default behaviour for this element in [`addCustomBehaviours`](#addcustombehaviours). Each key is the name of the *TEI* element (i.e., without the `tei-` prefix that appears in the HTML) that it refers to. Each element object contains options for fine-tuning of its behaviour, including whether or not to include the default behaviour and additional options of its implementation. These element level options *will* be overwritten if they conflict with global level options (for example if the element `graphic` has been excluded but `displayInlineGraphics` is true, the default `graphic` behaviour will still be applied).

## elementsSelected.*element*.include
### type: `boolean`
### scope: `element`
Defines whether or not to include the default `TEIConverter` behaviour for *element*. If false, the element will be rendered with the `CETEIcean` defaults.

## elementsSelected.*element*.options
### type: `object`
### scope: `element`
An object with additional options for the *element* behaviour implementation. All options available for each element exist in the default `config` and [are listed here](./ElementOptions.config.md).

## addCustomBehaviours
### type: `object`
### scope: `global`
An object containing options relating to additional custom behaviours. Custom behaviours must be loaded by the client independently an be an object named `customBehaviours`

## addCustomBehaviours.applyCustomBehaviours
### type: `boolean`
### scope: `global`
Defines whether or not to apply any loaded custom behaviours

## addCustomBehaviours.applyAll
### type: `boolean`
### scope: `global`
Defines whether or not to apply *all* custom behaviours defined in the loaded script

## addCustomBehaviours.applyElements
### type: `array[string]`
### scope: `global`
If `addCustomBehaviours.applyAll` is `false`, only elements included here will be applied. It should be an array of strings in which each string is the name of the *TEI* element that will have a custom behaviour applied. If `addCustomBehavious.applyAll` is `true`, all custom behaviours in the script will be applied regardless of what is included in the list.

## addCustomBehaviours.showLogs
### type: `boolean`
### scope: `customBehaviours`
Defines wheter or not a log message is shown in the console when custom behaviours were added successfully. Errors and warnings will always show in the console regardless of this option.