
// You can write more code here

/* START OF COMPILED CODE */

class LevelParticle extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "LevelParticle", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
		this.scene.LevelParticleGroup.add(this);
		this.scene.physics.world.enable(this);
		this.setTint(0xffffff);
		this.scene.time.delayedCall(5000, () => {
			this.destroy();
		});

		

		this.body.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50));

        // Establecer una aceleración negativa para que se detenga gradualmente
        this.body.setAcceleration(-this.body.velocity.x, -this.body.velocity.y);


		this.scene.time.delayedCall(3000, () => {
			this.tween = this.scene.tweens.add({
				targets: this,
				alpha: 0, // Cambiar la opacidad a completamente transparente
				duration: 200, // Duración de la animación (en milisegundos)
				ease: 'Linear',
				yoyo: true, // Reproducir la animación hacia adelante y hacia atrás
				repeat: -1, // Repetir indefinidamente
				
			});
		});
		
        // Detener el objeto después de un tiempo determinado (por ejemplo, 1 segundo)
        this.scene.time.delayedCall(1000, () => {
            // Detener el movimiento del objeto
			this.scene.tweens.killTweensOf(this);
            this.body.stop();
        });
	}

	update(){

		if (!this.scene || !this.body) {
			return;
		}


		if(this.active && this.scene.playerShip.body.enable){

			const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.scene.playerShip.x, this.scene.playerShip.y);
			
			if (distanceToPlayer < this.scene.playerShip.MagnetPower) {
				// Calcular la dirección hacia el PlayerShip
				const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, this.scene.playerShip.x, this.scene.playerShip.y);
			
				// Calcular la velocidad de movimiento hacia el PlayerShip
				const speed = 400; // Ajusta este valor según sea necesario
				const velocityX = Math.cos(angleToPlayer) * speed;
				const velocityY = Math.sin(angleToPlayer) * speed;
		
				// Establecer la velocidad de movimiento hacia el PlayerShip
				if(this !== null){
					this.body.setVelocity(velocityX, velocityY);
				}
				
			}
		}
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
