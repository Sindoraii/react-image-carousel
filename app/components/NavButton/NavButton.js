import styles from './style.module.css';
import Image from "next/image";

const NavArrowButton = ({handler,side}) => {
    return (
        <button onClick={ ()=>handler(side)} className={side === 'left' ? `${styles.left} ${styles.button}`: `${styles.right} ${styles.button}`}>
            <Image src={`/icons/arrow-${side}.svg`}
                   width={21}
                   height={21}
                   alt={`${side}`}/>
        </button>
    )
}

export default NavArrowButton;
