import {behaviours} from '../static/behavioursDictionary';

export let teiBehaviours = function (config) {
    // declare behaviours object
    let behavioursObject = {"tei": {}}

    // iterate through selected elements
    // choice contains the key (i.e., the name of the element selected)
    // details includes whether or not the object should be included, and any additional options
    for (const [choice, details] of Object.entries(config.elementsSelected)) {
        let options = {...details.options}
        if (details.include) {
            if (choice === 'ab') {
                if (config.teiFileStructure === 'EvolvingHands') {
                    options = {...options, ...config.facsimileCoordinates}
                } else {
                    options = {...options, customEvents: false, elementAttribute: false}
                }
            }
            behavioursObject['tei'][choice] = behaviours(options)[choice];
        }
    }

    // Global scope options will add certain behaviours even if they have not expressely been added before
    if (!config.displayInlineGraphics) {
        let options = {}
        // applies element specific options if they exist
        if (Object.keys(config.elementsSelected).includes('graphic')) {
            options = config.elementsSelected.graphic.options
        }
        behavioursObject['tei']['graphic'] = behaviours(options)['graphic'];
    }

    return behavioursObject
}