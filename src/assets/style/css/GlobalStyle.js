import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
        font-family: system-ui;
        background: linear-gradient(-45deg, #1e2761, #1e2761, #7a2048, #7a2048);
	    background-size: 400% 400%;
	    animation: gradient 15s ease infinite;
        display: flex;
        color: #e7e7e7;
        overflow: auto;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

`

export default GlobalStyle