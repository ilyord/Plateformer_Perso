class MonsterFly extends ObjetEnnemi{
    /**
     * Un monstre qui vole et fait des allez -retours
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "AA");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille...car attention notre png est très grand (et c'est maaaaal car pas optimisé)
        this.setDisplaySize(100,100);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-35,this.body.height-35);
        this.setOffset(18, 18);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x;
        this.maxX=x;

        // Y
        this.originalY=y;
        this.minY=y;
        this.maxY=y+3000;

        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0.9;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*1000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0.9,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 60,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:false,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 10000,
                yoyo: 0,
                repeat:-1
            }
        });
    }

}