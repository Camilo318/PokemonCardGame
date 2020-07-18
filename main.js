class AudioController {
    constructor() {
        this.bgMusic = new Audio('sounds/pokemon-opening.mp3') //Audio object
        this.bgMusic.volume = 0.5
        this.bgMusic.loop = 1
    }

    startMusic() {
        this.bgMusic.play()
    }
    stopMusic() {
        this.bgMusic.pause()
        this.bgMusic.currentTime = 0
    }

    victory() {
        this.stopMusic()
    }

    gameOver() {
        this.stopMusic()
    }

}


class Game {
    constructor(time, cards) {
        this.cards = cards
        this.Totaltime = time
        this.timeRemaining = time
        this.timer = document.getElementById('time')
        this.flips = document.getElementById('flips')
        //Instanciamos la clase AudioController
        this.audioController = new AudioController()
    }
    startGame() {
        this.cardToCheck = null
        this.totalClicks = 0
        this.timeRemaining = this.Totaltime
        this.matchedCards = []
        this.busy = true
        this.shuffleCards()
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            card.classList.toggle('visible')
            this.totalClicks++
            this.flips.innerText = this.totalClicks
        }
    }

    shuffleCards() {
        for (let i = this.cards.length-1; i >=0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1))
            this.cards[randomIndex].style.order = i;
            this.cards[i].style.order = randomIndex
        }
    }

    canFlipCard(card) {
        // return (!this.busy && !this.matchedCards.includes(card) && card !== cardToCheck)
        return true

    }
}




const cards = document.querySelectorAll('.game__card')
document.addEventListener('DOMContentLoaded', ready)


function ready() {
    swal('🙀', 'Go ahead and catch em all')
        .then(() => {
            const game = new Game(100, cards)  //Instanciamos la clase Game
            game.startGame()  //Ejecutamos el metodo que inicia el juego
            
            cards.forEach(card => {
                card.addEventListener('click', () => game.flipCard(card))
            })

        })
}