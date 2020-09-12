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