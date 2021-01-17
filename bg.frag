#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorB = vec3(0.21,0.27,0.03);
vec3 colorA = vec3(0.124,0.1,0.1);

//variables to bound the cell dimensions
float cell_base_width = 120.;
float cell_base_height = 90.;

//variable to determine line weight
float weight = 8.;

//variables to contain the implemented dimensions
float cell_width;
float cell_height;

//variables to contain x and y cell counts
float x_cell_count;
float y_cell_count;

void main() {
	vec3 color = vec3(0.0);
	float pct = abs(sin(u_time));
	vec2 st = gl_FragCoord.xy/u_resolution;
	
	color = mix(colorA, colorB, sin(u_time)+sin((st.y-.5)*45.)+sin((st.x-.5)*45.));
	
	//divide resolution by base cell size (rounded down)
	x_cell_count = floor(float(u_resolution.x)/cell_base_width);
	y_cell_count = floor(float(u_resolution.y)/cell_base_height);

	//compute cell dimensions based on cell counts
	cell_width = floor(float(u_resolution.x)/x_cell_count);
	cell_height = floor(float(u_resolution.y)/y_cell_count);
	
	//compare frag coordinate with cell dimensions, helpful: https://stackoverflow.com/questions/35155598/unable-to-use-in-glsl#35156883
	if (floor(mod(gl_FragCoord.y/weight,cell_height/weight))==0. || floor(mod(gl_FragCoord.x/weight,cell_width/weight))==0.){
		gl_FragColor = vec4(color, 1.0);
	}else{
		gl_FragColor = vec4(1.,1.,1.,0.14);
	}


	//list of glsl hw-accelerated functions here: https://www.shaderific.com/glsl-functions/
	//gl_FragColor = vec4(color, 1.0);//sqrt(sqrt(sqrt(abs(sin(u_time+st.y+st.x))))));
	
	//helpful links:
	//https://gamedev.stackexchange.com/questions/8718/glsl-how-do-i-cast-a-float-to-an-int#8719
	
}

