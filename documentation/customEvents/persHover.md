# Introduction

Further information about personal names mentioned in the body of the text are also included in the TEI encoded file, separate from the main text. TeiConverter can automatically gather the names data for the client and make it available through a custom event called `persHover`, triggered everytime a user hovers over a relevant personal name.

# Usage
Create an event listener for our custom event `persHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('persHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The data for personal name is included in the `event.detail` object, which you should capture when adding the event listener. The specific strucutre of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows:

```
event.detail: object {
    persName: string           // The name referred to (which might differ from the term in the text)
    idno: string                // An id of some sort (possibly pointing to a different location), if it exists
    authority: object {         // usually a link to a gazetteer or similar authority if it exists
        provider: string,       // authority used; useful to tailor API calls in the client
        url: string             // link to authority file
    }
    noURL: boolean              // true if no external URL was found in the persName metadata
}
```

Here is an example from a place name in `GB-LET-GB-FB-1921-01.xml`:
```json
{
    "persName": "Mother",
    "idno": "EH009",
    "noURL": true
}
```