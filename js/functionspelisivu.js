let seconds = 120 // Ajastimen alkuarvo
let interval // Tallentaa interval-muuttujaan setInterval-funktion palauttaman arvon

const playerName = localStorage.getItem("playerName") // Etusivulla annettu pelaajan nimi tuodaan pelisivulle 
document.getElementById("playerGreeting").innerText = "Moi " + playerName + "!"

// Funktio kertotaulujen harjoitustehtävien luomiseen ja sekoittamiseen
function startTraining() {
    // Haetaan kertotaulun numero, jonka perusteella harjoitustehtävät luodaan
    const multiplicationNumber = document.getElementById("multiplicationNumber").value
    
    // Tyhjennetään harjoitustehtäväcontainerin sisältö
    const exerciseContainer = document.getElementById("exercises")
    exerciseContainer.innerHTML = ""

    let correctAnswers = 0 // Oikeiden vastausten laskuri
    
    // Luodaan ja sekoitetaan kertotaulutehtävät
    let exercises = []
    for (let i = 1; i <= 10; i++) {
        const correctAnswer = i * multiplicationNumber // Oikea vastaus lasketaan
        exercises.push({
            question: `${multiplicationNumber} x ${i}`,
            answer: correctAnswer
        })
    }
    exercises = shuffleArray(exercises)

    // Lisätään harjoitustehtävät HTML:ään ja annetaan jokaiselle tehtävälle oma id
    exercises.forEach((exercise, index) => {
        const exerciseHTML = `${exercise.question} = <input type="number" id="answer${index + 1}"> <br>`
        exerciseContainer.innerHTML += exerciseHTML
    })

    // Tallennetaan oikeat vastaukset exercises-taulukkoon
    exerciseContainer.dataset.exercises = JSON.stringify(exercises)

    // Lisätään tarkista-nappi
    const checkButton = document.createElement('button')
    checkButton.textContent = "Tarkista vastaukset"
    checkButton.id = "check_button"
    checkButton.onclick = checkAnswers
    exerciseContainer.appendChild(checkButton)
}


// Funktio kertotaulutehtävien sekoittamiseen
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

// Funktio vastausten tarkistamiseen
function checkAnswers() {
    let correctCount = 0 // Laskuri oikeiden vastausten määrälle
    let incorrectAnswers = [] // Taulukko väärin vastatuista tehtävistä
    const exerciseContainer = document.getElementById("exercises")
    const exercises = JSON.parse(exerciseContainer.dataset.exercises)

    // Käydään läpi jokainen tehtävä ja verrataan käyttäjän vastausta oikeaan vastaukseen
    for (let i = 0; i < 10; i++) {
        const userAnswer = parseInt(document.getElementById(`answer${i + 1}`).value)
        const correctAnswer = exercises[i].answer
        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectAnswers.push(exercises[i]) // Lisätään väärin vastattu tehtävä taulukkoon
            document.getElementById(`answer${i + 1}`).classList.add("incorrect")
        }
    }
    // Tulostetaan oikeiden vastausten määrä alert-ikkunassa
    alert(`Oikeita vastauksia: ${correctCount}/10`)

    // Näytetään väärin vastatut tehtävät
    showIncorrectAnswers(incorrectAnswers)
}
    function showIncorrectAnswers(incorrectAnswers) {
        const incorrectContainer = document.getElementById("incorrectAnswers")
        incorrectContainer.innerHTML = "" // Tyhjennetään kontaineri
    
        incorrectAnswers.forEach((exercise, index) => {
            const incorrectHTML = `${exercise.question} = ${exercise.answer}<br>`
            incorrectContainer.innerHTML += incorrectHTML
        })
    }
// Funktio käynnistää ajastimen ja harjoitustehtävät
function startTimer() {
    startTraining() // Käynnistetään harjoitustehtävät
    clearInterval(interval) //pysäytetään aiempi ajastin, mikäli se on ollut käytössä
    seconds = 120
    updateTimer()
    interval = setInterval(updateTimer, 1000) // Käynnistetään ajastin
}

// Funktio päivittää ajastimen arvon ja tarkistaa, onko aika loppunut
function updateTimer() {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

    if (seconds === 0) {
        clearInterval(interval) // Pysäytetään Interval
        document.getElementById('timer').innerText = 'Aika loppui! Yritä uudelleen!'
    } else {
        seconds--
    }
}
