'use client';
import {useState,useEffect} from "react";
import NavArrowButton from '../NavButton/NavButton';
import styles from './style.module.css';
import Image from "next/image";

const ImageCarousel = ({photos, isEdit,handlerData,maxImages}) => {
    const [counter, setCounter] = useState(0);
    const [images, setImages] = useState(photos);
    let startX = 0;
    let endX = 0;
    const MAX_IMAGES = maxImages;

    useEffect(()=>{
        handlerData ? handlerData(images) : null
    },[images])

    /* loading images */
    async function readFiles(file) {
        const reader = new FileReader();

        reader.addEventListener('loadend', (e) => {
            setImages(prevState => (
                prevState.length < MAX_IMAGES ?
                    [...prevState, {
                        alt: 'Загруженное фото',
                        url: `${e.target.result}`,
                    }] : [...prevState]
            ))
        })
        reader.readAsDataURL(file)
    }

    function handleNavButton(side) {
        if (side === 'right' && (counter + 1) < MAX_IMAGES) {
            setCounter(counter + 1)
        } else if (side === 'left' && counter > 0) {
            setCounter(counter - 1)
        }
    }

    async function editFile(file) {
        const reader = new FileReader();

        reader.addEventListener('loadend',() => {
            setImages(prevState => {
                const copy = [...prevState];
                copy.splice(counter,1,{alt: ' фото', url: `${reader.result}`})
                return copy;
            })
        })
        reader.readAsDataURL(file);
    }

    function handleSwipeStart(e) {
            startX = e.touches[0].clientX
    }

    function handleSwipeEnd(e) {
        endX = e.changedTouches[0].clientX;

        if (startX - endX > 0) {
            handleNavButton('right')
        } else if (startX - endX < 0) {
            handleNavButton('left')
        }
    }


    /* readonly mode */
    if (!isEdit) {
        return (
            <>
                <div className={styles.container}>
                    <Image src={images[counter].url}
                           height={248}
                           width={328}
                           alt={images[counter].alt}/>
                    <div className={styles.interface}
                         onTouchStart={(e)=> handleSwipeStart(e)}
                         onTouchEnd={(e)=> handleSwipeEnd(e)}
                    >
                        {counter > 0 && <NavArrowButton handler={handleNavButton} side={'left'}/>}
                        {counter + 1 < MAX_IMAGES && <NavArrowButton handler={handleNavButton} side={'right'}/>}
                        <span className={styles.counter}>{`${counter + 1}/${MAX_IMAGES}`}</span>
                    </div>
                </div>
            </>
        )

    } else {
        if (images.length === 0) {
            return (
                <>
                    <div className={styles.container}>
                        <label className={styles.interface} htmlFor={'downloadFiles'}>
                            <input type={'file'}
                                   accept={'image/*'}
                                   multiple={true}
                                   id={'downloadFiles'}
                                   className={styles.hidden}
                                   onChange={(e) => {
                                       const files = Array.from(e.target.files);
                                       files.forEach(async (file) => await readFiles(file))
                                   }}
                            />
                            <span className={styles.counter}>{`${counter}/${MAX_IMAGES}`}</span>
                        </label>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className={styles.container}>
                        {counter < images.length && <Image src={`${images[counter].url}`}
                                                           height={248}
                                                           width={328}
                                                           alt={images[counter].alt}/>
                        }
                        <div className={styles.interface}
                             onTouchStart={(e)=> handleSwipeStart(e)}
                             onTouchEnd={(e)=> handleSwipeEnd(e)}
                        >
                            {counter > 0 && <NavArrowButton handler={handleNavButton} side={'left'}/>}
                            {counter + 1 < MAX_IMAGES && <NavArrowButton  handler={handleNavButton} side={'right'}/>}
                            {counter < images.length &&
                                <>
                                    <Image src={"/icons/delete.svg"}
                                           height={32}
                                           width={32}
                                           className={styles.deleteIcon}
                                           onClick={(e) => {
                                               setImages(prevState =>
                                                   prevState.filter((item) => item.url !== images[counter].url)
                                               )
                                           }}
                                           alt={'Delete'}
                                    />
                                </>
                            }
                            <label className={styles.editWrapper} htmlFor={"downloadFiles"}>
                                <Image src={"/icons/edit.svg"}
                                       height={32}
                                       width={32}
                                       className={styles.editIcon}
                                       alt={'Edit'}
                                />
                            </label>
                            <input type={'file'}
                                   accept={'image/*'}
                                   multiple={false}
                                   id={'downloadFiles'}
                                   className={styles.hidden}
                                   onChange={async (e) => {
                                       await editFile(e.target.files[0])
                                   }}
                            />
                            <span className={styles.counter}>{`${counter + 1}/${MAX_IMAGES}`}</span>
                        </div>
                    </div>
                </>
            )
        }
    }
}
export default ImageCarousel;
