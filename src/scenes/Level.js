
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

		// bg3
		const bg3 = this.add.image(0, 0, "bg2");
		bg3.scaleX = 0;
		bg3.setOrigin(0, 0);

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

		// gameBorder
		const gameBorder = this.add.image(0, 0, "gameBorder");
		gameBorder.setOrigin(0, 0);

		// LevelName
		const levelName = this.add.bitmapText(0, 0, "lemon", "Level");
		levelName.text = "Level";
		levelName.fontSize = 10;

		// UserLevel
		const userLevel = this.add.bitmapText(0, 0, "lemon", "1");
		userLevel.text = "1";
		userLevel.fontSize = 10;

		// joystickBg (prefab fields)
		joystickBg.Player = playerShip;

		this.bg1 = bg1;
		this.bg2 = bg2;
		this.bg3 = bg3;
		this.playerShip = playerShip;
		this.gameBorder = gameBorder;
		this.levelName = levelName;
		this.userLevel = userLevel;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	bg1;
	/** @type {Phaser.GameObjects.Image} */
	bg2;
	/** @type {Phaser.GameObjects.Image} */
	bg3;
	/** @type {PlayerShip} */
	playerShip;
	/** @type {Phaser.GameObjects.Image} */
	gameBorder;
	/** @type {Phaser.GameObjects.BitmapText} */
	levelName;
	/** @type {Phaser.GameObjects.BitmapText} */
	userLevel;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.physics.world.setBounds(0, 0, 640, 960);
		this.editorCreate();
		this.initCamera();
		this.configurarColisiones();
		this.enemySpawner();
		this.createLevelBar();


		this.maximunEnemies = 30;

		this.time.addEvent({
            delay: 1000, // Intervalo de tiempo en milisegundos (por ejemplo, cada 3 segundos)
            callback: this.enemySpawner,
            callbackScope: this,
            loop: true // Para que el evento se repita indefinidamente
        });

		this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
		this.bg1.displayWidth = 640;
        this.bg1.displayHeight = 960;
		this.bg2.displayWidth = 640;
        this.bg2.displayHeight = 960;
		this.playerShip.x=640/2;
		this.playerShip.y=960/2;
		this.playerShip.angle=-90;

	// LevelBar


		const borderParticles =  this.add.particles(0, 0, 'gameBorder', {
			x: 320,
			y: 480,
			speed: { min: 0, max: 0 },
			lifespan: { min: 30, max: 3000 },
			blendMode: 'ADD',
			tint: 0xFFFFFF, // Color de las chispas (blanco)
			scale: { start: 1, end: 0.01 },
			quantity: 10,
			maxParticles: 5,
			frequency: 10
		});

		this.bg2.postFX.addShine(0.5, 1, 5,0,false);




		this.starsGroup = this.add.group();
		for (let i = 0; i < 100; i++) {
			const x = Phaser.Math.Between(-this.sys.game.config.width, this.sys.game.config.width*2);
			const y = Phaser.Math.Between(-this.sys.game.config.height, this.sys.game.config.height*2);
			const size = Phaser.Math.Between(1, 3);
			const star = this.add.graphics({ x: x, y: y });
			star.fillStyle(0xFFFFFF, 0.3);
			star.fillCircle(0, 0, size);
		}

		const gameBorderFX = this.gameBorder.postFX.addColorMatrix();

        const tween = this.tweens.addCounter({
            from: 0,
            to: 360,
            duration: 3000,
            loop: -1,
            onUpdate: () => {
                gameBorderFX.hue(tween.getValue());
            }
        });



	

	}

createLevelBar(){

	this.barraNivel = this.add.graphics();
	this.borde = this.add.graphics();

	this.barraNivel.setScrollFactor(0,0);
	this.borde.setScrollFactor(0,0);

	// Establecer el color de la barra de nivel
	const colorBarra = 0x6CC41A; // verde

	const screenWidth = this.cameras.main.width;


	// Establecer las dimensiones y la posición de la barra de nivel
	const anchoBarra = screenWidth*0.5;
	const altoBarra = 15;
	const xBarra = 10;
	const yBarra = 6; // posición y de la barra

	// Dibujar el rectángulo de la barra de nivel

	this.barraNivel.fillStyle(colorBarra);
	this.barraNivel.fillRect(xBarra, yBarra, anchoBarra, altoBarra);

	const anchoBorde = screenWidth*0.5;
	const altoBorde = 15;
	const xBorde = 10;
	const yBorde = 6; // posición y de la barra

	// Dibujar el rectángulo de la barra de nivel
	this.borde.lineStyle(2, 0x0BC837C); // grosor de 2 píxeles
	this.borde.fillStyle(0x270444);
	this.borde.strokeRect(xBorde, yBorde, anchoBorde, altoBorde);

	this.LevelBarMaxSize=anchoBarra;
	this.barraNivel.scaleX=0;

	this.levelName.x=xBarra+5;
	this.levelName.y=yBarra+2;
	this.levelName.setScrollFactor(0,0);
	this.levelName.setDepth(1);

	this.userLevel.x=xBarra+40;
	this.userLevel.y=yBarra+2;
	this.userLevel.setScrollFactor(0,0);
	this.userLevel.setDepth(1);
}


LevelSystem(){

	if(this.playerShip){

		this.barraNivel.scaleX=this.playerShip.currentFillPercentage;
	}


}


	destroyAllEnemies() {

        // Destruir todos los enemigos en el grupo de enemigos
		const enemigos = this.enemyGroup.getChildren();

		const numeroEnemigos = enemigos.length;

        // O usando el método getLength()
        // const numeroEnemigos = this.enemyGroup.getLength();

        console.log("Número de enemigos:", numeroEnemigos);
        // Iterar sobre cada enemigo y llamar al método reducirVida(100)
        enemigos.forEach(enemigo => {

            enemigo.reducirVida(100);
        });
    }

	enemySpawner(){


		if(this.enemyGroup.countActive()<this.maximunEnemies){
		const screenWidth = 640;
        const screenHeight = 960;

        // Definir un rango dentro de las dimensiones de la pantalla donde se generarán los enemigos
        const spawnAreaWidth = screenWidth * 0.8; // Por ejemplo, el 80% del ancho de la pantalla
        const spawnAreaHeight = screenHeight * 0.8; // Por ejemplo, el 80% de la altura de la pantalla
        const spawnAreaX = (screenWidth - spawnAreaWidth) / 2; // Centrar horizontalmente
        const spawnAreaY = (screenHeight - spawnAreaHeight) / 2; // Centrar verticalmente

        // Generar coordenadas x e y aleatorias dentro del rango definido
        const randomX = Phaser.Math.Between(spawnAreaX, spawnAreaX + spawnAreaWidth);
        const randomY = Phaser.Math.Between(spawnAreaY, spawnAreaY + spawnAreaHeight);


		const enemyType = Phaser.Math.RND.between(1, 2); // Puedes ajustar el rango según la cantidad de tipos de enemigos
        if (enemyType === 1) {
            // Crear un enemigo tipo Enemy en la posición aleatoria del vértice
			const enemy = new Enemy(this, randomX, randomY);
			this.add.existing(enemy);
        } else {
            // Crear un enemigo tipo Enemy2 en la posición aleatoria del vértice
			const enemy = new Enemy2(this, randomX, randomY);
			this.add.existing(enemy);
        }
		
        // Crear un nuevo enemigo en las coordenadas aleatorias
	

		}


	}

	configurarColisiones(){

		this.bulletGroup = this.physics.add.group({
			classType: Bullet,
			maxSize: 40, // Definir el número máximo de balas en el grupo
			runChildUpdate: true // Actualizar automáticamente las balas hijas
		});

		this.enemyGroup = this.physics.add.group({
			classType: Enemy
		});

		this.LevelParticleGroup = this.physics.add.group({
			classType: LevelParticle
		});

		this.physics.add.overlap(this.bulletGroup, this.enemyGroup,this.colisionBalaEnemigo, null, this);
		this.physics.add.overlap(this.playerShip, this.enemyGroup,this.colisionplayerEnemy, null, this);
		this.physics.add.overlap(this.playerShip, this.LevelParticleGroup,this.colisionplayerLevelParticle, null, this);
		this.physics.add.collider(this.enemyGroup, this.enemyGroup);
//	this.physics.add.collider(this.balas, this.enemyGroup, this.colisionBalaEnemigo, null, this);
	}

	colisionplayerLevelParticle(player,particle){
		this.LevelSystem();
		particle.body.enable=false;
		particle.active = false;
		particle.visible=false;
		player.addParticle();
	}
	colisionBalaEnemigo(bala, enemigo) {
		// Emitir partículas en el lugar de la colisión

		this.playerShip.returnBullet(bala);
		enemigo.reducirVida(this.playerShip.damage);

	}


	colisionplayerEnemy(player,enemy){
		enemy.reducirVida(100);
		player.destroyShip(player);
	}

	initCamera() {

		const cam = this.cameras.main;


		cam.setRoundPixels(true);
		cam.disableCull = false; 

		cam.startFollow(this.playerShip, true, 0, 0);


		cam.setLerp(1);
		this.fadeInAndCheck();

	}

	fadeInAndCheck(){


        const fxCamera = this.cameras.main.postFX.addPixelate(80);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });

		this.cameras.main.fadeIn(2000);
		this.cameras.main.once('camerafadeincomplete', function () {	



			}, this);


	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
