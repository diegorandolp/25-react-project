import { useState } from 'react';

const HEX_NUMBERS = '0123456789ABCDEF';


export default function RandomColor(){
    const [typeColor, setTypeColor] = useState('hex');
    const [color, setColor] = useState('#000000j');

    function randomInteger(max){
        return Math.floor(Math.random() * max);
    }
    function generateRandom(){
        let rand = ''
        if (typeColor === 'hex') {
            rand = '#';
            for (let i=0; i<6; i++){
                rand += HEX_NUMBERS[randomInteger(16)];
            }
        } else {
            rand = `rgb(${randomInteger(256)}, ${randomInteger(256)}, ${randomInteger(256)})`;
        }
        setColor(rand);
    }


    return (
        <div style={{backgroundColor: color}} className="random-color">
            <h1>Random Color Generator</h1>
            <button onClick={generateRandom}>Generate Random Color</button>
            <p>{color}</p>
            <button onClick={() => setTypeColor('hex')}>Hex Color</button>
            <button onClick={() => setTypeColor('rgb')}>RGB Color</button>
        </div>

    )
}