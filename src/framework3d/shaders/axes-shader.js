const axesShader = {

vert : `#version 300 es
in vec3 position;
in vec3 color;

out vec3 vColor;
out vec3 vPosition;
out vec3 vOrigin;

uniform mat4 modelMatrix;
uniform mat4 modelViewProjectionMatrix;

void main() {
    gl_Position = modelViewProjectionMatrix * vec4(position.xyz, 1.0);
    vColor = color;
    vPosition = vec3(modelMatrix * vec4(position.xyz, 1.0)).xyz;
    vOrigin = vec3(modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
}
`,

frag : `#version 300 es
precision mediump float;

in vec3 vColor;
in vec3 vPosition;
in vec3 vOrigin;

out vec4 color;

uniform int dashed;
uniform float invDashLength;

void main() {
    if (dashed == 1) {
        float d = distance(vPosition, vOrigin);
        float n = mod(d * invDashLength, 2.0f);
        if (n < 1.0f ) {
            discard;
        } else {
            color = vec4(vColor.xyz, 1.0);
        }
    } else {
        color = vec4(vColor.xyz, 1);
    }
}
`
}

export default axesShader;