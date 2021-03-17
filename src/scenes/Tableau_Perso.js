class Tableau_Perso extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('blood', 'assets/blood.png');
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('sky-3', 'assets/sky-3.png')
        this.load.image('sky-4', 'assets/sky-4.png')
        this.load.image('e1', 'assets/e1.png');
        this.load.image('e2', 'assets/e2.png');
        this.load.image('e3', 'assets/e3.png');
        this.load.image('e4', 'assets/e4.png');
        this.load.image('e5', 'assets/e5.png');

    }
    create() {
        super.create();

    //on définit la taille du tableau
    let largeurDuTableau=2000;
    let hauteurDuTableau=550; //la hauteur est identique au cadre du jeu
    this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
    this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);


        new beber (this,500,500).setDepth(1);
        new beber (this,200,500).setDepth(1);
        new jaja (this,1600,500).setDepth(1);
        new jaja (this,1800,500).setDepth(1);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);

        
    //un groupe d'étoiles et plate - forme
        this.stars=this.physics.add.group();
        this.platforms = this.physics.add.group();
        this.platforms= this.physics.add.staticGroup();

        

        this.platforms.children.iterate(function (child) {
            child.setDisplaySize(200,200);
              child.setImmovable(true);
              child.body.allowGravity=false;
              child.setBounceX(1);
              child.setCollideWorldBounds(true);
              child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
          });

        this.stars.create(650,250,"star");
        this.stars.create(1735,520,"star");
        this.stars.create(1950,520,"star");

        for(let i=0; i<2; i++){
            let plate=this.platforms.create(1525,(i*50)+475,"ground");
            plate.setDisplaySize(50,50);
            plate.refreshBody();
        }

        for(let i=0; i<2; i++){
            let plate=this.platforms.create(1375,(i*50)+475,"ground");
            plate.setDisplaySize(50,50);
            plate.refreshBody();
        }

        for(let i=0; i<2; i++){
            let plate=this.platforms.create(1450,(i*100)+400,"ground");
            plate.setDisplaySize(100,100);
            plate.refreshBody();
        }





        for(let i=0; i<2; i++){
            let plate=this.platforms.create((i*250)+800,(i*50)+300,"ground");
            let star=this.stars.create((i*250)+800 ,(i*40)+250,"star");
            star.body.allowGravity=false;
            plate.setDisplaySize(100,10);
            plate.refreshBody();
        }

        for(let i=0; i<2; i++){
        let star=this.stars.create((i*150)+1200 ,410,"star");
        star.body.allowGravity=false;
        }


        for(let posX=20;posX<(largeurDuTableau/3.8);posX+=100){
            let etoileY=350+Math.sin(posX)*100;
            let star=this.stars.create(posX ,etoileY,"star");
            star.body.allowGravity=false;
            let plate=this.platforms.create(posX ,etoileY+50,"ground");
            plate.setDisplaySize(60,10);
            plate.refreshBody();


        this.stars.children.iterate(function (child) {
            child.body.allowGravity=false;
            child.setBounce(1);
            child.setCollideWorldBounds(true);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

       


    //le joueur rebondit sur les plateformes
      this.physics.add.collider(this.player, this.platforms);
    //les étoiles rebondissent sur les plateformes
      this.physics.add.collider(this.platforms, this.stars);

    //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(11)



    //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
        0,
        21,
        this.sys.canvas.width,
        this.sys.canvas.height,
        'sky'
        );
    this.sky.setOrigin(0,0);
    this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

    //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
        0,
        0,
        this.sys.canvas.width,
        this.sys.canvas.height,
        'sky-2'
        );
    this.sky2.setScrollFactor(0);
    this.sky2.setOrigin(0,0);
    this.sky2.alpha=1;
    //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        this.sky3=this.add.tileSprite(
        0,
        0,
        this.sys.canvas.width,
        this.sys.canvas.height,
        'sky-3'
        );
    this.sky3.setScrollFactor(0);
    this.sky3.setOrigin(0,0);
    this.sky3.alpha=1;

        this.sky4=this.add.tileSprite(
        0,
        150,
        this.sys.canvas.width,
        this.sys.canvas.height,
        'sky-4'
        );

    this.sky4.setOrigin(0,0);
    this.sky4.alpha=1;


    //fait passer les éléments devant le ciel
    this.platforms.setDepth(1)
    this.stars.setDepth(1)
    this.player.setDepth(2)
    this.sky4.setDepth(3)
    this.sky4.setScrollFactor(0);
        }

    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.2;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.4+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.1+30;

        this.sky3.tilePositionX=this.cameras.main.scrollX*0.5+500;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.1+30;

        this.sky4.tilePositionX=this.cameras.main.scrollX*1+700;
        this.sky4.tilePositionY=this.cameras.main.scrollY*1.0;
    }
}
