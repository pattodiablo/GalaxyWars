
// You can write more code here

/* START OF COMPILED CODE */

class Enemy extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Enemy", frame);

		this.setInteractive(this.scene.input.makePixelPerfect());

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.scene.physics.world.enable(this);
		this.scene.enemyGroup.add(this);

		this.scene.tweens.add({
			targets: this,
			scaleX: this.scaleX * 1.1, // Aumentar la escala en un 50%
			scaleY: this.scaleY * 1.1, // Aumentar la escala en un 50%
			duration: 250, // Duración de la animación en milisegundos
			yoyo: true, // Hacer que la animación se revierta al final
			ease: 'Linear', // Función de interpolación (puede ajustarse según el efecto deseado)
			repeat: -1
		});
		this.scene.tweens.add({
			targets: this,
			rotation: 1, // Aumentar la escala en un 50%
			
			duration: 250, // Duración de la animación en milisegundos
			yoyo: false, // Hacer que la animación se revierta al final
			ease: 'Linear', // Función de interpolación (puede ajustarse según el efecto deseado)
			repeat: -1
		});
	}

	update(){

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
