# Introduction

Places where the reading is not clear through damage can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `damageHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` to allow for styling.

# Usage
Create an event listener for our custom event `damageHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('damageHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The data for the `<damage>` element is included in the `event.detail` object, which you should capture when adding the event listener. According to the standard document, the event should return the value of the `@type` attribute. The specific structure of the object can differ depending on the kind of data encoded on the TEI file, but it should normally be as follows:

```
event.detail: object {
    agent: string           // value of the `@type` attribute
}
```

Here is an example from `GB-1-1-2-1-17-27.xml`:
```json
{
    "agent": "not recorded"
}
```