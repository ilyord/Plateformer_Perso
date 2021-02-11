class beber extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "e1");
        //pas de gravité
        this.body.allowGravity=true;

        //gestion de la taille
        this.setDisplaySize(80,80);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-600,this.body.height-220);
        this.setOffset(300, 100);

        //Propriétés diverse
        
        this.setDepth(11)    
        this.setOrigin(0,0);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(25);
        this.set
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );


        
        

    }

    update(){
        if(Math.random()>0.95){
        console.log("change de taille")
        this.setDisplaySize((Phaser.Math.Between(50,100)),(Phaser.Math.Between(50,100)));
    }
}

 
}