var versioned = require('versioned').default
  , expect = require('chai').expect
  , last = require('utilise.last')
  , push = require('./')

describe('push', function() {

  it('should push - vanilla', function() {
    expect(push('foo')([])).to.be.eql(['foo'])
  })

  it('should push - versioned', function(){
    var changes = []
      , o = versioned([]).on('log', function(diff){ changes.push(diff) })

    expect(o).to.eql([])
    expect(o.log.length).to.eql(1) 
    expect(last(o.log).diff).to.eql(undefined)
    expect(last(o.log).value.toJS()).to.eql([])
    expect(changes).to.eql([])

    expect(push('foo')(o)).to.eql(o)
    expect(o).to.eql(['foo'])
    expect(o.log.length).to.eql(2)
    expect(last(o.log).diff).to.eql({ key: '0', value: 'foo', type: 'add' })
    expect(last(o.log).value.toJS()).to.eql(['foo'])
    expect(changes).to.eql(o.log.slice(1).map(d => d.diff))
  })

  it('should skip gracefully', function(){
    expect(push('foo')(versioned({}))).to.be.eql({})
    expect(push('foo')({})).to.be.eql({})
    expect(push('foo')(true)).to.be.eql(true)
    expect(push('foo')(5)).to.be.eql(5)
  })

})