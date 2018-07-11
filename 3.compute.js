let babel = require('babel-core');

let types = require('babel-types');


let code = `const a = 6000+10*30*40`;
// let result = const a = 180000
let visitor = {
  BinaryExpression(path){
    let node = path.node;
    let leftVal = node.left.value;
    let rightVal = node.right.value;
    if (!isNaN(leftVal) && !isNaN(rightVal)){
      let r = eval(leftVal + node.operator + rightVal);
      let lit = types.numericLiteral(r);
      let parent = path.parentPath;
      path.replaceWith(lit);
      if (types.isBinaryExpression(parent.node)) {
        visitor.BinaryExpression(parent)
      }
    }
  }
}
let r = babel.transform(code,{
  plugins:[
    { visitor }
  ]
});
console.log(r.code);
