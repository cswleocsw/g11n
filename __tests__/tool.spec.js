import { expect } from 'chai'
import { isString, jsonSuffix } from '../src/tool'

describe('tool', () => {
  describe('isString()', () => {
    it('should be valid data type is string', () => {
      expect(isString(1)).to.be.equal(false)
      expect(isString('1')).to.be.equal(true)
      expect(isString(undefined)).to.be.equal(false)
      expect(isString(null)).to.be.equal(false)
      expect(isString(true)).to.be.equal(false)
    })
  })

  describe('jsonSuffix()', () => {
    it('should be append json suffix', () => {
      expect(jsonSuffix('hello')).to.be.equal('hello.json')
      expect(jsonSuffix('hello.json')).to.be.equal('hello.json')
      expect(jsonSuffix('hello.json?v=123')).to.be.equal('hello.json?v=123')
    })
  })
})
