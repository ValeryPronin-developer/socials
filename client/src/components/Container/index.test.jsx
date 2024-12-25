import React from 'react'
import { render, screen } from '@testing-library/react'
import { Container } from './index.jsx'

describe('Компонент Container', () => {
    it('корректно отображает дочерний элемент', () => {
        render(
            <Container>
                <div>Тестовый контент</div>
            </Container>
        )

        expect(screen.getByText('Тестовый контент')).toBeInTheDocument()
    })

    it('корректно отображает несколько дочерних элементов', () => {
        render(
            <Container>
                <div>Элемент 1</div>
                <div>Элемент 2</div>
            </Container>
        )

        expect(screen.getByText('Элемент 1')).toBeInTheDocument()
        expect(screen.getByText('Элемент 2')).toBeInTheDocument()
    })

    it('корректно отображает вложенные компоненты', () => {
        const NestedComponent = () => <div>Вложенный контент</div>

        render(
            <Container>
                <NestedComponent />
            </Container>
        )

        expect(screen.getByText('Вложенный контент')).toBeInTheDocument()
    })

    it('применяет стили из styled-components', () => {
        render(
            <Container>
                <div>Контент со стилями</div>
            </Container>
        )

        const containerElement = screen.getByText('Контент со стилями').parentElement
        expect(containerElement).toHaveStyle('max-width: 1024px')
    })
})