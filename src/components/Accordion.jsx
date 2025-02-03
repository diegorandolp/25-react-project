import AccordionCard from "./AccordionCard.jsx";
import {useState} from "react";


export default function Accordion() {
    const data = [
        {
            "question": "What is the capital of France?",
            "answer": "Paris"
        },
        {
            "question": "Who wrote 'To Kill a Mockingbird'?",
            "answer": "Harper Lee"
        },
        {
            "question": "What is the chemical symbol for gold?",
            "answer": "Au"
        },
        {
            "question": "What is the largest planet in our solar system?",
            "answer": "Jupiter"
        }
    ]

    const [showCard, setShowCard] = useState([false, false, false, false]);
    const [multiSelection, setMultiSelection] = useState(false);
    function handleShowCard(indexCard) {

        setShowCard((oldShowCard) => {
            if (multiSelection) {
                const newShowCard = [...oldShowCard];
                newShowCard[indexCard] = !newShowCard[indexCard];
                return newShowCard;
            } else {
                const newShowCard = Array(data.length).fill(false);
                newShowCard[indexCard] = !oldShowCard[indexCard];
                return newShowCard;
            }

        });

    }

    return (
        <>
            <button onClick={() => setMultiSelection(prev => !prev)}>Enable Multi Selection</button>
            <div>
                {data.map((item, index) => (
                    <AccordionCard
                        isShowed={showCard[index]}
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        handleShowCard={() => handleShowCard(index)}
                    />
                ))}
            </div>
        </>
    )
}