
// You can write more code here

/* START OF COMPILED CODE */

class ShieldOne extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ShieldOne", frame);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	OriginalDamage = 10;

	/* START-USER-CODE */

	create(){

		this.scene.physics.world.enable(this);
		this.body.enable=true;
		this.setScale(0.5,0.5);
		this.rotateTween = this.scene.tweens.add({
            targets: this,
            angle: -360,          // Rotación completa (360 grados)
            duration: 500,      // Duración de la rotación en milisegundos (2 segundos)
            repeat: -1,          // Repetir indefinidamente
            ease: 'Linear',      // Función de easing lineal para una rotación constante
        });

		this.scene.physics.add.collider(this.scene.enemyGroup, this, this.enmyColliding);


	}

	enmyColliding(shield,enemy){
		console.log("reducing live");
		enemy.reducirVida(shield.OriginalDamage);
	}


	update(){

		this.x = this.scene.playerShip.x;
		this.y = this.scene.playerShip.y;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
