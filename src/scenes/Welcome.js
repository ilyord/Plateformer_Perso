class Welcome extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload ()
    {
        // images
        this.load.image('Fond', 'assets/Menu/Fond.jpg');

        this.load.image('Play', 'assets/Menu/Play.png');


        // audios
        this.load.audio('Void', 'assets/Sound/Void.mp3');

        this.load.audio('Song', 'assets/Sound/Foretsong.mp3');

        this.load.audio('Transi', 'assets/Sound/Transi.wav');
    }

    create()
    {
        //localStorage.removeItem("bougie");
        //localStorage.removeItem("torche");

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

        //startB.scale = 0.5;


        /*---------- on affiche les textes que l'on veut faire apparaître (boutons, titre...) ----------

        let startBText1 = this.add.text(game.config.width/2-72, game.config.height -265, "Play",{font: "28px visitor", fill:"#000000"}); //375,560,FFF
        let startBText2 = this.add.text(game.config.width/2-79, game.config.height -165, "Ctrls",{font: "28px visitor", fill:"#000000"});
        let startBText3 = this.add.text(game.config.width/2-66, game.config.height -65, "Credits",{font: "28px visitor", fill:"#000000"});

        let startBText1_2 = this.add.text(game.config.width/2-12, game.config.height -265, "[enter]",{font: "28px visitor", fill:"#000000"});
        let startBText2_2 = this.add.text(game.config.width/2-12, game.config.height -165, "[space]",{font: "28px visitor", fill:"#000000"});
        let startBText3_2 = this.add.text(game.config.width/2+28, game.config.height -65, "[-]",{font: "28px visitor", fill:"#000000"});

        //---------- on initialise les touches du clavier pour lancer le jeu, activer/desactiver des options, etc ----------

        /*if(Tableau.current){
            Tableau.current._destroy();
        }
        this.game.scene.start(tableau);
        this.scene.start("aventureBegining");*/



//-------------------------------------TRANSI_SON------------------------------------------//

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
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

        }, this);

        this.input.on('pointerdown', function(pointer)
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
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