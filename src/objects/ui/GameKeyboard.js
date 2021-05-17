/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameKeyboard extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.on('pointerdown', function(pointer){
            if (Tableau.current){
                Tableau.current.player.jumpTo(pointer.x,pointer.y);
            }
        });

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
                    break;

                case "ArrowDown":
                    if (!Tableau.current.player.body.onFloor()){
                        Tableau.current.player.setVelocityY(+900);
                        Tableau.current.player.setGravityY(2000);
                        Tableau.current.player.setBounceY(2.2);
                        Tableau.current.player.setBounceX(1.5);
                        if (Tableau.current.player.body.onFloor()){
                            console.log("Check_collision")
                            Tableau.current.cameras.main.shake(200,0.0020,true);
                        }
                    }
                    else
                    break;
            }
        });

        /*if (!player.body.touching.down){        // while player's in the air
        if (player.body.touching.down){     // when player hit the groud
            player.setVelocityX(0)
            player.anims.play('land')       // play landing animation
        }
    }*/


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
                    break;

                case "ArrowDown":
                    Tableau.current.player.setGravityY(800);
                    Tableau.current.player.setBounceY(0);
                    Tableau.current.player.setBounceX(0);
                    break;
            }
        });



    }


}


