/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePadButtons extends GameKeyboard{
    constructor(scene, x, y,size=200) {
        super(scene, x, y)
        scene.add.existing(this);


       // this.isMobile=this.game.device.os.android || this.game.device.os.iOS;
        if(!this.isMobile) {
            this.size=size;
        }
        else
            this.size=size*2;


        let w=this.size/3;
        let pad2=scene.add.container();

        let btnUP=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnLEFT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnRIGHT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnDOWN=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();


        //let btnA=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();

        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);
        this.add(btnDOWN);

        //this.add(btnA);

        btnUP.x=w*1;
        btnLEFT.x=w*0;
        btnRIGHT.x=w*2;
        btnLEFT.y=w;
        btnRIGHT.y=w;
        btnDOWN.x=w;
        btnDOWN.y=w*2;

        //btnA.x=scene.sys.canvas.width * -1 + w * 4;
        //btnA.y=w*1;


        btnLEFT.on('pointerdown',function(){
            Tableau.current.player.directionX=-1;
        });
        btnRIGHT.on('pointerdown',function(){
            Tableau.current.player.directionX=1;
        });
        btnUP.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
            Tableau.current.isWalking =false;
            Tableau.current.player.setGravityY(500);
        });
        btnDOWN.on('pointerdown',function(){
            Tableau.current.player.directionY=1;
            Tableau.current.player.setVelocityY(+900);
            Tableau.current.player.setGravityY(2000);
            Tableau.current.player.setBounceY(3);
            Tableau.current.player.setBounceX(3);
            Tableau.current.wooshShound2();
        });

        btnLEFT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnRIGHT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnUP.on('pointerup',function(){
            Tableau.current.player.directionY=-0;
            Tableau.current.isWalking =false;
            Tableau.current.player.setGravityY(950);
        });
        btnDOWN.on('pointerup',function(){
            Tableau.current.player.directionY=0;
            Tableau.current.isWalking =false;
            Tableau.current.player.setGravityY(950);
            Tableau.current.player.setBounceY(0);
            Tableau.current.player.setBounceX(0);
        });

        /*btnA.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
        });
        btnA.on('pointerup',function(){
            Tableau.current.player.directionY=0;
        });*/

    }


}