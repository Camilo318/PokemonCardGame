import Game from './Game'
import Swal from 'sweetalert2'

document.addEventListener('DOMContentLoaded', ready)

async function ready() {
  const cards = Array.from(document.querySelectorAll('.game__card'))
  const gameContainer = document.querySelector('.game')

  await Swal.fire({
    title: "Go ahead and catch 'em all 🙀",
    text: "You've got 80 seconds pal, hurry up!",
    icon: 'warning',
    confirmButtonText: "Let's go",
    allowOutsideClick: false
  })

  const playSound = await Swal.fire({
    title: 'Sound Options',
    text: 'Would you like the game to play sound?',
    icon: 'info',
    showDenyButton: true,
    confirmButtonText: 'Yes, play sound',
    denyButtonText: `No, do not play sound`,
    allowOutsideClick: false
  })

  const vol = playSound.isConfirmed ? 0.5 : 0

  const gameOverCb = async () => {
    const playerChoice = await Swal.fire({
      title: 'Sorry 😿',
      text: 'Better luck next time pal',
      icon: 'error',
      confirmButtonText: 'Retry',
      allowOutsideClick: false
    })

    return playerChoice.isConfirmed
  }

  const victoryCb = async (timeRemaining, totalClicks) => {
    const playerChoice = await Swal.fire({
      title: 'You truly are a Pokemon Master! 😼',
      html: `You did it my friend!<br>
      Time Remaining: ${timeRemaining}<br>
      Flips: ${totalClicks}`,
      icon: 'success',
      confirmButtonText: 'Play again',
      showDenyButton: true,
      denyButtonText: 'Exit',
      allowOutsideClick: false
    })

    return playerChoice.isConfirmed
  }

  const game = new Game({
    time: 60,
    cards,
    vol,
    gameOverCb,
    victoryCb
  })
  game.startGame()
  gameContainer.addEventListener('click', e => {
    const gameCard = e.target.closest('.game__card')
    if (!gameCard) return
    game.flipCard(gameCard)
  })
}
