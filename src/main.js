



var largoJuego = window.innerWidth;
var altoJuego = window.innerHeight;


window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width:  largoJuego,
		height: altoJuego,
		type: Phaser.AUTO,
		physics: {
        default: 'arcade',
		fps: {
			target: 90,
			min: 30,
			forceSetTimeOut: false
		},
		render: {
			pixelArt: true
		},
		input: {
			activePointers: 1
		},
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
	input: {
		activePointers: 1
	},
        backgroundColor: "#000",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}