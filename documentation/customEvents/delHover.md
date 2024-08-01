# Introduction

Places where the author has erased content can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `delHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` and a class `.intervention` to allow for styling.

# Usage
Create an event listener for our custom event `delHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('delHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Accessibility
All custom events are keyboard accessible, and triggered `onfocus`. If you are *not* using the event to trigger any UI component, make sure you deactivate the custom event, otherwise the element will still be keyboard accessible but without any action associated with it.

# Event object
The data for the `<del>` element is included in the `event.detail` object, which you should capture when adding the event listener. According to the standard document, the event should return the value of the `@rend` attribute. The specific structure should normally be as follows:

```
event.detail: object {
    rendition: string           // value of the `@rend` attribute
}
```

Here is an example from `GB-1-1-1-1-30-8.xml`:
```json
{
  "rendition": "strikethrough"
}
```