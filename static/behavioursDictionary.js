import { addNoteToDiv, extractNotes, formatPagePoints, formatPoints, generateNoteLink, getNamedEntitiesData, noteToEvent, transformNamedEntityLink, replaceChoiceEltWithMarker, replaceChoiceWithEvent} from "../src/utils/auxFunctions";

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

                return content
            }]
        ],

        "choice": function (elt) {
            const legalRenders = ['inline', 'event'];

            if (legalRenders.includes(options.abbreviations.render)) {
                if (options.abbreviations.render === 'inline') {
                    // do nothing, the rest will be taken over by abbr expan
                } else if (options.abbreviations.render === 'event') {
                    replaceChoiceWithEvent(elt, options.abbreviations);
                }
            } else {
                throw new Error(`'${options.abbreviations.render}' is not a valid rendering option. Valid options are: '${legalRenders}'`)
            }
            if (legalRenders.includes(options.corrections.render)) {
                if (options.corrections.render === 'inline') {
                    // do nothing, the rest will be taken over by sic corr
                } else if (options.abbreviations.render === 'event') {
                    replaceChoiceWithEvent(elt, options.corrections);
                }
            } else {
                throw new Error(`'${options.corrections.render}' is not a valid rendering option. Valid options are: '${legalRenders}'`)
            }
        },

        "corr": function (elt) {
            replaceChoiceEltWithMarker(elt, options.corrections)
        },

        "expan": function (elt) {
            replaceChoiceEltWithMarker(elt, options.abbreviations);
        },

        "note": function (elt) {
            // empty function removes default behaviour for notes
        },

        "graphic": function (elt) {
            if (options.showLogs) {
                console.log("ignoring graphics");
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

        "placeName": [
            // this selects only placenames that reference another, ignoring the ones in the standOff metadata
            ["tei-placename[ref]", function (elt) {

                // get data and build object
                let ref = undefined;
                if (!elt.getAttribute('ref').includes('#')) {
                    console.warn(`Looks like ${elt.getAttribute('ref')} might be missing an initial '#'. Adding '#' and trying again...`);
                    ref = elt.getAttribute('ref');
                } else {
                    ref = elt.getAttribute('ref').substring(1);
                }

                const placeData = document.getElementById(ref);

                const dataObject = getNamedEntitiesData(placeData);

                // pass data as custom event
                if (options.customEvents) {
                    let event = new CustomEvent('placeHover', { detail: { ...dataObject } })
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
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
                if (!elt.getAttribute('ref').includes('#')) {
                    console.warn(`Looks like ${elt.getAttribute('ref')} might be missing an initial '#'. Adding '#' and trying again...`);
                    ref = elt.getAttribute('ref');
                } else {
                    ref = elt.getAttribute('ref').substring(1);
                }

                const persData = document.getElementById(ref);

                const dataObject = getNamedEntitiesData(persData);

                // pass data as custom event
                if (options.customEvents) {
                    let event = new CustomEvent('persHover', { detail: { ...dataObject } })
                    elt.onmouseenter = function () {
                        dispatchEvent(event)
                    }
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
                            let event = new CustomEvent('noteHover', { detail: { ...dataObject } })
                            elt.onmouseenter = function () {
                                dispatchEvent(event)
                            }
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
                            let event = new CustomEvent('noteHover', { detail: { ...dataObject } })
                            elt.onmouseenter = function () {
                                dispatchEvent(event)
                            }
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
            // else if top, nothing needs to be done
        }
    }
}