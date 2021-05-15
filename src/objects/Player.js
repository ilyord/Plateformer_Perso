class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0,0);
        this.setGravityY(800);
        this.setFriction(100,100);

        this.setBodySize(18,85);
        this.setOffset(+7,+7);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'inAir',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;

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
                this.setVelocityX(-300);
                this.anims.play('left', true);
                break;

//---------------------Préparation pour animation en l'air---------------------------------//
            case this._directionY<0:
                this.anims.play('inAir', true);
                break;
//-----------------------------------------------------------------------------------------//


            case this._directionX>0:
                this.setVelocityX(300);
                this.anims.play('right', true);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-650);}

            }
        /*
        if (this._directionX < 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(-300)}
            }
        if (this._directionX > 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(300)}
            } */

    }


}