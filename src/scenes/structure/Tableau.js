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
        this.load.image('spike', 'assets/spike.png');
        this.load.audio('woosh', 'assets/Sound/woosh.mp3');
        this.load.spritesheet('player',
            'assets/Aplayer.png',
            { frameWidth:31 , frameHeight: 91  }
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
        this.player=new Player(this,0,300);
        this.player.setMaxVelocity(800,900); //évite que le player quand il tombe ne traverse des plateformes
        this.blood = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2,"smoke")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

    }


    update(){
        super.update();
        this.player.move();

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

        this.Tableau = this.sound.add('woosh');
        var musicConfig =
            {
                mute: false,
                volume: 1,
                rate : 2,
                detune: Phaser.Math.FloatBetween(0,5),
                seek: 0,
                loop: false,
                delay:0,

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

        if(this.player.body.velocity.y > 0 && this.player.body.touching.down){
            //console.log("DOWNSHAKE")
            this.player.body.setVelocityY(-800);
            this.cameras.main.shake(50,0.0020,false);
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