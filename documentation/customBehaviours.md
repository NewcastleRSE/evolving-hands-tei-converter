# Introduction

[`CETEIcean`](https://github.com/TEIC/CETEIcean), the library that `TeiConverter` is based on, allows for the possibility of customising the way in which specific TEI elements are transformed into web components. `TeiConverter` uses that ability to customise the way in which, for example, the client can have access to the facsimile information of each line. This customisation is called a *behaviour* by `CETEIcean` because it defines how a certain TEI element should *behave* in a web context.

`TEIConverter` is, essentially, a collection of `CETEIcean` behaviours tailored to the needs of the Evolving Hands project. Because each TEI file can differ significantly in its structure and the data it records, the ability to extend and modify its default behaviours is essential. `TEIConverter` does that by allowing the client to write and load their own custom behaviours, using the same conventions as `CETEIcean`.

# Writing custom behaviours
Custom behaviours are, essentially, JS functions that are called whenever a TEI element is transformed into a web component. Consider, for example, the following TEI snippet:

```xml
<p>The quick brown fox jumps over the lazy dog.</p>
```

When `TEIconverter` evaluates this `p` element, the only thing it does is to create a new web component called `tei-p`, copying the content of the original `p`, and adding it to the flow of the document. The resulting HTML will be:

```html
<tei-p>The quick brown fox jumps over the lazy dog.</tei-p>
```

Imagine, now, that for some unfathomable reason, you require all the `p` elements in the TEI to be rendered in capital letters; in other words, you want the `p` elements to behave in a certain way. This is the point where custom behaviours come into play. You need to write a function that transforms the text content of `p`:

```js
function (elt) {
    let transformed = elt.textContent
    transformed = transformed.toUpperCase()
    elt.textContent = transformed;
}
```

The resulting HTML would be:

```html
<tei-p>THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.</tei-p>
```

Because all you wanted was to transform the content of `p`, all you need to do is directly change its properties. However, you might want to transform the entire element. Consider the following TEI snippet:

```xml
<p>The quick brown <name>fox</name> jumps over the lazy <name>dog</name>.</p>
```

Ignoring the question of why an animal name is encoded with the element `name`, let's say you want to display these animals as the cute emoji versions of themselves, 🦊 and 🐶. You also want to identify this change as a special case by adding a `span` element around them. To do this, you have to write a custom behaviour that returns a new element:

```js
function (elt) {
    let newName = document.createElement('span');
    let emoji = ''
    if (elt.textContent === 'fox') {
        emoji = '🦊'
    } else if (elt.textContent === 'dog') {
        emoji = '🐶'
    }
    const text = document.createTextNode(emoji);
    newName.appendChild(text)
    return newName
}
```

The resulting HTML would be:

```html
<tei-p>The quick brown <span>🦊</span> jumps over the lazy <span>🐶</span>.</tei-p>
```

There are two main differences from the previous example: 1) this time, the custom behaviour *returns* a new element (which you added to the `document`) rather than change the properties of the existing element -- this element will replace the default behaviour and there will be *no* `tei-name` elements; 2) As implied, the new function will be applied to the `name` TEI element, not the `p`. 

Specific behaviours are passed to the `TeiConverter` in an object in which the `key` is the name of the TEI element the behaviour should be applied to. So, our two examples would be passed in the following object:

```js
behaviours = {
    "p": function (elt) {
        let transformed = elt.textContent
        transformed = transformed.toUpperCase()
        elt.textContent = transformed;
    },

    "name": function (elt) {
        let newName = document.createElement('span');
        let emoji = ''
        if (elt.textContent === 'fox') {
            emoji = '🦊'
        } else if (elt.textContent === 'dog') {
            emoji = '🐶'
        }
        const text = document.createTextNode(emoji);
        newName.appendChild(text)
        return newName
    }
}
```

You can read more about how to [write custom behaviours in the `CETEIcean` documentation](https://github.com/TEIC/CETEIcean/wiki/Anatomy-of-a-behaviors-object): the same principles apply to any behaviour applied by the `TEIConverter` except in how they are added to the processing flow.

# Adding behaviours to `TEIConverter`

Because `TEIConverter` does not expose the `CETEIcean` API directly, adding custom behaviours to a `TEIConverter` instance is a little different from the default `CETEIcean` methods. In a  nutshell, custom behaviours must be written into a separate script that must be loaded in the same page as the `TEIConverter` (but before it); `TEIConverter` will then take care of loading them into the `CETEIcean` transformation. The distribution folder includes [an example script](../dist/TeiConverter/exampleCustoms.js) with a handful of example custom behaviours that can be used for testing and exploring.

There are three steps to use custom behaviours with `TEIconverter`:
1. [Write the behaviours into a script](#the-custom-behaviours-script) -- the script **must** contain a variable named `customBehaviours`, that's the variable `TEIconverter` will be looking for;
2. [Load that script in the client](#load-the-script-in-the-client) independently (and **before**) of `TEIconverter`;
3. [Change `TEIConverter.config.json`](#activate-custom-behaviours-in-the-config) to [apply custom behaviours](./TeiConverter.config.md#addcustombehaviours) -- more granular options (i.e., add only a selection of custom behaviours) are also available.

## The custom behaviours script
The custom behaviours script is a simple JS script that creates a single global object called `customBehaviours`. `customBehaviours` should include all the behaviours you want to add; `TEIConverter` will look for its existence when transforming the TEI document and, if it finds it and custom behaviours are activated in the config file, it will add them to processing. You can name this script anything, and place them anywhere in the project structure, as long as you are able to load it directly from the client; the object **must** be named `customBehaviours` and be exposed as a global variable, as that is what `TEIConverter` is expecting. The included example `exampleCustoms.js` gives you a skeleton structure of the object, and a few examples of how to apply custom behaviours:

```javascript
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
```

For more on how to write custom behaviours, see the [`CETEIcean` documentation](https://github.com/TEIC/CETEIcean/wiki/Anatomy-of-a-behaviors-object).

## Load the script in the client
In order for the `customBehaviours` object to be accessible to `TEIConverter`, you must load your custom behaviours script independently in the client, and **before** you load the `TEIConverter` script. Do it as you would any other JS script, for example:

```html
<!-- ... -->
<head>
    <!-- Import custom behaviours (OPTIONAL) before the converter -->
    <script type="text/javascript" src="./dist/TeiConverter/exampleCustoms.js"></script>

    <!-- Import converter -->
    <script src="./dist/TeiConverter/tei-converter.umd.js"></script>
    <!-- ... -->
</head>
<!-- ... -->
```

As long as neither script is loaded asynchronously or deferred, the order in which they are declared in the HTML corresponds to the order in which they are loaded, so in a simple approach this should be enough.

## Activate custom behaviours in the config
Even if the script is loaded correctly and the `customBehaviours` object is available to the `TEIConverter`, custom behaviours are not applied unless they are explicitly called for in the config object. The options related to custom behaviours are in [`addCustomBehaviours`](./TeiConverter.config.md#addcustombehaviours). Specifically you will need to activate `addCustomBehaviours.applyCustomBehaviours` and either activate `addCustomBehaviours.applyAll` or include an array of at least one custom behaviour key in `addCustomBehaviours.applyElements`. A final option (`addCustomBehaviours.showLogs`) will allow you to log successful additions to the console -- errors will always be shown, even if the `showLogs` option is not active.

The following config object would load **all** custom behaviours in `customBehaviours`:

```json
{
    ...
    "addCustomBehaviours": {
        "applyCustomBehaviours": true,
        "applyAll": true,
        "applyElements" : "",
        "showLogs": true
    }
}
```

while the following config object would only load the custom behaviour for `name`, even if there are other custom behaviours defined in the `customBehaviours` object:

```json
{
    ...
    "addCustomBehaviours": {
        "applyCustomBehaviours": true,
        "applyAll": false,
        "applyElements" : "['name']",
        "showLogs": true
    }
}
```