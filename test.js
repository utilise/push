var expect = require('chai').expect
  , push = require('./')

describe('push', function() {

  it('should push value into array', function() {
    expect(push(['foo'])('bar')).to.be.eql(['foo', 'bar'])
  })

})