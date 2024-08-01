# Introduction

Notes (bibliographic and editorial) can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `noteHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` to allow for styling.

# Usage
Create an event listener for our custom event `noteHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('noteHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Accessibility
All custom events are keyboard accessible, and triggered `onfocus`. If you are *not* using the event to trigger any UI component, make sure you deactivate the custom event, otherwise the element will still be keyboard accessible but without any action associated with it.

# Event object
The data for the note included in the `event.detail` object, which you should capture when adding the event listener, and can be structured or unstructured. The specific structure of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows (for structured bibliographic notes):

```
event.detail: object {
    "type": string            // the type of note ('bibliographic' or 'editorial')
    "note": object {           // Object with the content of the note
        "bibl": object {
            "author": string,
            "title": string,
            "publisher": string,
            "date": string
        }
    }
}
```

Here is an example from a bibliographic note in `GB-1-1-1-1-30-5.xml`:
```json
{
    "type": "bibliographic",
    "note": {
        "bibl": {
            "author": "Lady Florence Bell",
            "title": "The Heart of Yorkshire\\u003a A Play in Three Parts and an Epilogue.",
            "publisher": "A. L. Humphreys: ",
            "date": "1923"
        }
    }
}
```

For unstructure notes, the structure of the event object is as follows:

```
event.detail: object {
    "type": string            // the type of note ('bibliographic' or 'editorial')
    "note": string            // the text content of the note
}
```

Here is an example from an editorial note in `GB-1-1-2-1-17-19.xml`:
```json
{
    "type": "editorial",
    "note": "Refers to influential people in Iraq."
}
```