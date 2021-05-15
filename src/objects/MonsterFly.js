class MonsterFly extends ObjetEnnemi {
    /**
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "AA");

        //Taille 
        let sz = Math.random() * 50 + 30;
        this.setDisplaySize(sz, sz);
        this.size = sz

        //Gravité
        this.body.allowGravity = true;
        this.rotateSpeed = Math.random() + 10 * (this.size / 75);
        this.rotateSpeed = this.rotateSpeed / 100;


        //Offset
        this.setBodySize(this.body.width - 60, this.body.height - 95);
        this.setOffset(30, 60);

        //Speed
        this.body.setMaxVelocity(Math.random() * 10 - 5, Math.random() * 300 - 200)

    }


   /*update() {
    if(this.y>3000){
        this.destroy();
        console.log("bbb");
    }
}

    destroy() {
            this.setActive(false);
            this.setVisible(false);
            console.log("aaa");
            this.body.disableBody(true,true);
        }*/


    loop() {
        this.rotation += this.rotateSpeed;
    }
}

