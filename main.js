class AudioController {
    constructor(vol) {
        this.bgMusic = new Audio('sounds/pokemon-opening.mp3') //Audio object
        this.bgMusic.volume = vol
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
    constructor(time, cards, vol) {
        this.cards = cards
        this.Totaltime = time
        this.timer = document.getElementById('time')
        this.flips = document.getElementById('flips')
        //Instanciamos la clase AudioController
        this.audioController = new AudioController(vol)
    }
    startGame() { //Starting a new game
        this.cardToCheck = null
        this.totalClicks = 0
        this.timeRemaining = this.Totaltime
        this.matchedCards = []
        this.busy = true

        setTimeout(() => {
            this.shuffleCards()
            this.audioController.startMusic()
            this.countDown = this.startCountDown()
            this.busy = false
        }, 500)

        this.flips.innerText = this.totalClicks
        this.timer.innerText = this.timeRemaining
        this.hideCards()
    }


    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--
            this.timer.innerText = this.timeRemaining
            if (this.timeRemaining < 1) {
                this.gameOver()
            }
        }, 1000)
    }

    gameOver() {
        clearInterval(this.countDown)
        this.audioController.gameOver()
        swal('Sorry 😿', 'Better luck next time pal', 'error', {
            buttons: ['Exit', 'Retry'] 
        })
            .then((value) => {
                if (value) {
                    this.startGame()  //Reseting the game after we lose
                } else {
                    document.location.reload()
                }
            })
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            card.classList.add('visible')
            this.totalClicks++
            this.flips.innerText = this.totalClicks
            if (this.cardToCheck) {
                this.checkForMatch(card)
            } else {
                this.cardToCheck = card
            }
        }
    }

    checkForMatch(card) {
        if (this.getCardValue(card) === this.getCardValue(this.cardToCheck)) {
            // console.log('It is a match')
            this.cardsMatch(card, this.cardToCheck)
        } else {
            this.cardsMisMatch(card, this.cardToCheck)
        }
        
        this.cardToCheck = null
    }

    getCardValue(card) {
        //targeando el src de la imagen dentro de .card__front
        return card.querySelector('.card__front .card__value').src
    }

    cardsMatch(card1,card2) {
        this.matchIndicator()
        this.matchedCards.push(card1)
        this.matchedCards.push(card2)
        card1.classList.add('matched')
        card2.classList.add('matched')
        if (this.matchedCards.length == this.cards.length) {
            this.victory()
        }
    }

    victory() {
        clearInterval(this.countDown)
        this.audioController.victory()
        swal('You are truly a Pokemon Master! 😼',
        `You did it my friend!\nTime Remaining: ${this.timeRemaining}\nFlips: ${this.totalClicks}`, 
        'success',
        {
            buttons: ['Exit', 'Play again']
        })
            .then(value => {
                if (value) {
                    this.startGame()
                } else {
                    window.location.reload()
                }
            })
    }

    cardsMisMatch(card1, card2) {
        this.busy = true
        //Giving time to the user to remember the image
        setTimeout(() => {
            card1.classList.remove('visible')
            card2.classList.remove('visible')
            this.busy = false
        }, 750)
    }

    hideCards() {
        this.cards.forEach(card => {
            card.classList.remove('visible')
            card.classList.remove('matched')
        })
    }

    shuffleCards() {
        for (let i = this.cards.length-1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1))
            this.cards[randomIndex].style.order = i;
            this.cards[i].style.order = randomIndex
        }
    }

    canFlipCard(card) {
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
        //Checking if the card can be flipped
    }

    matchIndicator() {
        this.indicator = document.getElementById('successIndicator')
        this.indicator.classList.add('match')
        this.indicator.addEventListener('animationend', () => {
            this.indicator.classList.remove('match')
        })
    }
}




const cards = document.querySelectorAll('.game__card')
document.addEventListener('DOMContentLoaded', ready)


function ready() {
    let game = '';
    swal('Go ahead and catch \'em all 🙀',
        'You\'ve got 80 seconds pal, hurry up!',
        'warning',
        {
            button: 'Let\'s go!'
        }
    )
    .then(value => {
        console.log(value)
        swal('Sound Options', 'Would you like the game to play sound?',
            'info',
            {
                buttons: ['No Sound', 'Sound']
            }
        )
        .then(value => {
            console.log(value)
            if (value) {
                game = new Game(80, cards, 0.5) 
            } else {
                game = new Game(80, cards, 0)
            }
            game.startGame()
            cards.forEach(card => {
                card.addEventListener('click', () => game.flipCard(card))
            })
        })
    })
}