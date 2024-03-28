
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
		levelName.fontSize = 15;

		// UserLevel
		const userLevel = this.add.bitmapText(0, 0, "lemon", "1");
		userLevel.text = "1";
		userLevel.fontSize = 15;

		// TimerText
		const timerText = this.add.bitmapText(-1308.4726905928082, 238.00353260821706, "lemon", "0000");
		timerText.text = "0000";
		timerText.fontSize = 20;

		// joystickBg (prefab fields)
		joystickBg.Player = playerShip;

		this.bg1 = bg1;
		this.bg2 = bg2;
		this.bg3 = bg3;
		this.playerShip = playerShip;
		this.gameBorder = gameBorder;
		this.levelName = levelName;
		this.userLevel = userLevel;
		this.timerText = timerText;

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
	/** @type {Phaser.GameObjects.BitmapText} */
	timerText;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.timerText = this.add.text(this.formatTime(0));
		this.physics.world.setBounds(0, 0, 640, 960);
		this.editorCreate();
		this.initCamera();
		this.configurarColisiones();

		this.createLevelBar();
		this.addTimer();


		this.maximunEnemies = 30;

		this.SpwawerTimer = this.time.addEvent({
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

addTimer(){
	 // Crear el evento de tiempo con la duración total del temporizador
	 this.timer = this.time.addEvent({
        delay: 1000,
        callback: this.updateTimer,
        callbackScope: this,
        loop: true
    });

    // Establecer la duración total del temporizador en milisegundos
    this.timer.totalDuration = 30000; // 60 segundos en este ejemplo
	this.timerholder = 0;
	}

updateTimer(){

 // Restar un segundo al temporizador
 this.timerholder += 1000;

 // Calcular el tiempo restante
 var remainingTime = this.timer.totalDuration - this.timerholder;

 // Verificar si el tiempo restante es menor o igual a 0
 if (remainingTime <= 0) {
	 // Detener el temporizador
	 this.timer.remove(false);

	 // Establecer el texto del temporizador en 00:00
	 this.timerText.setText("00:00");
	 this.ProgresionPhase();
 } else {
	 // Actualizar el texto del temporizador
	 this.timerText.setText(this.formatTime(remainingTime));
 }

}

ProgresionPhase(){

	this.SpwawerTimer.remove();
	console.log(this.enemyGroup.countActive());

	// Itera sobre cada elemento del grupo
	this.enemyGroup.getChildren().forEach(function(enemy) {
		// Detén y destruye todos los tweens del enemigo
		this.tweens.killTweensOf(enemy); // Detiene todos los tweens asociados al enemigo
		enemy.visible = false; // Destruye el enemigo
		enemy.body.enable=false;
	}, this);

	this.playerShip.visible = false;
	this.playerShip.canShoot=false;
	this.playerShip.body.enable = false;
	this.playerShip.emitter.destroy();
	this.cameras.main.flash();

	this.cameras.main.once('camerafadeoutcomplete', function (camera) {

		this.scene.start('ProgessionPhase'); // Reemplaza 'NuevaEscena' con el nombre de la escena a la que deseas cambiar

		// Detén y olvida la escena actual
		this.scene.stop(this); // Reemplaza 'NombreEscenaActual' con el nombre de la escena actual



	}, this);

	this.cameras.main.fadeOut(1000, 0); //tiempo de fade out
	//this.enemyGroup.clear(true, true);

}

formatTime(milliseconds) {

		  // Convertir el tiempo en milisegundos a minutos y segundos
		  var minutes = Math.floor(milliseconds / 60000);
		  var seconds = Math.floor((milliseconds % 60000) / 1000);

		  // Asegurarse de que el tiempo se muestra en el formato 00:00
		  var strMinutes = (minutes < 10) ? '0' + minutes : minutes;
		  var strSeconds = (seconds < 10) ? '0' + seconds : seconds;
		  console.log(strSeconds)
		  return strMinutes + ':' + strSeconds;
}
createLevelBar(){

	this.barraNivel = this.add.graphics();
	this.borde = this.add.graphics();

	this.barraNivel.setScrollFactor(0,0);
	this.borde.setScrollFactor(0,0);
	this.borde.setDepth(1);
	// Establecer el color de la barra de nivel
	const colorBarra = 0x6CC41A; // verde

	const screenWidth = this.cameras.main.width;


	// Establecer las dimensiones y la posición de la barra de nivel
	const anchoBarra = screenWidth*0.5;
	const altoBarra = 30;
	const xBarra = 0;
	const yBarra = 0; // posición y de la barra

	// Dibujar el rectángulo de la barra de nivel

	this.barraNivel.fillStyle(colorBarra);
	this.barraNivel.fillRect(xBarra, yBarra, anchoBarra, altoBarra);

	this.barraNivel.generateTexture('BarraDeNivel', anchoBarra, altoBarra);


	this.BarraDeNivel = this.add.sprite(0, 0, 'BarraDeNivel');
	this.BarraDeNivel.setOrigin(0,0);
	this.BarraDeNivel.setDepth(0);
	this.BarraDeNivel.setScrollFactor(0,0);
	this.barraNivel.setAlpha(0.5);
	//this.barraNivel.destroy();

	const anchoBorde = anchoBarra;
	const altoBorde = altoBarra;
	const xBorde = xBarra;
	const yBorde = yBarra; // posición y de la barra

	this.BarraDeNivel.x=xBarra;
	this.BarraDeNivel.y=yBarra;

	// Dibujar el rectángulo de la barra de nivel
	this.borde.lineStyle(2, 0x0BC837C); // grosor de 2 píxeles
	this.borde.fillStyle(0x270444);
	this.borde.strokeRect(xBorde, yBorde, anchoBorde, altoBorde);

	this.LevelBarMaxSize=anchoBarra;
	this.BarraDeNivel.scaleX=0;


	this.levelName.x=xBarra+5;
	this.levelName.y=yBarra+altoBarra/2;
	this.levelName.setScrollFactor(0,0);
	this.levelName.setDepth(1);
	this.levelName.setOrigin(0,0.5);

	this.userLevel.x=xBarra+this.levelName.width+10;
	this.userLevel.y=yBarra+altoBarra/2;
	this.userLevel.setScrollFactor(0,0);
	this.userLevel.setDepth(1);
	this.userLevel.setOrigin(0,0.5);

	this.timerText.setScrollFactor(0,0);
	this.timerText.x=xBarra;
	this.timerText.y=yBarra+altoBarra;

}


LevelSystem(){

	if(this.playerShip){

		this.BarraDeNivel.scaleX=this.playerShip.currentFillPercentage;
		//this.BarraDeNivel.x=10;
		console.log(this.BarraDeNivel.x);
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
