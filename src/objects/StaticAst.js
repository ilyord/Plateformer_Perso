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
        this.setDisplaySize(158*0.5,165*0.5);
        this.setBodySize(this.body.width - 40, this.body.height - 100);
        //this.body.rotation = this.rotation;
        this.setOffset(15, 60);



    }

}

