var nomeHotel = 'Letoh';

ApresentarNaTela(`Bem vindo ao ${nomeHotel}`);

var nomeUsuario = prompt('Por favor, digite o seu nome: ');

function VerificarSenha(){
    var senhadigitada = window.prompt('Digite sua senha: ');
    var senha = 2678;

    if(parseInt(senhadigitada) === senha){
        ApresentarNaTela("Senha válida!");
        ApresentarNaTela(`Bem vindo ao hotel ${nomeHotel}, ${nomeUsuario}.\nÉ um imenso prazer ter você por aqui!`);
        Inicio();

    }  
    else if(senhadigitada.trim() === ""){
        ApresentarNaTela("Nenhum senha foi inserida... Tente novamente");
        VerificarSenha();
    } else{
        ApresentarNaTela('Senha inválida!');
        VerificarSenha();
    }
}

function EscolherQuarto(){
    var quantidadeQuartos = 20;
    var valorDiaria = RetornarValorNumerico("Digite o valor da diária desejada: \n\nOBS: O valor deve ser maior que 0!");
    var dias = RetornarValorNumerico("Digite a quantidade de dias que deseja se hospedar: \n\nOBS: O máximo é até 30 dias! \nPor favor, digite um valor maior que 0!", 30);
}

function RetornarValorNumerico(textoPrompt, max) {
    var valor = ReceberValorUsuario(textoPrompt);
    valor = (VerificarNumeroRecebido(valor) && VerificarMaiorQueZero(Number(valor))) ? Number(valor) : RetornarValorNumerico(textoPrompt, max); 
    if(max && valor > max){
        ApresentarNaTela(`O valor "${valor}" não está de acordo com o valor máximo ${max}! \n\nTente novamente.`);
        return RetornarValorNumerico(textoPrompt, max);
    }
    return valor;
}

function ReceberValorUsuario(textoPrompt) {
    var valorPrompt = window.prompt(textoPrompt);
    return VerificarPrompt(valorPrompt) ? valorPrompt : ReceberValorUsuario(textoPrompt);
}

function VerificarPrompt(valor) {
    if (valor === null) {
        return confirm('Você deseja cancelar operação e voltar para o menu inicial') ? Inicio() : false;
    } else if (valor.trim() === '') {
        ApresentarNaTela("Nada foi digitado! \n\nTente novamente");
        return false;
    }
    return true;
}

function VerificarNumeroRecebido(valor) {
    if (isNaN(valor)) {
        ApresentarNaTela("Valor inválido! Apenas números são aceitos. \n\nTente novamente");
        return false;
    }
    return true;
}

function VerificarMaiorQueZero(valorNumero) {
    if (valorNumero <= 0) {
        ApresentarNaTela(`O valor "${valorNumero}" não está de acordo com a condição do valor ser maior de 0! \n\nTente novamente`);
        return false;
    }
    return true;
}

function Inicio() {
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Escolher Quarto \n\n[ 6 ] - Sair do hotel"))
    switch (escolhaOpcao) {
        case 1:
            EscolherQuarto();
            break;
        case 6:
            ApresentarNaTela(`Muito obrigado e até logo, ${nomeUsuario}.`);
            break;
        default:
            Erro(escolhaOpcao);
    }
}

function Erro(numero){
    ApresentarNaTela(`O número ${numero} não corresponde a uma opção válida! Tente novamente.`);
    Inicio();
}

function ApresentarNaTela(conteudo) {
    alert(conteudo);
}

VerificarSenha();