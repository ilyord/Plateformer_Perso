class MonsterFly extends ObjetEnnemi {
    /**
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "AA");

        //Size
        let sz = Math.random() * 55 + 80;
        this.setDisplaySize(sz, sz);
        this.size = sz;

        //Gravity
        this.body.allowGravity = true;
        this.body.setGravityY(1000/this.size);
        this.rotateSpeed = Math.random() + 10 * (this.size / 200);
        this.rotateSpeed = this.rotateSpeed / 100;


        //Offset
        this.setBodySize(this.body.width - 80, this.body.height - 105);
        this.setOffset(40, 60);

        //MaxSpeed
        this.body.setMaxVelocity(0, 100);
        this.body.setVelocityY(100);

        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );

    }

    update(y){
    if(this.y>3200){
        this.y=0;
       //console.log("reset ast");
    }
}

//Rotation en boucle

    loop(sz) {
        this.rotation += this.rotateSpeed;
    }
}

