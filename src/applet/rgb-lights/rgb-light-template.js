const template = document.createElement("template");
template.innerHTML = `
<style>
canvas {
    width: 100%;
}

#control-panel {
    padding: 0.5rem;
}

.intensity-form {
    display: flex;
}
.intensity-form>label {
    width: 8.3rem;
    display: flex;
    align-items: center;
}
.intensity-form>input[type=number] {
    width: 2.5rem;
    margin: 0.2rem 1rem;
}
.intensity-form>input[type=range] {
    flex-grow: 1;
}
</style>

<canvas width="1024" height="576"></canvas>
<div id="control-panel">
<div class="intensity-form" id="red-form">
    <label>Red light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0" id="red-input">
    <input type="range" min="0" max="1" step="0.01" value="1.0" id="red-slider">
</div>
<div class="intensity-form" id="green-form">
    <label>Green light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0" id="green-input">
    <input type="range" min="0" max="1" step="0.01" value="1.0" id="green-slider">
</div>
<div class="intensity-form" id="blue-form">
    <label>Blue light intensity</label>
    <input type="number" min="0" max="1" step="0.01" value="1.0" id="blue-input">
    <input type="range" min="0" max="1" step="0.01" value="1.0" id="blue-slider">
</div>
</div>
`;

export default template;