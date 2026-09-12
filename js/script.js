// =========================================
// PROJETO AMOR DE PATAS
// JavaScript principal
// =========================================


// =========================================
// 1. ELEMENTOS DO SITE
// =========================================

const botaoAjuda = document.querySelector('.texto-apresentacao a');
const formulario = document.querySelector('#formAjuda');
const mensagemSucesso = document.querySelector('#mensagem-sucesso');


// =========================================
// 2. BOTÃO "QUERO AJUDAR"
// =========================================

botaoAjuda.addEventListener('click', function () {

    alert(
        '💚 Obrigado pelo seu interesse em ajudar o Projeto Amor de Patas!'
    );

});


// =========================================
// 3. CONFIGURAÇÃO DO EMAILJS
// =========================================

emailjs.init({
    publicKey: 'Iu0YeScqcmlSMycqY'
});


// =========================================
// 4. FORMULÁRIO "QUERO FAZER PARTE"
// =========================================

formulario.addEventListener('submit', function (event) {

    // Impede o recarregamento da página
    event.preventDefault();


    // Captura os dados preenchidos pelo usuário
    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const tipoAjuda = document.querySelector('#tipoAjuda').value;
    const mensagem = document.querySelector('#mensagem').value.trim();


    // -----------------------------------------
    // VALIDAÇÃO DOS CAMPOS
    // -----------------------------------------

    if (
        nome === '' ||
        email === '' ||
        tipoAjuda === '' ||
        mensagem === ''
    ) {

        alert('🐾 Por favor, preencha todos os campos.');

        return;
    }


    // -----------------------------------------
    // ENVIO DO FORMULÁRIO PELO EMAILJS
    // -----------------------------------------

    emailjs.send(
        'service_n871vlj',
        'template_saiaaks',
        {
            nome: nome,
            email: email,
            tipoAjuda: tipoAjuda,
            mensagem: mensagem
        }
    )

    .then(function () {

        // Exibe mensagem de sucesso
        mensagemSucesso.textContent =
            '💚 Obrigado, ' +
            nome +
            '! Seu interesse foi enviado com sucesso.';

        mensagemSucesso.style.display = 'block';


        // Limpa os campos do formulário
        formulario.reset();

    })


    .catch(function (error) {

        // Exibe o erro no console para facilitar a identificação
        console.error(
            'Erro ao enviar o formulário:',
            error
        );


        // Informa o usuário sobre o problema
        alert(
            '❌ Não foi possível enviar sua mensagem agora. ' +
            'Tente novamente em alguns instantes.'
        );

    });

});


// =========================================
// 5. BOTÕES "QUERO ADOTAR"
// =========================================

const botoesAdotar = document.querySelectorAll('.btn-adotar');
const campoMensagem = document.querySelector('#mensagem');


botoesAdotar.forEach(function (botao) {

    botao.addEventListener('click', function () {

        // Identifica o animal selecionado
        const animal = botao.dataset.animal;


        // Preenche automaticamente a mensagem
        campoMensagem.value =
            'Olá! Tenho interesse em adotar o(a) ' +
            animal +
            '.';


        // Leva o usuário até a seção "Como Ajudar"
        document.querySelector('#como-ajudar').scrollIntoView({
            behavior: 'smooth'
        });


        // Coloca o cursor no campo Nome
        document.querySelector('#nome').focus();

    });

});


// =========================================
// 6. DESCRIÇÃO EM ÁUDIO
// =========================================

const botaoAudio = document.querySelector('#botao-audio');


botaoAudio.addEventListener('click', function () {

    // Texto que será narrado para o usuário
    const texto = `
        Bem-vindo ao Projeto Amor de Patas.
        Resgatando vidas, construindo novos laços.

        Na página inicial, você encontra informações sobre o projeto
        e pode conhecer nossa proposta de cuidado e proteção aos animais.

        Na seção Sobre Nós, você pode conhecer melhor o Projeto Amor de Patas
        e entender como nosso trabalho ajuda animais em situação de abandono.

        Na seção Animais, você pode conhecer os animais disponíveis para adoção
        e demonstrar interesse em adotar.

        Na seção Como Ajudar, você pode escolher entre adotar,
        ser voluntário ou fazer uma doação.
        Também é possível preencher um formulário para demonstrar seu interesse.

        Na seção Contato, você encontra nosso e-mail,
        telefone e localização.

        Obrigado por visitar o Projeto Amor de Patas.
    `;


    // Cria a fala utilizando a API de síntese de voz do navegador
    const fala = new SpeechSynthesisUtterance(texto);


    // Configurações da voz
    fala.lang = 'pt-BR';
    fala.rate = 0.9;
    fala.pitch = 1;


    // Interrompe uma leitura anterior
    window.speechSynthesis.cancel();


    // Inicia a descrição em áudio
    window.speechSynthesis.speak(fala);

});