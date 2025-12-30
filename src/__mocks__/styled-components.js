
const styled = new Proxy(() => { }, {
    get: (target, prop) => {
        // If accessing styled.div, prop is 'div'
        // Return a function that accepts the template literal parts
        return (strings, ...args) => {
            // Return a component
            return (props) => {
                // We can't use JSX here if we want to be safe in pure Node, but since we are being transformed by Vite, JSX is fine IF the environment supports React (createElement).
                // But wait, the environment is 'node'. 'React' is not global.
                // I should stick to returning null or a simple object if rendering isn't tested.
                // However, App.test.js imports App which executes this.
                return null;
            };
        };
    },
    apply: (target, thisArg, argumentsList) => {
        // handle styled('div') case
        return (strings, ...args) => (props) => null;
    }
});

export const createGlobalStyle = () => () => null;
export const keyframes = () => 'animation-name';
export const css = () => '';
export default styled;
