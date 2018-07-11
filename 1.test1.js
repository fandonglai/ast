let esprima = require('esprima');
let code = `function ast(){}`
let result = esprima.parse(code);
// console.log(result);


let estraverse = require('estraverse');

estraverse.traverse(result,{
  enter(node){
    console.log('enter',node.type);
    if(node.type === 'Identifier'){
      node.name += 'start';
    }
  },
  leave(node){
    console.log('leave',node.type);
  }
});

let escodegen = require('escodegen');

let r = escodegen.generate(result);
console.log(r)