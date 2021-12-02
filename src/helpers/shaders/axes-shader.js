const axesShader = {

vert : `#version 300 es
in vec3 position;
in vec3 color;

out vec3 out_color;
out vec3 out_position;
out vec3 out_orgin;

uniform mat4 modelMatrix;
uniform mat4 modelViewProjectionMatrix;

void main() {
    gl_Position = modelViewProjectionMatrix * vec4(position.xyz, 1.0);
    out_color = color;
    out_position = vec3(modelMatrix * vec4(position.xyz, 1.0)).xyz;
    out_orgin = vec3(modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
}
`,

frag : `#version 300 es
precision highp float;

in vec3 out_color;
in vec3 out_position;
in vec3 out_orgin;

out vec4 color;

uniform int dashed;
uniform float invDashLength;

void main() {
    if (dashed == 1) {
        float d = distance(out_position, out_orgin);
        float n = mod(d * invDashLength, 2.0f);
        if (n < 1.0f ) {
            discard;
        } else {
            color = vec4(out_color.xyz, 1.0);
        }
    } else {
        color = vec4(out_color.xyz, 1);
    }
}
`

}

export default axesShader;