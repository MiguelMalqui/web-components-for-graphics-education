const template = document.createElement("template");
template.innerHTML = `
<style>
canvas {
    width: 100%;
}
</style>

<canvas width="1280" height="720"></canvas>
<div>
    <table>
        <tr>
            <td>Light mode</td>
            <td>
                <select id="light-mode-select">
                    <option>scene</option>
                    <option>camera</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>Light position</td>
            <td colspan="3">
                <input type="number" step="0.1" value="1.0" id="light-pos-x">
                <input type="number" step="0.1" value="1.0" id="light-pos-y">
                <input type="number" step="0.1" value="1.0" id="light-pos-z">
            </td>
        </tr>
        <tr>
            <td>Light ambient</td>
            <td>
                <input type="color" value="#ffffff"  id="light-ambient-input">
            </td>
            <td>Light diffuse</td>
            <td>
                <input type="color" value="#ffffff"  id="light-diffuse-input">
            </td>
            <td>Light specular</td>
            <td>
                <input type="color" value="#ffffff"  id="light-specular-input">
            </td>
        </tr>
        <tr>
            <td>Shininess</td>
            <td>
                <input type="number" step="1" value="10" id="mat-shininess-input">
            </td>
        </tr>
        <tr>
            <td>Material ambient</td>
            <td>
                <input type="color" value="#341900"  id="mat-ambient-input">
            </td>
            <td>Material diffuse</td>
            <td>
                <input type="color" value="#ff00bb"  id="mat-diffuse-input">
            </td>
            <td>Material specular</td>
            <td>
                <input type="color" value="#ffffff"  id="mat-specular-input">
            </td>
        </tr>
    </table>
</div>
`;

export default template;