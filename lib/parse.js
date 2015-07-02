var esprima = require('esprima');

module.exports = function parse(src, options) {
  var ast = esprima.parse(src, {
    comment: true,
    loc: true
  });
  var attributes = [];

  ast.comments.forEach(parseComment);

  function parseComment(node) {
    var char;
    var attribute;
    var comment = node.value.replace(/\r\n/gm, '\n');
    var nextChar;
    var lineNum = node.loc.start.line;

    // strip preceding *
    comment = comment.replace(/\n\s+\*\s/g, '\n');

    for (var i = 0; i < comment.length; i++) {
      char = comment[i];
      nextChar = comment[i + 1];

      if(char === '\n') {
        lineNum++;
      }

      if(char === '@' && !(/\s/.test(nextChar))) {
        if(attribute) yield(attribute);
        attribute = {name: '', line: lineNum};
        continue;
      }

      if(attribute && attribute.value === undefined) {
        if(/\s/.test(char)) {
          // start the value
          attribute.value = '';
        } else {
          attribute.name += char;
        }
      } else if(attribute) {
        // skip last newline
        if(char === '\n' && i === comment.length - 1) continue;
        attribute.value += char;
      }
    };

    if(attribute) yield(attribute);
  }

  function yield(attribute) {
    var val = attribute.value;
    var split = val && val.split('');
    var lastChar = split.pop();

    if(lastChar !== '\n') {
      split.push(lastChar);
    }

    attribute.value = split.join('');
    attributes.push(attribute);
  }

  return attributes;
}

