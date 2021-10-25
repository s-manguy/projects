import Results, { formatJobList, formatQueryParams } from './'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { render } from '../../utils/test'

 
describe('The formatJobList function', () => {
    it('should add a comma to a word', () => {
        const expectedState = 'item2,'
        expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
    })
 
    it('should not add a comma to the last element of the list', () => {
        const expectedState = 'item3'
        expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
    })
})

describe('the formatqueryParams function', () => {
    it('should use the right format for param', () => {
        const expectedState = 'a1=answer1'
        expect(formatQueryParams({1: 'answer1'})).toEqual(expectedState)
    })

    it('should concatenate params with an &', () => {
        const expectedState = 'a1=answer1&a2=answer2'
        expect(formatQueryParams({ 1: 'answer1', 2: 'answer2' })).toEqual(expectedState)
    })
})

// Liste d'objets créée pour le mock
const resultsMockedData = [
    {
        title: 'Merlin enchanteur',
        description: 'Magicien frontend toujours en expérimentation de potions.',

    },
    {
        title: 'Fée Mélusine',
        description: 'Magicienne fullstack élabore des elixirs pour envoûter Merlin.',
    },
]

const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://localhost:8000/results', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json({ resultData: resultsMockedData }))
    })
)
 
// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())


// describe('The Results component', () => {
//     it('should display the results after the data is loaded', async () => {
//       render(<Results />)
//       await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
//       const jobTitleElements = screen.getAllByTestId('job-title')
//       expect(jobTitleElements[0].textContent).toBe('Merlin enchanteur')
//       expect(jobTitleElements.length).toBe(2)
//       const jobDescriptionElements = screen.getAllByTestId('job-description')
//       expect(jobDescriptionElements[1].textContent).toBe(
//         resultsMockedData[1].description
//       )
//       expect(jobDescriptionElements.length).toBe(2)
//     })
//   })