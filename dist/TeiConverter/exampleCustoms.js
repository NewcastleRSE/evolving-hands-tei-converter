// Example of how to add custom behaviours

let customBehaviours = {
    // transform the entire element
    "persName": function(elt) {
        let newName = document.createElement('span');
        const text = document.createTextNode("HEY THERE");
        newName.appendChild(text)
        return newName
    },

    // wrap the element in another tag
    "placeName": ["<em>", "</em>"],

    // further specify element selector by css
    "seg": [
        ["[type=bibliographicNote-target-text]", function (el) {
            let newBibl = document.createElement('span');
            const text = document.createTextNode("THIS IS A NOTE");
            newBibl.appendChild(text)
            return newBibl
        }]
    ]
}