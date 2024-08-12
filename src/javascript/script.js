function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById("region").addEventListener("change", function() {
    var otherRegionField = document.getElementById("other-region");
    if (this.value === "outro") {
        otherRegionField.style.display = "block";
    } else {
        otherRegionField.style.display = "none";
    }
});

document.getElementById('games-button').addEventListener('click', function() {
    var container = document.getElementById('games-container');
    container.style.display = container.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário para fins de demonstração
    alert('Formulário enviado! Você receberá um e-mail de confirmação!'); // Teste para verificar se o evento está sendo capturado
    document.getElementById('form-message').style.display = 'block';
});

function verificarRegiao() {
    const regiao = document.getElementById('region').value;
    const outraRegiao = document.getElementById('other-region');
    if (regiao === "outro") {
        outraRegiao.style.display = "block";
        outraRegiao.required = true;
    } else {
        outraRegiao.style.display = "none";
        outraRegiao.required = false;
    }
}

// Função para concluir a seleção de jogos
function concluirSelecao() {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.style.display = 'none';
}
