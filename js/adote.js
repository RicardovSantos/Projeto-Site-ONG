
document.addEventListener('DOMContentLoaded', function() {

    // --- FILTRO DA GALERIA ---

    // Seleciona todos os botões de filtro
    const botoesFiltro = document.querySelectorAll('.filtros button');
    const cardsAnimais = document.querySelectorAll('.card-animal');

    // Adiciona um "ouvinte" de clique 
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões para resetar o estilo
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão que foi clicado
            this.classList.add('active');

            // Pega o valor do filtro do botão 
            const filtro = this.getAttribute('data-filter');

            // Passa por cada card de animal
            cardsAnimais.forEach(card => {
                const categoria = card.getAttribute('data-category');

                // Lógica para mostrar ou esconder o card
                if (filtro === 'todos' || filtro === categoria) {
                    card.style.display = 'block'; // Mostra o card
                } else {
                    card.style.display = 'none'; // Esconde o card
                }
            });
        });
    });

    //  filtro "Todos" começa ativo por padrão
    document.querySelector('.filtros button[data-filter="todos"]').click();


    // --- LÓGICA DO BOTÃO "ADOTAR" ---

    // Seleciona todos os botões de "Adotar"
    const botoesAdotar = document.querySelectorAll('.botao-adotar');

    botoesAdotar.forEach(botao => {
        botao.addEventListener('click', function() {
            // Encontra o card do animal mais próximo do botão clicado
            const card = this.closest('.card-animal');
            const nomeAnimal = card.querySelector('h3').textContent;

            // mensagem de confirmação
            const confirmacao = confirm(
                `Que legal que você quer adotar o(a) ${nomeAnimal}! ❤️\n\nPara iniciar o processo, vamos te levar para a nossa página de cadastro. Certo?`
            );

            //  "OK", redireciona para a página de cadastro
            if (confirmacao) {
                window.location.href = 'cadastro.html';
            }
        });
    });

});