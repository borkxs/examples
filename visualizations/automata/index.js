var regParser = require('automata.js');

var parser = new regParser.RegParser('a*b');
var nfa = parser.parseToNFA();

console.log(nfa.toDotScript());
