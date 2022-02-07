const basicShader = {

vert : `#version 300 es
in vec3 position;
in vec4 color;

out vec4 vColor;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.xyz, 1);
    vColor = color;
}
`,

frag : `#version 300 es
precision mediump float;

in vec4 vColor;
out vec4 fragColor;

void main() {
    fragColor = vColor;
}
`
}

export default basicShader;