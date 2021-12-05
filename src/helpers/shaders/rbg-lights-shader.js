const RGBLightsShader = {

vert : `#version 300 es

#define PI 3.1415926538
#define THETA 2.0 * PI / 3.0

in vec3 position;
in vec3 normal;

vec3 posFocusR = vec3(sin(THETA), 1.5, cos(THETA));
vec3 posFocusG = vec3(sin(2.0 * THETA), 1.5, cos(2.0 * THETA));
vec3 posFocusB = vec3(sin(3.0 * THETA), 1.5, cos(3.0 * THETA));

out vec4 vertexSCO;
out vec3 normalSCO;

out vec4 posFocusSCOR;
out vec4 posFocusSCOG;
out vec4 posFocusSCOB;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main() {
    vertexSCO = viewMatrix * modelMatrix * vec4(position, 1.0f);

    mat3 NormalMatrix = inverse(transpose(mat3(viewMatrix * modelMatrix)));
    normalSCO = NormalMatrix * normal;

    posFocusSCOR = viewMatrix * vec4(posFocusR, 1.0f);
    posFocusSCOG = viewMatrix * vec4(posFocusG, 1.0f);
    posFocusSCOB = viewMatrix * vec4(posFocusB, 1.0f);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.xyz, 1);
}
`,

frag : `#version 300 es
precision mediump float;

in vec4 vertexSCO;
in vec3 normalSCO;

in vec4 posFocusSCOR;
in vec4 posFocusSCOG;
in vec4 posFocusSCOB;

vec3 matambFS = vec3(1);
vec3 matdiffFS = vec3(1);

vec3 llumAmbient  = vec3(0.0);

vec3 colFocusR = vec3(1, 0, 0);
vec3 colFocusG = vec3(0, 1, 0);
vec3 colFocusB = vec3(0, 0, 1);

out vec4 color;

vec3 Lambert (vec4 posFocusSCO, vec3 colFocus) {
    vec3 NormSCO = normalize(normalSCO);
    vec3 L = normalize(posFocusSCO.xyz - vertexSCO.xyz);

    vec3 colRes = llumAmbient * matambFS;

    if (dot (L, NormSCO) > 0.0) {
        colRes = colRes + colFocus * matdiffFS * dot (L, NormSCO);
    }
    return (colRes);
}

void main() {
    vec3 r = Lambert(posFocusSCOR, colFocusR);
    vec3 g = Lambert(posFocusSCOG, colFocusG);
    vec3 b = Lambert(posFocusSCOB, colFocusB);
    vec3 c = r + g + b;
    color = vec4(c.xyz, 1);
}
`

}

export default RGBLightsShader;