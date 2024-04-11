# Introduction

Further information about organisations mentioned in the body of the text are also included in the TEI encoded file, separate from the main text. TeiConverter can automatically gather the place data for the client and make it available through a custom event called `orgHover`, triggered everytime a user hovers over a relevant organisation name.

# Usage
Create an event listener for our custom event `orgHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('orgHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The data for organisation name is included in the `event.detail` object, which you should capture when adding the event listener. The specific strucutre of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows:

```
event.detail: object {
    orgName: string           // The name of the organisation referred to (which might differ from the term in the text)
    creation: string            // Date the organisation was created (optional)
    dissolution: string         // Date the organisation ceased to exist (optional)
    authority: object {         // usually a link to a gazetteer or similar authority if it exists
        provider: string,       // authority used; useful to tailor API calls in the client
        url: string             // link to authority file
        id: string              // id for the organisation in the authority
    }
}
```

Here is an example from a place name in `GB-1-1-2-1-17-23.xml`:
```json
{
    "orgName": "Iraq Council of Ministers",
    "creation": "1921",
    "authority": {
        "provider": "VIAF",
        "id": "129437055",
        "url": "http://viaf.org/viaf/129437055"
    }
}
```