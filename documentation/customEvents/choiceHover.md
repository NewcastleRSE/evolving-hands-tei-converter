# Introduction

Places where more than one reading is valid (abbreviations and corrections) can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `choiceHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` to allow for styling.

# Usage
Create an event listener for our custom event `choiceHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('choiceHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```
# Accessibility
All custom events are keyboard accessible, and triggered `onfocus`. If you are *not* using the event to trigger any UI component, make sure you deactivate the custom event, otherwise the element will still be keyboard accessible but without any action associated with it.

# Event object
The data for the choice element is included in the `event.detail` object, which you should capture when adding the event listener. The specific structure of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows:

```
event.detail: object {
    [type]: object {                            // The key to the object indicates whether it is an 'expansion' or a 'correction'
        "original": string,
        ["expanded" | "corrected"]: string      // The key will differ depending on whether it is an 'expansion' or a 'correction'
    }
}
```

Here is an example from an expansion in `GB-1-1-1-1-30-8.xml`:
```json
{
    "expansion": {
        "original": "G B E",
        "expanded": "Grand Cross of the Order of the British Empire"
    }
}
```

Here is an example from a correction in `GB-1-1-2-1-17-26.xml`:
```json
{
    "correction": {
        "original": "ryder",
        "corrected": "rider"
    }
}
```