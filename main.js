document.addEventListener('DOMContentLoaded', ready)

function ready() {
    const cards = document.querySelectorAll('.game__card')
    let game = null;
    swal('Go ahead and catch \'em all 🙀',
        'You\'ve got 80 seconds pal, hurry up!',
        'warning',
        {
            button: 'Let\'s go!'
        }
    )

    .then(() => {
        swal('Sound Options',
        'Would you like the game to play sound?',
        'info',
        {
            buttons: ['No, do not play sound', 'Yes, play sound']
        })
        .then(value => {
            const vol = value ? 0.5 : 0 
            game = new Game(80, cards, vol)
            game.startGame()
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    game.flipCard(card)
                })
            })
        })
    })
}