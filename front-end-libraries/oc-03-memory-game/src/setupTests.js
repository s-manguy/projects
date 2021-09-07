// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import { configure as configureEnzyme } from 'enzyme'
import createChaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'
import createChaiJestDiff from 'chai-jest-diff'
import sinonChai from 'sinon-chai'
import chaiJestSnapShot from 'chai-jest-snapshot'
import enzymeToJson from 'enzyme-to-json/serializer'

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(chaiJestSnapShot)
  .use(createChaiEnzyme())
  .use(sinonChai)

expect.addSnapshotSerializer(enzymeToJson)

configureEnzyme({ adapter: new Adapter() })
