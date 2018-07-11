let babel = require('babel-core');
let code = `const a = (a,b)=>a+b`;
let types = require('babel-types');
// es5
let v = {
  visitor:{
    ArrowFunctionExpression(path) {
      let body = path.node.body;
      let params = path.node.params;
      let blockStateMent;
      if (!types.isBlockStatement(path.node.body)){
        let ret = types.returnStatement(body);
        blockStateMent = types.blockStatement([ret]);
      }else{
        blockStateMent = body
      }
      let func = types.functionExpression(null, params, blockStateMent, false, false);
      path.replaceWith(func);
    }
  }
}
let arrowFunc = v
code = babel.transform(code,{
  plugins:[
    arrowFunc
  ]
})
console.log(code.code)