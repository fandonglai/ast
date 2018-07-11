// babel-preset-import


let babel = require('babel-core');

let t = require('babel-types');

const code = `import {Button} from 'antd'
  console.log(Button);
`;
let visitor = {
    ImportDeclaration(path, _ref = { opts: {} }) {
      const specifiers = path.node.specifiers;
      const source = path.node.source;
      // 只有libraryName满足才会转码
      if ((!t.isImportDefaultSpecifier(specifiers[0]))) { //_ref.opts是传进来的参数
        var declarations = specifiers.map((specifier) => {      //遍历  uniq extend flatten cloneDeep
          return t.ImportDeclaration(                         //创建importImportDeclaration节点
            [t.importDefaultSpecifier(specifier.local)],
            t.StringLiteral(`${source.value}/${specifier.local.name}`)
          )
        })
        path.replaceWithMultiple(declarations)
      }
    }
}
let r = babel.transform(code,{
  plugins:[
    {visitor}
    // ['import', { libraryName:'antd'}] 
  ]
})
console.log(r.code);