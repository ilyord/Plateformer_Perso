class jacques extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "e3");
        //pas de gravité
        this.body.allowGravity=true;


        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);

        //jacques (petit qui saute vite)
        
        this.setOrigin(0,0);
        this.setDisplaySize(20,20);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(200);
        this.setGravity(10)

    }

 
}