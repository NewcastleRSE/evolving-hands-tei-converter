export function formatPoints(coordinatesString){
    // receives a coordinate string and returns an array of point pairs
    let splitString = coordinatesString.split(' ');
    let points = []
    for (let coord of splitString) {
        points.push(coord.split(',').map((x) => parseInt(x)))
    }
    return points
}

export function formatPagePoints(element) {
    // takes an element that contains attributes ulx uly lrx lry and returns the points coordinates as a pair of ints
    const [ulx, uly, lrx, lry] = [element.getAttribute('ulx'), element.getAttribute('uly'), element.getAttribute('lrx'), element.getAttribute('lry')];
    return [[parseInt(ulx), parseInt(uly)], [parseInt(lrx), parseInt(lry)]]
}

export function getNamedEntitiesData(entityData, ref) {
    // Takes an element that contains a named entity type (persName, placeName, OrgName), extracts the information from it, and returns a dataObject
    let dataObject = {}
    // build object

    if (entityData === null) {
        throw new Error(`Could not find metadata for entity with reference ${ref}`)
    }

    for (const data of entityData.children) {
        if (data.getAttribute('data-origname') === 'ptr') {
            dataObject['authority'] = { 'provider': data.getAttribute('type'), 'url': data.getAttribute('target') }
        } else if (data.getAttribute('data-origname') === 'event') {
            // if it is a structured event
            
            // if event has a type, use that as the key name for the data object, if not use generic 'event'
            let keyName = 'event'
            if (data.getAttribute('type') != null) {
                keyName = data.getAttribute('type');
            }
            // if event has a date in the attribute use that as the data; if not, use whatever is inside the first child element (i.e., ab inside event);
            let keyData = data.children[0].innerHTML;
            if (data.getAttribute('when') != null) {
                keyData = data.getAttribute('when');
            }
            dataObject[keyName] = keyData;
        } else if (data.getAttribute('data-origname') === 'idno' && data.getAttribute('type') != null) {
            // if autority information is part of ID
            let authorityInfo = {}
            authorityInfo.provider = data.getAttribute('type');
            authorityInfo.id = data.innerHTML;
            if (data.getAttribute('target') != null) {
                // if idno contains an url as an attribute use that
                authorityInfo.url = data.getAttribute('target');
            } else if(entityData.getAttribute('corresp') != null) {
                // if idno does not contain an url, see if the parent org contains a corresp and use that as authority url
                authorityInfo.url = entityData.getAttribute('corresp');
            }
            dataObject['authority'] = authorityInfo;

        } else {
            dataObject[data.getAttribute('data-origname')] = data.innerHTML
        }
    }

    // if there is no declared authority, checks to see if the element includes any other available url;
    if (!Object.keys(dataObject).includes('authority')) {
        if (entityData.getAttribute('corresp') != null && entityData.getAttribute('corresp') != '') {
            dataObject['otherURL'] = entityData.getAttribute('corresp')
        } else {
            dataObject['noURL'] = true;
        }
    }

    return dataObject;
}

export function getNamedEntitiesDataFromExternal(entityData, ref) {
    // Takes an element that contains a named entity type (persName, placeName, OrgName), extracts the information from it, and returns a dataObject
    let dataObject = {}
    // build object

    if (entityData === null) {
        throw new Error(`Could not find metadata for entity with reference ${ref}`)
    }

    for (const data of entityData.children) {
        if (data.tagName === 'ptr') {
            dataObject['authority'] = { 'provider': data.getAttribute('type'), 'url': data.getAttribute('target') }
        } else if (data.getAttribute('data-origname') === 'event') {
            // if it is a structured event
            
            // if event has a type, use that as the key name for the data object, if not use generic 'event'
            let keyName = 'event'
            if (data.getAttribute('type') != null) {
                keyName = data.getAttribute('type');
            }
            // if event has a date in the attribute use that as the data; if not, use whatever is inside the first child element (i.e., ab inside event);
            let keyData = data.children[0].innerHTML;
            if (data.getAttribute('when') != null) {
                keyData = data.getAttribute('when');
            }
            dataObject[keyName] = keyData;
        } else if (data.tagName === 'idno' && data.getAttribute('type') != null) {
            // if autority information is part of ID
            let authorityInfo = {}
            authorityInfo.provider = data.getAttribute('type');
            authorityInfo.id = data.innerHTML;
            if (data.getAttribute('target') != null) {
                // if idno contains an url as an attribute use that
                authorityInfo.url = data.getAttribute('target');
            } else if(entityData.getAttribute('corresp') != null) {
                // if idno does not contain an url, see if the parent org contains a corresp and use that as authority url
                authorityInfo.url = entityData.getAttribute('corresp');
            }
            dataObject['authority'] = authorityInfo;

        } else {
            dataObject[data.tagName] = data.innerHTML
        }
    }

    // if there is no declared authority, checks to see if the element includes any other available url;
    if (!Object.keys(dataObject).includes('authority')) {
        if (entityData.getAttribute('corresp') != null && entityData.getAttribute('corresp') != '') {
            dataObject['otherURL'] = entityData.getAttribute('corresp')
        } else {
            dataObject['noURL'] = true;
        }
    }

    return dataObject;
}

export function transformNamedEntityLink(elt, dataObject, options) {
    // function takes in the source element, the dataObject, and any options to a named entity type and returns the same element with a link

    let linkedEntity = undefined;

    // check wether the addLink option in the config is not falsy and whether the data object contains an URL;
    if (options.addLink != '' && options.addLink != false && options.addLink != 'none') {
        linkedEntity = document.createElement('a');
        // if object contains an authority, use that, if not and it contains another URL, use that.
        if (options.addLink === 'authority') {
            if (dataObject.authority) {
                linkedEntity.setAttribute('href', dataObject.authority.url);
            } else if (dataObject.otherURL) {
                linkedEntity.setAttribute('href', dataObject.otherURL);
            } else {
                throw new Error(`${JSON.stringify(dataObject)} does not have any authority or authority-like URL`);
            }
        } else if (options.addLink === 'document') {
            linkedEntity.setAttribute('href', `/${elt.getAttribute('ref')}`);
        } else {
            throw new Error('Invalid option: addLink must be either "authority", "document", "none", or false (boolean)');
        }
        for (let chld of elt.childNodes) {
            linkedEntity.appendChild(chld.cloneNode());
        }
    }
    return linkedEntity;
}

export function extractNotes(elt) {
    // function should return content of the note and remove it from the element
    const targetNote = elt.getElementsByTagName('TEI-NOTE')[0];
    elt.getElementsByTagName('TEI-NOTE')[0].remove();
    return targetNote;
}

export function generateNoteLink(elt, noteIndex, targetId) {
    let link = document.createElement('a');
    link.setAttribute('id', `src-note-${noteIndex}`)
    link.setAttribute('href', `#${targetId}`);
    link.innerHTML = noteIndex;

    let bodyElement = document.createElement('span');
    bodyElement.innerHTML = elt.innerHTML;
    
    let supEl = document.createElement('sup');
    supEl.append(link);

    bodyElement.append(supEl)
    return bodyElement
}

export function addNoteToDiv(noteContent) {
    let teiContainer = document.getElementById('teiContainer');
    let notesList = teiContainer.querySelector('#document-notes');
    let noteIndex = 1
    if (!notesList) {
        notesList = document.createElement('ol')
        notesList.setAttribute('id', 'document-notes');
        teiContainer.append(notesList);
    } else {
        noteIndex = Array.from(notesList.children).length + 1
    }
    let note = document.createElement('li');
    const targetId = `target-note-${noteIndex}`
    note.setAttribute('id', targetId)
    note.append(noteContent);
    
    let backLink = document.createElement('a')
    backLink.setAttribute('href', `#src-note-${noteIndex}`)
    backLink.innerHTML = ' ^ '

    note.append(backLink);
    
    notesList.append(note);

    return {targetId, noteIndex}
}

export function noteToEvent(noteContent, structured = false) {
    let dataObject = {}
    let dataString = {}
    let returnObject = {}

    // gives the type of note (editorial or bibliographic)
    returnObject.type = noteContent.getAttribute('type')
    
    // if the metadata should be returned in a structured format
    if (structured) {
        const structuredInfo = noteContent.children
        // if there is a structure (i.e., a bibl inside note)
        if (structuredInfo.length > 0) {
            // for each new structure create an object
            for (const struct of structuredInfo) {
                const newStruct = {}
                for (const tag of struct.children) {
                    const keyName = tag.tagName.toLowerCase().split('-')[1]
                    newStruct[keyName] = tag.innerText
                }
                // add the structure to the return object
                const keyName = struct.tagName.toLowerCase().split('-')[1]
                dataObject[keyName] = newStruct
            }
        // if there is no structure, add the inner text of the note (i.e., == structured being false)
        } else {
            dataString = noteContent.innerText
        }
        // depending on whether there was structured info or not, add the correct data to the return object
        if (Object.keys(dataObject).length > 0) {
            returnObject.note = {...dataObject}
        } else {
            returnObject.note = dataString
        }
    // if no structured information is required, return the visible text of the note
    } else {
        returnObject.note = noteContent.innerText
    }
    return returnObject;
}

export function replaceChoiceEltWithMarker(elt, options) {
    if (options.render === 'inline' || !options.useOriginal) {
        if (options.marker.length === 2) {
            elt.before(options.marker[0]);
            elt.after(options.marker[1]);
            elt.classList.add('intervention');
        } else {
            throw new Error(`You must provide a starting and an ending marker. Provided: ${options.marker}`);
        }
    }
}

export function addMarkersToElement(elt, options) {
    if (options.marker.length === 2) {
        elt.insertAdjacentText('afterbegin', options.marker[0]);
        elt.insertAdjacentText('beforeend', options.marker[1]);
        
        // This has the same result as the solution above, but is a little less readable
        // elt.prepend(options.marker[0]);
        // elt.append(options.marker[1]);

        elt.classList.add('intervention');

    } else {
        throw new Error(`You must provide a starting and an ending marker. Provided: ${options.marker}`);
    }
}

export function replaceChoiceWithEvent(elt, options) {
    let contracted = undefined;
    let expanded = undefined;
    let toRemove = undefined;
    let interventionLabel = 'expanded'
    let interventionType = 'expansion'

    for (const child of elt.children) {
        // if it is an expansion or correction, save the result to variable
        if (child.tagName.toLowerCase() === 'tei-expan' || child.tagName.toLowerCase() === 'tei-corr') {
            expanded = child.innerText;
            // mark this to remove later if configured to show the original
            if (options.useOriginal){
                toRemove = child;
            }
            // if it is a correction, change the labels for the object
            if (child.tagName.toLowerCase() === 'tei-corr') {
                interventionType = 'correction'
                interventionLabel = 'corrected'
            }
        }
        // extract the corrected version from the body of the text
        if (child.tagName.toLowerCase() === 'tei-abbr' || child.tagName.toLowerCase() === 'tei-sic') {
            contracted = child.innerText;
            // mark this to remove later if configured to show the correction
            if (!options.useOriginal){
                toRemove = child;
            }
        }
    }

    // remove the element that is scheduled to be removed
    if (toRemove) {
        toRemove.remove();
    }

    // if it successfully found the intervention, create object
    if (expanded != undefined) {
        let eventObject = {bubbles: true, detail: {
            [interventionType]: {
                original: contracted,
                [interventionLabel]: expanded   
            }
        }};

        let event = new CustomEvent('choiceHover', eventObject);
        elt.onmouseenter = function () {
            dispatchEvent(event)
        }
        elt.onfocus = function () {
            dispatchEvent(event)
        }
        elt.tabIndex = 0
        elt.classList.add('event')
        
        // add a flag to avoid recursion in applying the behaviours
        elt.setAttribute('behaviour-processed', true);
    } else {
        throw new Error(`Could not find an editorial intervention for ${elt.innerText}`);
    }
}

export function removeDuplicateDatesWorkaround(div) {
    // Workaround function to remove duplicate dates from display. Necessary because of the encoding decisions taken. See https://github.com/evolvinghands/EvolvingHandsNcl/issues/7#issue-2325171769 for more details
    
    // Function is called at each div (corresponding to an ab) -> goes through each line of the div and counts number of dates displayed. If there is more than one, it figures out if the dates are duplicates of each other. If they are, it removes all display dates except the last one. Changes are made to the <div> element itself, nothing is returned.
    for (const line of div.children) {
        const dates = line.querySelectorAll('[class="iso-date"]');
        let repeatedDates = {}
        if (dates.length > 1) {
            for (const [index, date] of dates.entries()) {
                if (Object.keys(repeatedDates).includes(date.innerText)) {
                    repeatedDates[date.innerText] = [...repeatedDates[date.innerText], index]
                } else {
                    repeatedDates[date.innerText] = [index]
                }
            }
            for (const date of Object.keys(repeatedDates)) {
                let toBeRemoved = undefined
                const _toKeep = repeatedDates[date].pop();
                toBeRemoved = repeatedDates[date];
                if (toBeRemoved) {
                    for (const i of toBeRemoved) {
                        dates[i].remove();
                    }
                    console.warn(`Removing duplicate dates of${date}...`)
                }
            }
        }
    }
}

export function getFigDesc(elt) {
    // receives a figure element, returns what is inside its figDesc(s)
    // returns an array of string descriptions (on the off-chance there is more than one figDesc inside figure)
    const figDescCollection = elt.getElementsByTagName('tei-figDesc');
    let figDescText = [];
    for (const figD of figDescCollection) {
        figDescText.push(figD.innerText);
    }
    return figDescText
}

export function addFigAbs(elt, figDescriptions) {
    // used to collect any <ab> inside <figure> -- these seem to be annotations to the figure itself and will be treated as another figDesc
    const figAbCollection = elt.getElementsByTagName('tei-ab');
    for (const figAb of figAbCollection) {
        figDescriptions.push(figAb.children);
    }
    return figDescriptions;
}

export async function loadMetadataFile(projectRoot = undefined, filePath) {
    if (projectRoot === undefined) {
        // assumes file path is absolute
        projectRoot = '';
    }
    
    let xmlFile = await fetch(
        `${projectRoot}${filePath}`,
    );
    if (!xmlFile.ok) {
        throw new Error(
            `${projectRoot}${filePath} does not exist`,
        );
    } else {
        let metadataFile = await xmlFile.text();
        // parse the metadata file
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(
            metadataFile,
            "text/xml",
        );
        return xmlDoc;
    }
}

export async function checkForExternalMetadata(xmlString) {
    // checks to see if there is metadata in external files to be added
    let parser = new DOMParser();
    let xmlDoc = await parser.parseFromString(xmlString, "text/xml");
    // finds all different file names in persName, placeName, and orgName elements
    
    // find all persName, placeName, and orgName elements in xmlDoc
    let persNames = xmlDoc.getElementsByTagName('persName');
    let placeNames = xmlDoc.getElementsByTagName('placeName');
    let orgNames = xmlDoc.getElementsByTagName('orgName');

    // iterates trough all elements and looks for ref attributes that include a .xml file
    let externalMetadata = [];
    for (const name of [persNames, placeNames, orgNames]) {
        for (const element of name) {
            if (element.getAttribute('ref') && element.getAttribute('ref').includes('.xml')) {
                // separate file name from id
                if (element.getAttribute('ref').includes('#')) {
                    externalMetadata.push(element.getAttribute('ref').split('#')[0]);
                } 
            }
        }
    }

    // remove all duplicates from external metadata
    externalMetadata = [...new Set(externalMetadata)];
    return externalMetadata;
}