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
        <div className="accordion">
            <div className="flex flex-col gap-5 mx-auto my-44">
                <button onClick={
                    () => setMultiSelection(prev => !prev)}
                        className="accordion-card bg-gray-700 font-bold"
                >{multiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}</button>
                <div className="flex flex-col gap-5">
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
            </div>

        </div>
    )
}