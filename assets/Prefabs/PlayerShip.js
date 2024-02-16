
// You can write more code here

/* START OF COMPILED CODE */

class PlayerShip extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ShipV1", frame);

		this.setInteractive(new Phaser.Geom.Polygon("5.143580404407441 18.762727587488307 -0.2619543898581753 8.852580464668009 4.918349787979707 0.9695088896973161 14.152805061516801 1.4199701225527832 45.9103219778273 25.519646080320328 62.126926360624154 31.600872723869145 62.126926360624154 37.006407518134765 46.586013827110506 41.73625046311718 13.927574445089068 66.96207950302339 4.693119171551974 66.96207950302339 -0.2619543898581753 59.304238544480434 5.3688110208351745 50.06978327094333 1.5398905415636968 47.817477106666 4.46788855512424 43.31286477811132 12.801421362950396 34.52887073742969 2.6660436237023646 21.690725601048847"), Phaser.Geom.Polygon.Contains);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.updatePlayer())
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	speed = 200;
	/** @type {number} */
	rotationSpeed = 250;
	/** @type {number} */
	BulletRate = 150;
	/** @type {number} */
	damage = 1;
	/** @type {number} */
	lives = 3;
	/** @type {number} */
	reaparecerTimer = 2000;

	/* START-USER-CODE */

	create(){

		this.cursors = this.scene.input.keyboard.createCursorKeys();

 		this.scene.physics.world.enable(this);

		 this.body.setDrag(1200);
		 this.body.setAngularDrag(600);
		 this.body.setMaxVelocity(this.speed);
		 this.body.setCollideWorldBounds(true);
		 this.appearShip();

		 this.xInicial=this.x;
		 this.yInicial=this.y;
		 this.body.enable=false;
		 this.setVisible(false);

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


		this.timerEvento = this.scene.time.addEvent({
			delay: this.BulletRate,
			callback: this.createBullet,
			callbackScope: this,
			loop: true
		});



	}

	appearShip(){


		this.startEmmiter();
		 this.startBulletSystem();
		 this.emitter.startFollow(this,true,0,0,0,0);
		const appearParicles =  this.scene.add.particles(0, 0, 'appearParticle', {
			x: this.x,
			y: this.y,
			speed: { min: -30, max: 30 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 30, max: 500 },
			blendMode: 'ADD',
			tint: 0x2BA542, // Color de las chispas (blanco)
			scale: { start: 3, end: 0 },
			quantity: 1,
			maxParticles: 10,
			frequency: 10,

		},this);



		// Detener el sistema de partículas después de un tiempo y luego destruirlo
		this.scene.time.delayedCall(500, function() {
			this.body.enable=true;
			this.setVisible(true);
			appearParicles.destroy();
		}, [], this);

	}

	destroyShip(player){

		this.body.enable=false;
		console.log(player);
		this.emitter.destroy();
		this.timerEvento.remove();
		this.lives--;

		if(this.lives>0){
			this.destroyParticles();
			player.setVisible(false);

			this.scene.destroyAllEnemies();

			var reaparecerTimer = this.scene.time.addEvent({
				delay: this.reaparecerTimer, // Tiempo en milisegundos antes de que reaparezca la nave
				callback: function() {
					// Hacer que la nave sea visible nuevamente
					this.appearShip();

				},
				callbackScope: this,
				loop: false // No se repite
			});

		}else{
			player.destroy();
		}

	}

	destroyParticles(){


		const destroyParticles =  this.scene.add.particles(0, 0, 'particleShip', {

			x: this.x,
			y: this.y,
			speed: { min: -500, max: 1000 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 30, max: 1000 },
			blendMode: 'ADD',
			tint: 0x2BA542, // Color de las chispas (blanco)
			scale: { start: 4, end: 0 },
			quantity: 3,
			maxParticles: 10,
			frequency: 10
		});

		// Detener el sistema de partículas después de un tiempo y luego destruirlo
		this.scene.time.delayedCall(1000, function() {
			destroyParticles.destroy();
		});

	}

	createBullet(){

		const bullet = this.scene.bulletGroup.get(this.x, this.y);
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

		if(this.active){


		bullet.setActive(false);
		bullet.setVisible(false);
		this.scene.bulletGroup.killAndHide(bullet);


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

		if(this.active){


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
