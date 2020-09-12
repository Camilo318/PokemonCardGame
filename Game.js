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
        }, 300)

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
        swal('Sorry 😿',
        'Better luck next time pal',
        'error',
        {
            buttons: ['Exit', 'Retry'] 
        })
        .then(value => {
            value ? this.startGame() : location.reload()
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
        swal('You truly are a Pokemon Master! 😼',
        `You did it my friend!
        Time Remaining: ${this.timeRemaining}
        Flips: ${this.totalClicks}`, 
        'success',
        {
            buttons: ['Exit', 'Play again']
        })
        .then(value => {
            value ? this.startGame() : location.reload()
        })
    }

    cardsMisMatch(card1, card2) {
        this.busy = true // User cannot flip other cards
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