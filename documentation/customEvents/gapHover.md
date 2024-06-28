# Introduction

Places where there is a gap in the transcription can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `gapHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` to allow for styling.

# Usage
Create an event listener for our custom event `gapHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('gapHover', (event) => {
        console.log(event.detail);
      });
```

# Event object
The data for the `<gap>` element is included in the `event.detail` object, which you should capture when adding the event listener. According to the standard document, the event should return the value of the `@reason` attribute. The specific structure should normally be as follows:

```
event.detail: object {
    reason: string           // value of the `@rend` attribute
}
```

Here is an example from `GB-1-1-3-2-12.xml`:
```json
{
  "reason": "illegible"
}
```