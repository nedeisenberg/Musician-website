
// this variable will hold our shader object
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('bg.vert', 'bg.frag');
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('body');
	frameRate(30);

	// create shader in graphics buffer for combination with our existing canvas -- see the solution here: https://discourse.processing.org/t/draw-on-top-of-shader/20764/2
	shaderGraphics = createGraphics(screen.width, screen.height, WEBGL);
	console.log(canvas.width + " , " + canvas.height);
	shaderGraphics.noStroke();
}

function draw() {
	background(10);

	shaderGraphics.shader(theShader);
	shaderGraphics.rect(0, 0, canvas.width, canvas.height);

  // here we're using setUniform() to send our uniform values to the shader
  	
	theShader.setUniform("u_resolution", [canvas.width, canvas.height]);
	theShader.setUniform('u_time', frameCount*.05);

    image(shaderGraphics, 0, 0);

}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight);
	//shaderGraphics.resize(shaderGraphics.width,shaderGraphics.height);
}
