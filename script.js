var nomeHotel = 'Letoh';
var listaHospedes = [];

ApresentarNaTela(`Bem vindo ao ${nomeHotel}`);

var nomeUsuario = RetornarNome();

function RetornarNome(){
    var valorNome = ReceberValorUsuario('Por favor, digite o seu nome:');
    if(valorNome == null && !SairEDespedir(confirm('Você deseja sair sem informar seu nome?'))){
        RetornarNome();
    }
    return valorNome;
}

function VerificarSenha() {
    var senha = 2678;
    var senhadigitada = RetornarSenha('Digite sua senha: \n\nA senha possui 4 digitos');

    if (senhadigitada === senha) {
        ApresentarNaTela("Senha válida!");
        ApresentarNaTela(`Bem vindo ao hotel ${nomeHotel}, ${nomeUsuario}.\nÉ um imenso prazer ter você por aqui!`);
        Inicio();
    } else {
        ApresentarNaTela('Senha inválida!');
        VerificarSenha();
    }
}

function Inicio() {
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Escolher Quarto \n\n[ 6 ] - Sair do hotel"))
    switch (escolhaOpcao) {
        case 1:
            ReservarQuarto();
            break;
        case 6:
            Sair('Deseja sair do hotel: ')
            break;
        default:
            Erro(escolhaOpcao);
    }
}

function ReservarQuarto() {
    var quantidadeQuartos = 20;
    var valorDiaria = RetornarValorNumerico("Digite o valor padrão da diária: \n\nOBS: O valor deve ser maior que 0!");

    var quantidadeDias = RetornarValorNumerico("Digite a quantidade de dias que deseja se hospedar: \n\nOBS: O máximo é até 30 dias! \nPor favor, digite um valor maior que 0!", 30);

    var nomeDoHospede = ReceberValorUsuario("Digite o nome do hospede: ");

    var quartosTexto = '';
    var listaQuartosDisponiveis = []
    for (var i = 1; i <= quantidadeQuartos; i++) {
        var quartoOcupado = false;
        for (var j = 0; j < listaHospedes.length; j++) {
            if (listaHospedes[j].quarto === i) {
                quartoOcupado = true;    
            }
        }
        if (!quartoOcupado) {
            quartosTexto += `[ ${i} ] `;
            listaQuartosDisponiveis.push(i);
        }
    }

    var quartoEscolhido = VerificarQuartoDisponivel(`Digite o número do quarto que deseja ( de 1 a 20: \n\nQuartos ainda disponíveis: \n${quartosTexto}`, quantidadeQuartos, listaQuartosDisponiveis);

    const objetoLista = {
        nome: nomeDoHospede,
        dias: quantidadeDias,
        quarto: quartoEscolhido,
        diaria: (valorDiaria * quantidadeDias).toFixed(2)
    }

    RetornarSimOuNao(objetoLista);
}

function RetornarSimOuNao(hospede){
    var reposta = ReceberValorUsuario(`${nomeUsuario}, você confirma a hospedagem para ${hospede.nome} por ${hospede.dias} dias para o quarto ${hospede.quarto} por R$${hospede.diaria}? S/N`);
    if(reposta === null || VerificarLetraRecebido(reposta)) {
        
        if(reposta === null || reposta.toLowerCase() === 'n'){
            Inicio();
        } else if(reposta.toLowerCase() === 's'){
            listaHospedes.push(hospede);
            ApresentarNaTela(`${nomeUsuario}, reserva efetuada para ${hospede.nome}`);
            Inicio();
        }   
    }
        RetornarSimOuNao(hospede);
    
}

function VerificarQuartoDisponivel(texto, valorMaximo, quartos) {
    var numeroQuarto = RetornarValorNumerico(texto, valorMaximo);
    if (!quartos.includes(numeroQuarto)) {
        ApresentarNaTela(`Quarto ${numeroQuarto} já está ocupado! Escolha outro quarto`);
        return VerificarQuartoDisponivel(texto, valorMaximo, quartos);
    }
    return numeroQuarto;

}

function RetornarSenha(textoPrompt) {
    var valor = ReceberValorUsuario(textoPrompt);
    if (valor === null) {
        if (!SairEDespedir(confirm('Você deseja cancelar operação'))) {
            return RetornarSenha(textoPrompt);
        }
    }
    valor = VerificarNumeroRecebido(valor) ? parseInt(valor) : RetornarSenha(textoPrompt);
    return valor;
}

function RetornarValorNumerico(textoPrompt, max) {
    var valor = ReceberValorUsuario(textoPrompt);
    if (valor === null) {
        confirm('Você deseja cancelar operação e voltar para o menu inicial') ? Inicio() : RetornarValorNumerico(textoPrompt, max);
    }
    valor = (VerificarNumeroRecebido(valor) && VerificarMaiorQueZero(Number(valor))) ? Number(valor) : RetornarValorNumerico(textoPrompt, max);
    if (max && valor > max) {
        ApresentarNaTela(`O valor "${valor}" não está de acordo com o valor máximo ${max}! \n\nTente novamente.`);
        return RetornarValorNumerico(textoPrompt, max);
    }
    return valor;
}

function ReceberValorUsuario(textoPrompt) {
    var valorPrompt = window.prompt(textoPrompt);
    if (valorPrompt === null) {
        return null;
    }
    return VerificarPrompt(valorPrompt) ? valorPrompt : ReceberValorUsuario(textoPrompt);
}

function VerificarPrompt(valor) {
    if (valor.trim() === '') {
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

function VerificarLetraRecebido(valor) {
    if (!isNaN(valor) || valor.toLowerCase() != 's' && valor.toLowerCase() != 'n') {
        ApresentarNaTela("Valor inválido! Apenas será aceitos as letras N ou S para resposta. \n\nTente novamente");
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

function Erro(numero) {
    ApresentarNaTela(`O número ${numero} não corresponde a uma opção válida! Tente novamente.`);
    Inicio();
}

function ApresentarNaTela(conteudo) {
    alert(conteudo);
}

function Sair(texto) {
    if (!SairEDespedir(confirm(texto))) {
        Inicio();
    }
}

function SairEDespedir(confirmar) {
    if (confirmar) {
        alert(`Muito obrigado e até logo, ${nomeUsuario != null ? nomeUsuario : 'Desconhecido'}`);
        window.close();
    }
    return confirmar;

}

VerificarSenha();