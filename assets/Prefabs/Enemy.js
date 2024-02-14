
// You can write more code here

/* START OF COMPILED CODE */

class Enemy extends EnemyBase {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Enemy", frame);

		this.setInteractive(this.scene.input.makePixelPerfect());

		/* START-USER-CTR-CODE */



		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	enemyLife = 1;

	/* START-USER-CODE */



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
