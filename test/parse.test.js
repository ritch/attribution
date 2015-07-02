var parse = require('../');
var expect = require('chai').expect;

describe('parse(src)', function() {
  describe('given a string of js', function() {
    before(function() {
      this.src = [
        '// @foo bar',
        '// @bat baz'
      ].join('\n');
    });
    it('should return an array of attributes', function() {
      var attributes = parse(this.src);
      expect(attributes[0]).to.have.property('name', 'foo');
      expect(attributes[0]).to.have.property('value', 'bar');
      expect(attributes[1]).to.have.property('name', 'bat');
      expect(attributes[1]).to.have.property('value', 'baz');
    });
  });
  describe('given multiline comments', function() {
    before(function() {
      this.src = [
        '/*',
        ' * @multi foo',
        ' * bar',
        ' * @foo bar',
        '*/'
      ].join('\n');
    });
    it('should return an array of attributes', function() {
      var attributes = parse(this.src);
      expect(attributes[0]).to.have.property('name', 'multi');
      expect(attributes[0]).to.have.property('value', 'foo\nbar');
      expect(attributes[1]).to.have.property('name', 'foo');
      expect(attributes[1]).to.have.property('value', 'bar');
    });
  });
});
