import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --teal-glow: #00ADB5;
        --dark-bg: #0f172a;
        --glass-panel: rgba(255, 255, 255, 0.03);
        --border-glass: rgba(255, 255, 255, 0.1);
    }

    body {
        margin: 0;
        background: radial-gradient(circle at 10% 20%, #132e35 0%, var(--dark-bg) 60%);
        font-family: 'Rajdhani', sans-serif;
        color: white;
        min-height: 100vh;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
    }
`;
