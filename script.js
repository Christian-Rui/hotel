var nomeHotel = 'Letoh';

ApresentarNaTela(`Bem vindo ao ${nomeHotel}`);

var nomeUsuario = prompt('Por favor, digite o seu nome: ');

function VerificarSenha(){
    var senhadigitada = window.prompt('Digite sua senha: ');
    var senha = 2678;

    if(parseInt(senhadigitada) === senha){
        ApresentarNaTela("Senha válida!");
        ApresentarNaTela(`Bem vindo ao hotel ${nomeHotel}, ${nomeUsuario}.\nÉ um imenso prazer ter você por aqui!`);
    }  
    else if(senhadigitada.trim() === ""){
        ApresentarNaTela("Nenhum senha foi inserida... Tente novamente");
        VerificarSenha();
    } else{
        ApresentarNaTela('Senha inválida!');
        VerificarSenha();
    }
}

// function Inicio(){
//     switch(){
//         case :
//             break;
//         default;
//     }
// }

ApresentarNaTela(`Muito obrigado e até logo, ${nomeUsuario}.`);

// function Erro(){

// }


function ApresentarNaTela(conteudo){
    alert(conteudo);
}

VerificarSenha();