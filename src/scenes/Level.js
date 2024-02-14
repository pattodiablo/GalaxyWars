
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bg1
		const bg1 = this.add.image(0, 0, "bg1");
		bg1.setOrigin(0, 0);

		// bg2
		const bg2 = this.add.image(0, 0, "bg2");
		bg2.scaleX = 0;
		bg2.setOrigin(0, 0);

		// playerShip
		const playerShip = new PlayerShip(this, 0, 0);
		this.add.existing(playerShip);
		playerShip.scaleX = 0.5;
		playerShip.scaleY = 0.5;

		// joystickBg
		const joystickBg = new VitualJoystick(this, 0, 0);
		this.add.existing(joystickBg);
		joystickBg.scaleX = 0.4;
		joystickBg.scaleY = 0.4;

		// enemy
		const enemy = new Enemy(this, 257, 863);
		this.add.existing(enemy);

		// enemy_1
		const enemy_1 = new Enemy(this, 100, 207);
		this.add.existing(enemy_1);

		// enemy_2
		const enemy_2 = new Enemy(this, 504, 753);
		this.add.existing(enemy_2);

		// enemy_3
		const enemy_3 = new Enemy(this, 495, 215);
		this.add.existing(enemy_3);

		// enemy_4
		const enemy_4 = new Enemy(this, 490, 485);
		this.add.existing(enemy_4);

		// enemy_5
		const enemy_5 = new Enemy(this, 168, 546);
		this.add.existing(enemy_5);

		// enemy_6
		const enemy_6 = new Enemy(this, 321, 396);
		this.add.existing(enemy_6);

		// joystickBg (prefab fields)
		joystickBg.Player = playerShip;

		this.bg1 = bg1;
		this.bg2 = bg2;
		this.playerShip = playerShip;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	bg1;
	/** @type {Phaser.GameObjects.Image} */
	bg2;
	/** @type {PlayerShip} */
	playerShip;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.initCamera();
		this.configurarColisiones();



		this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
		this.bg1.displayWidth = this.gameWidth;
        this.bg1.displayHeight = this.gameHeight;
		this.bg2.displayWidth = this.gameWidth;
        this.bg2.displayHeight = this.gameHeight;
		this.playerShip.x=this.gameWidth/2;
		this.playerShip.y=this.gameHeight/2;
		this.playerShip.angle=-90;


	}

	configurarColisiones(){

		this.bulletGroup = this.physics.add.group({
			classType: Bullet,
			maxSize: 20, // Definir el número máximo de balas en el grupo
			runChildUpdate: true // Actualizar automáticamente las balas hijas
		});

		this.enemyGroup = this.physics.add.group({
			classType: Enemy,
			runChildUpdate: true // Actualizar automáticamente las balas hijas
		});
		console.log(this);
		this.physics.add.overlap(this.bulletGroup, this.enemyGroup,this.colisionBalaEnemigo, null, this);
//	this.physics.add.collider(this.balas, this.enemyGroup, this.colisionBalaEnemigo, null, this);
	}

	colisionBalaEnemigo(bala, enemigo) {
		// Emitir partículas en el lugar de la colisión

		this.playerShip.returnBullet(bala);

	}

	initCamera() {

		const cam = this.cameras.main;

		//cam.setBounds(0, 0, this.layer.width, this.layer.height);
		cam.setRoundPixels(true);
		cam.disableCull = true; 

		//cam.startFollow(this.playerShip, true, 10, 10);
		//cam.clampX(this.layer.width);

		cam.setLerp(0.1);
		this.fadeInAndCheck();

	}

	fadeInAndCheck(){



		this.cameras.main.fadeIn(2000);
		this.cameras.main.once('camerafadeincomplete', function () {	



			}, this);


	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
