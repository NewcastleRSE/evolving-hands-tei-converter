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