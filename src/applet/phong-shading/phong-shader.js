const phongShader = {

vert: `#version 300 es
in vec3 position;
in vec3 normal;

out vec3 vNEyeSpace;
out vec3 vPositionEyeSpace;
out vec3 vLightPositionEyeSpace;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 lightPosition;
uniform bool isCameraLight;

void main(){
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    mat3 normalMatrix = inverse(transpose(mat3(modelViewMatrix)));

    vNEyeSpace = normalMatrix * normal;
    vPositionEyeSpace = (modelViewMatrix * vec4(position, 1.0)).xyz;
    if (isCameraLight) {
        vLightPositionEyeSpace = lightPosition;
    } else {
        vLightPositionEyeSpace = (viewMatrix * vec4(lightPosition, 1.0)).xyz;
    }

    mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
}
`,

frag: `#version 300 es
precision mediump float;

in vec3 vNEyeSpace;
in vec3 vPositionEyeSpace;
in vec3 vLightPositionEyeSpace;

out vec4 fragColor;

uniform vec3 lightAmbient;
uniform vec3 lightDiffuse;
uniform vec3 lightSpecular;

uniform vec3 matAmbient;
uniform vec3 matDiffuse;
uniform vec3 matSpecular;
uniform float matShininess;

vec3 phong(vec3 N, vec3 L, vec3 V)
{
    vec3 R = 2.0 * max(0.0, dot(N, L)) * N - L;
    vec3 phongColor = matAmbient * lightAmbient + matDiffuse * lightDiffuse * max(0.0, dot(N, L));
    if (dot(N, L) >= 0.0)
        phongColor += matSpecular * lightSpecular * pow(max(0.0, dot(R, V)), matShininess);
    return phongColor;
}

void main()
{
    vec3 N = normalize(vNEyeSpace);
    vec3 L = normalize(vLightPositionEyeSpace - vPositionEyeSpace);
    vec3 V = normalize(-vPositionEyeSpace);
    fragColor = vec4(phong(N, L, V), 1.0);
}
`
}

export default phongShader;