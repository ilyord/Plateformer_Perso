class MonsterFly extends ObjetEnnemi{
    /**
     * Un monstre qui vole et fait des allez -retours
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y, rotate) {
        super(scene, x, y, "AA");


        this.rotation=Math.random()*5;
       
        //pas de gravité
        this.body.allowGravity=false;
        this.rotateSpeed=Math.random()*30-20;
        this.rotateSpeed=this.rotateSpeed/100;

        //gestion de la taille...car attention notre png est très grand (et c'est maaaaal car pas optimisé)
        //this.setDisplaySize(100,100);
        let sz=Math.random()*50+50;
        this.setDisplaySize(sz,sz);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-60,this.body.height-95);
        this.setOffset(30, 60);

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
        this.y = this.minY;
        this.body.rotation = this.minAngle;
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
                to: this.maxX,
                duration: 60,
                yoyo: -1,
                repeat:-1,
                flipX: false,
            },
            y: {
                from: this.minY,
                to: this.maxY,
                duration: 12000,
                yoyo: 0,
                repeat: -1,
            }
        });
        
    }

    loop(){
            this.rotation+=this.rotateSpeed;
    }

}