# Introduction

Further information about places mentioned in the body of the text are also included in the TEI encoded file, separate from the main text. TeiConverter can automatically gather the place data for the client and make it available through a custom event called `placeHover`, triggered everytime a user hovers over a relevant place name.

# Usage
Create an event listener for our custom event `placeHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('placeHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The data for place name is included in the `event.detail` object, which you should capture when adding the event listener. The specific strucutre of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows:

```
event.detail: object {
    placeName: string           // The name of the place referred to (which might differ from the term in the text)
    country: string
    authority: object {         // usually a link to a gazetteer or similar authority if it exists
        provider: string,       // authority used; useful to tailor API calls in the client
        url: string             // link to authority file
    }
}
```

Here is an example from a place name in `GB-LET-GB-FB-1921-01.xml`:
```json
{
    "placeName": "Baghdād",
    "country": "Iraq",
    "authority": {
        "provider": "getty",
        "url": "http://vocab.getty.edu/page/tgn/7002482"
    }
}
```