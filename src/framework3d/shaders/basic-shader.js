const basicShader = {

vert : `#version 300 es
in vec3 position;
in vec3 color;

out vec3 vColor;

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

in vec3 vColor;
out vec4 fragColor;

void main() {
    fragColor = vec4(vColor.xyz, 1);
}
`
}

export default basicShader;