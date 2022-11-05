document.addEventListener('DOMContentLoaded', ready)

async function ready() {
  const cards = Array.from(document.querySelectorAll('.game__card'))
  const gameContainer = document.querySelector('.game')

  await swal(
    "Go ahead and catch 'em all 🙀",
    "You've got 80 seconds pal, hurry up!",
    'warning',
    {
      button: "Let's go!"
    }
  )

  const playSound = await swal(
    'Sound Options',
    'Would you like the game to play sound?',
    'info',
    {
      buttons: ['No, do not play sound', 'Yes, play sound']
    }
  )
  const vol = playSound ? 0.5 : 0
  const game = new Game(80, cards, vol)
  game.startGame()
  gameContainer.addEventListener('click', e => {
    const gameCard = e.target.closest('.game__card')
    if (!gameCard) return
    game.flipCard(gameCard)
  })
}
