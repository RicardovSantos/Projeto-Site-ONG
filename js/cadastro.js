
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do formulário que vamos manipular.
    const form = document.getElementById('cadastro-form');
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('endereco');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');

    //  FUNÇÃO PARA PREENCHIMENTO AUTOMÁTICO DE ENDEREÇO VIA CEP

    // Adiciona um ouvinte de evento para quando o usuário sair do campo CEP.
    cepInput.addEventListener('blur', function() {
        // Pega o valor do CEP e remove caracteres não numéricos.
        const cep = cepInput.value.replace(/\D/g, '');

        // Verifica se o CEP tem o tamanho correto (8 dígitos).
        if (cep.length === 8) {
            // Mostra ao usuário que estamos buscando o endereço.
            enderecoInput.value = "Buscando...";
            cidadeInput.value = "Buscando...";
            estadoInput.value = "Buscando...";

            // Faz uma requisição para a API ViaCEP.
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json()) // Converte a resposta para JSON.
                .then(data => {
                    // Se a API não encontrar o CEP, limpa os campos.
                    if (data.erro) {
                        alert('CEP não encontrado. Por favor, verifique o número digitado.');
                        enderecoInput.value = "";
                        cidadeInput.value = "";
                        estadoInput.value = "";
                    } else {
                        // Se encontrar, preenche os campos de endereço.
                        enderecoInput.value = data.logradouro;
                        cidadeInput.value = data.localidade;
                        estadoInput.value = data.uf;
                    }
                })
                .catch(error => {
                    // Em caso de erro na rede, informa o usuário.
                    console.error('Erro ao buscar o CEP:', error);
                    alert('Não foi possível buscar o CEP. Verifique sua conexão com a internet.');
                    enderecoInput.value = "";
                    cidadeInput.value = "";
                    estadoInput.value = "";
                });
        }
    });


    //  MÁSCARAS DE INPUT PARA CPF, TELEFONE E CEP
   
    // Máscara para CPF (000.000.000-00)
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após o 3º dígito
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após o 6º dígito
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca hífen antes dos últimos 2 dígitos
        e.target.value = value.slice(0, 14); // Limita o tamanho
    });

    // Máscara para Telefone (00) 00000-0000
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses nos dois primeiros dígitos
        value = value.replace(/(\d{5})(\d)/, '$1-$2');    // Coloca hífen após o 9º dígito (celular)
       
        e.target.value = value.slice(0, 15); // Limita o tamanho
    });

    // Máscara para CEP (00000-000)
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value.slice(0, 9); // Limita o tamanho
    });


    // VALIDAÇÃO E ENVIO DO FORMULÁRIO
 

    // Adiciona um ouvinte de evento para quando o formulário for submetido.
    form.addEventListener('submit', function(event) {
        // Impede o comportamento padrão do navegador (que é recarregar a página).
        event.preventDefault();

        // Usa o método checkValidity() para verificar se todos os campos
        // cumprem as regras definidas no HTML (required, pattern, etc.).
        if (form.checkValidity()) {
            // Se o formulário for válido, exibe uma mensagem de sucesso.
            alert('Cadastro realizado com sucesso! Obrigado por se juntar a nós.');

            // Limpa todos os campos do formulário.
            form.reset();
        } else {
            // Se houver algum campo inválido, exibe um alerta.
            // Os navegadores modernos já destacam os campos com erro.
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }
    });
});