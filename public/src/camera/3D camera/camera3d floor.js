var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var camera;
var points;
var balls = [];
var tmp;
var transform;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ball', 'assets/sprites/aqua_ball.png');
}

function create ()
{
    camera = new Phaser.Cameras.PerspectiveCamera(90 * Math.PI / 180, 800, 600);

    camera.z = -200;

    for (var y = 0; y < 6; y++)
    {
        for (var x = 0; x < 6; x++)
        {
            var bx = 200 + (x * 64);
            var by = 100 + (y * 64);

            balls.push({
                image: this.add.image(bx, by, 'ball').setZ(0),
                position: new Phaser.Math.Vector4(bx, by, 0)
            });
        }
    }

    tmp = new Phaser.Math.Vector4();
    transform = new Phaser.Math.Matrix4();
}

function update ()
{
    // return;

    for (var i = 0; i < balls.length; i++)
    {
        var p = balls[i].position;

        //rotate the transformation matrix around the Y axis a little..
        transform.rotateX(-0.00001);
        // transform.rotateY(-0.00001);

        //now let's transform the 3D position by our transformation matrix
        //this will give us a new position that has been slightly rotated by
        //our matrix.

        // tmp.x = p.x;
        // tmp.y = p.y;
        // tmp.z = p.z;

        // tmp.transformMat4(transform);

        tmp.set(p).transformMat4(transform);

        //project the 3D point into 2D space
        camera.project(tmp, tmp);

        //draw the particle with a fixed size
        var size = 16;

        balls[i].image.x = tmp.x - size / 2;
        balls[i].image.y = tmp.y - size / 2;
        // balls[i].image.depth = tmp.z;

        //  Let's assume the distance range is -100 to 100
        // balls[i].setScale(Phaser.Math.Percent(tmp.z, -100, 100));
        // graphics.fillRect(tmp.x-size/2, tmp.y-size/2, size, size);
    }
}