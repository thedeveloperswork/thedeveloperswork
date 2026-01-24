import React from 'react';

const mockStyled = (tag) => {
    // Return a function that accepts the template literal arguments
    return (strings, ...args) => {
        // Return the actual React Component
        return ({ children, ...props }) => <div>{children}</div>;
    };
};

const styled = new Proxy(mockStyled, {
    get: (target, prop) => {
        return mockStyled(prop);
    }
});

export const createGlobalStyle = () => () => null;
export const keyframes = () => 'animation-name';
export const css = () => '';
export default styled;


