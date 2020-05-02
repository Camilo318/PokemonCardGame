document.addEventListener('DOMContentLoaded', swal('Billie', 'When we all fall asleep, where do we go?'))

const cards = document.querySelectorAll('.game__card')

cards.forEach(card => card.addEventListener('click', flip))

function flip() {
    this.classList.toggle('visible')
}