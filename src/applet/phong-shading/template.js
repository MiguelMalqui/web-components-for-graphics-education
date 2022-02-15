const template = document.createElement("template");
template.innerHTML = `
<style>
canvas {
    width: 100%;
}
table {
    padding: 0.5rem;
    margin: auto;
}
td {
    padding-bottom: 0.5rem;
}
label {
    display: block;
    text-align: right;
    padding: 0 0.5rem 0 1rem;
}
input[type=number] {
    width: 2.5rem;
}
@media only screen and (max-width: 576px) {
    table {
        padding: 0.5rem 0;
    }
    label {
        padding: 0;
    }
}
</style>

<canvas width="1280" height="720"></canvas>
<div>
    <table>
        <tr>
            <td><label>Light mode</label></td>
            <td colspan="2">
                <select id="light-mode-select">
                    <option>scene</option>
                    <option>camera</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><label>Light position</label></td>
            <td colspan="3">
                <input type="number" step="0.1" value="1.0" id="light-pos-x">
                <input type="number" step="0.1" value="1.0" id="light-pos-y">
                <input type="number" step="0.1" value="1.0" id="light-pos-z">
            </td>
        </tr>
        <tr>
            <td><label>Light ambient</label></td>
            <td>
                <input type="color" value="#ffffff"  id="light-ambient-input">
            </td>
            <td><label>Light diffuse</label></td>
            <td>
                <input type="color" value="#ffffff"  id="light-diffuse-input">
            </td>
            <td><label>Light specular</label></td>
            <td>
                <input type="color" value="#ffffff"  id="light-specular-input">
            </td>
        </tr>
        <tr>
            <td><label>Material ambient</label></td>
            <td>
                <input type="color" value="#341900"  id="mat-ambient-input">
            </td>
            <td><label>Material diffuse</label></td>
            <td>
                <input type="color" value="#ff00bb"  id="mat-diffuse-input">
            </td>
            <td><label>Material specular</label></td>
            <td>
                <input type="color" value="#ffffff"  id="mat-specular-input">
            </td>
        </tr>
        <tr>
            <td><label>Shininess</label></td>
            <td>
                <input type="number" step="1" value="10" id="mat-shininess-input">
            </td>
        </tr>
    </table>
</div>
`;

export default template;