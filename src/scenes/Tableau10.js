class Tableau10 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('e1', 'assets/e1.png');
        this.load.image('e2', 'assets/e2.png');
        this.load.image('e3', 'assets/e3.png');
        this.load.image('e4', 'assets/e4.png');
        this.load.image('e5', 'assets/e5.png');

    }
    create() {
        super.create();

        new beber (this,100,500);
        new jacques (this,200,400);
        new monstre (this,300,400);
        new jaja (this,400,400);
        new gerard (this,500,400);


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


        

    }


}