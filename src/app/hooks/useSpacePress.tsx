import {useCallback, useEffect, useState} from 'react';
import {TShiftPressArgs} from "../types/global-types";

export function useSpacePress({onPress, addEvent}: TShiftPressArgs) {
    const [pressed, setPressed] = useState(false);

    const handlePress = useCallback((e: KeyboardEvent) => {
        if (e.code == "Space") {
            setPressed(true);
            onPress();
        }
    }, [onPress]);

    useEffect(() => {
        if (addEvent && !pressed) {
            document.addEventListener("keypress", handlePress);
        }

        return () =>  {
            document.removeEventListener("keypress", handlePress);
        }
    }, [addEvent, onPress, pressed]);
}
