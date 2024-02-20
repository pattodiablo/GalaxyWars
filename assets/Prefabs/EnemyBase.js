
// You can write more code here

/* START OF COMPILED CODE */

class EnemyBase extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Enemy", frame);

		this.setInteractive(this.scene.input.makePixelPerfect());

		/* START-USER-CTR-CODE */
	
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		this.setScale(0.3,0.3);
	
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	enemyLife = 1;

	/* START-USER-CODE */

	create(){

		this.scene.physics.world.enable(this);
		this.scene.enemyGroup.add(this);
		this.animacionDeInicio();
        this.animacionIdle();
        this.glowSettings(0xffffff,1,3, false, 1, 100)
		this.body.enable=false;
	
	}

    glowSettings(color,n,p,b,s,tiempo){
        this.fx = this.preFX.addGlow(color,n,p,b,s,tiempo);
    }

    animacionDeInicio(){
	


			const appearParicles =  this.scene.add.particles(0, 0, 'appearParticle', {
				x: this.x,
				y: this.y,
				speed: { min: -0, max: 0 },
				angle: { min: 0, max: 360 },
				lifespan: { min: 30, max: 1000 },
				blendMode: 'ADD',
				tint: 0xEF4720, // Color de las chispas (blanco)
				scale: { start: 1, end: 0 },
				quantity: 1,
				maxParticles: 3,
				frequency: 10,

			},this);

			// Detener el sistema de partículas después de un tiempo y luego destruirlo
			this.scene.time.delayedCall(1250, function() {
				if(this.active){
					this.body.enable=true;
				}
			
				appearParicles.destroy();
				
			}, [], this);

			this.tween1 = this.scene.tweens.add({
				targets: this,
				scaleX: 1, // Escala X final
				scaleY: 1, // Escala Y final
				duration: 1000, // Duración en milisegundos
				ease: 'Linear'
			});

			// Cuando el primer tween haya completado, iniciar el segundo tween
			this.tween1.on('complete', () => {
				this.scene.tweens.add({
					targets: this,
					scaleX: this.scaleX * 1.1, // Aumentar la escala en un 10%
					scaleY: this.scaleY * 1.1, // Aumentar la escala en un 10%
					duration: 250, // Duración de la animación en milisegundos
					yoyo: true, // Hacer que la animación se revierta al final
					ease: 'Linear', // Función de interpolación (puede ajustarse según el efecto deseado)
					repeat: -1
				});
			});
			
	

    }

    animacionIdle(){
        this.scene.tweens.add({
			targets: this,
			angle: 360, // Aumentar la escala en un 50%
			duration: 1000, // Duración de la animación en milisegundos
			yoyo: false, // Hacer que la animación se revierta al final
			ease: 'Linear', // Función de interpolación (puede ajustarse según el efecto deseado)
			repeat: -1
		});
    }

	reducirVida(damage){
	
		this.scene.tweens.killTweensOf(this);
		this.enemyLife-=damage;

		const explosionParticles =  this.scene.add.particles(0, 0, 'particleShip', {

			x: this.x,
			y: this.y,
			speed: { min: -500, max: 500 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 30, max: 1000 },
			blendMode: 'ADD',
			tint: 0xFFFFFF, // Color de las chispas (blanco)
			scale: { start: 2, end: 0 },
			quantity: 1,
			maxParticles: 5,
			frequency: 10
		});

		// Detener el sistema de partículas después de un tiempo y luego destruirlo
		this.scene.time.delayedCall(1000, function() {
			explosionParticles.destroy();
		});


		if (this.enemyLife <= 0) {
			console.log("enemy destroyed");
		
			// Generar un número aleatorio entre 3 y 4 para determinar cuántas partículas crear
			const numberOfParticles = Phaser.Math.Between(3, 4);
		
			// Crear las partículas aleatorias
			for (let i = 0; i < numberOfParticles; i++) {
				const levelParticle = new LevelParticle(this.scene, this.x, this.y);
				this.scene.add.existing(levelParticle);
			}
		
			// Destruir el enemigo
			this.destroy();
		}
		
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
