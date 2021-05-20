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

        this.setBodySize(18, 85);
        this.setOffset(+7, +7);


        //ANIMATION
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'player', frame: 4}],
            frameRate: 20
        });
        this.anims.create({
            key: 'inAir',
            frames: [{key: 'player', frame: 4}],
            frameRate: 20
        });

        this._directionX = 0;
        this._directionY = 0;

    }

    /*
        AddSprite (spriteX,spriteY) {
            constructor(scene, x, y)
            {
                var AbsoluteX = sprite.x;
                var AbsoluteY = sprite.y;

                if (this.body.onFloor()) {
                    this.jumpTo(sprite.x, sprite.y);
                    console.log("pointerX:", pointer.x);

                }
            }
        } */

    /**
     * //DASH// *
     * @param targetX
     * @param targetY
     */
    jumpTo(targetX, targetY) {

        if (targetX > 0) {
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
        /*if (targetX < 604) {
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
            console.log("LEFT", "targetY :", targetY)
        }*/
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
            case this._directionX<0:
                this.setVelocityX(-200);
                this.anims.play('left', true);
                break;

//---------------------Préparation pour animation en l'air---------------------------------//
            case this._directionY<0:
                this.anims.play('inAir', true);
                break;
//-----------------------------------------------------------------------------------------//


            case this._directionX>0:
                this.setVelocityX(200);
                this.anims.play('right', true);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-500);}

        }

        if (this._directionX < 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(-300)}
            }
        if (this._directionX > 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(300)}
            }
    }
}