export default function AccordionCard({isShowed, question, answer, handleShowCard}){
    return (
        <div className="accordion-card">
            <div className="accordion-card-header">
                <h3>{question}</h3>
                <button onClick={handleShowCard}>+</button>
            </div>
            <p className={isShowed ? "showed-card" : "compressed-card"}>{answer}</p>
        </div>
    )
}