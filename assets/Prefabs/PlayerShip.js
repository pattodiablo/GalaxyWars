
// You can write more code here

/* START OF COMPILED CODE */

class PlayerShip extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ShipV1", frame);

		this.setInteractive(this.scene.input.makePixelPerfect());

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.updatePlayer())
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	speed = 300;
	/** @type {number} */
	rotationSpeed = 250;
	/** @type {number} */
	BulletRate = 120;

	/* START-USER-CODE */

	create(){

		this.cursors = this.scene.input.keyboard.createCursorKeys();

 		this.scene.physics.world.enable(this);

		 this.body.setDrag(1200);
		 this.body.setAngularDrag(600);
		 this.body.setMaxVelocity(this.speed);
		 this.body.setCollideWorldBounds(true);
		 this.startEmmiter();
		 this.startBulletSystem();
		 this.emitter.startFollow(this,true,0,0,0,0);
		 //this.emitter.setDepth(-1);
		 //this.preFX.addPixelate(0.5);
		// this.setTint(0xF38F1E); // Tint rojo
		 this.fx = this.preFX.addGlow(0x6FFF21,1, 1, false, 0.1, 100);

		//this.fx = this.postFX.addGlow();

		this.scene.tweens.add({
            targets: this.fx,
            outerStrength: 1,
            yoyo: true,
			time: 1000,
            loop: -1,
            ease: 'sine.inout'
        });


		this.lastFrameTime = 0;
		this.deltaTime = 0;

	}

	startBulletSystem(){

		 // Crear un grupo para almacenar las balas
		 this.bulletGroup = this.scene.physics.add.group({
			classType: Bullet,
			maxSize: 20, // Definir el número máximo de balas en el grupo
			runChildUpdate: true // Actualizar automáticamente las balas hijas
		});


		this.timerEvento = this.scene.time.addEvent({
			delay: this.BulletRate,
			callback: this.createBullet,
			callbackScope: this,
			loop: true
		});



	}

	createBullet(){

		const bullet = this.bulletGroup.get(this.x, this.y);
		if (bullet) {
			// Establecer la rotación de la bala
			bullet.rotation = this.rotation;
			bullet.updateBulletRotationAndSpeed();

			// Activar la bala
			bullet.setActive(true);
			bullet.setVisible(true);
		}



	}

	returnBullet(bullet) {
		bullet.setActive(false);
		bullet.setVisible(false);
		this.bulletGroup.killAndHide(bullet);


		const explosionParticles =  this.scene.add.particles(0, 0, 'particleShip', {

			x: bullet.x,
			y: bullet.y,
			speed: { min: -500, max: 500 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 30, max: 250 },
			blendMode: 'ADD',
			tint: 0xFFFFFF, // Color de las chispas (blanco)
			scale: { start: 0.5, end: 0 },
			quantity: 1,
			maxParticles: 5,
			frequency: 10
		});

		// Detener el sistema de partículas después de un tiempo y luego destruirlo
		this.scene.time.delayedCall(1000, function() {
			explosionParticles.destroy();
		});
	}

	startEmmiter(){

		this.emitter = this.scene.add.particles(0, 0, 'particleShip', {

            speed: 100,
            lifespan: {
                onEmit: (particle, key, t, value) =>
                {
                    return Phaser.Math.Percent(this.body.speed, 0, 300) * 250;
                }
            },
            alpha: {
                onEmit: (particle, key, t, value) =>
                {
                    return Phaser.Math.Percent(this.body.speed, 0, 300);
                }
            },
            angle: {
                onEmit: (particle, key, t, value) =>
                {
                    return (this.angle - 180) + Phaser.Math.Between(-10, 10);
                }
            },
            scale: { start: 0.6, end: 0 },
            blendMode: 'ADD'
        });

	}

	updatePlayer(){

		var currentTime = Date.now();
    	this.deltaTime = (currentTime - this.lastFrameTime)/1000; // Delta time in seconds
   		this.lastFrameTime = currentTime;



		const { left, right, up } = this.cursors;

		if (left.isDown)
        {

            this.body.setAngularVelocity(-this.rotationSpeed*this.deltaTime*100);
        }
        else if (right.isDown)
        {
            this.body.setAngularVelocity(this.rotationSpeed*this.deltaTime*100);
        }
        else
        {
            this.body.setAngularVelocity(0);
        }

        if (up.isDown)
        {

			this.scene.physics.velocityFromRotation(this.rotation, this.speed*this.deltaTime*100, this.body.velocity);
        }





/* 
	if (this.cursors.up.isDown )
		{

			 this.scene.physics.velocityFromRotation(this.rotation, this.speed, this.body.velocity);

		}else if (this.cursors.down.isDown) {

			this.scene.physics.velocityFromRotation(this.rotation + Math.PI, this.speed, this.body.velocity);

        } else {


			this.scene.physics.velocityFromRotation(this.rotation + Math.PI,0, this.body.velocity);

        }


	if (this.cursors.left.isDown) {

            this.angle -= this.rotationSpeed;

        } else if (this.cursors.right.isDown) {

            this.angle += this.rotationSpeed;
        }else {

			this.angle += 0;
		}

*/
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
