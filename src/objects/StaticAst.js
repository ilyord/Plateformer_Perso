class StaticAst extends ObjetEnnemi {
    /**
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "CC");

        //Gravity
        this.body.allowGravity=false;
        this.rotation = 175;

        //Size et Offset
        this.setDisplaySize(158*0.6,165*0.6);
        this.setBodySize(this.body.width+30, this.body.height - 120);
        //this.body.rotation = this.rotation;
        this.setOffset(-15, 60);



    }

}

