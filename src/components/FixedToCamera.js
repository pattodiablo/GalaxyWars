
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class FixedToCamera extends EventComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__FixedToCamera"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {FixedToCamera} */
	static getComponent(gameObject) {
		return gameObject["__FixedToCamera"];
	}

	/** @type {Phaser.Physics.Arcade.Sprite} */
	gameObject;

	/* START-USER-CODE */

	start() {

		this.gameObject.setScrollFactor(0, 0);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
