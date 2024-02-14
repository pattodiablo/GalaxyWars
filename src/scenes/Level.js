
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
		const enemy = new Enemy(this, -765, 579);
		this.add.existing(enemy);

		// enemy2
		const enemy2 = new Enemy2(this, 113, 748);
		this.add.existing(enemy2);

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
		this.enemySpawner();

		this.time.addEvent({
            delay: 1000, // Intervalo de tiempo en milisegundos (por ejemplo, cada 3 segundos)
            callback: this.enemySpawner,
            callbackScope: this,
            loop: true // Para que el evento se repita indefinidamente
        });

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

	enemySpawner(){

		const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // Definir un rango dentro de las dimensiones de la pantalla donde se generarán los enemigos
        const spawnAreaWidth = screenWidth * 0.8; // Por ejemplo, el 80% del ancho de la pantalla
        const spawnAreaHeight = screenHeight * 0.8; // Por ejemplo, el 80% de la altura de la pantalla
        const spawnAreaX = (screenWidth - spawnAreaWidth) / 2; // Centrar horizontalmente
        const spawnAreaY = (screenHeight - spawnAreaHeight) / 2; // Centrar verticalmente

        // Generar coordenadas x e y aleatorias dentro del rango definido
        const randomX = Phaser.Math.Between(spawnAreaX, spawnAreaX + spawnAreaWidth);
        const randomY = Phaser.Math.Between(spawnAreaY, spawnAreaY + spawnAreaHeight);

        // Crear un nuevo enemigo en las coordenadas aleatorias
		const enemy = new Enemy(this, randomX, randomY);
		this.add.existing(enemy);


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

		this.physics.add.overlap(this.bulletGroup, this.enemyGroup,this.colisionBalaEnemigo, null, this);
//	this.physics.add.collider(this.balas, this.enemyGroup, this.colisionBalaEnemigo, null, this);
	}

	colisionBalaEnemigo(bala, enemigo) {
		// Emitir partículas en el lugar de la colisión

		this.playerShip.returnBullet(bala);
		enemigo.reducirVida(this.playerShip.damage);

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
