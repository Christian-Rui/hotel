var nomeHotel = 'Letoh';
var listaHospedes = [];
var listaCadastroHospedes = [];
var nomesHospedes = [];

function CalcularMaxHoras(diaSemana) {
    return diaSemana === 'sabado' || diaSemana === 'domingo' ? 15 : 23;
}

var arraySemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

var arrayObjetosDias = arraySemana.map(dia => ({
    nome: dia,
    max: CalcularMaxHoras(dia),
    quantidadeMax: (CalcularMaxHoras(dia) - 7) + 2,
    horarioMarcado: [7, 8, 9]
}));

var arrayAuditorio = [
    {
        nome: 'laranja',
        semanas: [...arrayObjetosDias],
        agendados: []
    },
    {
        nome: 'colorado',
        semanas: [...arrayObjetosDias],
        agendados: []
    }
];

var objetoCancelarInicio = {
    textoCancelar: 'e voltar para o menu principal',
};

var objetoCancelarPesquisa = {
    textoCancelar: 'e voltar para o menu anterior',
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

class UsuarioCancelouException {
    constructor(funcaoCancela) {
        this.funcaoCancela = funcaoCancela;
    }
}

function RetornarValorUsuario(tipo, texto, textoCancelar, funcaoCancela) {
    while (true) {
        let valorUsuario = window.prompt(texto);

        if (valorUsuario == null) {
            if (confirm(`Você deseja cancelar a operação ${textoCancelar}?`)) {
                throw new UsuarioCancelouException(funcaoCancela);
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

function executarComCancelamento(funcao) {
    try {
        return funcao();
    } catch (e) {
        if (e instanceof UsuarioCancelouException) {
            e.funcaoCancela();
        } else {
            throw e;
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

function MontarTextoOpcoes(listaPalavras) {
    var texto = 'Digite qual opção deseja:';
    for (var i = 0; i < listaPalavras.length; i++) {
        texto += `\n[ ${i + 1} ] ${listaPalavras[i]}`;
    }
    return texto;
}


    var nomeUsuario = executarComCancelamento(() => RetornarValorUsuario(
        'letra',
        'Por favor, digite o seu nome:',
        'sem informar seu nome',
        SairEDespedirTeste
    ));


function VerificarSenha() {
    executarComCancelamento(() => {
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
    });
}

function Inicio() {
    executarComCancelamento(() => {
        var textoEscolha = MontarTextoOpcoes(['Reservar Quarto', 'Cadastrar Hospedes', 'Cadastrar e Pesquisar', 'Eventos', 'Passeios', 'Manuntenção', 'Sair do Hotel']);

        var escolhaOpcao = parseInt(RetornarValorUsuario(
            'numero',
            textoEscolha,
            'e sair do programa',
            SairEDespedirTeste
        ));

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
                SairEDespedirTeste();
                //Sair('Deseja sair do hotel: ')
                break;
            case null:
                break;
            default:
            // alert('nao era para aconteceer')
            // Erro(escolhaOpcao, 7);
        }
    });
}
objetoCancelarInicio.funcaoCancela = Inicio

function ReservarQuarto() {
    executarComCancelamento(() => {
        var quantidadeQuartos = 20;
        var valorDiaria = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            'Digite o valor padrão da diária: \n\nOBS: O valor minímo é 1!',
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), { min: 1 });

        var quantidadeDias = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            'Digite a quantidade de dias que deseja se hospedar: \n\nOBS: O máximo é até 30 dias! \nNo mínimo é de 1 dia!',
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), { min: 1, max: 30 });

        var nomeDoHospede = RetornarValorUsuario(
            'letra',
            'Digite o nome do hospede:',
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
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
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), ['s', 'n']);

        if (reposta === 's') {
            listaHospedes.push(objetoLista);
            ApresentarNaTela(`${nomeUsuario}, reserva efetuada para ${objetoLista.nome}`);
            Inicio();
        } else {
            Inicio();
        }
    });
}

function VerificarQuartoDisponivel(quartosTexto, valorMaximo, quartos) {
    executarComCancelamento(() => {
        while (true) {
            var numeroQuarto = RestrigirNumero(() => RetornarValorUsuario(
                'numero',
                `Digite o número do quarto que deseja ( de 1 a 20: \n\nQuartos ainda disponíveis: \n${quartosTexto}`,
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
            ), { min: 1, max: valorMaximo });

            if (!quartos.includes(numeroQuarto)) {
                alert(`Quarto ${numeroQuarto} já está ocupado! Escolha outro quarto`);
            } else {
                return numeroQuarto;
            }
        }
    });
}

function CadastrarHospedes() {
    executarComCancelamento(() => {
        var diariaPadrao = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            `Digite o valor padrão da diária: \n\nOBS: O valor deve ser no minimo 1!`,
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), { min: 1 });

        var meia = 0;
        var gratuita = 0;

        while (true) {
            var nomeDoHospede = RetornarValorUsuario(
                'letra',
                "Qual o nome do hospede: \n\nOBS: caso digite PARE, o programa irá parar.",
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
            )

            if (nomeDoHospede.toLowerCase() === 'pare') {
                break;
            }

            var idadeHospede = RestrigirNumero(() => RetornarValorUsuario(
                'numero',
                `Qual à idade do hospede: \n\nOBS: O valor deve ser no minimo 1!!`,
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
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
    });
}

function CadastroEPesquisa() {
    executarComCancelamento(() => {
        var textoEscolha = MontarTextoOpcoes(['Cadastrar', 'Pesquisar', 'Listar', 'Sair']);

        var escolhaOpcao = RetornarValorUsuario(
            'numero',
            textoEscolha,
            listaObjetoCancelar[0].textoCancelar,
            listaObjetoCancelar[0].funcaoCancela
        )

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
                confirm('Deseja voltar para o menu inicial?') ? Inicio() : CadastroEPesquisa();
                break;
            default:
                Erro(escolhaOpcao, 4);
        }
    });
}
objetoCancelarPesquisa.funcaoCancela = CadastroEPesquisa

function Cadastrar() {
    executarComCancelamento(() => {
        if ((nomesHospedes.length + 1) < 15) {
            nomesHospedes.push(RetornarValorUsuario(
                'letra',
                'Qual o nome do hospede:',
                objetoCancelarPesquisa.textoCancelar,
                objetoCancelarPesquisa.funcaoCancela
            ).toLowerCase());
        } else {
            alert("Máximo de cadastros atingido");
        }

        CadastroEPesquisa()
    });
}

function Pesquisar() {
    executarComCancelamento(() => {
        var hospede = RetornarValorUsuario(
            'letra',
            'Qual o nome do hospede você deseja pesquisar:',
            objetoCancelarPesquisa.textoCancelar,
            objetoCancelarPesquisa.funcaoCancela
        );

        if (nomesHospedes.includes(hospede.toLowerCase())) {
            alert(`Hospede ${nomesHospedes[nomesHospedes.indexOf(hospede.toLowerCase())]} foi encontrado`);
        } else {
            alert('Hospede não encontrado');
        }

        CadastroEPesquisa();
    });
}

function Listar() {
    alert(`Os hospedes cadastrados no hotel são: \n\n${nomesHospedes.join(', ')}`);
    CadastroEPesquisa();
}

function Eventos() {
    executarComCancelamento(() => {
        var ocupados = arrayAuditorio.filter(objeto =>
            objeto.semanas.every(dias => dias.horarioMarcado.length === dias.quantidadeMax)
        );

        if (ocupados.length == 2) {
            alert('Não há auditórios disponíveis para agendar eventos');
            return Inicio();
        } else {
            var laranja = 150;
            var laranjaAdicional = 70;
            var colorado = 350;

            var temOcupado = ocupados.length > 0;

            var textoLaranja = temOcupado && ocupados[0].nome === 'laranja' ? 'Auditório Laranja indisponível!' : `- Laranja com capacidade de ${laranja} lugares, com mais ${laranjaAdicional} lugares adicionais.`;
            var textoColorado = temOcupado && ocupados[0].nome === 'colorado' ? 'Auditório Colorado indisponível' : `- Colorado com capacidade para ${colorado} lugares.`;

            var valorMax = temOcupado && ocupados[0].nome === 'colorado' ? laranja + laranjaAdicional : colorado;

            var convidados = RestrigirNumero(() => RetornarValorUsuario(
                'numero',
                `Qual é o número de convidados para esse evento:\n\nHá dois auditórios:\n${textoLaranja}\n${textoColorado}\n\nOBS: Numero mínimo de convidados é 1, e o máximo é ${valorMax}\nAperte em cancelar para voltar do Inicio!`,
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
            ), { min: 1, max: valorMax });

            var auditorio;
            var adicionaisNecessarios = 0;

            var textoAuditorio = [];
            if (convidados <= (laranja + laranjaAdicional)) {
                auditorio = 'laranja';
                if (convidados > laranja) {
                    adicionaisNecessarios = convidados - laranja;
                    textoAuditorio.push(`(inclua mais ${adicionaisNecessarios} cadeiras)`);
                }
            } else {
                auditorio = 'colorado'
            }

            textoAuditorio.unshift(`Use o auditório ${auditorio}`);
            alert(textoAuditorio.join(' '));

            alert('Agora vamos ver a agenda do evento');

            var objetoAuditorio = arrayAuditorio.filter(objeto => objeto.nome === auditorio);
            var semanasDesocupadas = objetoAuditorio.map(objeto => {
                const diasDesocupados = objeto.semanas.filter(dias => dias.horarioMarcado.length != dias.quantidadeMax)
                return diasDesocupados.map(dia => dia.nome);
            }).flat();

            var diaDaSemana = DecidirDia(semanasDesocupadas);

            var objetoSemana = objetoAuditorio.flatMap(objeto => objeto.semanas).find(semana => semana.nome === diaDaSemana);
            console.log(objetoSemana)
            console.log(objetoSemana.horarioMarcado);
            var horario = DecidirHorario(objetoSemana.max, objetoSemana.horarioMarcado);

            if (!objetoSemana.horarioMarcado.includes(horario)) {
                alert('Auditório disponível');
            } else {
                alert('Auditório indisponível');
                return Inicio();
            }

            var nomeEmpresa = RetornarValorUsuario(
                'letra',
                'Qual o nome da empresa:',
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
            );

            alert(`Auditório reservado para ${nomeEmpresa}: ${diaDaSemana} às ${horario}hs`);

            var duracaoEvento = DefinirDuracao(horario, objetoSemana.max, objetoSemana.horarioMarcado);

            DefinirGarcom(convidados, duracaoEvento.length);
            DefinirAlimento(convidados);

            var podeReservar = RestringirTexto(() => RetornarValorUsuario(
                'letra',
                'Gostaria de efetuar a reserva? S/N',
                objetoCancelarInicio.textoCancelar,
                objetoCancelarInicio.funcaoCancela
            ), ['s', 'n']);

            if (podeReservar === 's') {
                alert(`${nomeUsuario}, reserva efetuada com sucesso.`);
                objetoSemana.horarioMarcado.push(...duracaoEvento);
                console.log(duracaoEvento);

                objetoAuditorio[0].agendados.push({
                    nome: nomeEmpresa,
                    diaDaSemana: diaDaSemana,
                    horario: horario,
                    duracao: duracaoEvento,
                });
                console.log(objetoAuditorio);
                console.log(objetoSemana);
            } else {
                alert('Reserva não efetuada.');
            }
        }
        return Inicio();
    });
}

function DecidirDia(listaSemanas) {
    executarComCancelamento(() => {
        var diaSemana = RestringirTexto(() => RetornarValorUsuario(
            'letra',
            `Qual o dia da semana que deseja reservar: \n\nDias disponíveis: ${listaSemanas.join(', ')}.\n\nAperte em cancelar para voltar do Inicio!`,
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), listaSemanas);
        return diaSemana;
    });
}

function DecidirHorario(max, objetoArray) {
    executarComCancelamento(() => {
        var reservaMinima = 7;

        var horariosDisponiveis = [];
        console.log(objetoArray);

        for (var i = reservaMinima; i <= max; i++) {
            if (!objetoArray.includes(i)) {
                horariosDisponiveis.push(i);
            }
        }
        console.log(horariosDisponiveis);

        var horario = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            `Qual o horário deseja reservar:\nHorários disponíveis: ${horariosDisponiveis.join('hs, ')}hs.\n\nNão há horários antes das ${reservaMinima} e depois das ${max}`,
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), { min: reservaMinima, max: max });
        return horario;
    });
}

function DefinirDuracao(horarioAgendado, max, horariosMarcados) {
    executarComCancelamento(() => {
        function CalcularDiferencaEmHoras(horario1, horario2) {
            return Math.abs(horario1 - horario2);
        }

        let horaMaisProxima = null;
        let menorDiferenca = Infinity;

        if (horariosMarcados.length > 0) {
            horariosMarcados.forEach(hora => {
                if (hora > horarioAgendado) {
                    const diferenca = CalcularDiferencaEmHoras(hora, horarioAgendado);
                    if (diferenca < menorDiferenca) {
                        menorDiferenca = diferenca;
                        horaMaisProxima = hora;
                    }
                }
            });
        }

        var duracaoMax = horaMaisProxima != null ? (horaMaisProxima - horarioAgendado) + 1 : (max - horarioAgendado) + 1;

        var duracao = RestrigirNumero(() => RetornarValorUsuario(
            'numero',
            `Qual a duração do evento em horas?\n\nA duração máxima de horas possível de acordo com o horario que você escolheu é de até ${duracaoMax}hs\n\nAperte cancelar caso deseje voltar do inicio`,
            objetoCancelarInicio.textoCancelar,
            objetoCancelarInicio.funcaoCancela
        ), { min: 1, max: duracaoMax > 1 ? duracaoMax : undefined });

        const numeros = Array.from({ length: duracao }, (_, i) => i + horarioAgendado);
        return numeros;
    });
}

function DefinirGarcom(convidados, duracao) {
    var garcomPagamento = 10.50;
    var garcomPorConvidado = Math.ceil(convidados / 12);

    var garcomPorHora = Math.ceil(duracao / 2);

    var custo = parseFloat((garcomPagamento * duracao) * (garcomPorConvidado + garcomPorHora));

    alert(`São necessários ${garcomPorConvidado + garcomPorHora} garçons`);
    alert(`Custo: R$${custo.toFixed(2)}`);
    alert('Agora vamos calcular o custo do buffet do hotel para o Eventos.')
}

function DefinirAlimento(convidados) {
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

    alert(`O evento precisará de ${quantidadeBuffet.cafe} litros de café, ${quantidadeBuffet.agua} litros de água, ${quantidadeBuffet.salgados} salgados`);

    alert(`O café irá custar R$${valorBuffet.cafe}, a água R$${valorBuffet.agua}, e os salgados R$${valorBuffet.salgados}.\nNo total será R$${valorBuffet.cafe + valorBuffet.agua + valorBuffet.salgados}`);
}

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

// function Sair(texto) {
//     if (!SairEDespedir(confirm(texto))) {
//         Inicio();
//     }
// }

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