var expect = require('chai').expect
  , last = require('utilise.last')
  , set = require('utilise.set')
  , push = require('./')

describe('push', function() {

  it('should push - vanilla', function() {
    expect(push('foo')([])).to.be.eql(['foo'])
  })

  it('should push - versioned', function(){
    var o = set()([])

    expect(push('foo')(o)).to.equal(o)
    expect(o).to.eql(['foo'])
    expect(o.log.length).to.eql(2)
    expect(last(o.log)).to.eql({ key: '0', value: 'foo', type: 'add', time: 1 })
  })

  it('should skip gracefully', function(){
    expect(push('foo')(set()({}))).to.be.eql({})
    expect(push('foo')({})).to.be.eql({})
    expect(push('foo')(true)).to.be.eql(true)
    expect(push('foo')(5)).to.be.eql(5)
  })

})