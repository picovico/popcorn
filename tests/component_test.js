import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Header from '../components/Header'
import Create from '../components/Create'

function setup() {

  let header = TestUtils.createRenderer()
  header.render(<Header />)
  let output_header = header.getRenderOutput()

  let create = TestUtils.createRenderer()
  create.render(<Create />)
  let output_create = create.getRenderOutput()

  return {
    output_header,
    output_create
  }
}

describe('Components', () => {
  describe('Header', () => {
    it('should render header component correctly', () => {
    const { output_header } = setup()
    expect(output_header.type).toBe('nav')
    expect(output_header.props.className).toBe('navbar navbar-default')

    let container = output_header.props.children

    expect(container.type).toBe('div')
    expect(container.props.className).toBe('container-fluid')

    let [div, ul] = container.props.children

    expect(div.type).toBe('div')
    expect(div.props.className).toBe('navbar-header')
    expect(div.props.children.type).toBe('img')

    expect(ul.type).toBe('ul')
    expect(ul.props.className).toBe('nav nav-pills')

    })

  describe('Create component', () => {
    it('should render create component correctly', () => {
      const { output_create } = setup()
      expect(output_create.type).toBe('footer')

      let container = output_create.props.children

      expect(container.type).toBe('div')
      expect(container.props.className).toBe('footer')

      let footer = container.props.children

      expect(footer.type).toBe('div')
      expect(footer.props.className).toBe('container-fluid')
      expect(footer.props.children.props.children.props.children.type).toBe('button')
    })
  })

  describe('List album component', () => {
    it('should render album list component correctly', () => {
      console.log("album list")
    })
  })
    
  })
})