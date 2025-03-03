import { useEffect } from "react";
import { useState } from "react";


const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count + 1);
        }, 1000);
    }, []);
}

export default Counter;