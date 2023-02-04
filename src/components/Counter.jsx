import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    function increament() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increament}>Increament</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;