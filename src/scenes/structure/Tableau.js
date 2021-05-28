/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('smoke', 'assets/smoke.png');
        this.load.audio('woosh', 'assets/Sound/woosh.mp3');
        this.load.audio('woosh2', 'assets/Sound/woosh2.mp3');
        this.load.audio('playerStep', 'assets/Sound/Running.mp3');
        this.load.audio('playerFalling', 'assets/Sound/FallingGround.mp3');
        this.load.audio('playerLanding', 'assets/Sound/landingOnRocks.mp3');





        this.load.spritesheet('player',
            'assets/Re_Resized_Small_Alessia_Running9.png',
            { frameWidth:62 , frameHeight: 39*2  }
        );
    }
    create(){
        Tableau.current=this;
        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;
        this.sys.scene.scale.lockOrientation("landscape")
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,1650,750); //1650
        this.player.setMaxVelocity(950,850); //évite que le player quand il tombe ne traverse des plateformes
        this.blood = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2,"smoke")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        //this.playerStep = this.sound.add('playerStep');
        //this.playerStep.play();






/*
        this.isWalking = false;
        //this.muting=!this.isWalking;

            this.Tableau = this.sound.add('run');

            var musicConfig =
                {
                    markers : 'run',
                    mute: 0,
                    volume: 0.3,
                    rate: 1,
                    detune: 0,
                    loop: -1,
                    Oncomplete: function (){
                        this.game.sound.stopAll();
                    }
                }

        this.Tableau.play(musicConfig);

*/
    }

//BRUIT DE PAS//

    /*runSound (looping,mutesong){

        var looping = true;
        var mutesong = false;
        this.Tableau = this.sound.add('run');

        //OUI OU NON ON JOUE L'AUDIO//

        /*if (this.isWalking = true){
            mutesong = 0
        }
        else
            mutesong = 1;

        //CONFIG SON//

        var musicConfig =
            {
                mute: mutesong,
                volume: 0.3,
                rate : 1,
                detune: 0,
                loop : looping,

                Oncomplete: function (){
                    this.game.sound.stopAll();
                }
            }

        this.Tableau.play(musicConfig);



        if (looping = false){
            console.log("MUTE ")
        }
        else
            console.log("APPEL COURSE")
    }*/



    update(){
        super.update();
        this.player.move();
        //console.log(this.isWalking)
        this.fallingCheck();


    }

    fallingCheck(){
        if(this.player.body.onFloor() && this.player.directionY >0)
        {
            //console.log("BIMBAMBOUM")
                this.music = this.sound.add('playerLanding');
                var musicConfig =
                    {
                        mute: false,
                        volume: 2.5,
                        rate : 3,
                        detune: Phaser.Math.FloatBetween(-100,-300),
                        seek: 0,
                        loop: false,
                        delay:0,
                        Oncomplete: function (){
                            this.game.sound.stop.sound('playerLanding');
                        }

                    }

                //this.Tableau.play(musicConfig);
        }
            }


    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this;
        this.physics.pause();
        this.cameras.main.shake(2000,0.0080,true);
        me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,100);
        me.blood.x=object.x;
        me.blood.y=object.y;
        this.DeathSound(object.y);
        me.tweens.add({
            targets:me.blood,
            duration:600,
            yoyo: -1,
            displayHeight:{
                from:40,
                to:150,
            },
            displayWidth:{
                from:40,
                to:150,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })
    }

    wooshShound (){

        this.Tableau = this.sound.add('woosh2');
        var musicConfig =
            {
                mute: false,
                volume: 1.3,
                rate : 2,
                detune: Phaser.Math.FloatBetween(0,100),
                seek: 0,
                loop: false,
                delay:0,

                Oncomplete: function (){
                    this.game.sound.stopAll();
                }
            }

        this.Tableau.play(musicConfig);

    }


    wooshShound2 (){

        this.Tableau = this.sound.add('woosh');
        var musicConfig =
            {
                mute: false,
                volume: 1,
                rate : 1    ,
                detune: Phaser.Math.FloatBetween(0,100),
                seek: 0,
                loop: false,
                delay:0.1,

                Oncomplete: function (){
                    this.game.sound.stopAll();
                }
            }

        this.Tableau.play(musicConfig);

        //console.log("whoosh2");

    }

    DeathSound(PlayerYY){

        //Volume en fonction de l'avancée du joueur

        //console.log("DEATHSOUND")

        PlayerYY = (PlayerYY/1100);
         let volumeXX = 1;


        if(1<PlayerYY<4){
            volumeXX = PlayerYY;
        }
            else
                volumeXX = 1;

        this.Tableau = this.sound.add('playerFalling');
        var musicConfig =
            {
                mute: false,
                volume: volumeXX,
                rate : 1    ,
                detune: Phaser.Math.FloatBetween(0,100),
                seek: 0,
                loop: false,
                delay:0.1,

                Oncomplete: function (){
                    this.game.sound.stopAll();
                }
            }

        this.Tableau.play(musicConfig);

    }

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        star.emit("disabled");
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===1){
            this.win();
        }
        
    }



    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster){

        let me=this;

        if(this.player.body.velocity.y > 0 && this.player.body.wasTouching.none ){
            //console.log("DOWNSHAKE")
            this.player.body.setVelocityY((this.player.body.velocity.y*-1)*1.5);
            this.cameras.main.shake(50,0.0025,false);
        }
        else
            me.playerDie()
    }


    /**
     * Tue le player
     * - le rend invisible
     * - fait apparaitre du sang
     * - ressuscite le player
     * - redémarre le tableau
     */

    playerDie(){
        let me=this;
        if(!me.player.isDead) {

            me.player.isDead = true;
            me.player.visible = false;
            //ça saigne...
            me.saigne(me.player, function () {
                //à la fin de la petite anim, on relance le jeu
                me.blood.visible = false;
                me.player.anims.play('turn');
                me.player.isDead = false;

                me.cameras.main.fadeOut(1000, 0, 0, 0)
                me.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    me.scene.restart();
                })
            })
        }
    }

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
    }
}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;