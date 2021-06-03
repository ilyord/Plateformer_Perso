class TableauTiled extends Tableau{
    /**
     * Ce tableau démontre comment se servir de Tiled, un petit logiciel qui permet de designer des levels et de les importer dans Phaser (entre autre).
     *
     * Ce qui suit est très fortement inspiré de ce tuto :
     * https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
     *
     * Je vous conseille aussi ce tuto qui propose quelques alternatives (la manière dont son découpées certaines maisons notamment) :
     * https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
     */
    constructor()
    {
        super("OuterSpace");
    }

    preload() {
        super.preload();

        // ------pour TILED-------------

        this.load.image('tiles', 'assets/tilemaps/Petite_Bleu_Plateformes_lineless.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled37.json');

        // nos images

        this.load.image('AA', 'assets/B.png');
        this.load.image('CC', 'assets/Asteroide2_OPTI.png');
        this.load.image('star', 'assets/star.png');

        this.load.image('ETOILE', 'assets/fond/Sunless_Background_Etoile.jpg');
        this.load.image('NUAGE1', 'assets/fond/Sunless_Background_Nuage1.png');
        this.load.image('NUAGE2', 'assets/fond/Sunless_Background_Nuage2.png');
        this.load.image('GALAXY', 'assets/fond/Sunless_Background_Galaxy.png');
        this.load.image('BH', 'assets/fond/Sunless_Background_BH.png');

        this.load.image('check','assets/checkpoint.png');

        this.load.image('tuto_basic', 'assets/tuto/Small_Basics_Tutorial_Sign3.jpg');
        this.load.image('tuto_avoid', 'assets/tuto/Small_Avoid_Ast_Tutorial_Sign2.jpg');
        this.load.image('tuto_jumpOn', 'assets/tuto/Small_Jump_Ast_Tutorial_Sign.jpg');
        this.load.image('tuto_superBounce', 'assets/tuto/Small_Super_Bounce_Tutorial_Sign.jpg');
        this.load.image('tuto_dash', 'assets/tuto/Small_Dash_Tutorial_Sign.jpg');

        this.load.image('smoke','assets/smoke.png')


        //atlas de texture généré on y trouve notre étoiles et une tête de mort

        this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
    }
    create() {
        super.create();

        //DECOR
        this.add.image(4550,1550,'NUAGE1').setDepth(900).setScale(1,1)
        this.add.image(1000,3200,'NUAGE2').setDepth(901)
        this.add.image(13100,1500,'GALAXY').setDepth(901).setScale(0.7,0.7)
        this.add.image(17750,1100,'BH').setDepth(901)

        //TUTO


            const image = this.add.image(1800, 2350, 'tuto_basic').setDepth(950);
            const image2 =this.add.image(4950,1650,'tuto_dash').setDepth(950).setScale(0.8,0.8);
            const image3 =this.add.image(4000,2100,'tuto_superBounce').setDepth(950).setScale(0.7,0.7);
            const image4 =this.add.image(5315,680,'tuto_avoid').setDepth(950).setScale(0.8,0.8);
            const image5 =this.add.image(200,1350,'tuto_jumpOn').setDepth(950).setScale(0.8,0.8);

            //TWEENS TUTO_PANEL

            this.tweens.add({
                targets: image,
                x: 1800,
                y: 2350+25,
                ease: 'Linear.easeInOut',
                yoyo: true,
                repeat: -1,
                duration: 3000
            });
        this.tweens.add({
            targets: image2,
            x: 4950,
            y: 1650+45,
            ease: 'Sin.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 2000
        });
        this.tweens.add({
            targets: image3,
            x: 4000,
            y: 2100-35,
            ease: 'Linear.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
        this.tweens.add({
            targets: image4,
            x: 5315,
            y: 680+25,
            ease: 'Linear.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
        this.tweens.add({
            targets: image5,
            x: 200,
            y: 1350+25,
            ease: 'Linear.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 4000
        });

        //on en aura besoin...
        let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('Petite_Bleu_Plateformes_lineless', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau = 320*64
        let hauteurDuTableau= 50*64
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau+500, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        //---- ajoute les plateformes simples ----------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.devant = this.map.createLayer('devant', this.tileset, 0, 0);
        this.plantes = this.map.createLayer('plantes', this.tileset, 0, 0);
        this.plantes2 = this.map.createLayer('plantes2', this.tileset, 0, 0);

        //on définit les collisions, plusieurs méthodes existent:

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        //this.solides.setCollisionByProperty({ collides: true });
        //this.lave.setCollisionByProperty({ collides: true });

        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        this.solides.setCollisionByExclusion(-1, true);
        this.lave.setCollisionByExclusion(-1, true);

        // 3 Permet d'utiliser l'éditeur de collision de Tiled...mais ne semble pas marcher pas avec le moteur de physique ARCADE, donc oubliez cette option :(
        //this.map.setCollisionFromCollisionGroup(true,true,this.plateformesSimples);

        //----------les étoiles (objets) ---------------------

        // c'est un peu plus compliqué, mais ça permet de maîtriser plus de choses...
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+32, starObject.y+32 , 'particles','star');
        });


        //---------------Checkpoint-----------------------//

                let playerPos;
            this.checkPoint = this.physics.add.group({
                allowGravity: false,
                immovable:false
            });

            this.checkPointsObjects = this.map.getObjectLayer('checkPoints')['objects'];
            this.checkPointsObjects.forEach(checkPointObject => {
                console.log(checkPointObject)
                let cP = new checkPoint(
                    this,
                    checkPointObject.x,
                    checkPointObject.y,
                    'check',
                checkPointObject.properties[0].value
            );
            this.physics.add.overlap(this.player, cP, function(){
                cP.savePos();
            });

            let playerPos = cP.loadPos();
            if(playerPos){
                ici.player.setPosition(playerPos.x, playerPos.y);
            }
            console.log(playerPos);

        })


        //----------Asteroides (objets tiled) ---------------------

        this.asteroidsContainer=this.add.container();
        this.flyingMonstersObjects = this.map.getObjectLayer('flyingMonsters')['objects'];
        this.asteroides=[]
        // On crée des montres volants pour chaque objet rencontré
        this.flyingMonstersObjects.forEach(asteroidsObject => {
            let asteroide=new MonsterFly(this,asteroidsObject.x,asteroidsObject.y);
            this.asteroidsContainer.add(asteroide);
            this.asteroides.push(asteroide);
        });


        //----------Asteroids (Static) ---------------------

        this.staticAstContainer=this.add.container();
        this.staticAstObjects = this.map.getObjectLayer('StaticAst')['objects'];
        this.StaticAst=[]
        // On crée des montres volants pour chaque objet rencontré
        this.staticAstObjects.forEach(staticAstObject => {
            let staticAst=new StaticAst(this,staticAstObject.x,staticAstObject.y-50);
            this.staticAstContainer.add(staticAst);
            this.StaticAst.push(staticAst);
        });


        //--------effet sur la lave------------------------

        this.laveFxContainer=this.add.container();
        this.lave.forEachTile(function(tile){ //on boucle sur TOUTES les tiles de lave pour générer des particules
            if(tile.index !== -1){ //uniquement pour les tiles remplies

                /*
                //dé-commenter pour mieux comprendre ce qui se passe
                console.log("lave tile",tile.index,tile);
                let g=ici.add.graphics();
                laveFxContainer.add(g);
                g.setPosition(tile.pixelX,tile.pixelY)
                g.lineStyle(1,0xFF0000);
                g.strokeRect(0, 0, 64, 64);
                */

                //on va créer des particules
                let props={
                    frame: [
                        //'star', //pour afficher aussi des étoiles
                        'death-white'
                    ],
                    speed:5,
                    frequency:500,
                    lifespan: 2000,
                    quantity:2,
                    x:{min:-32,max:64},
                    y:{min:-12,max:64},
                    tint:[0xC03D1D,0x36185E,0xC03D1D,0x36185E],
                    rotate: {min:-10,max:10},
                    speedX: { min: -10, max: 10 },
                    speedY: { min: -20, max: 30 },
                    scale: {start: 0, end: 0.2},
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                };
                let props2={...props}; //copie props sans props 2
                props2.blendMode=Phaser.BlendModes.MULTIPLY; // un autre blend mode plus sombre

                //ok tout est prêt...ajoute notre objet graphique
                let laveParticles = ici.add.particles('particles');

                //ajoute le premier émetteur de particules
                laveParticles.createEmitter(props);
                //on ne va pas ajouter le second effet émetteur mobile car il consomme trop de ressources
                if(!ici.isMobile) {
                    laveParticles.createEmitter(props2); // ajoute le second
                }
                // positionne le tout au niveau de la tile
                laveParticles.x=tile.pixelX+32;
                laveParticles.y=tile.pixelY+32;
                ici.laveFxContainer.add(laveParticles);

                //optimisation (les particules sont invisibles et désactivées par défaut)
                //elles seront activées via update() et optimizeDisplay()
                laveParticles.pause();
                laveParticles.visible=false;
                //on définit un rectangle pour notre tile de particules qui nous servira plus tard
                laveParticles.rectangle=new Phaser.Geom.Rectangle(tile.pixelX,tile.pixelY,64,64);

            }

        })

        //--------allez on se fait un peu la même en plus simple mais avec les étoiles----------

        let starsFxContainer=ici.add.container();
        this.stars.children.iterate(function(etoile) {
            let particles=ici.add.particles("particles","star");
            let emmiter=particles.createEmitter({
                tint:[  0xFF8800,0xFFFF00,0x88FF00,0x8800FF ],
                rotate: {min:0,max:360},
                scale: {start: 0.8, end: 0.5},
                alpha: { start: 1, end: 0 },
                blendMode: Phaser.BlendModes.ADD,
                speed:40
            });
            etoile.on("disabled",function(){
                emmiter.on=false;
            })
            emmiter.startFollow(etoile);
            starsFxContainer.add(particles);
        });


        //---------------ParticulesPlayer-----------------------//



            let particles = ici.add.particles("smoke");
            let emmiter = particles.createEmitter({
                frequency:1,
                lifespan: 150,
                quantity:32,
                rotate: {min: 0, max: 360},
                scale: {start: 0.05, end: 0.02},
                alpha: {start: 0.1, end: 0},
                //blendMode: Phaser.BlendModes.ADD,


            });


        //if(this.player.body.touching.down) {
            emmiter.startFollow(this.player, 0, 40);
            starsFxContainer.add(particles);
        //}



        //----------débug---------------------

        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }
        //débug solides en vert
        this.solides.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });
        //debug lave en rouge
        this.lave.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });


        //---------- parallax ciel (rien de nouveau) -------------
        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.canvas,
            this.canvas,
            'ETOILE'
        );

        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0,0);
        //fait en sorte que le ciel ne suive pas la caméra

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.solides);
        this.physics.add.collider(this.stars, this.solides);
        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //quand on touche la lave, on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //--------- Z order -----------------------

        //on définit les z à la fin
        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        debug.setDepth(z--);
        this.blood.setDepth(z--);
        starsFxContainer.setDepth(z--);
        this.devant.setDepth(z--);
        this.checkPoint.setDepth(z--);
        this.solides.setDepth(z = 1000);
        this.laveFxContainer.setDepth(z--);
        this.lave.setDepth(z--);
        this.asteroidsContainer.setDepth(z = 1000);
        this.staticAstContainer.setDepth(z=999);
        this.player.setDepth(z--);
        this.plantes.setDepth(z--);
        this.plantes2.setDepth(z--);
        this.stars.setDepth(z--);
        this.derriere.setDepth(z--);


    }

    /**
     * Permet d'activer, désactiver des éléments en fonction de leur visibilité dans l'écran ou non
     */
    optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; // le rectagle de la caméra, (les coordonnées de la zone visible)

        // on va activer / désactiver les particules de lave
        for( let particule of this.laveFxContainer.getAll()){ // parcours toutes les particules de lave
            if(Phaser.Geom.Rectangle.Overlaps(world,particule.rectangle)){
                //si le rectangle de la particule est dans le rectangle de la caméra
                if(!particule.visible){
                    //on active les particules
                    particule.resume();
                    particule.visible=true;
                }
            }else{
                //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
                if(particule.visible){
                    //on désactive les particules
                    particule.pause();
                    particule.visible=false;
                }
            }
        }

        // ici vous pouvez appliquer le même principe pour des monstres, des étoiles etc...
    }

    /*
     * Fait se déplacer certains éléments en parallax
     */
    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX = this.cameras.main.scrollX*0.3;
        this.sky.tilePositionY = this.cameras.main.scrollY*0.3;

    }


    update(){
        super.update();
        this.moveParallax();

        for(let ast of this.asteroides){
            ast.loop();
        }



        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }
    }
}

