const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const folders = ['components', 'hooks', 'utils'];

const generateExports = (files, type) => {
  const exports = files.map((file) => {
    const baseName = path.basename(file, '.ts');
    const isTSX = type === 'components' ? 'tsx' : 'ts';

    // 读取文件内导出的接口和类型
    const fileContent = fs.readFileSync(
      path.join(srcDir, type, file, `index.${isTSX}`),
      'utf8',
    );
    const interfaceRegex = /export interface ([\w\d_]+) {$/gm;
    const typeRegex = /export type\s+([\w\d_]+)\s*=\s*/g;
    const interfaces = [...fileContent.matchAll(interfaceRegex)].map(
      (match) => match[1],
    );
    const types = [...fileContent.matchAll(typeRegex)].map((match) => match[1]);

    console.log(types);
    let expType = '';
    if (interfaces.length > 0 || types.length > 0) {
      const typeArr = [...new Set([...interfaces, ...types])].join(', ');
      expType = `\nexport type { ${typeArr} } from './${type}/${baseName}';`;
    }

    // 生成导出语句
    const exp = `export { default as ${baseName} } from './${type}/${baseName}';`;
    return exp + `${expType}`;
  });
  return exports.join('\n');
};

const generateIndexFile = () => {
  let output = '';
  folders.forEach((type) => {
    const itemPath = path.join(srcDir, type);
    const files = fs.readdirSync(itemPath).filter((i) => !i.startsWith('.'));
    const exportStatements = generateExports(files, type);
    output += `// ${type}\n${exportStatements}\n\n`;
  });
  fs.writeFileSync(path.join(srcDir, 'index.ts'), output, 'utf8');
};

// const watchDirs = (dir) => {
//   fs.watch(dir, (eventType, filename) => {
//     if (eventType === 'rename') {
//       generateIndexFile();
//       console.log(`文件发生了改变，重新生成 ${dir}`);
//     }
//   });
// };

const main = () => {
  generateIndexFile();
  // folders.forEach((type) => {
  //   const itemPath = path.join(srcDir, type);
  //   watchDirs(itemPath);
  // });
};

main();
