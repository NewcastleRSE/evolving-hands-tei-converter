# Introduction

The TEI transcription produced by the Evolving Hands HCR process contains valuable information on the relationship between the transcribed text and the source digital facsimile, namely, the coordinates that define boundary boxes for lines and blocks of text in the digital image. These coordinates can be used to dynamically draw boxes in a host interface (side-by-side transcription and facsimile) as the user navigates the text.

The problem, however, is that because of the structure of the TEI file, that information is not simply attached to each transcribed line, but rather stored elsewhere in the document. To facilitate this kind of interaction, we've implemented a custom event that will give all the required data about a particular line to the host whenever the user hovers over it. The host application will simply need to listen for that event and then draw the box from the information provided.

# Usage
Create an event listener for our custom event `drawBox` as you would normally. Use the event handler to collect the data from `event.detail` trigger the host interface response. For example:
```js
addEventListener('drawBox', (event) => {
        console.log(event.detail);
        // useful code...
      })
```

# Event object
The data for each line is included in the `event.detail` object, which you should capture when adding the event listener. The structure of `event.detail` is as follows:
```json
event.detail: object {
    line: object {              // data about the line that triggered the event
        id: string,
        points: array [         // array with four coordinate pairs, one for each corner of the boundary box
            [x1, y1] : integer,
            [x2, y2] : integer,
            [x3, y3] : integer,
            [x4, y4] : integer
        ]
    },
    TextRegion: object {        // data about the text block that contains the line
        id: string,
        points: array [         // array with four coordinate pairs, one for each corner of the boundary box
            [x1, y1] : integer,
            [x2, y2] : integer,
            [x3, y3] : integer,
            [x4, y4] : integer
        ]
    },
    facsimile: object {         // data about the file(s) that the points refer to
        id: string,
        imgFiles: array [       // array with an object for every available source image file
            : object {
                url: string,
                height: string,
                width: string
            }
        ],
        points: array [         // array with two pairs of points (top left, bottom right), that define the surface of the image; effectively the same as the dimensions
            [ulx, uly] : integer,
            [lrx, lry] : integer
        ]
    }
}
```

Here is an example from the first line of `GB-LET-GB-FB-1921-01.xml`:
```json
{
    "Line": {
        "id": "facs_1_r1l1",
        "points": [
            [
                331,
                159
            ],
            [
                1611,
                159
            ],
            [
                1611,
                411
            ],
            [
                331,
                411
            ]
        ]
    },
    "TextRegion": {
        "points": [
            [
                340,
                219
            ],
            [
                4326,
                219
            ],
            [
                4326,
                5281
            ],
            [
                340,
                5281
            ]
        ],
        "id": "facs_1_r1"
    },
    "Facsimile": {
        "id": "facs_1",
        "imgFiles": [
            {
                "url": "0001_GB-LET-GB-FB-1921-01-01-01.jpg",
                "width": "4552px",
                "height": "5576px"
            },
            {
                "url": "https://files.transkribus.eu/Get?id=DWQQGJFHDGPCSMVRKCNZRNUP&fileType=view",
                "width": "4552px",
                "height": "5576px"
            }
        ],
        "points": [
            [
                0,
                0
            ],
            [
                4552,
                5576
            ]
        ]
    }
}
```