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
            if (choice === 'standOff' || choice == 'listPerson' || choice == 'listPlace') {
                options = {...options, ...config.standOffMetadata}
            }
            if (choice === 'placeName') {
                options = {...options, ...config.placeData}
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

    // Add custom behaviours
    // Custom behaviours must be imported by the client app as text/javascript before loading the converter code
    // Custom behaviours must be an object named `customBehaviours`
    if (config.addCustomBehaviours.applyCustomBehaviours) {
        try {
            for (const [element, code] of Object.entries(customBehaviours)) {
                try {
                    // or element is part of the list
                    if (config.addCustomBehaviours.applyAll || config.addCustomBehaviours.applyElements.includes(element)) {
                        behavioursObject['tei'][element] = code
                        if (config.addCustomBehaviours.showLogs) {
                            console.log(`Added ${element} behaviour`);
                        }
                    }
                } catch(err) {
                    console.warn(`Could not add custom behaviour for element ${element}`)
                }
            }
        } catch (err) {
            console.error('Error: custom behaviours must be in a variable called customBehaviours')
        }
    }

    return behavioursObject
}