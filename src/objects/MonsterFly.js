class MonsterFly extends ObjetEnnemi {
    /**
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "AA");

        //Size
        let sz = Math.random() * 55 + 35;
        this.setDisplaySize(sz, sz);
        this.size = sz

        //Gravity
        this.body.allowGravity = true;
        this.body.setGravityY(1000/this.size)
        this.rotateSpeed = Math.random() + 10 * (this.size / 100);
        this.rotateSpeed = this.rotateSpeed / 100;


        //Offset
        this.setBodySize(this.body.width - 60, this.body.height - 95);
        this.setOffset(30, 60);

        //MaxSpeed
        this.body.setMaxVelocity((Phaser.Math.FloatBetween(0.5, 2.5) * 10 - 20), ((Phaser.Math.FloatBetween(1, 2) * 300 - 250)/(this.size/1.1)*30))
        this.body.setVelocityX(500)



    }

    //RESPAWN (WIP)

    /*onWorldBound(){
        this.body.y = 0,
            console.log("Reset ASTEROIDS")
    }*/

//Rotation en boucle

    loop(sz) {
        this.rotation += this.rotateSpeed;
    }
}

