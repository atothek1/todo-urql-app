import { css, Global } from "@emotion/react";

const styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap');

    :root {
        --todo-status-open-color: #FFB785;
        --todo-status-progress-color: #8DCDFF;
        --todo-status-done-color: rgb(93, 202, 20);

        --error-color: rgb(255, 88, 88);
        --info-color: rgb(103, 156, 255);
    }

    /* css reset from https://www.joshwcomeau.com/css/custom-css-reset/ */
    /* 1. Use a more-intuitive box-sizing model */

    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Inter', 'Roboto', sans-serif;
    }

    /* 2. Remove default margin */

    *:not(dialog) {
        margin: 0;
    }

    /* 3. Enable keyword animations */
    @media (prefers-reduced-motion: no-preference) {
        html {
            interpolate-size: allow-keywords;
        }
    }

    body {
        /* 4. Increase line-height */
        line-height: 1.5;
        /* 5. Improve text rendering */
        -webkit-font-smoothing: antialiased;
        background-color: #dfdfdf;
    }

    /* 6. Improve media defaults */

    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }

    /* 7. Inherit fonts for form controls */

    input, button, textarea, select {
        font: inherit;
    }

    /* 8. Avoid text overflows */

    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }

    /* 9. Improve line wrapping */

    p {
        text-wrap: pretty;
    }

    h1, h2, h3, h4, h5, h6 {
        text-wrap: balance;
    }

    /* reset some overall elements */

    ul, ol {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
    }

    a {
        all: unset;
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }
`;
export function GlobalStyles() {
    return <Global styles={styles} />;
}
