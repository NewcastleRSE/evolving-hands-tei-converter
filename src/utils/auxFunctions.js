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