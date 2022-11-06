document.addEventListener('DOMContentLoaded', ready)

async function ready() {
  const cards = Array.from(document.querySelectorAll('.game__card'))
  const gameContainer = document.querySelector('.game')

  await swal({
    title: "Go ahead and catch 'em all 🙀",
    text: "You've got 80 seconds pal, hurry up!",
    icon: 'warning',
    buttons: {
      confirm: {
        text: "Let's go",
        value: true
      }
    }
  })

  const playSound = await swal({
    title: 'Sound Options',
    text: 'Would you like the game to play sound?',
    icon: 'info',
    buttons: {
      cancel: {
        value: null,
        text: 'No, do not play sound',
        visible: true
      },
      confirm: {
        value: true,
        text: 'Yes, play sound'
      }
    }
  })
  const vol = playSound ? 0.5 : 0
  const game = new Game(80, cards, vol)
  game.startGame()
  gameContainer.addEventListener('click', e => {
    const gameCard = e.target.closest('.game__card')
    if (!gameCard) return
    game.flipCard(gameCard)
  })
}
