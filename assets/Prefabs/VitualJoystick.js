
// You can write more code here

/* START OF COMPILED CODE */

class VitualJoystick extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// joystickBg
		const joystickBg = scene.add.sprite(0, 0, "joystickBg");
		this.add(joystickBg);

		// joystickBtn
		const joystickBtn = scene.add.sprite(0, 0, "joystickBtn");
		this.add(joystickBtn);

		this.joystickBg = joystickBg;
		this.joystickBtn = joystickBtn;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	joystickBg;
	/** @type {Phaser.GameObjects.Sprite} */
	joystickBtn;
	/** @type {Phaser.GameObjects.GameObject} */
	Player;
	/** @type {number} */
	maxDistance = 200;
	/** @type {number} */
	maxSpeed = 350;

	/* START-USER-CODE */

	create(){

		this.scene.input.on('pointerdown', this.mouseClickDown, this);
		this.scene.input.on('pointerup', this.mouseClickUp, this);
		this.scene.input.on('pointermove', this.mouseMove, this);
		this.direction = new Phaser.Math.Vector2();
		this.setAlpha(0.5);
		this.visible=false;
		this.canGo=0;
		this.joystickBg.setScrollFactor(0,0);
		this.joystickBtn.setScrollFactor(0,0);
	}

	mouseClickDown(pointer){

		this.x=pointer.x;
		this.y=pointer.y;
		this.visible=true;
		this.canGo=1;

	}
	mouseClickUp(pointer){
		this.canGo=0;

	}
	mouseMove(pointer){

		this.joystickBtn.x=pointer.x-this.x;
		this.joystickBtn.y=pointer.y-this.y;

		this.distancia = Phaser.Math.Distance.BetweenPoints(this.joystickBg,this.joystickBtn);
		this.direction.set(pointer.x - this.x, pointer.y - this.y).normalize();


	}
	update(pointer){

		if(this.Player.active){
			this.clampedDistance = Phaser.Math.Clamp(this.distancia, 0, this.maxDistance);
			this.force = this.clampedDistance / this.maxDistance;

			this.joystickBtn.setPosition(this.direction.x * this.clampedDistance, this.direction.y * this.clampedDistance);

			this.angleOfJoystick = Phaser.Math.RadToDeg(Math.atan2(this.direction.y, this.direction.x));
			this.Player.angle = this.angleOfJoystick;


				this.velocityX = this.direction.x * this.maxSpeed ;
				this.velocityY = this.direction.y * this.maxSpeed ;
			
			if(this.canGo){
				this.Player.body.velocity.set(this.velocityX, this.velocityY);
			}
		}



	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
