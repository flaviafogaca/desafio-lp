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
    var button = document.getElementById('games-button');
    container.style.display = container.style.display === 'block' ? 'none' : 'block';
    button.classList.toggle('active');
});

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário para fins de demonstração
    alert('Formulário enviado!'); // Teste para verificar se o evento está sendo capturado
    document.getElementById('form-message').style.display = 'block';
});
