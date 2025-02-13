import Accordion from './components/Accordion';
import RandomColor from "./components/RandomColor.jsx";
import AnimatedText from "./components/AnimatedText.jsx";
import RatingStars from "./components/RatingStars.jsx";

export default function App() {
    return(
        <>
            <AnimatedText/>
            <Accordion/>
            <RandomColor/>
            <RatingStars/>
        </>
    )
}