
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progressBar
		const progressBar = this.add.rectangle(229, 464, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;
		progressBar.setOrigin(0.5);
		progressBar.x = this.cameras.main.width/2
		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(229, 464, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;
		progressBarBg.setOrigin(0.5);
		progressBarBg.x = this.cameras.main.width/2

		// loadingText
		const loadingText = this.add.text(this.cameras.main.width/2, 432, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });
		loadingText.setOrigin(0.5);
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("ProgessionPhase"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
