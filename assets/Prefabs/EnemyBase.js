
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
	enemyLife = 10;

	/* START-USER-CODE */

	create(){

		this.scene.physics.world.enable(this);
		this.scene.enemyGroup.add(this);
		this.animacionDeInicio();
      //  this.animacionIdle();
      //  this.glowSettings(0xffffff,1,0.3, false, 1, 100)
		this.body.enable=false;
		this.levelParticlesPool = [];

		for (let i = 0; i < 3; i++) {
			const levelParticle = new LevelParticle(this.scene, 0, 0); // Crear nueva partícula
			levelParticle.setActive(false).setVisible(false); // Desactivar y ocultar la partícula
			this.levelParticlesPool.push(levelParticle); // Agregar la partícula al pool
		}

		
	}

	   // Función para obtener una partícula del pool o crear una nueva si no hay disponibles
	   getLevelParticle() {
        let particle = this.levelParticlesPool.pop(); // Obtener la última partícula del pool
        if (!particle) {
            particle = new LevelParticle(this.scene, 0, 0); // Crear una nueva partícula si no hay disponibles en el pool
            this.scene.add.existing(particle);
        }
        return particle;
    }

	recycleLevelParticle(particle) {
        this.levelParticlesPool.push(particle);
        particle.setActive(false).setVisible(false); // Desactivar y ocultar la partícula
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
				duration: 500, // Duración en milisegundos
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
					repeat: 2
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
		

		var damageDeal = this.enemyLife-damage*Phaser.Math.Between(0 , 1);
	
		this.enemyLife-=damageDeal;

		const lifeTook = this.scene.add.bitmapText(this.x, this.y, "lemon", "01");
		lifeTook.text = damageDeal;
		lifeTook.fontSize = 15;
		lifeTook.setScale(2);
		this.scene.tweens.add({
			targets: lifeTook,
			y: lifeTook.y - 20, // Desplazar hacia arriba
			x: Phaser.Math.Between(this.x-30, this.x+30), // Desplazar hacia arriba
			alpha: 0, // Cambiar la opacidad a 0
			scale: 0,
			duration: 1000, // Duración de la animación en milisegundos
			yoyo: false, // No se revierte al final
			ease: 'Cubic', // Función de interpolación lineal
			repeat: 0, // No repetir la animación
			onComplete: function () {
				// Función que se ejecuta al completarse la animación
				lifeTook.destroy(); // Destruir el objeto lifeTook
			}
		});
		

	

		// Detener el sistema de partículas después de un tiempo y luego destruirlo
		

		if (this.enemyLife <= 0) {
			
			const explosionParticles =  this.scene.add.particles(0, 0, 'particleShip', {

			x: this.x,
			y: this.y,
			speed: { min: -500, max: 500 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 30, max: 1000 },
			blendMode: 'ADD',
			tint: 0xFFFFFF, // Color de las chispas (blanco)
			scale: { start: 2, end: 0 },
			quantity: 3,
			maxParticles: 3,
			frequency: 5
		});

		this.scene.time.delayedCall(1000, function() {
			explosionParticles.destroy();
		});

			// Generar un número aleatorio entre 3 y 4 para determinar cuántas partículas crear
			const numberOfParticles = Phaser.Math.Between(0, 2);
		
			// Crear las partículas aleatorias
		     for (let i = 0; i < numberOfParticles; i++) {
            const levelParticle = this.getLevelParticle(); // Obtener una partícula del pool
			this.scene.add.existing(levelParticle);
			levelParticle.particlePlaced();
            levelParticle.setPosition(this.x, this.y); // Establecer la posición de la partícula
            levelParticle.setActive(true).setVisible(true); // Activar y mostrar la partícula
        }
		
			// Destruir el enemigo
			this.destroy();
		}
		
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
