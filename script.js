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
    var valorDiaria = parseFloat(prompt("Digite o valor da diária desejada:"));
    var quantidadeDias = parseInt(prompt("Digite a quantidade de dias que deseja se hospedar:"));
}

function ReceberValor(texto){
    return prompt()
}


function Inicio(){
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Escolher Quarto \n\n[ 6 ] - Sair do hotel"))
    switch(escolhaOpcao){
        case 1 :
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

function ApresentarNaTela(conteudo){
    alert(conteudo);
}

VerificarSenha();