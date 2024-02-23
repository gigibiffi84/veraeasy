import {useState} from 'react';

function AddButton(){

    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log("handle click");
        setCount(count + 1);
    };
    return (
        <div>
            <button onClick={handleClick}>Add Card {count}</button>
        </div>
    )
}

export default AddButton;