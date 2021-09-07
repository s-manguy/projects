
//import ReactDOM from 'react-dom' /* 01 no need when using Enzyme */
import { expect } from 'chai' // 05 add this expect to avoid using Jest one
import React from 'react'
import { shallow } from 'enzyme' // 03 added Enzyme renderer
import sinon from 'sinon' // Added for snapshot

import App,  { SYMBOLS } from './App' // do not forget to add export before the SYMBOL constant in the APP.js file to get a fixed cards position
import GuessCount from './GuessCount' // 06 add the component which is tested

describe('<App />', () => {
    it('renders without crashing', () => {
        //const div = document.createElement('div') /* 02 no need when using Enzyme */
        //ReactDOM.render(<App />, div) /* 02 no need when using Enzyme */
        const wrapper = shallow(<App />) // 04 add a wrapper around the component

        expect(wrapper).to.contain(<GuessCount guesses={0} />) // 05 add the expect
    })

    it('has 36 cards', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find('Card')).to.have.length(36)
    })

    it('should match its reference snapshot', () => {
        const mock = sinon // added to fix the cards position 
            .stub(App.prototype, 'generateCards') // contrary to spy, stub allow us to precise what to return
            .returns([...SYMBOLS.repeat(2)])
            // as shallow() and assertions are synchrone, it is possible to use a try...finally... block
        try {
            const wrapper = shallow(<App />)

            expect(wrapper).to.matchSnapshot()
        } finally {
            mock.restore()
        }
    })


})
