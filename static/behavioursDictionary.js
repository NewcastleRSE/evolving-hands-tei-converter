import { addNoteToDiv, extractNotes, formatPagePoints, formatPoints, generateNoteLink, getNamedEntitiesData, noteToEvent, transformNamedEntityLink, replaceChoiceEltWithMarker, replaceChoiceWithEvent, removeDuplicateDatesWorkaround, addMarkersToElement, getFigDesc, addFigAbs } from "../src/utils/auxFunctions";

export let behaviours = function (options) {
    return {

        "ab": [
            ["tei-body tei-ab", function (elt) {
                // according to the structure of the GB files, physical lines are encased in an ab and preceded by a lb with line information in order to create an event that will give the coordinates, each of these lines will need to be encompassed by a new element that can then be used to trigger the custom event
                let children = elt.childNodes;
                let newAb = [];
                let newSpan = '';

                for (let child of children) {
                    if (child.tagName === 'TEI-LB') {
                        // If this is not the first lb
                        if (newSpan != '') {
                            // add the previously built span and reset the temp variable
                            newAb.push(newSpan);
                            newSpan = '';
                        }
                        // create a new span and append lb
                        newSpan = document.createElement('span');
                        newSpan.classList.add('line-span')
                        newSpan.appendChild(child.cloneNode(true));

                        // get points from zone id (i.e., line)
                        let lineObj = {}
                        let lineID = child.getAttribute('facs');
                        let zoneElement = document.getElementById(lineID.slice(1));
                        let coordinatesString = zoneElement.getAttribute('points');
                        let points = formatPoints(coordinatesString);
                        let elementRend = zoneElement.getAttribute('rendition');
                        lineObj[elementRend] = {
                            id: zoneElement.id,
                            points: points
                        }

                        // get parent element (i.e., page)
                        let parentObj = {}
                        const parentEl = zoneElement.parentElement;
                        let pPoints = formatPoints(parentEl.getAttribute('points'));
                        parentObj[parentEl.getAttribute('rendition')] = {
                            points: pPoints,
                            id: parentEl.id
                        };

                        // get grandParent element (i.e., imgfile) -- element should contain id, coordinate information and at least one tei-graphic child element
                        let grandParentObj = {}
                        const grandParentEl = parentEl.parentElement;
                        let imgFiles = [];
                        // get graphic information
                        for (child of grandParentEl.children) {
                            if (child.tagName === 'TEI-GRAPHIC') {
                                imgFiles.push({
                                    url: child.getAttribute('url'),
                                    width: child.getAttribute('width'),
                                    height: child.getAttribute('height')
                                })
                            }
                        }
                        grandParentObj['Facsimile'] = {
                            id: grandParentEl.id,
                            imgFiles: imgFiles,
                            points: formatPagePoints(grandParentEl)
                        }

                        if (options.customEvents) {
                            // create event object
                            let eventObject = {
                                bubbles: true,
                                detail: {
                                    ...lineObj,
                                    ...parentObj,
                                    ...grandParentObj
                                }
                            }

                            //  creates a custom event
                            let event = new CustomEvent('drawBox', eventObject)
                            newSpan.onmouseenter = function () {
                                dispatchEvent(event)
                            }
                            newSpan.onfocus = function () {
                                dispatchEvent(event)
                            }
                            newSpan.tabIndex = 0
                        }

                        if (options.elementAttribute) {
                            // newSpan.setAttribute('line-id', `#${lineObj.Line.id}`);
                            // newSpan.setAttribute('line-points', `${lineObj.Line.points}`);
                            newSpan.setAttribute('line-data', JSON.stringify({ ...lineObj, ...parentObj, ...grandParentObj }));
                        }

                    } else if (newSpan != '') {
                        // if the element is not an lb, add to the previous span if it exists
                        newSpan.appendChild(child.cloneNode(true));
                    }
                }
                // add the last span to the new ab
                newAb.push(newSpan);

                let content = document.createElement('div')
                for (let node of newAb) {
                    content.appendChild(node)
                }

                // Removes duplicate dates in display if option is true
                if (options.removeDuplicatesWorkaround) {
                    removeDuplicateDatesWorkaround(content);
                }

                return content
            }]
        ],

        "add": function (elt) {
            if (options.customEvents) {
                elt.classList.add('event');
                let placement = elt.getAttribute('place');
                if (!placement) {
                    placement = 'not recorded'
                }
                const dataObject = {
                    place: placement
                };
                let event = new CustomEvent('addHover', { bubbles: true, detail: { ...dataObject } })
                elt.onmouseenter = function () {
                    dispatchEvent(event)
                }
                elt.onfocus = function () {
                    dispatchEvent(event)
                }
                elt.tabIndex = 0
            }
        },

        "choice": function (elt) {
            const legalRenders = ['inline', 'event'];
            let expansion = undefined

            if (elt.children.length > 1) {
                if (elt.getElementsByTagName('tei-corr').length > 0) {
                    expansion = false
                } else {
                    expansion = true
                }

                if (expansion) {
                    if (legalRenders.includes(options.abbreviations.render)) {
                        if (options.abbreviations.render === 'inline') {
                            // do nothing, the rest will be taken over by abbr expan
                        } else if (options.abbreviations.render === 'event' && !elt.getAttribute('behaviour-processed')) {
                            replaceChoiceWithEvent(elt, options.abbreviations);
                        }
                    } else {
                        throw new Error(`'${options.abbreviations.render}' is not a valid rendering option. Valid options are: '${legalRenders}'`)
                    }
                } else if (!expansion) {
                    if (legalRenders.includes(options.corrections.render)) {
                        if (options.corrections.render === 'inline') {
                            // do nothing, the rest will be taken over by sic corr
                        } else if (options.corrections.render === 'event' && !elt.getAttribute('behaviour-processed')) {
                            replaceChoiceWithEvent(elt, options.corrections);
                        }
                    } else {
                        throw new Error(`'${options.corrections.render}' is not a valid rendering option. Valid options are: '${legalRenders}'`)
                    }
                }
            } else {
                console.warn(`The element ${elt.outerHTML} contains only one child -- a choice must contain at least two.`)
            }


        },

        "corr": function (elt) {
            replaceChoiceEltWithMarker(elt, options.corrections)
        },

        "damage": function (elt) {
            if (options.customEvents) {
                elt.classList.add('event');
                let agent = elt.getAttribute('type');
                if (!agent) {
                    agent = 'not recorded'
                }
                const dataObject = {
                    agent: agent
                };
                let event = new CustomEvent('damageHover', { bubbles: true, detail: { ...dataObject } })
                elt.onmouseenter = function () {
                    dispatchEvent(event)
                }
                elt.onfocus = function () {
                    dispatchEvent(event)
                }
                elt.tabIndex = 0
            }
        },

        "date": function (elt) {
            // This standard behaviour can cause duplicate dates to be shown on display given some of the encoding decisions taken (see https://github.com/evolvinghands/EvolvingHandsNcl/issues/7#issue-2325171769 for more details); there is a workaround in place that **should** correct that without creating any extra errors. The workaround is at an <ab> block level, and works by calling the removeDuplicateDatesWorkaround auxiliar function.

            // Checks to see if it should ignore dates in bibliographies. If so, sets the flag transform to false.
            let transform = true;
            if (elt.parentElement) {
                // Need to separate these two conditions otherwise we get errors accessing properties of null elements
                if (elt.parentElement.tagName.toLowerCase() === 'tei-bibl' && options.ignoreBibliography) {
                    // need to use a flag so that it doesn't ignore dates inside other elements that are not tei-bibl
                    transform = false;
                    console.warn('Ignoring date in bibliographic reference...')
                }
            }

            if (transform) {
                let markers = ['[', ']']
                if (options.showISODate) {
                    if (options.marker.length != 2) {
                        console.warn(`Markers for <date> are not correctly formatted, using default`);
                    } else {
                        markers = options.marker
                    }

                    if (!elt.getAttribute('when')) {
                        console.warn(`${elt.outerHTML} does not contain an ISO Date (@when) attribute`)
                    } else {
                        const isoDate = document.createElement('span');
                        isoDate.classList.add('iso-date');
                        isoDate.innerText = ` ${markers[0]}${elt.getAttribute('when')}${markers[1]}`

                        elt.appendChild(isoDate);
                    }
                }
            }
        },

        "del": function (elt) {
            const legalRenders = ['inline', 'event'];

            if (!legalRenders.includes(options.render)) {
                console.error(`${options.render} is not a valid rendering option for <del> elements, using defaults instead`)
            } else {
                if (options.render === 'inline') {
                    elt.style.textDecoration = 'line-through'
                } else if (options.render === 'event') {
                    // add markers
                    addMarkersToElement(elt, options);
                    // create custom event
                    let event = new CustomEvent('delHover', { bubbles: true, detail: { rendition: elt.getAttribute('rend') } })
                    elt.classList.add('event');
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
                    elt.onfocus = function () {
                        dispatchEvent(event)
                    }
                    elt.tabIndex = 0
                }
            }
        },

        "expan": function (elt) {
            replaceChoiceEltWithMarker(elt, options.abbreviations);
        },

        "figure": function (elt) {

            // get figDesc
            let figDescriptions = getFigDesc(elt);
            // get any abs if the option allows it
            if (options.showAb) {
                figDescriptions = addFigAbs(elt, figDescriptions);
            }
            // for each figDesc, creates a span, adds the description, and adds it to the figDesc span
            let descriptionSpan = document.createElement('span');
            descriptionSpan.classList.add('figure-description-group');
            for (const desc of figDescriptions) {
                const description = document.createElement('span');
                description.classList.add('figure-description');
                if (typeof (desc) === 'string') {
                    description.appendChild(document.createTextNode(desc))
                } else if (typeof (desc) === 'object') {
                    Array.from(desc).forEach((el) => description.appendChild(el));
                }
                descriptionSpan.appendChild(description);
            }

            // If it's using a placeholder
            if (options.placeholder) {
                let placeholderDiv = document.createElement('div');
                placeholderDiv.classList.add('figure-placeholder');
                let placeholder = undefined;

                // creates a textual placeholder (i.e. '[FIGURE]')
                if (options.placeholderType === 'text') {
                    placeholder = document.createElement('span');
                    placeholder.classList.add('text-placeholder');
                    placeholder.appendChild(document.createTextNode('[FIGURE]'));
                } else if (options.placeholderType === 'icon') {
                    placeholder = document.createElement('img');
                    placeholder.setAttribute('height', options.sizeIcon);
                    placeholder.setAttribute('width', options.sizeIcon);
                    placeholder.setAttribute('src', './dist/TeiConverter/imgPlaceholder.png')
                } else {
                    console.error(`${options.placeholderType} is not a valid option; valid options are 'text' or 'icon'`)
                }

                placeholderDiv.appendChild(placeholder);

                // depending on the position desired for the figdesc, either adds it to the placeholder div or to a notes list at the bottom of the document
                if (options.descPosition === 'inline') {
                    // replaces the span with a div so as to make it easier to style
                    const descDiv = document.createElement('div')
                    descDiv.append(...descriptionSpan.children)
                    descriptionSpan.remove();
                    descDiv.classList.add('figure-description-group');
                    placeholderDiv.appendChild(descDiv);
                } else if (options.descPosition === 'footnote') {
                    // Add footnote prefix
                    descriptionSpan.prepend(document.createTextNode('Description of figure: '))

                    const { targetId, noteIndex } = addNoteToDiv(descriptionSpan)
                    placeholderDiv = generateNoteLink(placeholderDiv, noteIndex, targetId)
                } else {
                    console.error(`${options.descPosition} is not a valid option; valid options are 'inline' or 'footnote'`)
                }
                return placeholderDiv

            } else if (!options.placeholder && options.image.loadIfAvailable) {
                // if the option to load the image is selected, creates a <figure> element with with <img> and <figcaption>
                const graphicElements = elt.getElementsByTagName('tei-graphic');
                if (graphicElements.length > 0) {
                    for (const img of graphicElements) {
                        const figEl = document.createElement('figure')
                        figEl.classList.add('inline-figure-container')
                        const caption = document.createElement('figcaption')
                        caption.append(descriptionSpan);
                        const imgUrl = img.getAttribute('url');
                        const imgElt = document.createElement('img');
                        imgElt.setAttribute('src', imgUrl);
                        if (options.image.fitToContainer) {
                            imgElt.setAttribute('style', 'width: 100%; height: 100%; object-fit: contain;')
                        }
                        figEl.appendChild(imgElt);
                        figEl.appendChild(caption);
                        return figEl;
                    }
                } else {
                    console.error('Could not find an element <graphic> inside <figure>')
                }
            }
        },

        "graphic": function (elt) {
            if (options.showLogs) {
                console.log("ignoring graphics");
            }
        },

        "gap": function (elt) {
            elt.append(document.createTextNode(options.marker));
            if (options.render === 'event') {
                // create custom event
                let event = new CustomEvent('gapHover', { bubbles: true, detail: { reason: elt.getAttribute('reason') } })
                elt.classList.add('event');
                elt.onmouseenter = function () {
                    dispatchEvent(event)
                }
                elt.onfocus = function () {
                    dispatchEvent(event)
                }
                elt.tabIndex = 0
            } else {
                console.error(`${options.render} is not a valid rendering option. Valid options are: 'event'.`)
            }
        },

        "note": function (elt) {
            // empty function removes default behaviour for notes
        },

        "listOrg": function (elt) {
            if (!options.showOrgs) {
                elt.hidden = true;
            }
        },

        "listPerson": function (elt) {
            // hide or show the listPerson element
            if (!options.showPeople) {
                elt.hidden = true;
            }
        },

        "listPlace": function (elt) {
            // hide or show the listPlaces element
            if (!options.showPlaces) {
                elt.hidden = true;
            }
        },

        "orgName": [
            // this selects only organisation names that reference another, ignoring the ones in the standOff metadata
            ["tei-orgname[ref]", function (elt) {

                // get data and build object
                let ref = undefined;
                let dataObject = undefined;
                if (!elt.getAttribute('ref').includes('#')) {
                    console.warn(`Looks like ${elt.getAttribute('ref')} might be missing an initial '#'. Adding '#' and trying again...`);
                    ref = elt.getAttribute('ref');
                } else {
                    ref = elt.getAttribute('ref').substring(1);
                }

                const orgData = document.getElementById(ref);

                try {
                    dataObject = getNamedEntitiesData(orgData, ref);
                } catch (e) {
                    console.warn(e)
                }

                // pass data as custom event
                if (options.customEvents) {
                    let event = new CustomEvent('orgHover', { detail: { ...dataObject } })
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
                    elt.onfocus = function () {
                        dispatchEvent(event)
                    }
                    elt.tabIndex = 0
                }

                // pass data as element attribute
                if (options.elementAttribute) {
                    elt.setAttribute('org-data', JSON.stringify(dataObject))
                }

                let orgPlace = undefined;
                try {
                    orgPlace = transformNamedEntityLink(elt, dataObject, options)
                } catch (e) {
                    console.warn(`Could not turn element with ref ${ref} into a link; dataObject has no valid URL`);
                }

                if (orgPlace != undefined) {
                    return orgPlace
                }
            }]
        ],

        "placeName": [
            // this selects only placenames that reference another, ignoring the ones in the standOff metadata
            ["tei-placename[ref]", function (elt) {

                // get data and build object
                let ref = undefined;
                let dataObject = undefined;
                if (!elt.getAttribute('ref').includes('#')) {
                    console.warn(`Looks like ${elt.getAttribute('ref')} might be missing an initial '#'. Adding '#' and trying again...`);
                    ref = elt.getAttribute('ref');
                } else {
                    ref = elt.getAttribute('ref').substring(1);
                }

                const placeData = document.getElementById(ref);

                try {
                    dataObject = getNamedEntitiesData(placeData, ref);
                } catch(e) {
                    console.warn(e)
                }

                // pass data as custom event
                if (options.customEvents) {
                    let event = new CustomEvent('placeHover', { bubbles: true, detail: { ...dataObject } })
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
                    elt.onfocus = function () {
                        dispatchEvent(event)
                    }
                    elt.tabIndex = 0
                    elt.classList.add('event');
                }

                // pass data as element attribute
                if (options.elementAttribute) {
                    elt.setAttribute('place-data', JSON.stringify(dataObject))
                }

                let linkedPlace = undefined;
                try {
                    linkedPlace = transformNamedEntityLink(elt, dataObject, options)
                } catch (e) {
                    console.warn(`Could not turn element with ref ${ref} into a link; dataObject has no valid URL`);
                }

                if (linkedPlace != undefined) {
                    return linkedPlace
                }
            }]
        ],

        "persName": [
            // this selects only personal names that reference another, ignoring the ones in the standOff metadata
            ["tei-persName[ref]", function (elt) {

                // get data and build object
                let ref = undefined;
                let dataObject = undefined;
                if (!elt.getAttribute('ref').includes('#')) {
                    console.warn(`Looks like ${elt.getAttribute('ref')} might be missing an initial '#'. Adding '#' and trying again...`);
                    ref = elt.getAttribute('ref');
                } else {
                    ref = elt.getAttribute('ref').substring(1);
                }

                const persData = document.getElementById(ref);

                try {
                    dataObject = getNamedEntitiesData(persData, ref);
                } catch (e) {
                    console.warn(e);
                }

                // pass data as custom event
                if (options.customEvents) {
                    let event = new CustomEvent('persHover', { bubbles: true, detail: { ...dataObject } })
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
                    elt.onfocus = function () {
                        dispatchEvent(event)
                    }
                    elt.tabIndex = 0
                    elt.classList.add('event');
                }

                // pass data as element attribute
                if (options.elementAttribute) {
                    elt.setAttribute('pers-data', JSON.stringify(dataObject))
                }

                let linkedPers = undefined;
                try {
                    linkedPers = transformNamedEntityLink(elt, dataObject, options)
                } catch (e) {
                    console.warn(`Could not turn element with ref ${ref} into a link; dataObject has no valid URL`);
                }

                if (linkedPers != undefined) {
                    return linkedPers
                }

            }]
        ],

        "seg": [
            ["[type=bibliographicNote-target-text]", function (elt) {
                // extract and separate the content of the note from the linking text in the body of the document
                const targetNote = extractNotes(elt);

                const legalRender = ['endnote', 'inline', 'event']

                if (options.bibliographicNotes.include) {
                    if (legalRender.includes(options.bibliographicNotes.render)) {
                        if (options.bibliographicNotes.render === 'endnote') {
                            // move the content of the note to a separate div at the end of the document and count existing notes to define note index
                            const { targetId, noteIndex } = addNoteToDiv(targetNote);

                            // add a note index to the body of the text, attached to the written text
                            const bodyElement = generateNoteLink(elt, noteIndex, targetId);

                            return bodyElement;
                        } else if (options.bibliographicNotes.render === 'inline') {
                            targetNote.setAttribute('class', 'note-text');
                            elt.appendChild(targetNote);
                        } else if (options.bibliographicNotes.render === 'event') {
                            const dataObject = noteToEvent(targetNote, options.bibliographicNotes.structured);
                            let event = new CustomEvent('noteHover', { bubbles: true, detail: { ...dataObject } })
                            elt.onmouseenter = function () {
                                dispatchEvent(event)
                            }
                            elt.onfocus = function () {
                                dispatchEvent(event)
                            }
                            elt.tabIndex = 0
                            elt.classList.add('event');
                        }
                    } else {
                        throw new Error(`'${options.bibliographicNotes.render}' is not a valid rendering option. Valid options are: '${legalRender}'`)
                    }
                }
            }],
            ["[type=editorialNote-target-text]", function (elt) {
                // extract and separate the content of the note from the linking text in the body of the document
                const targetNote = extractNotes(elt);
                const legalRender = ['endnote', 'inline', 'event']

                if (options.editorialNotes.include) {
                    if (legalRender.includes(options.editorialNotes.render)) {
                        if (options.editorialNotes.render === 'endnote') {
                            // move the content of the note to a separate div at the end of the document and count existing notes to define note index
                            const { targetId, noteIndex } = addNoteToDiv(targetNote);

                            // add a note index to the body of the text, attached to the written text
                            const bodyElement = generateNoteLink(elt, noteIndex, targetId);

                            return bodyElement;
                        } else if (options.editorialNotes.render === 'inline') {
                            targetNote.setAttribute('class', 'note-text');
                            elt.appendChild(targetNote);
                        } else if (options.editorialNotes.render === 'event') {
                            const dataObject = noteToEvent(targetNote, options.editorialNotes.structured);
                            let event = new CustomEvent('noteHover', { bubbles: true, detail: { ...dataObject } })
                            elt.onmouseenter = function () {
                                dispatchEvent(event)
                            }
                            elt.onfocus = function () {
                                dispatchEvent(event)
                            }
                            elt.tabIndex = 0
                            elt.classList.add('event');
                        }
                    } else {
                        throw new Error(`'${options.editorialNotes.render}' is not a valid rendering option. Valid options are: '${legalRender}'`)
                    }
                }
            }],
            ["tei-seg", function (elt) {
                // this should log segs with types that have not been catered for
                console.warn(`No custom behaviour for <seg> with type "${elt.getAttribute('type')}" has been defined`);
            }]
        ],

        "standOff": function (elt) {
            const legalPositions = ['top', 'bottom']

            // hide or show the standOff element
            if (!options.showStandOffMetadata) {
                elt.hidden = true;
            }

            // check whether the selected position is valid
            if (!legalPositions.includes(options.standOffPosition)) {
                // if the position is not valid, hides the elements
                elt.hidden = true
                throw new Error(`${options.standOffPosition} is not a valid position for the standOff element. Valid positions are 'top' and 'bottom'.`);
            } else if (options.standOffPosition === 'bottom') {
                elt.parentNode.appendChild(elt);
            }

        },

        "unclear": function (elt) {
            const legalRenders = ['event'];

            if (!legalRenders.includes(options.render)) {
                console.error(`${options.render} is not a valid rendering option for <unclear> elements, using defaults instead`)
            } else if (options.render === 'event') {
                // add markers
                addMarkersToElement(elt, options);
                // create custom event
                let event = new CustomEvent('unclearHover', { bubbles: true, detail: { message: options.message } })
                elt.classList.add('event');
                elt.onmouseenter = function () {
                    dispatchEvent(event)
                }
                elt.onfocus = function () {
                    dispatchEvent(event)
                }
                elt.tabIndex = 0
            }
        }
    }
}