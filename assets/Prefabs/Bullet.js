
// You can write more code here

/* START OF COMPILED CODE */

class Bullet extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "BasicBullet", frame);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	speed = 700;

	/* START-USER-CODE */

	create(){

		this.scene.physics.world.enable(this);
		this.body.enable=true;
		this.scene.time.delayedCall(3000, function() {
		//	this.scene.playerShip.returnBullet(this);
		}, [], this);

		
	}

	updateBulletRotationAndSpeed(){
		this.velocidadX = Math.cos(this.rotation) * this.speed;
		this.velocidadY = Math.sin(this.rotation) * this.speed;

		this.body.setVelocity(this.velocidadX, this.velocidadY);
	}

	update(){

		if (this.x < 0 || this.x > 640|| this.y < 0 || this.y > 960) {
			this.body.enable=false;
			// Reciclar la bala
			this.scene.playerShip.returnBullet(this);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
