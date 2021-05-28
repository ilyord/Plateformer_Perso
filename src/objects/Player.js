class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)


        //PROPERTIES
        this.setCollideWorldBounds(true)
        this.setBounce(0, 0);
        this.setGravityY(1100);
        this.setFriction(100, 100);

        this.setBodySize(25, 70);
        this.setOffset(+25, 3);




        //ANIMATION
        this.anims.create({
            key: 'left',
            flipX : true,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9}),
            frameRate: 9,
            repeat: -1,

        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 9}),
            frameRate: 9,
            repeat: -1,
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'player', frame: 10}],
            frameRate: 20,
        });
        this.anims.create({
            key: 'inAir',
            frames: this.anims.generateFrameNumbers('player', {start: 11, end: 12}),
            frameRate: 5,
            repeat :-1,
        });
        /*this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', {start: 8, end: 9}),
            frameRate: 6,
            repeat :-1,
        });*/
        this.anims.create({
            key: 'dash',
            frames: [{key: 'player', frame: 13}],
            frameRate: 1,
        });

        this._directionX = 0;
        this._directionY = 0;

    }
    /**
     * //DASH// *
     * @param targetX
     * @param targetY
     */
    jumpTo(targetX, targetY) {

        if (targetX > 1278 && targetY < this.height+1000) {
            //
            this.anims.play('dash', true);
            Tableau.current.tweens.timeline({
                targets: this.body.velocity,
                ease: 'Linear.easeOut ',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 250,
                loop: 0,
                tweens: [
                    {
                        x: +4000,
                    }
                ]
            })
            //console.log("RIGHT", "playerX :", this.x, "mouseX :", targetX)
        }

        //console.log("SUM OF DIRECTION=",this.x-targetX);

        // on set la direction du jump //
        if (targetX < 1278 && targetY < this.height+1000) {
            //1278
            this.anims.play('dash', true);
            Tableau.current.tweens.timeline({
                targets: this.body.velocity,
                ease: 'Linear.easeOut ',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 250,
                loop: 0,
                tweens: [
                    {
                        x: -4000,

                    }
                ]
            })
            //console.log("LEFT", "targetY :", targetY)
            //console.log("RIGHT", "mouseX :", targetX)
        }
    }


    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0 && this.body.blocked.down:
                this.setVelocityX(-250);
                this.anims.play('left', true);
                this.flipX=true;
                this.setOffset(+15, 10);
                //Tableau.sounds.play('playerStep');
                break;

//---------------------Préparation pour animation en l'air---------------------------------//
            /*case this._directionY<0:
                this.anims.play('inAir', true);
                break;*/
//-----------------------------------------------------------------------------------------//

            /*case this.body.velocity.y < 0:
                this.anims.play('inAir', true);

                break;*/


            case this._directionX>0 && this.body.blocked.down:
                this.setVelocityX(250);
                this.anims.play('right', true);
                //Tableau.sounds.play('playerStep');
                this.flipX=false;
                this.setOffset(+25, 10);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-500);}
        }



        if (this._directionX > 0) {
            if(!this.body.blocked.down || !this.body.touching.down){

                this.setVelocityX(300)}
            }
        if (this._directionX < 0) {
            if(!this.body.blocked.down || !this.body.touching.down){

                this.setVelocityX(-300)}
        }

    }
}