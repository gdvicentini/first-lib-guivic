const chalk = require('chalk');
const fs = require('fs');

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function tratarErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));
}

// exemplo1: tratativa de erro com async/await:
async function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch(erro) {
        tratarErro(erro);
    }
}

// exemplo 2: tratativa de erro com Promises
//function pegaArquivo(caminhoDoArquivo) {
//    const encoding = 'utf-8';
//
//    fs.promises.readFile(caminhoDoArquivo, encoding)
//    .then((texto) => console.log(chalk.green(texto)))
//    .catch((erro) => tratarErro(erro))
//}

// exemplo 3: tratativa de erro sem Promises
//function pegaArquivo(caminhoDoArquivo) {
//    const encoding = 'utf-8';
//    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//        if(erro){
//            tratarErro(erro);
//        } else {
//        console.log(chalk.green(texto));
//        }
//    })
//}

//pegaArquivo('./arquivos/texto1.md');

module.exports = pegaArquivo;