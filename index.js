// Pass an image in base64 URI encoded format and opacity
// it will return the average background color in rgba()  format
// NOTE: opacity defaults as 0.09 if not passed (range: 0.00 - 1.00)
const getAverageColor = (base64img, opacity) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = base64img;
        img.onload = () => {
            let blockSize = 1, 
                defaultRGB = {r:0,g:0,b:0},
                canvas = document.createElement('canvas'),
                context = canvas.getContext && canvas.getContext('2d'),
                data, width, height,
                i = 0,
                length,
                rgb = {r:0,g:0,b:0},
                count = 0;
        
            if (!context) {
                reject({
                    status: "failed",
                    reason: "Canvas Context is Missing"
                });
            }
        
            height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
            width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;
            context.drawImage(img, 0, 0);
        
            try {
                data = context.getImageData(0, 0, width, height);
            } catch(error) {
                // Error handling in case of any faiure in GETTING image
                // Because of base64 utilization, this shoudld never reach here
                reject({
                    status: "failed",
                    reason: "Error in getting image data"
                });
            }
        
            length = data.data.length;
        
            while ( (i += blockSize * 4) < length ) {
                if (data.data[i] === 0 || data.data[i+1] === 0 || data.data[i+2] === 0) {

                } else {
                    ++count;
                }
                rgb.r += data.data[i];
                rgb.g += data.data[i+1];
                rgb.b += data.data[i+2];
            }
        
            // flooring values
            rgb.r = ~~(rgb.r/count);
            rgb.g = ~~(rgb.g/count);
            rgb.b = ~~(rgb.b/count);

            resolve({
                status: "success",
                color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity ? opacity : "0.09"})`
            });    
        }

    })
}

export default getAverageColor;