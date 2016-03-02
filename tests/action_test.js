import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from '../actions/Facebook'
import * as types from '../constants/ActionTypes'

console.log("Testing react")

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

// describe('fetch user info', () => {
// 	it('should fetch user info with access token and authenticat to picovico', (done) => {
// 		const response = {}
// 		const expectedActions = [
// 									{response, type: types.LOGIN},
// 									{response, type: types.USER_INFO}
// 								]

// 		const store = mockStore(response, expectedActions, done)
// 		store.dispatch(actions.fetchUserInfo())

// 	})
// })


describe('Actions', () => {
  it('should add headers after authentication', (done) => {
    const response = {}
    const expectedActions = [ 
    							{ response, type: types.LOGIN }
    						]
    const store = mockStore(response, expectedActions, done)
    store.dispatch(actions.loginSuccess(response))
  })

  it('should check loginSuccess actions and types', () => {
  	const response = {}
  	const expectedAction = {response, type: types.LOGIN}

  	expect(actions.loginSuccess(response)).toEqual(expectedAction)
  })

  it('should check userInfo actions and types', () => {
  	const response = {}
  	const expectedAction = {response, type: types.USER_INFO}

  	expect(actions.userInfo(response)).toEqual(expectedAction)
  })
})