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

export function getNamedEntitiesData(entityData) {
    // Takes an element that contains a named entity type (persName, placeName, OrgName), extracts the information from it, and returns a dataObject
    let dataObject = {}
    // build object

    if (entityData === null) {
        throw new Error(`Could not find metadata for entity with reference ${ref}`)
    }

    for (const data of entityData.children) {
        if (data.getAttribute('data-origname') === 'ptr') {
            dataObject['authority'] = { 'provider': data.getAttribute('type'), 'url': data.getAttribute('target') }
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