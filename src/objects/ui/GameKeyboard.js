/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameKeyboard extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this);

        //Écoute du click

        this.cursors = scene.input.keyboard.createCursorKeys();

        //-------------DASH+COOLDOWN--------------//

        var CdDash = 0;
        var MaxDash = 3;

        scene.input.on('pointerdown', function(pointer){
            if(CdDash > MaxDash){
                CdDash = 3;
            }
            else{
                CdDash = CdDash;}
            if(CdDash>0) {
                if (Tableau.current) {
                    if (pointer.worldY < 800 && pointer.worldX < 2600) {
                        Tableau.current.player.jumpTo(pointer.worldX, pointer.worldY,CdDash);
                        Tableau.current.wooshShound();
                        Tableau.current.cameras.main.shake(70, 0.0040, false);
                        CdDash -= 1;
                        this.dashing = true;

                        console.log("DashingClick", this.dashing);
                    }
                }
            }
        })


        //-------------Écoute des touches appuyées---------------//

        scene.input.keyboard.on('keydown', function(kevent){
            switch (kevent.key){

                case "ArrowRight":
                        Tableau.current.player.directionX=1;
                    break;

                case "ArrowLeft":
                        Tableau.current.player.directionX=-1;

                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    Tableau.current.player.setGravityY(500);
                    Tableau.current.player.setBounceX(0);
                    break;


                    //SUPER -BOUNCE//

                case "ArrowDown":
                    if (!Tableau.current.player.body.onFloor()){
                        if(CdDash > MaxDash){
                            CdDash = 3;
                        }
                        else{
                            CdDash = CdDash;}
                            CdDash += 1;
                            Tableau.current.player.directionY = 1;
                            Tableau.current.player.setVelocityY(+900);
                            Tableau.current.player.setGravityY(2000);
                            Tableau.current.player.setBounceY(3);
                            Tableau.current.player.setBounceX(3);
                            Tableau.current.wooshShound2();
                            Tableau.current.player.CD += 1;
                            //console.log("CdDash", CdDash);
                        }

                    break;
            }
        });

        //-------------Écoute des touches PAS appuyées---------------//

        scene.input.keyboard.on('keyup', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    Tableau.current.player.setGravityY(950);
                    break;

                    //NO SUPER-BOUNCE

                case "ArrowDown":
                    Tableau.current.isWalking =false;
                    Tableau.current.player.setGravityY(950);
                    Tableau.current.player.setBounceY(0);
                    Tableau.current.player.setBounceX(0);
                    break;
            }
        });
    }
}


