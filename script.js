var nomeHotel = 'Letoh';
var listaHospedes = [];
var listaCadastroHospedes = [];
var nomesHospedes = [];

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
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Reservar Quarto \n\n[ 2 ] - Cadastrar Hospedes \n\n[ 3 ] - Cadastrar e Pesquisar \n\n[ 4 ] - Eventos\n\n [ 5 ] - Passeios\n\n [ 6 ] - Manutenção\n\n[ 7 ] - Sair do hotel"))
    switch (escolhaOpcao) {
        case 1:
            ReservarQuarto();
            break;
        case 2:
            CadastrarHospedes();
            break;
        case 3:
            CadastroEPesquisa();
            break;
        case 4:
            Eventos();
            break;
        case 5:
            Passeios();
            break;
        case 6:
            Manuntencao();
            break;
        case 7:
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

    // var quantidadeMaximaDeQuartos = 20;
    // var quarto = prompt('Digite o número do quarto que deseja (de 1 a 20): ');
    // var listaQuartosReservados = []
    // if (listaQuartosReservados.length > 0) {
    //     if (listaCadastroHospedes.includes(quarto)) {
    //         alert('Quarto já está ocupado');
    //     } else if (quarto < 0 || quarto > quantidadeMaximaDeQuartos) {
    //         alert('Valor inválido');
    //     } else {
    //         listaQuartosReservados.push(quarto);
    //     }
    // } else {
    //     listaQuartosReservados.push(quarto);
    // }
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
        Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : RetornarNumeroPositivo(textoPrompt, max);
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

    } while (!podeParar);

    if (listaCadastroHospedes.length > 0) {
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
    var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Cadastrar \n\n[ 2 ] - Pesquisar \n\n[ 3 ] - Listar\n\n[ 4 ] - Sair"))
    switch (escolhaOpcao) {
        case 1:
            Cadastrar();
            break;
        case 2:
            Pesquisar();
            break;
        case 3:
            Listar();
            break;
        case 4:
            Sair('Deseja voltar para o menu inicial: ')
            break;
        default:
            Erro(escolhaOpcao);
    }
}



function Cadastrar() {
    var hospede = ReceberValorUsuario("Qual o nome do hospede: ");

    if (hospede === null) {
        Cancelar("Você deseja cancelar operação e voltar para o menu anterior") ? CadastroEPesquisa() : Cadastrar();
    }

    if ((nomesHospedes.length + 1) < 3) {
        nomesHospedes.push(hospede.toLowerCase());
    } else {
        ApresentarNaTela("Máximo de cadastros atingido");
    }
    CadastroEPesquisa()
}

function Pesquisar() {
    var hospede = ReceberValorUsuario("Qual o nome do hospede você deseja pesquisar: ");

    if (hospede === null) {
        Cancelar("Você deseja cancelar operação e voltar para o menu anterior") ? CadastroEPesquisa() : Pesquisar();
    }

    if (nomesHospedes.includes(hospede.toLowerCase())) {
        ApresentarNaTela(`Hospede ${nomesHospedes[nomesHospedes.indexOf(hospede.toLowerCase())]} foi encontrado`);
    } else {
        ApresentarNaTela('Hospede não encontrado');
    }

    CadastroEPesquisa();
}

function Listar() {
    ApresentarNaTela(`Os hospedes cadastrados no hotel são: \n\n${nomesHospedes.join(', ')}`);
    CadastroEPesquisa();
}




function Eventos() {
    var laranja = 150;
    var laranjaAdicional = 70;

    var colorado = 350;

    var convidados = RetornarNumeroPositivo('Qual é o número de convidados para esse evento: \n\nOBS: Numero mínimo de convidade é 1, e o máximo é de 350!', colorado);

    if (convidados === null) {
        Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
    }

    var adicionaisNecessarios = 0;
    var textoAuditorio = '';
    if (convidados < (laranja + laranjaAdicional)) {
        textoAuditorio = 'Use o auditório Laranja'
        if (convidados > laranja) {
            adicionaisNecessarios = convidados - laranja;
            textoAuditorio += ` inclua mais ${adicionaisNecessarios} cadeiras)`
        }
    } else {
        textoAuditorio = 'Use o auditório Colorado';
    }
    ApresentarNaTela(textoAuditorio)
    ApresentarNaTela('Agora vamos ver a agenda do evento');

    var reservaMinima = 7;
    var reservaMaximaSemana = 23;
    var reservaMaximaFimDeSemana = 15;

    var diaSemana = ReceberValorUsuario('Qual o dia da semana que deseja reservar: ');

    var semana = ['segunda', 'terça', 'quarta', 'quinta', 'sexto'];
    var fimSemana = ['sabado', 'domingo'];
    if (diaSemana === null) {
        Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
    }

    var horario = parseInt(RetornarNumeroPositivo('Qual o horário deseja reservar: '));

    var textoReserva = '';
    if (semana.includes(diaSemana) && horario >= reservaMinima && horario <= reservaMaximaSemana || fimSemana.includes(diaSemana) && horario >= reservaMinima && horario <= reservaMaximaFimDeSemana) {

        textoReserva = 'Auditório disponível';
        ApresentarNaTela(textoReserva);
    } else {
        textoReserva = 'Auditório indisponível';
        ApresentarNaTela(textoReserva);
        Eventos();
    }

    var nomeEmpresa = ReceberValorUsuario('Qual o nome da empresa: ');

    if (nomeEmpresa === null) {
        Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
    }

    ApresentarNaTela(`Auditório reservado para ${nomeEmpresa}: ${diaSemana} às ${horario}hs`);

    var garcomPagamento = 10.50;

    var duracao = RetornarNumeroPositivo("Qual a duração do evento em horas? ");

    var garcomPorConvidado = Math.ceil(convidados / 12);

    var garcomPorHora = Math.ceil(duracao / 2);

    var custo = parseFloat((garcomPagamento * duracao) * (garcomPorConvidado + garcomPorHora));

    ApresentarNaTela(`São necessários ${garcomPorConvidado + garcomPorHora} garçons`);
    ApresentarNaTela(`Custo: R$${custo.toFixed(2)}`);
    ApresentarNaTela('Agora vamos calcular o custo do buffet do hotel para o Eventos.')


    var cafePorPessoa = 0.2;
    var aguaPorPessoa = 0.5;
    var salgadosPorPessoa = 7;

    var precoCafe = 0.80;
    var precoAgua = 0.40;
    var precoSalgado = 34;

    var quantidadeBuffet = {};

    quantidadeBuffet.cafe = cafePorPessoa * convidados;
    quantidadeBuffet.agua = aguaPorPessoa * convidados;
    quantidadeBuffet.salgados = salgadosPorPessoa * convidados;

    var valorBuffet = {};

    valorBuffet.cafe = Math.ceil(quantidadeBuffet.cafe) * precoCafe;
    valorBuffet.agua = Math.ceil(quantidadeBuffet.agua) * precoAgua;
    valorBuffet.salgados = Math.ceil(quantidadeBuffet.salgados / 100) * precoSalgado;

    ApresentarNaTela(`O evento precisará de ${quantidadeBuffet.cafe} litros de café, ${quantidadeBuffet.agua} litros de água, ${quantidadeBuffet.salgados} salgados`);

    var aceitoCustos = confirm(`O café irá custar R$${valorBuffet.cafe}, a água R$${valorBuffet.agua}, e os salgados R$${valorBuffet.salgados}.\nNo total será R$${valorBuffet.cafe + valorBuffet.agua + valorBuffet.salgados}`);

    if (aceitoCustos) {
        var podeReservar = VerificarTextoRecebido(ReceberValorUsuario('Gostaria de efetuar a reserva? S/N'), ['s', 'n']);
        if (podeReservar) {
            ApresentarNaTela(`${nomeUsuario}, reserva efetuada com sucesso.`);
            Inicio();
        } else {
            ApresentarNaTela(('Reserva não efetuada.'));
            Eventos();
        }
    } else {
        Eventos();
    }
}

function Passeios() {
    var wayne = {};
    var stark = {};
    wayne.nome = 'Wayne Oil';
    wayne.alcool = RetornarNumeroPositivo('Qual o valor do álcool no posto Wayne Oil? ');
    wayne.gasolina = RetornarNumeroPositivo('Qual o valor da gasolina no posto Wayne Oil? ');

    stark.nome = 'StarkPetrol'
    stark.alcool = RetornarNumeroPositivo('Qual o valor do álcool no posto Stark Petrol? ');
    stark.gasolina = RetornarNumeroPositivo('Qual o valor da gasolina no posto Stark Petrol? ');

    var alcoolBarato = wayne.alcool < stark.alcool ? wayne : stark;
    var gasolinaBarata = wayne.gasolina < stark.gasolina ? wayne : stark;

    var porcentagem = (alcoolBarato.alcool / gasolinaBarata.gasolina) * 100;

    if (porcentagem <= 30) {
        ApresentarNaTela(`${nomeUsuario}, é mais barato abastecer com alcool no posto ${alcoolBarato.nome}\nO valor final será de R$${alcoolBarato.alcool * 42}`);
    } else {
        ApresentarNaTela(`${nomeUsuario}, é mais barato abastecer com gasolina no posto ${gasolinaBarata.nome}\nO valor final será de R$${gasolinaBarata.gasolina * 42}`);
    }

    Inicio();

}

function Manuntencao() {
    var listaEmpresas = [];
    do {
        const empresas = {}

        empresas.nome = ReceberValorUsuario('Qual o nome da empresa?')
        var valorServico = RetornarNumeroPositivo('Qual o valor por aparelho?');
        var quantidadeAparelhos = RetornarNumeroPositivo('Qual a quantidade de aparelhos?');
        var desconto = ReceberValorUsuario('Qual a porcentagem de desconto?');
        var quantidadeMin = RetornarNumeroPositivo('Qual o número mínimo de aparelhos para conseguir o desconto?');

        var valorTotal = valorServico * quantidadeAparelhos;
        console.log(valorTotal);
        var valorDescontoTotal = 0;
        console.log(valorDescontoTotal);
        if (quantidadeAparelhos >= quantidadeMin) {
            valorDescontoTotal = desconto == 0 ? valorTotal : valorTotal * (1 - desconto / 100);
            console.log(valorDescontoTotal);
            ApresentarNaTela(`O serviço de ${empresas.nome} custará R$${valorDescontoTotal.toFixed(2)}`);
            console.log(valorTotal);
            empresas.valorFinal = valorDescontoTotal;
        } else {
            ApresentarNaTela(`O serviço de ${empresas.nome} custará R$${valorTotal}`);
            empresas.valorFinal = valorTotal;
        }
        listaEmpresas.push(empresas);
    } while (prompt(`Deseja informar novos dados, ${nomeUsuario}`) === 'n');

    var menorValor = listaEmpresas.reduce((menor, objeto) => {
        return objeto.valorFinal < menor.valorFinal ? objeto : menor;
    });

    ApresentarNaTela(`O orçamento de menor vlaor é o ${menorValor.nome} por R$${menorValor.valorFinal}`);
}









function Cancelar(texto) {
    return confirm(texto);
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