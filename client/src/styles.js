import styled, {createGlobalStyle, keyframes} from 'styled-components';

const shapeAnimation = keyframes`
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-50px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
`

const FloatingAnimation = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
`

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }

    #root {
        height: 100%;
    }
`

export const WelcomeContainer = styled.div`
    
    height: calc(100vh - 150px);
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
`

export const WelcomeText = styled.h2`
    font-size: 4rem;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    animation: ${FloatingAnimation} 4s ease-in-out infinite;
    z-index: 1;
`

export const Shape = styled.div`
    position: absolute;
    top: ${({top}) => top}%;
    left: ${({left}) => left}%;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    background: ${({color}) => color};
    opacity: 0.7;
    border-radius: ${({shape}) => (shape === 'circle' ? '50%' : '0%')};
    animation: ${shapeAnimation} ${({duration}) => duration}s ease-in-out infinite;
    z-index: -1;
`