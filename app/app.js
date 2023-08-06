'use client';
import {useState} from "react";
import ImageCarousel from "@/app/components/ImageCarousel/ImageCarousel";
import './globals.css';

const App = () => {
    const stubImages = [{
        alt: 'Art',
        url: '/stub/1.svg',
    },
        {
            alt: 'Art',
            url: '/stub/2.svg',
        },
        {
            alt: 'Art',
            url: '/stub/3.svg',
        },
        {
            alt: 'Art',
            url: '/stub/4.svg',
        }
    ]

    const [images,setImages] = useState([])

    /**
     * @param newImg:[{ alt:string,url:string}]
     **/
    function handleImages(newImg) {
        setImages(prevState => ({
            ...prevState,
            ...newImg
        }))
    }

    return (
        <>
            <main className='main'>
                <div className={'wrapper'}>
                    <h2>Carousel is for images which can be deleted,loaded,edited</h2>
                    <ImageCarousel maxImages={4} isEdit={true} photos={images} handlerData={handleImages}/>
                </div>
                <div className={'wrapper'}>
                    <h2>Carousel is only for reading loaded images</h2>
                    <ImageCarousel maxImages={4} isEdit={false} photos={stubImages} />
                </div>
            </main>
        </>
    )
}

export default App;
