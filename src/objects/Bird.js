class Bird extends ObjetEnnemi{
    /**
     * Un oiseau qui vole et fait des allez -retours
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "bird");

        //à partir du spritesheet (bird.json) génère une animation
        scene.anims.create({
            key: 'birdFly',
            repeat: -1,
            frameRate:30,
            frames: scene.anims.generateFrameNames('bird', {
                prefix: 'vole',
                end: 29,
                zeroPad: 4
            })
        });


        //pas de gravité
        this.body.allowGravity=false;
        this.setBodySize(40,40);//réduit le hit
        this.setBounceX(1);
        this.body.setMaxVelocityX(150)
        this.setVelocityX(-150);
        this.setCollideWorldBounds(true);
        this.play("birdFly");
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );

        //animation qui permet de faire légèrement monter et descendre notre oiseau
        this.scene.tweens.add({
            targets: this,
            y: {
                from: this.minY,
                to:this.y-20, //on monte de 20 px
                duration: 500,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
    }

    update(){
        //fait changer de sens notre oiseau
        if(this.body){
            if(this.body.velocity.x<0){
                this.flipX=false;
            }else{
                this.flipX=true;
            }
        }

    }


}