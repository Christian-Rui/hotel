var nomeHotel = 'Letoh';
var listaHospedes = [];
var listaCadastroHospedes = [];

ApresentarNaTela(`Bem vindo ao ${nomeHotel}`);

var nomeUsuario = RetornarNome();

function RetornarNome() {
    var valorNome = ReceberValorUsuario('Por favor, digite o seu nome:');
    if (valorNome == null && !SairEDespedir(confirm('Você deseja sair sem informar seu nome?'))) {
        return RetornarNome();
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
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Reservar Quarto \n\n[ 2 ] - Cadastrar Hospedes \n\n[ 6 ] - Sair do hotel"))
    switch (escolhaOpcao) {
        case 1:
            ReservarQuarto();
            break;
        case 2:
            CadastrarHospedes();
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
    var valorDiaria = RetornarNumeroPositivo("Digite o valor padrão da diária: \n\nOBS: O valor deve ser maior que 0!");

    var quantidadeDias = parseInt(RetornarNumeroPositivo("Digite a quantidade de dias que deseja se hospedar: \n\nOBS: O máximo é até 30 dias! \nPor favor, digite um valor maior que 0!", 30));

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

function RetornarSimOuNao(hospede) {
    var reposta = ReceberValorUsuario(`${nomeUsuario}, você confirma a hospedagem para ${hospede.nome} por ${hospede.dias} dias para o quarto ${hospede.quarto} por R$${hospede.diaria}? S/N`);
    if (reposta === null || VerificarTextoRecebido(reposta, ['s', 'n'])) {

        if (reposta === null || reposta.toLowerCase() === 'n') {
            Inicio();
        } else if (reposta.toLowerCase() === 's') {
            listaHospedes.push(hospede);
            ApresentarNaTela(`${nomeUsuario}, reserva efetuada para ${hospede.nome}`);
            Inicio();
        }
    }
    RetornarSimOuNao(hospede);

}

function VerificarQuartoDisponivel(texto, valorMaximo, quartos) {
    var numeroQuarto = RetornarNumeroPositivo(texto, valorMaximo);
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

function RetornarNumeroPositivo(textoPrompt, max) {
    var valor = ReceberValorUsuario(textoPrompt);
    if (valor === null) {
        confirm('Você deseja cancelar operação e voltar para o menu inicial') ? Inicio() : RetornarNumeroPositivo(textoPrompt, max);
    }
    valor = (VerificarNumeroRecebido(valor) && VerificarMaiorQueZero(Number(valor))) ? Number(valor) : RetornarNumeroPositivo(textoPrompt, max);
    if (max && valor > max) {
        ApresentarNaTela(`O valor "${valor}" não está de acordo com o valor máximo ${max}! \n\nTente novamente.`);
        return RetornarNumeroPositivo(textoPrompt, max);
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

function VerificarTextoRecebido(valor, textosPermitidos) {
    if (isNaN(valor)) {
        if (textosPermitidos && !textosPermitidos.includes(valor.toLowerCase())) {
            var textos = textosPermitidos.join(' e ');
            ApresentarNaTela(`Valor inválido! Apenas será aceito ${textos} para resposta. \n\nTente novamente`);
            return false;
        }
        return true;      
    }
    ApresentarNaTela(`Valor inválido! Apenas caracteres e textos são aceitos. \n\nTente novamente`);
    return false;
    
}



function VerificarMaiorQueZero(valorNumero) {
    if (valorNumero <= 0) {
        ApresentarNaTela(`O valor "${valorNumero}" não está de acordo com a condição do valor ser maior de 0! \n\nTente novamente`);
        return false;
    }
    return true;
}

function CadastrarHospedes() {
    var diariaPadrao = parseFloat(RetornarNumeroPositivo("Digite o valor padrão da diária: \n\nOBS: O valor deve ser maior que 0!"));
    var meia = 0;
    var gratuita = 0;
    var podeParar;
    do {
        var nomeDoHospede = ReceberValorUsuario("Qual o nome do hospede: \n\nOBS: caso digite PARE, o programa irá parar.");

        podeParar = nomeDoHospede == null || nomeDoHospede.toLowerCase() === 'pare';

        if (!podeParar) {
            var idadeHospede = RetornarNumeroPositivo("Qual à idade do hospede: \n\nOBS: O valor deve ser maior que 0!");

            
            var textoPagamento = '';
            if (idadeHospede < 6) {
                textoPagamento = 'possui gratuidade';
                ApresentarNaTela(`${nomeDoHospede} ${textoPagamento}`);
                gratuita++;
            } else if (idadeHospede > 60) {
                textoPagamento = 'paga meia';
                ApresentarNaTela(`${nomeDoHospede} ${textoPagamento}`);
                meia++;
            } else {
                textoPagamento = 'paga valor total';
            }

            const objetoLista = {
                nome: nomeDoHospede,
                idade: idadeHospede,
                tipoDePagamento: textoPagamento
            }
            listaCadastroHospedes.push(objetoLista);
        }

    } while(!podeParar);

    if(listaCadastroHospedes.length > 0){
        var total = 0

    total = diariaPadrao * (listaCadastroHospedes.length - (gratuita + meia));
    alert(meia)
    total += (diariaPadrao * meia) / 2

    ApresentarNaTela(`${nomeUsuario}, o valor total das hospedagens é: R$${total.toFixed(2)}; ${gratuita} gratuidade(s); ${meia} meia(s)`);
    }

    listaCadastroHospedes = [];
    Inicio();
    
}

function CadastroEPesquisa() {

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