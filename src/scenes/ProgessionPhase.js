
// You can write more code here

/* START OF COMPILED CODE */

class ProgessionPhase extends Phaser.Scene {

	constructor() {
		super("ProgessionPhase");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// stripe
		const stripe = this.add.image(0, 1, "stripe");
		stripe.setOrigin(0, 0);

		// progressionLevelBg
		const progressionLevelBg = this.add.image(0, 0, "ProgressionLevelBg");
		progressionLevelBg.setOrigin(0, 0);

		// bitmaptext_1
		const bitmaptext_1 = this.add.bitmapText(0, 0, "lemon", "LV");
		bitmaptext_1.text = "LV";
		bitmaptext_1.fontSize = 72;

		// engranaje
		const engranaje = this.add.image(933, 70, "engranaje");
		engranaje.scaleX = 0.3;
		engranaje.scaleY = 0.3;

		this.stripe = stripe;
		this.engranaje = engranaje;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	stripe;
	/** @type {Phaser.GameObjects.Image} */
	engranaje;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		var screenWidth = this.cameras.main.width;

		// Establecer la escala horizontal de la imagen para que ocupe todo el ancho de la pantalla
		this.stripe.displayWidth = this.cameras.main.width;
		this.engranaje.x = this.cameras.main.width - 50;
		this.engranaje.y = 50;

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
