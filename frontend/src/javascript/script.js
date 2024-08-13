// Função para rolar até o formulário
function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
}

// Evento para exibir/ocultar o campo "outro" baseado na seleção
document.getElementById("region").addEventListener("change", function() {
    var otherRegionField = document.getElementById("other-region");
    if (this.value === "outro") {
        otherRegionField.style.display = "block";
    } else {
        otherRegionField.style.display = "none";
    }
});

// Evento para alternar a exibição das opções de jogos
document.getElementById('games-button').addEventListener('click', function() {
    var container = document.getElementById('games-container');
    container.style.display = container.style.display === 'block' ? 'none' : 'block';
});

// Função para concluir a seleção de jogos
function concluirSelecao() {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.style.display = 'none';
}

// Adiciona o listener de envio ao formulário
document.getElementById('registration-form').addEventListener('submit', enviarFormulario);


