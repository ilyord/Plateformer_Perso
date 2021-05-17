class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0,0);
        this.setGravityY(800);
        this.setFriction(100,100);

        this.setBodySize(18,85);
        this.setOffset(+7,+7);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'inAir',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.setVelocityX(-300);
                this.anims.play('left', true);
                break;

//---------------------Préparation pour animation en l'air---------------------------------//
            case this._directionY<0:
                this.anims.play('inAir', true);
                break;
//-----------------------------------------------------------------------------------------//


            case this._directionX>0:
                this.setVelocityX(300);
                this.anims.play('right', true);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-650);}

            }
        /*
        if (this._directionX < 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(-300)}
            }
        if (this._directionX > 0) {
            if(!this.body.blocked.down || !this.body.touching.down){
                this.setVelocityX(300)}
            } */

        //----------------------------MECHA_TEST---------------------------------------//

        var GameState = function(game) {
        };

/* Load images and sounds
        GameState.prototype.preload = function() {
            this.game.load.image('bullet', '/assets/gfx/bullet.png');
            this.game.load.image('ground', '/assets/gfx/ground.png');
            this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);
        };*/

// Setup the example
        GameState.prototype.create = function() {
            // Set stage background color
            this.game.stage.backgroundColor = 0x4488cc;

            // Define constants
            this.SHOT_DELAY = 300; // milliseconds (10 bullets/3 seconds)
            this.PLAYER_SPEED = 800; // pixels/second


            // Create some ground
            this.ground = this.game.add.group();
            for(var x = 0; x < this.game.width; x += 32) {
                // Add the ground blocks, enable physics on each, make them immovable
                var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
                this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
                groundBlock.body.immovable = true;
                groundBlock.body.allowGravity = false;
                this.ground.add(groundBlock);
            }

            // Create a group for explosions
            this.explosionGroup = this.game.add.group();

            // Setup a canvas to draw the trajectory on the screen
            this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
            this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
            this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
            this.game.add.image(0, 0, this.bitmap);

            // Simulate a pointer click/tap input at the center of the stage
            // when the example begins running.
            this.game.input.activePointer.x = this.game.width/2;
            this.game.input.activePointer.y = this.game.height/2 - 100;
        };

        GameState.prototype.drawTrajectory = function() {
            // Clear the bitmap
            this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);

            // Set fill style to white
            this.bitmap.context.fillStyle = 'rgba(255, 255, 255, 0.5)';

            // Calculate a time offset. This offset is used to alter the starting
            // time of the draw loop so that the dots are offset a little bit each
            // frame. It gives the trajectory a "marching ants" style animation.
            var MARCH_SPEED = 40; // Smaller is faster
            this.timeOffset = this.timeOffset + 1 || 0;
            this.timeOffset = this.timeOffset % MARCH_SPEED;

            // Just a variable to make the trajectory match the actual track a little better.
            // The mismatch is probably due to rounding or the physics engine making approximations.
            var correctionFactor = 0.99;

            // Draw the trajectory
            // http://en.wikipedia.org/wiki/Trajectory_of_a_projectile#Angle_required_to_hit_coordinate_.28x.2Cy.29
            var theta = -this.gun.rotation;
            var x = 0, y = 0;
            for(var t = 0 + this.timeOffset/(1000*MARCH_SPEED/60); t < 3; t += 0.03) {
                x = this.BULLET_SPEED * t * Math.cos(theta) * correctionFactor;
                y = this.BULLET_SPEED * t * Math.sin(theta) * correctionFactor - 0.5 * this.GRAVITY * t * t;
                this.bitmap.context.fillRect(x + this.gun.x, this.gun.y - y, 3, 3);
                if (y < -15) break;
            }

            this.bitmap.dirty = true;
        };

        GameState.prototype.shootBullet = function() {
            // Enforce a short delay between shots by recording
            // the time that each bullet is shot and testing if
            // the amount of time since the last shot is more than
            // the required delay.
            if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
            if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
            this.lastBulletShotAt = this.game.time.now;

            // Get a dead bullet from the pool
            var bullet = this.bulletPool.getFirstDead();

            // If there aren't any bullets available then don't shoot
            if (bullet === null || bullet === undefined) return;

            // Revive the bullet
            // This makes the bullet "alive"
            bullet.revive();

            // Bullets should kill themselves when they leave the world.
            // Phaser takes care of this for me by setting this flag
            // but you can do it yourself by killing the bullet if
            // its x,y coordinates are outside of the world.
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;

            // Set the bullet position to the gun position.
            bullet.reset(this.gun.x, this.gun.y);
            bullet.rotation = this.gun.rotation;

            // Shoot it in the right direction
            bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
            bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
        };

// The update() method is called every frame
        GameState.prototype.update = function() {
            // Draw the trajectory every frame
            this.drawTrajectory();

            // Check if bullets have collided with the ground
            this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
                // Create an explosion
                this.getExplosion(bullet.x, bullet.y);

                // Kill the bullet
                bullet.kill();
            }, null, this);

            // Rotate all living bullets to match their trajectory
            this.bulletPool.forEachAlive(function(bullet) {
                bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
            }, this);

            // Aim the gun at the pointer.
            // All this function does is calculate the angle using
            // Math.atan2(yPointer-yGun, xPointer-xGun)
            this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);

            // Shoot a bullet
            if (this.game.input.activePointer.isDown) {
                this.shootBullet();
            }
        };

// Try to get a used explosion from the explosionGroup.
// If an explosion isn't available, create a new one and add it to the group.
// Setup new explosions so that they animate and kill themselves when the
// animation is complete.
        GameState.prototype.getExplosion = function(x, y) {
            // Get the first dead explosion from the explosionGroup
            var explosion = this.explosionGroup.getFirstDead();

            // If there aren't any available, create a new one
            if (explosion === null) {
                explosion = this.game.add.sprite(0, 0, 'explosion');
                explosion.anchor.setTo(0.5, 0.5);

                // Add an animation for the explosion that kills the sprite when the
                // animation is complete
                var animation = explosion.animations.add('boom', [0,1,2,3], 60, false);
                animation.killOnComplete = true;

                // Add the explosion sprite to the group
                this.explosionGroup.add(explosion);
            }

            // Revive the explosion (set it's alive property to true)
            // You can also define a onRevived event handler in your explosion objects
            // to do stuff when they are revived.
            explosion.revive();

            // Move the explosion to the given coordinates
            explosion.x = x;
            explosion.y = y;

            // Set rotation of the explosion at random for a little variety
            explosion.angle = this.game.rnd.integerInRange(0, 360);

            // Play the animation
            explosion.animations.play('boom');

            // Return the explosion itself in case we want to do anything else with it
            return explosion;
        };

        var game = new Phaser.Game(848, 450, Phaser.AUTO, 'game');
        game.state.add('game', GameState, true);

    }


}