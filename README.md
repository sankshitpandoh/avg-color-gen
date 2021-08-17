## Prerequisies
This lightweight package with 0 dependencies works only in browsers and not in Node CLI because it uses HTML canvas.



## Usage

- Installing the package
```
npm install avg-color-gen --save

```

- Importing the module
```
import getAverageColor from "avg-color-gen"
```

- Calling the function
```
getAverageColor(IMAGE_IN_BASE64, OPACITY OF THE RESULTING COLOR);


// Example with callbacks
// NOTE: requiring an image in js gets it in base64
getAverageColor(require(`../assets/img/never_gonna_gice_you_up.png`), 0.09).then((rgb) => {
    updateRGB(rgb);
})
```

## Responses
- In case of success, it will return
```
{
    status: "success",
    color: "rgba(x,x,x,x)"
}
```

- In case of failure, it will return
```
{
    status: "failure",
    reason: "SOME_REASON_HERE"
}
```