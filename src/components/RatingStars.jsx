import {useState} from "react";

const activeStar = (
       <svg
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24"
           width="10em"
           height="10em"
       >
           <path
               fill='gold'
               d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
           ></path>
       </svg>
   )

const inactiveStar = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="10em"
        height="10em"
    >
        <path
            fill='white'
            d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
        ></path>
    </svg>
)
function fillStars(numberStars, rating){
    let svgStars = [];
    for (let i=0; i<numberStars; i++){
        if (i < rating){
            svgStars.push(activeStar);
        } else {
            svgStars.push(inactiveStar);
        }
    }
    return svgStars;
}

export default function RatingStars(){

    const [rating, setRating] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const numberStars = 5;
    let svgStars = fillStars(numberStars, rating);

    function handleMouseOver(currRating){
        if (!isFixed){
            setRating(currRating)
        }
    }

    return (
        <div className="rating-stars">
            {svgStars.map((star, index) => (
                <span key={index}>
                    <button
                        onClick={() => {
                        setIsFixed(true);
                        setRating(index+1);
                    }}
                        onMouseOver={() => (handleMouseOver(index+1))}
                    >
                        {star}
                    </button>
                </span>
            )) }
        </div>

    );
}