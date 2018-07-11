let babel = require('babel-core');

let types = require('babel-types');
let code = `class Zfpx {
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  getName(){
    return this.name;
  }
  getAge(){
    return this.age;
  }
}
`

let v = {
  visitor:{
    ClassDeclaration(path){
      let node = path.node;
      // 获取函数名字
      let className = node.id.name;
    
      let classInner = node.body.body; //体

      let es5 = [];
      let FunName = types.identifier(className);
      // 通过标识符 创建一个函数
      let constructorFn = types.functionDeclaration(FunName,[types.identifier('')],types.blockStatement([]),false,false);


      
      classInner.forEach((item,index) => {
        if(item.kind === 'constructor'){
          console.log('xxx');
          let construtorParams = item.params.length ? item.params.map(item=>item.name) : []// 所有参数
          construtorParams = types.identifier(construtorParams);
          let body =  classInner[index].body;
          constructorFn = types.functionDeclaration(FunName, [construtorParams], body, false,false)
        }else{
          let protoObj = types.memberExpression(types.identifier(className),types.identifier('prototype'));
          let left = types.memberExpression(protoObj,types.identifier(item.key.name));

          let body = classInner[index].body;

          let right = types.functionExpression(null, [], body,false,false)

          let assign = types.assignmentExpression('=', left,right);
          
          es5.push(assign);
        }
      });
      es5.push(constructorFn);
      if(es5.length>1){
        path.replaceWithMultiple(es5);
      }else{
        path.replaceWith(constructorFn);
      }
    }
  }
}
let classPlugin = v;
code = babel.transform(code,{
  plugins:[
    classPlugin
  ]
});
console.log(code.code);