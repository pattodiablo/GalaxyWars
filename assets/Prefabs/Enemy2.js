
// You can write more code here

/* START OF COMPILED CODE */

class Enemy2 extends EnemyBase {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Enemy2", frame);

		this.setInteractive(new Phaser.Geom.Polygon("0.3414751022435638 37.994162330695396 27.82398957078553 -0.27778374401489714 53.06718804559445 38.19773651194386 27.620415389537072 28.83332417451474"), Phaser.Geom.Polygon.Contains);
		this.scaleX = 0.5;
		this.scaleY = 0.5;

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	animacionIdle(){


	}

	update() {



		if (this.active) {

			// Obtener la posición del jugador
			const playerX = this.scene.playerShip.x;
			const playerY = this.scene.playerShip.y;

			// Calcular la dirección hacia el jugador
			const directionX = playerX - this.x;
			const directionY = playerY - this.y;

			// Calcular el ángulo hacia el jugador en radianes
			const angleToPlayer = Math.atan2(directionY, directionX);

			// Convertir el ángulo a grados y establecer la rotación del Enemy2
			this.rotation = angleToPlayer + Math.PI / 2;

			// Definir la velocidad a la que se moverá el Enemy2
			const speed = 1;

			// Normalizar la dirección para obtener la dirección unitaria
			const distance = Math.sqrt(directionX * directionX + directionY * directionY);
			const dirX = directionX / distance;
			const dirY = directionY / distance;

			// Actualizar la posición del Enemy2
			this.x += dirX * speed;
			this.y += dirY * speed;

		} else {
			// El objeto no existe en el grupo
		}



	}




	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
