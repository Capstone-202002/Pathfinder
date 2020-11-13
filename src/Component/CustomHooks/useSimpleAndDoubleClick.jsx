import { useState, useEffect } from 'react'

function useSimpleAndDoubleClick(actionSimpleClick, actionDoubleClick, delay = 250) {
    const [click, setClick] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            // simple click
            if (click === 1) actionSimpleClick();
            setClick(0);
        }, 300);

        // click in a delay < 250 = double click detected
        if (click === 2) actionDoubleClick();

        return () => {
            clearTimeout(timer);
        }
    }, [click]);

    return () => {
        setClick(prev => prev + 1);
    };
}

export default useSimpleAndDoubleClick;