## About project
There is a simple image carousel. It can be used for showing limited number of images.
Image carousel has the next functional:
- showing loaded images 
- delete loaded images
- edit loaded images
- load images (single ot multi)
- navigation via mobile swipe gestures and nav buttons



Props of ImageCarousel:
- photos: 
    - type: Array of objects
    - description: Images for the Image carousel
    - values: objects have 2 property: alt:string and url:string
Values of property are creating when images are loadend via FileReader web API

- isEdit:
    - type: boolean
    - description: flag for mode the Image carousel
    - values: true - functional for navigation, deleting,editing and loading images is available
              false - functional for only navigation is available. Other functional (loading,editing,deleting images) is disabled

- handlerData:
    - type: callback-function
    - description: Function is handler for reaction on change images
    - values: It`s used for getting images into the parent state or for something else

- maxImages:
    - type: number
    - description: Max value of images into the Image carousel
    - values: any integer


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

