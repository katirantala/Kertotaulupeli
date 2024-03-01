function startGame() {
    const playerName = document.getElementById("playerNameInput").value
    localStorage.setItem("playerName", playerName) // Tallennetaan pelaajan nimi selaimen paikalliseen tallennustilaan
    window.location.href = "pelisivu.html" // Ohjataan pelaaja pelisivulle
}