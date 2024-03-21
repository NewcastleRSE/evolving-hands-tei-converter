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