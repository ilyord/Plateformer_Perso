/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameKeyboard extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this);

        //Ecoute du click

        this.cursors = scene.input.keyboard.createCursorKeys();

        //Dash
        scene.input.on('pointerdown', function(pointer){

            if (Tableau.current){
                if (pointer.worldY < 800 && pointer.worldX < 2600){
                    //if(!Tableau.current.player.body.onFloor()) { (//si le joueur est au sol il ne peut pas sauter//)
                    Tableau.current.player.jumpTo(pointer.worldX, pointer.worldY);
                    Tableau.current.wooshShound();
                    Tableau.current.cameras.main.shake(70,0.0040,false);
                    //console.log("pointer.worldX:", pointer.worldX);
                    //console.log("pointer.worldY:", pointer.worldY);
                    //console.log("X :", Tableau.current.player.x, "Y :",Tableau.current.player.y)
                    //}
                }
            }
        });

        //INPUT DOWN

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
                    break;


                    //ULTRABOUNCE

                case "ArrowDown":
                    if (!Tableau.current.player.body.onFloor()){
                        Tableau.current.player.directionY = 1;
                        Tableau.current.player.setVelocityY(+900);
                        Tableau.current.player.setGravityY(2000);
                        Tableau.current.player.setBounceY(3);
                        Tableau.current.player.setBounceX(3);
                        Tableau.current.wooshShound2();


                    }
                    break;
            }
        });

        //INPUT UP

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


                    //NO-ULTRABOUNCE

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


