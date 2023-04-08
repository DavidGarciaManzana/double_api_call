import React from 'react';


function useToggle(initialValue:boolean = false) : [boolean, Function] {

    const [value, setValue] = React.useState(
        initialValue
    );

    const toggleValue = React.useCallback(() => {
        setValue((currentValue) => !currentValue);
    }, []);

    return [value, toggleValue];
}

export default useToggle;