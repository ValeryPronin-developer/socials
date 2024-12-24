import React, {useEffect, useState} from 'react'
import * as SC from './styles.js'

function App() {
    const [shapes, setShapes] = useState([])

    useEffect(() => {
        const generateShapes = () => {
            const newShapes = Array.from({length: 20}).map(() => ({
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: Math.random() * 100 + 40,
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                shape: Math.random() > 0.5 ? 'circle' : 'square',
                duration: Math.random() * 5 + 5,
            }))
            setShapes(newShapes)
        }

        generateShapes()
    }, [])

    return (
        <>
            <SC.GlobalStyle/>
            <SC.WelcomeContainer>
                <SC.WelcomeText>Добро пожаловать</SC.WelcomeText>
            </SC.WelcomeContainer>
            {shapes.map((shape, index) => (
                <SC.Shape key={index} {...shape} />
            ))}
        </>
    )
}

export default App
