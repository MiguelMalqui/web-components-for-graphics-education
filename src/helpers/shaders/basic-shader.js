const basicShader = {

vert : `#version 300 es
in vec3 position;
in vec3 color;

out vec3 out_color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.xyz, 1);
    out_color = color;
}
`,

frag : `#version 300 es
precision mediump float;

in vec3 out_color;

out vec4 color;

void main() {
    color = vec4(out_color.xyz, 1);
}
`

}

export default basicShader;