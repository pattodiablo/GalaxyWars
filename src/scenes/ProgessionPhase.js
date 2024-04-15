
// You can write more code here

/* START OF COMPILED CODE */

class ProgessionPhase extends Phaser.Scene {

	constructor() {
		super("ProgessionPhase");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bg1
		const bg1 = this.add.sprite(0, 0, "bg1");
		bg1.setOrigin(0, 0);

		// bg2
		const bg2 = this.add.tileSprite(0, 0, 1081, 1921, "bg2");
		bg2.setOrigin(0, 0);

		// stripe
		const stripe = this.add.image(0, 1, "stripe");
		stripe.setOrigin(0, 0);

		// progressionLevelBg
		const progressionLevelBg = this.add.image(0, 0, "ProgressionLevelBg");
		progressionLevelBg.setOrigin(0, 0);

		// LvText
		const lvText = this.add.bitmapText(0, 0, "lemon", "LV");
		lvText.text = "LV";
		lvText.fontSize = 72;

		// engranaje
		const engranaje = this.add.image(1852, 77, "engranaje");

		// LvNumber
		const lvNumber = this.add.bitmapText(87, 3, "lemon", "01");
		lvNumber.text = "01";
		lvNumber.fontSize = 72;

		// holder
		const holder = this.add.image(992, 256, "holder");

		// CoinAmount
		const coinAmount = this.add.bitmapText(911, 203, "lemon", "300\n");
		coinAmount.text = "300\n";
		coinAmount.fontSize = 72;

		// diamond
		const diamond = this.add.image(880, 250, "diamond");

		// holder2
		const holder2 = this.add.image(746, 414, "Holder2");

		// holder3
		const holder3 = this.add.image(978, 412, "Holder2");

		// holder4
		const holder4 = this.add.image(1238, 415, "Holder2");

		// divider
		const divider = this.add.image(976, 567, "divider");

		// upgrade
		const upgrade = this.add.image(705, 623, "upgrade");

		// upgrade2
		const upgrade2 = this.add.image(976, 625, "upgrade");

		// upgrade3
		const upgrade3 = this.add.image(1229, 643, "upgrade");

		// launchBtn
		const launchBtn = this.add.image(985, 906, "holder");

		// LauchText
		const lauchText = this.add.bitmapText(835, 863, "lemon", "LAUNCH");
		lauchText.text = "LAUNCH";
		lauchText.fontSize = 72;

		// triangle
		const triangle = this.add.image(1072, 910, "Triangle");

		// ship1
		const ship1 = this.add.image(978, 418, "ship1");

		// ship2
		const ship2 = this.add.image(735, 420, "ship2");

		// ship3
		const ship3 = this.add.image(1239, 414, "ship3");

		// ArmorText
		const armorText = this.add.bitmapText(1140, 727, "lemon", "ARMOR\n");
		armorText.text = "ARMOR\n";
		armorText.fontSize = 72;

		// MissileText
		const missileText = this.add.bitmapText(575, 721, "lemon", "MISSILE\n\n");
		missileText.text = "MISSILE\n\n";
		missileText.fontSize = 72;

		// MinesText
		const minesText = this.add.bitmapText(872, 725, "lemon", "MINES\n\n");
		minesText.text = "MINES\n\n";
		minesText.fontSize = 72;

		this.bg1 = bg1;
		this.bg2 = bg2;
		this.stripe = stripe;
		this.progressionLevelBg = progressionLevelBg;
		this.lvText = lvText;
		this.engranaje = engranaje;
		this.lvNumber = lvNumber;
		this.holder = holder;
		this.coinAmount = coinAmount;
		this.diamond = diamond;
		this.holder2 = holder2;
		this.holder3 = holder3;
		this.holder4 = holder4;
		this.divider = divider;
		this.upgrade = upgrade;
		this.upgrade2 = upgrade2;
		this.upgrade3 = upgrade3;
		this.launchBtn = launchBtn;
		this.lauchText = lauchText;
		this.triangle = triangle;
		this.ship1 = ship1;
		this.ship2 = ship2;
		this.ship3 = ship3;
		this.armorText = armorText;
		this.missileText = missileText;
		this.minesText = minesText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	bg1;
	/** @type {Phaser.GameObjects.TileSprite} */
	bg2;
	/** @type {Phaser.GameObjects.Image} */
	stripe;
	/** @type {Phaser.GameObjects.Image} */
	progressionLevelBg;
	/** @type {Phaser.GameObjects.BitmapText} */
	lvText;
	/** @type {Phaser.GameObjects.Image} */
	engranaje;
	/** @type {Phaser.GameObjects.BitmapText} */
	lvNumber;
	/** @type {Phaser.GameObjects.Image} */
	holder;
	/** @type {Phaser.GameObjects.BitmapText} */
	coinAmount;
	/** @type {Phaser.GameObjects.Image} */
	diamond;
	/** @type {Phaser.GameObjects.Image} */
	holder2;
	/** @type {Phaser.GameObjects.Image} */
	holder3;
	/** @type {Phaser.GameObjects.Image} */
	holder4;
	/** @type {Phaser.GameObjects.Image} */
	divider;
	/** @type {Phaser.GameObjects.Image} */
	upgrade;
	/** @type {Phaser.GameObjects.Image} */
	upgrade2;
	/** @type {Phaser.GameObjects.Image} */
	upgrade3;
	/** @type {Phaser.GameObjects.Image} */
	launchBtn;
	/** @type {Phaser.GameObjects.BitmapText} */
	lauchText;
	/** @type {Phaser.GameObjects.Image} */
	triangle;
	/** @type {Phaser.GameObjects.Image} */
	ship1;
	/** @type {Phaser.GameObjects.Image} */
	ship2;
	/** @type {Phaser.GameObjects.Image} */
	ship3;
	/** @type {Phaser.GameObjects.BitmapText} */
	armorText;
	/** @type {Phaser.GameObjects.BitmapText} */
	missileText;
	/** @type {Phaser.GameObjects.BitmapText} */
	minesText;

	/* START-USER-CODE */

	// Write your code here

	create(data) {
		this.datosNivel = data;
		this.editorCreate();

		var screenWidth = this.cameras.main.width;
		var screenHeigth = this.cameras.main.height;


		if(screenWidth>screenHeigth){

			this.stripe.visible=false;
			this.progressionLevelBg.visible = false;
			this.lvText.visible=false;
			this.lvNumber.visible=false;
			this.holder.visible=false;
			this.coinAmount.visible=false;
			this.diamond.visible=false;
			this.holder2.visible = false;
			this.holder3.visible = false;
			this.holder4.visible = false;
			this.ship1.visible = false;
			this.ship2.visible = false;
			this.ship3.visible = false;
			this.divider.visible = false;
			this.upgrade.visible = false;
			this.upgrade2.visible = false;
			this.upgrade3.visible = false;
			this.missileText.visible = false;
			this.minesText.visible = false;
			this.armorText.visible = false;

			this.launchBtn.x = screenWidth/2;
			this.launchBtn.y = screenHeigth/2;

			this.lauchText.fontSize = 56*this.progressionLevelBg.scaleY;
			this.lauchText.setOrigin(0.5,0.5);
			this.lauchText.x = screenWidth/2;
			this.lauchText.y = screenHeigth/2;

			this.triangle.visible=false;

		}else{
		// Establecer la escala horizontal de la imagen para que ocupe todo el ancho de la pantalla
		this.stripe.displayWidth = this.cameras.main.width;
		this.stripe.scaleY = this.stripe.scaleX; // Mantiene la proporción de la imagen
		this.engranaje.x = this.cameras.main.width - this.cameras.main.width/20;
		this.engranaje.y = this.stripe.displayHeight/2;
		this.engranaje.displayWidth = this.stripe.displayHeight/2;
		this.engranaje.displayHeight = this.stripe.displayHeight/2;

		this.progressionLevelBg.x = 10;
		this.progressionLevelBg.y = this.stripe.displayHeight/2;
		this.progressionLevelBg.setOrigin(0,0.5);	
		this.progressionLevelBg.displayWidth = this.stripe.displayWidth/4;
		this.progressionLevelBg.displayHeight = this.stripe.displayHeight/1.5;

		this.lvText.x = this.progressionLevelBg.x+12;
		this.lvText.y = this.progressionLevelBg.y-this.stripe.displayHeight/3;
		this.lvText.setOrigin(0,0);
		this.lvText.fontSize = 72*this.progressionLevelBg.scaleY;

		this.lvNumber.x = this.lvText.x+this.lvText.displayWidth+10;
		this.lvNumber.y = this.progressionLevelBg.y-this.stripe.displayHeight/3;
		this.lvNumber.setOrigin(0,0);
		this.lvNumber.fontSize = 72*this.progressionLevelBg.scaleY;

		this.holder.x = this.cameras.main.width/2;
		this.holder.y = this.stripe.y + this.stripe.displayHeight + 40;
		this.holder.displayWidth = this.stripe.displayWidth/3;
		this.holder.displayHeight = this.stripe.displayHeight/0.8;
		this.holder.setOrigin(0.5,0);

		this.coinAmount.x = this.holder.x+this.holder.displayWidth/6;
		this.coinAmount.y = this.holder.y + this.holder.displayHeight/2-3;
		this.coinAmount.setOrigin(0.5,0.5);
		this.coinAmount.fontSize = 72*this.progressionLevelBg.scaleY;
		if(this.datosNivel.ParticlesCollected != undefined){
			this.coinAmount.text = this.datosNivel.ParticlesCollected;
		}else{
			this.coinAmount.text = "---";
		}


		this.diamond.x = this.holder.x-this.holder.displayWidth/4;
		this.diamond.y = this.holder.y + this.holder.displayHeight/2;
		this.diamond.displayWidth = this.holder.displayWidth/4;
		this.diamond.displayHeight = this.holder.displayWidth/4;

		this.holder2.x = this.cameras.main.width/6;
		this.holder2.y = this.holder.y + this.holder.displayHeight*1.5;
		this.holder2.displayWidth = this.stripe.displayWidth/3;
		this.holder2.displayHeight = this.stripe.displayWidth/4.3;
		this.holder2.setOrigin(0.5,0);


		var originalWidth = this.ship2.width; // Ancho original de la imagen
		var originalHeight = this.ship2.height; // Altura original de la imagen
		var newWidth = this.stripe.displayWidth / 5; // Nueva anchura deseada
		var newHeight = (originalHeight / originalWidth) * newWidth;
		this.ship2.x = this.cameras.main.width/6;
		this.ship2.y = this.holder.y + this.holder.displayHeight*2.3;
		this.ship2.displayWidth = newWidth;
		this.ship2.displayHeight = newHeight;
		this.ship2.setOrigin(0.5,0.5);

		this.holder3.x = this.cameras.main.width/2;
		this.holder3.y = this.holder.y + this.holder.displayHeight*1.5;
		this.holder3.displayWidth = this.stripe.displayWidth/3;
		this.holder3.displayHeight = this.stripe.displayWidth/4.3;
		this.holder3.setOrigin(0.5,0);

		var originalWidth = this.ship1.width; // Ancho original de la imagen
		var originalHeight = this.ship1.height; // Altura original de la imagen
		var newWidth1 = this.stripe.displayWidth / 5; // Nueva anchura deseada
		var newHeight1 = (originalHeight / originalWidth) * newWidth1;
		this.ship1.x = this.cameras.main.width/2;
		this.ship1.y = this.holder.y + this.holder.displayHeight*2.3;
		this.ship1.displayWidth = newWidth1;
		this.ship1.displayHeight = newHeight1;
		this.ship1.setOrigin(0.5,0.5);

		this.holder4.x = this.cameras.main.width/1.2;
		this.holder4.y = this.holder.y + this.holder.displayHeight*1.5;
		this.holder4.displayWidth = this.stripe.displayWidth/3;
		this.holder4.displayHeight = this.stripe.displayWidth/4.3;
		this.holder4.setOrigin(0.5,0);

		var originalWidth = this.ship3.width; // Ancho original de la imagen
		var originalHeight = this.ship3.height; // Altura original de la imagen
		var newWidth3 = this.stripe.displayWidth / 5; // Nueva anchura deseada
		var newHeight3 = (originalHeight / originalWidth) * newWidth3;
		this.ship3.x = this.cameras.main.width/1.2;
		this.ship3.y = this.holder.y + this.holder.displayHeight*2.3;
		this.ship3.displayWidth = newWidth3;
		this.ship3.displayHeight = newHeight3;
		this.ship3.setOrigin(0.5,0.5);


		this.divider.x = this.cameras.main.width/2;
		this.divider.y = this.holder4.y + this.holder4.displayHeight*1.5;
		this.divider.displayWidth = this.stripe.displayWidth/2;
		this.divider.displayHeight = this.stripe.displayWidth/4.3;
		this.divider.setOrigin(0.5,0.5);

		this.upgrade.x = 0;
		this.upgrade.y = this.divider.y + this.divider.displayHeight;
		this.upgrade.displayWidth = this.stripe.displayWidth/3;
		this.upgrade.displayHeight = this.stripe.displayWidth/4.3;
		this.upgrade.setOrigin(0,0.5);

		this.armorText.x = this.upgrade.x+this.upgrade.displayWidth/3.5;
		this.armorText.y = this.upgrade.y - this.upgrade.displayHeight/1.4;
		this.armorText.setOrigin(0,0);
		this.armorText.fontSize = 42*this.progressionLevelBg.scaleY;

		this.upgrade2.x =  this.cameras.main.width/2;
		this.upgrade2.y = this.divider.y + this.divider.displayHeight;
		this.upgrade2.displayWidth = this.stripe.displayWidth/3;
		this.upgrade2.displayHeight = this.stripe.displayWidth/4.3;
		this.upgrade2.setOrigin(0.5,0.5);

		this.missileText.x = this.cameras.main.width/2;
		this.missileText.y = this.upgrade.y - this.upgrade.displayHeight/1.4;
		this.missileText.setOrigin(0.5,0);
		this.missileText.fontSize = 42*this.progressionLevelBg.scaleY;

		this.upgrade3.x =  this.cameras.main.width/1.2;;
		this.upgrade3.y = this.divider.y + this.divider.displayHeight;
		this.upgrade3.displayWidth = this.stripe.displayWidth/3;
		this.upgrade3.displayHeight = this.stripe.displayWidth/4.3;
		this.upgrade3.setOrigin(0.5,0.5);

		this.minesText.x =  this.cameras.main.width/1.3;
		this.minesText.y = this.upgrade.y - this.upgrade.displayHeight/1.4;
		this.minesText.setOrigin(0,0);
		this.minesText.fontSize = 42*this.progressionLevelBg.scaleY;

		this.launchBtn.x = this.cameras.main.width/2;
		this.launchBtn.y = this.upgrade3.y + this.upgrade3.displayHeight;
		this.launchBtn.displayWidth = this.stripe.displayWidth/3;
		this.launchBtn.displayHeight = this.stripe.displayWidth/6;
		this.launchBtn.setOrigin(0.5,0);

		this.lauchText.x = this.launchBtn.x-this.launchBtn.displayWidth/10;
		this.lauchText.y = this.launchBtn.y+this.launchBtn.displayHeight/2;
		this.lauchText.setOrigin(0.5,0.5);
		this.lauchText.fontSize = 56*this.progressionLevelBg.scaleY;

		this.triangle.x = this.launchBtn.x+this.launchBtn.displayWidth/2.8;
		this.triangle.y = this.launchBtn.y+this.launchBtn.displayHeight/1.8;
		this.triangle.setOrigin(0.5,0.5);
		this.triangle.displayWidth = this.launchBtn.displayWidth/6;
		this.triangle.displayHeight = this.launchBtn.displayWidth/6;
		}


		this.bg1.displayWidth = screenWidth;
        this.bg1.displayHeight = screenHeigth;
		this.bg2.displayWidth = screenWidth;
        this.bg2.displayHeight = screenHeigth;

		this.bg2.postFX.addShine(1, 1, 10,0.5,false);

		this.bg2.tilePositionY = altoJuego;

		// Configura una animación para que el contenido del tilesprite se mueva de abajo hacia arriba
		this.tweens.add({
			targets: this.bg2,
			tilePositionY: 0, // Mueve el contenido hacia arriba hasta que llegue al inicio del tilesprite
			duration: 10000, // Duración de la animación en milisegundos
			ease: 'Linear', // Tipo de interpolación (en este caso, lineal)
			repeat: -1 // Repetir infinitamente
		});


		const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		// Escucha el evento `onDown` de la tecla Enter
		enterKey.on('down', () => {
		  // Carga la escena Level.js
		  this.scene.start('Level');
		});


	    this.launchBtn.setInteractive(); // Hacer el botón interactivo para poder hacer clic en él

		// Función que se ejecutará cuando se haga clic en el botón de lanzamiento
		const launchButtonClicked = () => {
			// Llevar al jugador a la escena "Level"

			this.scene.start('Level');
			//this.scene.setLevel("Level");
		//	this.scene.start('Level');
		};

		

		// Asociar la función de clic con el evento de clic en el botón de lanzamiento
		this.launchBtn.on('pointerdown', launchButtonClicked);
		this.launchBtn.on('pointerover', () => {
			this.game.canvas.style.cursor = 'pointer';
			this.launchBtn.postFX.addShine(1, 0.5, 5,0.5,false);
		});

		// Restaurar el cursor predeterminado cuando el mouse sale del botón de lanzamiento
		this.launchBtn.on('pointerout', () => {
			this.game.canvas.style.cursor = 'default';
			this.launchBtn.removePostPipeline();
		});

		this.fadeInAndCheck();
	//	enableFullscreen.call(this);
	}

	fadeInAndCheck(){


        const fxCamera = this.cameras.main.postFX.addPixelate(120);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });

		this.cameras.main.fadeIn(2000);
		this.cameras.main.once('camerafadeincomplete', function () {	



			}, this);


	}

	preload(){

		this.load.sceneFile("Level", 'src/scenes/Level.js');
		this.scene.get("Level");

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
