# Introduction

Places where the text is unclear can be served through a custom event to the client, allowing for more flexibility on the frontend design. The custom event is called `unclearHover`, and is triggered everytime a user hovers over a relevant anchor text. The anchor includes a class `.event` to allow for styling.

# Usage
Create an event listener for our custom event `unclearHover` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:

```js
addEventListener('unclearHover', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The message for the `<unclear>` element is included in the `event.detail` object, which you should capture when adding the event listener. According to the standard document, the event should return the following message: 'text unclear'. The specific structure should normally be as follows:

```
event.detail: object {
    message: string           // message defined in the config
}
```

Here is an example from `GB-1-1-2-1-17-20.xml`:
```json
{
  "message": "text unclear"
}
```
