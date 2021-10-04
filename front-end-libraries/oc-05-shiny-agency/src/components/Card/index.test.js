import Card from './'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Card', () => {
    test('Should render title and picture', async () => {
        render(
            <ThemeProvider>
                <Card 
                    picture="/virtualPicture.png"
                    title='freeLance Name'
                    label="freelance job"
                />
            </ThemeProvider>
        )
        const cardPicture = screen.getByRole('img')
        const cardTitle = screen.getByText(/Name/i)
        expect(cardPicture.src).toBe('http://localhost/virtualPicture.png')
        expect(cardTitle.textContent).toBe(' freeLance Name ')
    })

    // This feature has been deleted --> test has been uncommented
    // test('should add ⭐️ around title', async () => {
    //     render(
    //         <ThemeProvider>
    //             <Card 
    //                 picture="/virtualPicture.png"
    //                 title='freeLance Name'
    //                 label="freelance job"
    //             />
    //         </ThemeProvider>
    //     )
    //     const cardTitle = screen.getByText(/Name/i)
    //     const parentNode = cardTitle.closest('div')
    //     fireEvent.click(parentNode)
    //     expect(cardTitle.textContent).toBe('⭐️ freeLance Name ⭐️')
    // })
})