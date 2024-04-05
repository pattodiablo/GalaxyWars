



var largoJuego = window.innerWidth;
var altoJuego = window.innerHeight;
console.log(largoJuego);
console.log(altoJuego);
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width:  largoJuego,
		height: altoJuego,
		type: Phaser.WEBGL,
		physics: {
        default: 'arcade',
		fps: {
			target: 90,
			min: 90,
			forceSetTimeOut: true
		},
		render: {
			pixelArt: false,
			antialias: false,
			roundPixels:true,
			resolution: window.devicePixelRatio/2, // Usar la resolución del dispositivo
			clearBeforeRender:false,
			autoResize:true
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
			mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
			
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("ProgessionPhase", ProgessionPhase);

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