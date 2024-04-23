var nomeHotel = 'Letoh';
var listaHospedes = [];
var listaCadastroHospedes = [];
var nomesHospedes = [];

var objetoCancelar = {
    texto: 'e voltar para o menu principal',
    funcao: Inicio
}

alert(`Bem vindo ao ${nomeHotel}`);

/* 
//Variaveis de exemplo

var test1 = RestrigirNumero(() => RetornarValorUsuario(
    'numero',
    'Digite um número',
    'Sair do banheiro',
    Testar2
), {min: 1, max: 350});

var test2 = RestrigirNumero(() => RetornarValorUsuario({
    tipo: 'numero',
    texto: 'Digite um número',
    funcaoCancela: Testar2
}), {min: 0, max: 30});

var test3 = RetornarValorUsuario({
    tipo: 'letra',
    texto: 'Digite uma letra',
    textoCancelar: 'Sair do quarto',
    funcaoCancela: Testar1
}); 

function Testar1() {
    alert('opa');
}

function Testar2() {
    alert('ae muleke foi')
}
 */


function RetornarValorUsuario(tipo, texto, textoCancelar, funcaoCancela) {
    while (true) {
        let valorUsuario = window.prompt(texto);

        if (valorUsuario == null) {
            if (confirm(`Você deseja cancelar a operação ${textoCancelar}?`)) {
                return funcaoCancela();
            }
        } else if (valorUsuario.trim() === '') {
            alert("Nada foi digitado! \n\nTente novamente");
        } else if ((isNaN(valorUsuario) ? 'letra' : 'numero') !== tipo) {
            alert(`Valor inválido!\n\nDigite apenas valores que sejam ${tipo}s`);
        } else {
            return tipo === 'numero' ? Number(valorUsuario) : valorUsuario;
        }
    }
}

function RestrigirNumero(funcaoValorUsuario, limitadores) {
    var RepetirFuncao = () => RestrigirNumero(funcaoValorUsuario, limitadores);
    var numero = funcaoValorUsuario();

    function alertaLimite(limiteTexto, limite) {
        alert(`O valor "${numero}" não está de acordo com o valor ${limiteTexto} aceitável: "${limite}"! \n\nTente novamente.`);
    }

    if (limitadores.min != undefined && numero < limitadores.min) {
        alertaLimite("mínimo", limitadores.min);
        return RepetirFuncao();
    }

    if (limitadores.max != undefined && numero > limitadores.max) {
        alertaLimite("máximo", limitadores.max);
        return RepetirFuncao();
    }

    return numero;
}

function RestringirTexto(funcaoValorUsuario, arrayTextosPermitidos) {
    while (true) {
        var valorTexto = funcaoValorUsuario();

        if (!arrayTextosPermitidos.includes(valorTexto.toLowerCase())) {
            alert(`Valor inválido! Apenas será aceito ${arrayTextosPermitidos.join(' e ')} para resposta. \n\nTente novamente`);
        } else {
            return valorTexto.toLowerCase();
        }
    }
}

var nomeUsuario = RetornarValorUsuario(
    'letra',
    'Por favor, digite o seu nome:',
    'sem informar seu nome',
    SairEDespedirTeste
);

function VerificarSenha() {
    var senha = 2678;
    var digitosMax = 4;
    var senhadigitada = RetornarValorUsuario(
        "numero",
        `Digite sua senha: \n\nA senha possui ${digitosMax} dígitos`,
        "e sair do programa",
        SairEDespedirTeste
    );

    var quantidadeSenha = senhadigitada.toString().length;

    if (quantidadeSenha > digitosMax || quantidadeSenha < digitosMax) {
        alert(`Senha inválida!\n\nA quantidade de número digitados foi ${quantidadeSenha}, e a senha possuí ${digitosMax} dígitos`);
        VerificarSenha();
    } else if (senhadigitada !== senha) {
        alert('Senha inválida!');
        VerificarSenha();
    } else {
        ApresentarNaTela("Senha válida!");
        ApresentarNaTela(`Bem vindo ao hotel ${nomeHotel}, ${nomeUsuario}.\nÉ um imenso prazer ter você por aqui!`);
        Inicio();
    }
}

function Inicio() {
    var listaEscolha = ['Reservar Quarto', 'Cadastrar Hospedes', 'Cadastrar e Pesquisar', 'Eventos', 'Passeios', 'Manuntenção', 'Sair do Hotel'];
    var textoEscolha = 'Digite qual opção deseja:';

    for (var i = 0; i < listaEscolha.length; i++) {
        textoEscolha += `\n[ ${i + 1} ] ${listaEscolha[i]}`;
    }

    var escolhaOpcao = RetornarValorUsuario(
        'numero',
        textoEscolha,
        'e sair do programa',
        SairEDespedirTeste
    );

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
            Erro(escolhaOpcao, listaEscolha.length);
    }
}

function ReservarQuarto() {
    var quantidadeQuartos = 20;
    var valorDiaria = RestrigirNumero(() => RetornarValorUsuario(
        'numero',
        'Digite o valor padrão da diária: \n\nOBS: O valor minímo é 1!',
        objetoCancelar.texto,
        objetoCancelar.funcao
    ), { min: 1 });

    var quantidadeDias = RestrigirNumero(() => RetornarValorUsuario(
        'numero',
        'Digite a quantidade de dias que deseja se hospedar: \n\nOBS: O máximo é até 30 dias! \nNo mínimo é de 1 dia!',
        objetoCancelar.texto,
        objetoCancelar.funcao
    ), { min: 1, max: 30 });

    var nomeDoHospede = RetornarValorUsuario(
        'letra',
        'Digite o nome do hospede:',
        objetoCancelar.texto,
        objetoCancelar.funcao
    );

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

    var quartoEscolhido = VerificarQuartoDisponivel(quartosTexto, quantidadeQuartos, listaQuartosDisponiveis);

    const objetoLista = {
        nome: nomeDoHospede,
        dias: quantidadeDias,
        quarto: quartoEscolhido,
        diaria: (valorDiaria * quantidadeDias).toFixed(2)
    }

    var reposta = RestringirTexto(() => RetornarValorUsuario(
        'letra',
        `${nomeUsuario}, você confirma a hospedagem para ${objetoLista.nome} por ${objetoLista.dias} dias para o quarto ${objetoLista.quarto} por R$${objetoLista.diaria}? S/N`,
        objetoCancelar.texto,
        objetoCancelar.funcao
    ), ['s', 'n']);

    if (reposta === 's') {
        listaHospedes.push(objetoLista);
        ApresentarNaTela(`${nomeUsuario}, reserva efetuada para ${objetoLista.nome}`);
        Inicio();
    } else {
        Inicio();
    }
}

function VerificarQuartoDisponivel(quartosTexto, valorMaximo, quartos) {
    while (true) {
        var numeroQuarto = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            `Digite o número do quarto que deseja ( de 1 a 20: \n\nQuartos ainda disponíveis: \n${quartosTexto}`,
            objetoCancelar.texto,
            objetoCancelar.funcao
        ), { min: 1, max: valorMaximo });

        if (!quartos.includes(numeroQuarto)) {
            alert(`Quarto ${numeroQuarto} já está ocupado! Escolha outro quarto`);
        } else {
            return numeroQuarto;
        }
    }
}

function CadastrarHospedes() {
    var diariaPadrao = RestrigirNumero(() => RetornarValorUsuario(
        'numero',
        `Digite o valor padrão da diária: \n\nOBS: O valor deve ser no minimo 1!`,
        objetoCancelar.texto,
        objetoCancelar.funcao
    ), { min: 1 });

    var meia = 0;
    var gratuita = 0;

    while (true) {
        var nomeDoHospede = RetornarValorUsuario(
            'letra',
            "Qual o nome do hospede: \n\nOBS: caso digite PARE, o programa irá parar.",
            objetoCancelar.texto,
            objetoCancelar.funcao
        )

        if (nomeDoHospede.toLowerCase() === 'pare') {
            break;
        }

        var idadeHospede = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            `Qual à idade do hospede: \n\nOBS: O valor deve ser no minimo 1!!`,
            objetoCancelar.texto,
            objetoCancelar.funcao
        ), { min: 1 });

        var textoPagamento = '';
        if (idadeHospede < 6) {
            textoPagamento = 'possui gratuidade';
            alert(`${nomeDoHospede} ${textoPagamento}`);
            gratuita++;
        } else if (idadeHospede > 60) {
            textoPagamento = 'paga meia';
            alert(`${nomeDoHospede} ${textoPagamento}`);
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


    if (listaCadastroHospedes.length > 0) {
        var total = 0

        total = diariaPadrao * (listaCadastroHospedes.length - (gratuita + meia));
        total += (diariaPadrao * meia) / 2

        alert(`${nomeUsuario}, o valor total das hospedagens é: R$${total.toFixed(2)}; ${gratuita} gratuidade(s); ${meia} meia(s)`);
    }

    listaCadastroHospedes = [];
    Inicio();

}

// function CadastroEPesquisa() {
//     var escolhaOpcao = parseInt(prompt("Digite qual opção deseja: \n\n[ 1 ] - Cadastrar \n\n[ 2 ] - Pesquisar \n\n[ 3 ] - Listar\n\n[ 4 ] - Sair"))
//     switch (escolhaOpcao) {
//         case 1:
//             Cadastrar();
//             break;
//         case 2:
//             Pesquisar();
//             break;
//         case 3:
//             Listar();
//             break;
//         case 4:
//             Sair('Deseja voltar para o menu inicial: ')
//             break;
//         default:
//             Erro(escolhaOpcao);
//     }
// }



// function Cadastrar() {
//     var hospede = ReceberValorUsuario("Qual o nome do hospede: ");

//     if (hospede === null) {
//         Cancelar("Você deseja cancelar operação e voltar para o menu anterior") ? CadastroEPesquisa() : Cadastrar();
//     }

//     if ((nomesHospedes.length + 1) < 3) {
//         nomesHospedes.push(hospede.toLowerCase());
//     } else {
//         ApresentarNaTela("Máximo de cadastros atingido");
//     }
//     CadastroEPesquisa()
// }

// function Pesquisar() {
//     var hospede = ReceberValorUsuario("Qual o nome do hospede você deseja pesquisar: ");

//     if (hospede === null) {
//         Cancelar("Você deseja cancelar operação e voltar para o menu anterior") ? CadastroEPesquisa() : Pesquisar();
//     }

//     if (nomesHospedes.includes(hospede.toLowerCase())) {
//         ApresentarNaTela(`Hospede ${nomesHospedes[nomesHospedes.indexOf(hospede.toLowerCase())]} foi encontrado`);
//     } else {
//         ApresentarNaTela('Hospede não encontrado');
//     }

//     CadastroEPesquisa();
// }

// function Listar() {
//     ApresentarNaTela(`Os hospedes cadastrados no hotel são: \n\n${nomesHospedes.join(', ')}`);
//     CadastroEPesquisa();
// }




// function Eventos() {
//     var laranja = 150;
//     var laranjaAdicional = 70;

//     var colorado = 350;

//     var convidados = RetornarNumeroPositivo('Qual é o número de convidados para esse evento: \n\nOBS: Numero mínimo de convidade é 1, e o máximo é de 350!', colorado);

//     if (convidados === null) {
//         Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
//     }

//     var adicionaisNecessarios = 0;
//     var textoAuditorio = '';
//     if (convidados < (laranja + laranjaAdicional)) {
//         textoAuditorio = 'Use o auditório Laranja'
//         if (convidados > laranja) {
//             adicionaisNecessarios = convidados - laranja;
//             textoAuditorio += ` inclua mais ${adicionaisNecessarios} cadeiras)`
//         }
//     } else {
//         textoAuditorio = 'Use o auditório Colorado';
//     }
//     ApresentarNaTela(textoAuditorio)
//     ApresentarNaTela('Agora vamos ver a agenda do evento');

//     var reservaMinima = 7;
//     var reservaMaximaSemana = 23;
//     var reservaMaximaFimDeSemana = 15;

//     var diaSemana = ReceberValorUsuario('Qual o dia da semana que deseja reservar: ');

//     var semana = ['segunda', 'terça', 'quarta', 'quinta', 'sexto'];
//     var fimSemana = ['sabado', 'domingo'];
//     if (diaSemana === null) {
//         Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
//     }

//     var horario = parseInt(RetornarNumeroPositivo('Qual o horário deseja reservar: '));

//     var textoReserva = '';
//     if (semana.includes(diaSemana) && horario >= reservaMinima && horario <= reservaMaximaSemana || fimSemana.includes(diaSemana) && horario >= reservaMinima && horario <= reservaMaximaFimDeSemana) {

//         textoReserva = 'Auditório disponível';
//         ApresentarNaTela(textoReserva);
//     } else {
//         textoReserva = 'Auditório indisponível';
//         ApresentarNaTela(textoReserva);
//         Eventos();
//     }

//     var nomeEmpresa = ReceberValorUsuario('Qual o nome da empresa: ');

//     if (nomeEmpresa === null) {
//         Cancelar("Você deseja cancelar operação e voltar para o menu inicial") ? Inicio() : Eventos();
//     }

//     ApresentarNaTela(`Auditório reservado para ${nomeEmpresa}: ${diaSemana} às ${horario}hs`);

//     var garcomPagamento = 10.50;

//     var duracao = RetornarNumeroPositivo("Qual a duração do evento em horas? ");

//     var garcomPorConvidado = Math.ceil(convidados / 12);

//     var garcomPorHora = Math.ceil(duracao / 2);

//     var custo = parseFloat((garcomPagamento * duracao) * (garcomPorConvidado + garcomPorHora));

//     ApresentarNaTela(`São necessários ${garcomPorConvidado + garcomPorHora} garçons`);
//     ApresentarNaTela(`Custo: R$${custo.toFixed(2)}`);
//     ApresentarNaTela('Agora vamos calcular o custo do buffet do hotel para o Eventos.')


//     var cafePorPessoa = 0.2;
//     var aguaPorPessoa = 0.5;
//     var salgadosPorPessoa = 7;

//     var precoCafe = 0.80;
//     var precoAgua = 0.40;
//     var precoSalgado = 34;

//     var quantidadeBuffet = {};

//     quantidadeBuffet.cafe = cafePorPessoa * convidados;
//     quantidadeBuffet.agua = aguaPorPessoa * convidados;
//     quantidadeBuffet.salgados = salgadosPorPessoa * convidados;

//     var valorBuffet = {};

//     valorBuffet.cafe = Math.ceil(quantidadeBuffet.cafe) * precoCafe;
//     valorBuffet.agua = Math.ceil(quantidadeBuffet.agua) * precoAgua;
//     valorBuffet.salgados = Math.ceil(quantidadeBuffet.salgados / 100) * precoSalgado;

//     ApresentarNaTela(`O evento precisará de ${quantidadeBuffet.cafe} litros de café, ${quantidadeBuffet.agua} litros de água, ${quantidadeBuffet.salgados} salgados`);

//     var aceitoCustos = confirm(`O café irá custar R$${valorBuffet.cafe}, a água R$${valorBuffet.agua}, e os salgados R$${valorBuffet.salgados}.\nNo total será R$${valorBuffet.cafe + valorBuffet.agua + valorBuffet.salgados}`);

//     if (aceitoCustos) {
//         var podeReservar = VerificarTextoRecebido(ReceberValorUsuario('Gostaria de efetuar a reserva? S/N'), ['s', 'n']);
//         if (podeReservar) {
//             ApresentarNaTela(`${nomeUsuario}, reserva efetuada com sucesso.`);
//             Inicio();
//         } else {
//             ApresentarNaTela(('Reserva não efetuada.'));
//             Eventos();
//         }
//     } else {
//         Eventos();
//     }
// }

// function Passeios() {
//     var wayne = {};
//     var stark = {};
//     wayne.nome = 'Wayne Oil';
//     wayne.alcool = RetornarNumeroPositivo('Qual o valor do álcool no posto Wayne Oil? ');
//     wayne.gasolina = RetornarNumeroPositivo('Qual o valor da gasolina no posto Wayne Oil? ');

//     stark.nome = 'StarkPetrol'
//     stark.alcool = RetornarNumeroPositivo('Qual o valor do álcool no posto Stark Petrol? ');
//     stark.gasolina = RetornarNumeroPositivo('Qual o valor da gasolina no posto Stark Petrol? ');

//     var alcoolBarato = wayne.alcool < stark.alcool ? wayne : stark;
//     var gasolinaBarata = wayne.gasolina < stark.gasolina ? wayne : stark;

//     var porcentagem = (alcoolBarato.alcool / gasolinaBarata.gasolina) * 100;

//     if (porcentagem <= 30) {
//         ApresentarNaTela(`${nomeUsuario}, é mais barato abastecer com alcool no posto ${alcoolBarato.nome}\nO valor final será de R$${alcoolBarato.alcool * 42}`);
//     } else {
//         ApresentarNaTela(`${nomeUsuario}, é mais barato abastecer com gasolina no posto ${gasolinaBarata.nome}\nO valor final será de R$${gasolinaBarata.gasolina * 42}`);
//     }

//     Inicio();

// }

// function Manuntencao() {
//     var listaEmpresas = [];
//     do {
//         const empresas = {}

//         empresas.nome = ReceberValorUsuario('Qual o nome da empresa?')
//         var valorServico = RetornarNumeroPositivo('Qual o valor por aparelho?');
//         var quantidadeAparelhos = RetornarNumeroPositivo('Qual a quantidade de aparelhos?');
//         var desconto = ReceberValorUsuario('Qual a porcentagem de desconto?');
//         var quantidadeMin = RetornarNumeroPositivo('Qual o número mínimo de aparelhos para conseguir o desconto?');

//         var valorTotal = valorServico * quantidadeAparelhos;
//         console.log(valorTotal);
//         var valorDescontoTotal = 0;
//         console.log(valorDescontoTotal);
//         if (quantidadeAparelhos >= quantidadeMin) {
//             valorDescontoTotal = desconto == 0 ? valorTotal : valorTotal * (1 - desconto / 100);
//             console.log(valorDescontoTotal);
//             ApresentarNaTela(`O serviço de ${empresas.nome} custará R$${valorDescontoTotal.toFixed(2)}`);
//             console.log(valorTotal);
//             empresas.valorFinal = valorDescontoTotal;
//         } else {
//             ApresentarNaTela(`O serviço de ${empresas.nome} custará R$${valorTotal}`);
//             empresas.valorFinal = valorTotal;
//         }
//         listaEmpresas.push(empresas);
//     } while (prompt(`Deseja informar novos dados, ${nomeUsuario}`) === 'n');

//     var menorValor = listaEmpresas.reduce((menor, objeto) => {
//         return objeto.valorFinal < menor.valorFinal ? objeto : menor;
//     });

//     ApresentarNaTela(`O orçamento de menor vlaor é o ${menorValor.nome} por R$${menorValor.valorFinal}`);
// }


// function Cancelar(texto) {
//     return confirm(texto);
// }

function Erro(numero, quantidade) {
    Inicio();
    ApresentarNaTela(`O número ${numero} não corresponde a uma opção válida! \n\n As opções possíveis são de 1 a ${quantidade}.`);
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

function SairEDespedirTeste() {
    alert(`Muito obrigado e até logo, ${nomeUsuario != undefined ? nomeUsuario : 'Desconhecido'}`);
    // window.close();
}

if (nomeUsuario != null) {
    VerificarSenha();
}
