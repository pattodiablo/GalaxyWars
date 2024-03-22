
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

		// stripeBg
		const stripeBg = this.add.image(0, 0, "stripeBg");
		stripeBg.setOrigin(0, 0);

		// progressionLevelBg
		const progressionLevelBg = this.add.image(0, 0, "ProgressionLevelBg");
		progressionLevelBg.setOrigin(0, 0);

		// bitmaptext_1
		const bitmaptext_1 = this.add.bitmapText(0, 0, "lemon", "LV");
		bitmaptext_1.text = "LV";
		bitmaptext_1.fontSize = 72;

		this.stripeBg = stripeBg;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	stripeBg;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		var screenWidth = this.cameras.main.width;

		// Establecer la escala horizontal de la imagen para que ocupe todo el ancho de la pantalla
		this.stripeBg.setScale(screenWidth / this.stripeBg.width, 0.3);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
