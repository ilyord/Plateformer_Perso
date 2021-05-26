class Welcome extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload ()
    {
        // images
        this.load.image('Fond1', 'assets/Menu/Fond.jpg');

        this.load.image('Play', 'assets/Menu/Play.png');

        this.load.image('Click','assets/Menu/Click.jpg')


        // audios
        this.load.audio('Void', 'assets/Sound/Void.mp3');

        this.load.audio('Song', 'assets/Sound/SpaceOdyssey.mp3');

        this.load.audio('Transi', 'assets/Sound/Transi.wav');

        this.load.audio('Transi2', 'assets/Sound/Transi2.mp3');
    }

    create()
    {



        this.tweens.add(
            {
                targets:['Click'],
                duration:200,
                yoyo: true,
                repeat:-1,
                delay:0,
                alpha:
                    {
                        startDelay:Math.random(),
                        from:0,
                        to:1,
                    }
            })

        //---------- booleans que l'on compte utiliser ----------

        this.touchePressed = false;


        //---------- gestion des musiques ----------

        this.game.sound.stopAll();
        this.welcome = this.sound.add('Void');
        var musicConfig =
            {
                mute: false,
                volume : 0.4,
                rate : 0.7,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0.2,
            }
        this.welcome.play(musicConfig);


        //---------- on affiche les images à l'écran ----------

        let startB1 = this.add.sprite(game.config.width/2, game.config.height/2, 'Fond1');
        startB1.setDisplaySize(width-300,height);



        //---------- on affiche les boutons ----------

        //let startB1 = this.add.sprite(game.config.width/2, game.config.height/2-100, 'Play');

        let startB2 = this.add.sprite(game.config.width/2, game.config.height/2, 'Click');
        startB2.setDisplaySize(320,80);

//-------------------------------------TRANSI_SON------------------------------------------//


        this.input.on('pointerdown', function(pointer)
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.game.sound.stopAll();
                this.music = this.sound.add('Transi');
                this.music = this.sound.add('Transi2');
                var musicConfig =
                    {
                        mute: false,
                        volume: 0.2,
                        rate : 1.4,
                        detune: 0,
                        seek: 0,
                        loop: false,
                        delay:0,
                        Oncomplete: function (){
                            this.game.sound.stopAll();
                            this.welcome.play(musicConfig2)
                        }

                    }
                    this.welcome.play(musicConfig);

                var musicConfig2 =
                    {
                        mute: false,
                        volume: 0.2,
                        rate : 1.4,
                        detune: 0,
                        seek: 0,
                        loop: false,
                        delay:0,
                        Oncomplete: function (){
                            this.game.sound.stopAll();
                        }
                    }



                //--------------------Musique_pour_le_LVL_suivant-------------------------//

                this.music.play(musicConfig);
                this.music = this.sound.add('Song');
                var musicConfig =
                    {
                        mute: false,
                        volume: 0.2,
                        rate : 1,
                        loop: true,

                    }
                this.music.play(musicConfig);
                this.cameras.main.fadeOut(200, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(TableauTiled);
                    this.scene.start("OuterSpace");
                })
            }

        },this);
    }

}