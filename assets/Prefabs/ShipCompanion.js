
// You can write more code here

/* START OF COMPILED CODE */

class ShipCompanion extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ShipCompanion", frame);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		this.setScale(0.15,0.15);

		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	CompanionType = 1;

	/* START-USER-CODE */
		create(){
			this.laserDamage = 30;	
			const laserInterval = 500; // Por ejemplo, un láser cada 2 segundo
			this.smoothFactor = 0.5; 
			
			if(this.scene.playerShip.canShoot){
				if(this.CompanionType==0){

					this.laserTimer = this.scene.time.addEvent({
						delay: laserInterval,
						callback: this.fireLaser,
						callbackScope: this,
						loop: true // Para que el temporizador se repita infinitamente
					});



				}


				if(this.CompanionType==1){

					this.laserTimer = this.scene.time.addEvent({
						delay: 300,
						callback: this.fireLaser1,
						callbackScope: this,
						loop: true // Para que el temporizador se repita infinitamente
					});



				}

				if(this.CompanionType==2){
				
					this.laserTimer = this.scene.time.addEvent({
						delay: 300,
						callback: this.fireLaser2,
						callbackScope: this,
						loop: true // Para que el temporizador se repita infinitamente
					});



				}
}
			

			this.setDepth(1);


		}
		update() {
			// Velocidad de seguimiento (ajusta según sea necesario)
			const smoothFactor = 0.1; // Ajusta el factor de suavizado
		
			if (this.CompanionType !== 2) {
				// Calcular la posición objetivo suavizada
				const targetX = this.x + (this.scene.playerShip.x + this.offsetX - this.x) * smoothFactor;
				const targetY = this.y + (this.scene.playerShip.y + this.offsetY - this.y) * smoothFactor;
		
				// Interpolar la posición actual hacia la posición objetivo
				this.x += targetX - this.x;
				this.y += targetY - this.y;
			}
		
			// Establecer la rotación del objeto igual a la rotación de playerShip
			this.rotation = this.scene.playerShip.rotation;
		}
		

		fireLaser() {
			let closestEnemy = null;
			let shortestDistance = Infinity;

			// Itera sobre cada elemento del grupo
			this.scene.enemyGroup.getChildren().forEach(function(enemy) {

				 // Calcular la distancia entre ShipCompanion y el enemigo actual
				 const dx = this.x - enemy.x;
				 const dy = this.y - enemy.y;
				 const distance = Math.sqrt(dx * dx + dy * dy);

					// Por ejemplo, puedes realizar una acción si la distancia es menor que cierto valor
					if (distance < 200) {

						if (distance < shortestDistance) {

								const angleToEnemy = Math.atan2(dy, dx);

							// Convertir el ángulo a grados y ajustarlo según la rotación deseada
							const angleInDegrees = Phaser.Math.RadToDeg(angleToEnemy);

							this.rotation = angleInDegrees;
							shortestDistance = distance;
							closestEnemy = enemy;
						}

					}

			}, this);


			if (closestEnemy) {
				// Realizar acciones con el enemigo más cercano (closestEnemy)
				// Por ejemplo, atacar al enemigo más cercano o realizar alguna acción específica
				const laser = this.scene.add.rectangle(this.x, this.y, 5, 50, 0xFF0000);
				this.scene.physics.add.existing(laser); // Si quieres que el láser tenga físicas

				laser.angle=this.angle+90;
				const laserSpeed = 700; // Velocidad del láser, ajusta según sea necesario
				laser.setDepth(this.depth-1);

				// Aplicar velocidad al láser en la dirección calculada

				this.KillTimer = this.scene.time.addEvent({
					delay: 2000,
					callback: function(){
						laser.destroy();
					},
					callbackScope: this,
					loop: true // Para que el temporizador se repita infinitamente
				});

				this.velocidadX = Math.cos(this.rotation) * laserSpeed
				this.velocidadY = Math.sin(this.rotation) * laserSpeed

				laser.body.setVelocity(this.velocidadX, this.velocidadY);
				laser.damage = this.laserDamage;
				this.scene.lasersGroup.add(laser);

			} else {
				// No se encontró ningún enemigo dentro del radio de detección
				console.log("No hay enemigos cercanos dentro del radio de detección.");
			}



		}


		fireLaser1() {
			
			this.rotation += 0.5;



				// Realizar acciones con el enemigo más cercano (closestEnemy)
				// Por ejemplo, atacar al enemigo más cercano o realizar alguna acción específica
				const laser = this.scene.add.rectangle(this.x, this.y, 5, 10, 0x00FF1E);
				this.scene.physics.add.existing(laser); // Si quieres que el láser tenga físicas

				laser.angle=this.angle+90;
				const laserSpeed = 700; // Velocidad del láser, ajusta según sea necesario
				laser.setDepth(this.depth-1);

				// Aplicar velocidad al láser en la dirección calculada

				this.KillTimer = this.scene.time.addEvent({
					delay: 2000,
					callback: function(){
						laser.destroy();
					},
					callbackScope: this,
					loop: true // Para que el temporizador se repita infinitamente
				});

				this.velocidadX = Math.cos(this.rotation) * laserSpeed
				this.velocidadY = Math.sin(this.rotation) * laserSpeed

				laser.body.setVelocity(this.velocidadX, this.velocidadY);
				laser.damage = this.laserDamage;
				this.scene.lasersGroup.add(laser);

			} 



		fireLaser2() {
	
			let closestEnemy = null;
			let shortestDistance = Infinity;

			// Itera sobre cada elemento del grupo
			this.scene.enemyGroup.getChildren().forEach(function(enemy) {

				 // Calcular la distancia entre ShipCompanion y el enemigo actual
				 const dx = this.x - enemy.x;
				 const dy = this.y - enemy.y;
				 const distance = Math.sqrt(dx * dx + dy * dy);

					// Por ejemplo, puedes realizar una acción si la distancia es menor que cierto valor
					if (distance < 200) {

						if (distance < shortestDistance) {

								const angleToEnemy = Math.atan2(dy, dx);

							// Convertir el ángulo a grados y ajustarlo según la rotación deseada
							const angleInDegrees = Phaser.Math.RadToDeg(angleToEnemy);

							this.rotation = angleInDegrees;
							shortestDistance = distance;
							closestEnemy = enemy;
						}

					}

			}, this);


			if (closestEnemy) {
				// Realizar acciones con el enemigo más cercano (closestEnemy)
				// Por ejemplo, atacar al enemigo más cercano o realizar alguna acción específica
				const laser = this.scene.add.rectangle(this.x, this.y, 5, 50, 0x1BF0FF);
				this.scene.physics.add.existing(laser); // Si quieres que el láser tenga físicas

				laser.angle=this.angle+90;
				const laserSpeed = 700; // Velocidad del láser, ajusta según sea necesario
				laser.setDepth(this.depth-1);

				// Aplicar velocidad al láser en la dirección calculada

				this.KillTimer = this.scene.time.addEvent({
					delay: 2000,
					callback: function(){
						laser.destroy();
					},
					callbackScope: this,
					loop: true // Para que el temporizador se repita infinitamente
				});

				this.velocidadX = Math.cos(this.rotation) * laserSpeed
				this.velocidadY = Math.sin(this.rotation) * laserSpeed

				laser.body.setVelocity(this.velocidadX, this.velocidadY);
				laser.damage = this.laserDamage;
				this.scene.lasersGroup.add(laser);

			} 

			} 

		







	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
