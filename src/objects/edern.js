class edern extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre-violet");
        //pas de gravité
        this.body.allowGravity=false;


        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);
        

        //edern (0Grav)

        this.setOrigin(0,0);
        this.setDisplaySize(80,80);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(1000);
        this.setGravity(0);


    }

 
}