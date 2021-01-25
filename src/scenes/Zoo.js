class Zoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
            this.stars.create(innerHeight ,0,"star");
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //beber (le glitcheur)
        this.beber=this.physics.add.sprite(400,this.sys.canvas.height,"monster-violet");
        this.beber.setOrigin(0,0);
        this.beber.setDisplaySize(80,80);
        this.beber.setCollideWorldBounds(true);
        this.beber.setBounce(1);
        this.beber.setVelocityX(25);
        this.physics.add.overlap(this.player, this.beber, this.hitSpike, null, this);


        //jacques (petit qui saute vite)
        
        this.jacques=this.physics.add.sprite(innerWidth,this.sys.canvas.height-250,"monster-violet");
        this.jacques.setOrigin(0,0);
        this.jacques.setDisplaySize(20,20);
        this.jacques.setCollideWorldBounds(true);
        this.jacques.setBounce(1);
        this.jacques.setVelocityX(200);
        this.jacques.setGravity(10)
        this.physics.add.overlap(this.player, this.jacques, this.hitSpike, null, this);

        //monstre (gros et lent)
        this.monstre=this.physics.add.sprite(innerWidth,this.sys.canvas.height,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(80,80);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(20);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        /* //edern (0Grav)
        this.edern=this.physics.add.sprite(100,0,"monster-violet");
        this.edern.setOrigin(0,0);
        this.edern.setDisplaySize(80,80);
        this.edern.setCollideWorldBounds(true);
        this.edern.setBounce(1);
        this.edern.setVelocityX(1000);
        this.edern.setGravity(0);
        this.physics.add.overlap(this.player, this.edern, this.hitSpike, null, this); */


        //jaja (sauteur)
        this.jaja=this.physics.add.sprite(300,this.sys.canvas.height,"monster-violet");
        this.jaja.setOrigin(0,0);
        this.jaja.setDisplaySize(64,64);
        this.jaja.setCollideWorldBounds(true);
        this.jaja.setBounce(1);
        this.jaja.setVelocityY(600);
        this.jaja.setVelocityX(0);
        this.physics.add.overlap(this.player, this.jaja, this.hitSpike, null, this);

        //gerard (random)
        this.gerard=this.physics.add.sprite(200,this.sys.canvas.height-70,"monster-violet");
        this.gerard.setOrigin(0,0);
        this.gerard.setDisplaySize(64,64);
        this.gerard.setCollideWorldBounds(true);
        this.gerard.setBounce(1);
        this.gerard.setVelocityX(25);
        this.physics.add.overlap(this.player, this.gerard, this.hitSpike, null, this);

    }

    update(){
        if(Math.random()>0.99){
            console.log("change de sens")
            this.gerard.setVelocity(Math.random()*200-100)
        }

        if(Math.random()>0.95){
            console.log("change de taille")
            this.beber.setDisplaySize((Phaser.Math.Between(50,100)),(Phaser.Math.Between(50,100)));
        }
    }
}