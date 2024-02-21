
// You can write more code here

/* START OF COMPILED CODE */

class LevelBar extends Phaser.GameObjects.Image {

	constructor() {


		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
create(){

}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
