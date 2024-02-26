
// You can write more code here

/* START OF COMPILED CODE */

class Enemy3 extends EnemyBase {

	constructor(scene, x, y, frame) {
		super(scene, x ?? 0, y ?? 0, frame);

		this.setInteractive(this.scene.input.makePixelPerfect());

		/* START-USER-CTR-CODE */
	
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
  
	
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	enemyLife = 1;

	/* START-USER-CODE */
    animacionDeInicio(){
        
    }
    animacionIdle(){
       
    }
    ownCreate() {
        console.log("enemy 3 created");
        this.scene.physics.world.enable(this);
    
        const circle = new Phaser.Geom.Circle(0, 0, 100); // Ajusta las coordenadas del círculo según tu necesidad
        circle.x = circle.diameter / 2;
        circle.y = circle.diameter / 2;
        const graphics = this.scene.add.graphics({ fillStyle: { color: 0x21EFDA } });
        graphics.fillCircleShape(circle);
    
        // Generar una textura a partir del gráfico
        const texture = graphics.generateTexture('circleTexture', circle.diameter); // Ajusta el tamaño de la textura
    
        // Asignar la textura al objeto Enemy3
        this.setTexture('circleTexture');
    
        // Ajustar el cuerpo de físicas para que coincida con el tamaño de la textura
        this.body.setSize(circle.diameter, circle.diameter);
        
        // Ajustar el desplazamiento del cuerpo para que el origen coincida con el centro del círculo
        this.body.setOffset(0, 0);
    
        // Eliminar el gráfico y la textura no utilizada
        graphics.destroy();
        texture.destroy();
    }
    

   
   


	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
