class Welcome extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload ()
    {
        // images
        this.load.image('Fond', 'assets/Menu/Fond.jpg');

        this.load.image('Play', 'assets/Menu/Play.png');

        this.load.image('Click','assets/Menu/Click.jpg')


        // audios
        this.load.audio('Void', 'assets/Sound/Void.mp3');

        this.load.audio('Song', 'assets/Sound/Foretsong.mp3');

        this.load.audio('Transi', 'assets/Sound/Transi.wav');
    }

    create()
    {



       /* this.tweens.add(
            {
                targets:[Click],
                duration:2000,
                yoyo: true,
                repeat:-1,
                delay:Math.random()*1000,
                alpha:
                    {
                        startDelay:Math.random()*5000,
                        from:0,
                        to:1,
                    }
            })*/

        //---------- booleans que l'on compte utiliser ----------

        this.touchePressed = false;


        //---------- gestion des musiques ----------

        this.game.sound.stopAll();
        this.welcome = this.sound.add('Void');
        var musicConfig =
            {
                mute: false,
                volume: 1,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }
        this.welcome.play(musicConfig);


        //---------- on affiche les images à l'écran ----------

        this.add.sprite(game.config.width/2, game.config.height/2, 'Fond');



        //---------- on affiche les boutons ----------

        let startB1 = this.add.sprite(game.config.width/2, game.config.height/2, 'Play');

        let startB2 = this.add.sprite(game.config.width/2, game.config.height/2+100, 'Click');

//-------------------------------------TRANSI_SON------------------------------------------//


        this.input.on('pointerdown', function(pointer)
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.game.sound.stopAll();
                this.music = this.sound.add('Transi');
                var musicConfig =
                    {
                        mute: false,
                        volume: 0.5,
                        rate : 0.4,
                        detune: 0,
                        seek: 0,
                        loop: false,
                        delay:0,
                    }

                //--------------------Musique_pour_le_LVL_suivant-------------------------//

                this.music.play(musicConfig);
                this.music = this.sound.add('Song');
                var musicConfig =
                    {
                        mute: false,
                        volume: 0.3,
                        rate : 1,
                        detune: -100,
                        seek: 0,
                        loop: true,
                        delay:3.4,
                    }
                this.music.play(musicConfig);
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(TableauTiled);
                    this.scene.start("OuterSpace");
                })
            }

        },this);
    }

}