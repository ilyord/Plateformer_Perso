class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)


        //PROPERTIES

        this.dashing = false;
        this.setCollideWorldBounds(true);
        this.setBounce(0, 0);
        this.setGravityY(1100);
        this.setFriction(100, 100);

        this.setBodySize(25, 70);
        this.setOffset(+25, 3);
        this.CD = 0;

        //TEXTE DASH RESTANT

        this.debugText = scene.add.text(this.x, this.y, '',{
            fontFamily: "'Amatic SC'"
        }).setDepth(2000).setScale(2,2);

        let ici=this;
        this.debugText.setText(".");
        setTimeout(function(){
            ici.debugText.setText("");
        },100);



        //CREATION D'ANIMATION

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
            repeat :0,
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
            repeat : -1,

        });

        this._directionX = 0;
        this._directionY = 0;

        /*this.on('animationcomplete',function () {
            if(this.anims.currentAnim.key === 'dash'){
                this.Dashing = false;
                console.log("Oncomplete");
            }
        });*/

    }
    /**
     * //DASH// *
     * @param targetX
     * @param targetY
     * @param CDD
     */
    jumpTo(targetX, targetY,CDD) {

        //TRANSFER INFO SUR DASH RESTANTS
        this.CD = CDD-1;
        this.dashing = false;
        this.setVelocityY(-250);
        // on Set la direction du jump DROITE //
        if (targetX > 1278 && targetY < this.height+1000) {
            //this.anims.play('dash', false);
            //
            Tableau.current.tweens.timeline({
                targets: this.body.velocity,
                ease: 'Linear.easeOut ',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 300,
                loop: 0,
                tweens: [
                    {
                        x: +4500,
                    }
                ]
            })
            //console.log("RIGHT", "playerX :", this.x, "mouseX :", targetX)
        }

        // on Set la direction du jump GAUCHE //
        if (targetX < 1278 && targetY < this.height+1000) {
            //this.anims.play('dash', false);
            //1278
            Tableau.current.tweens.timeline({
                targets: this.body.velocity,
                ease: 'Linear.easeOut ',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 300,
                loop: 0,
                tweens: [
                    {
                        x: -4500,

                    }
                ]
            })
            //console.log("LEFT", "mouseX :", targetX)
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
     * Déplace le joueur en fonction des directions données + Affichage CoolDown Dash
     */

    move() {


        this.CD=Math.min(this.CD,3);



        this.debugText.setText('Dash: ' + this.CD);
        this.debugText.x = this.x - 35;
        this.debugText.y = this.y - 70;


        //PLAY ANIMATION ET 'flipX' + HITBOX EN FONCTION DU 'flipX'

        switch (true) {
            case this._directionX < 0 :
                this.flipX = true;
                if (this.body.blocked.down) {
                    this.setVelocityX(-350);
                    this.anims.play('left', true);
                    this.setOffset(+15, 10);
                }
                //Tableau.sounds.play('playerStep');
                break;


            //PLAY ANIMATION ET 'flipX' + HITBOX EN FONCTION DU 'flipX'

            case this._directionX > 0 :
                this.flipX = false;
                if (this.body.blocked.down) {
                    this.setVelocityX(350);
                    this.anims.play('right', true);
                    //Tableau.sounds.play('playerStep');
                    this.setOffset(+25, 10);
                }
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-500);
            }
        }

        if (this._directionX > 0) {
            if (!this.body.blocked.down || !this.body.touching.down) {

                this.setVelocityX(450)
            }
        }

        if (this._directionX < 0) {
            if (!this.body.blocked.down || !this.body.touching.down) {

                this.setVelocityX(-450)
            }
        }
        if (this.dashing == true) {
            console.log("isDashing",this.dashing);
            this.anims.play('dash', false);
        }
        // ANIMATION EN L'AIR

        if (this._directionY < 0) {
            this.anims.play('inAir', true);
        }

        if (this.body.velocity.y < 0) {
            this.anims.play('inAir', true);
        }
        /*if (this._directionY > 0) {
            this.anims.play('inAir', true);
        }*/

        if (this.body.velocity.y > 0) {
            this.anims.play('inAir', true);
        }
        /*
        if(this._directionY = 0){
        this.anims.play('turn');
        }
        if(this.body.velocity.y = 0){
            this.anims.play('turn');
        }*/
    }
}