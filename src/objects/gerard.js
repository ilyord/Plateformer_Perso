class gerard extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "e4");
        //pas de gravité
        this.body.allowGravity=true;

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);

        //gerard (random)
        this.setOrigin(0,0);
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(25);

        

    }

    update(){
        if(Math.random()>0.99){
            console.log("change de sens")
            this.setVelocity(Math.random()*200-100)
        }

        
    }

 
}