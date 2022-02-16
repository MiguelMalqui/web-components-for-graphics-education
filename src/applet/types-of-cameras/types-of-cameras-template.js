const template = document.createElement('template');
template.innerHTML = `
<style>
#canvases-container {
    display: flex;
    gap: 0.25rem;
}
#canvases-container>canvas {
    width: 50%;
}

@media only screen and (max-width: 576px) {
    #canvases-container {
        flex-direction: column;
    }
    #canvases-container>canvas {
        width: 100%
    }
}

#settings-panel {
    margin-top: 1.5rem;
}
.matrix-form {
    padding: 0.5rem;
}

.container {
    display: none;
}
.container.active {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
}
.container>div {
    padding-right: 1rem;
}
.container>div:last-child {
    padding-right: 0rem;
}
.euler-angles-form {
    display: flex;
    gap: 1rem;
}

input[type=number] {
    width: 3rem;
}
</style>

<!--<canvas style="width: 100%;" width="1920" height="720"></canvas>-->
<div id="canvases-container">
    <canvas id="scene-view" width="640" height="480"></canvas>
    <canvas id="camera-view" width="640" height="480"></canvas>
</div>
<div id="settings-panel">
    <div class="matrix-form" id="projection-matrix-form">
        <select>
            <option>Perspective</option>
            <option>Orthogonal</option>
        </select>
        <div class="container active" id="perspective">
            <div>
                <label>FOV</label>
                <input type="number" value="1.0" step="0.01" id="fov">
            </div>
            <div>
                <label>RA</label>
                <input type="number" value="1.33" step="0.01" id="ra">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="1.0" step="0.01" id="zNear">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="10" step="0.01" id="zFar">
            </div>
        </div>
        <div class="container" id="ortho">
            <div>
                <label>left</label>
                <input type="number" value="-2" step="0.01" id="left">
            </div>
            <div>
                <label>right</label>
                <input type="number" value="2" step="0.01" id="right">
            </div>
            <div>
                <label>bottom</label>
                <input type="number" value="-1.5" step="0.01" id="bottom">
            </div>
            <div>
                <label>top</label>
                <input type="number" value="1.5" step="0.01" id="top">
            </div>
            <div>
                <label>zNear</label>
                <input type="number" value="1.0" step="0.01" id="zNear2">
            </div>
            <div>
                <label>zFar</label>
                <input type="number" value="10" step="0.01" id="zFar2">
            </div>
        </div>
    </div>
    <div class="matrix-form" id="view-matrix-form">
        <select>
            <option>LookAt</option>
            <option>Euler</option>
        </select>
        <div class="container active" id="look-at">
            <div>
                <label>OBS</label>
                <input type="number" value="0" step="0.1" id="obsX">
                <input type="number" value="0" step="0.1" id="obsY">
                <input type="number" value="5" step="0.1" id="obsZ">
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="0" step="0.1" id="vrpX">
                <input type="number" value="0" step="0.1" id="vrpY">
                <input type="number" value="0" step="0.1" id="vrpZ">
            </div>
            <div>
                <label>UP</label>
                <input type="number" value="0" step="0.1" id="upX">
                <input type="number" value="1" step="0.1" id="upY">
                <input type="number" value="0" step="0.1" id="upZ">
            </div>
        </div>
        <div class="container" id="euler">
            <div>
                <label>distance</label>
                <input type="number" value="5" step="0.1" id="distance">
            </div>
            <div class="euler-angles-form">
                <div>
                    <label>phi</label>
                    <input type="number" value="0" step="0.01" id="phi">
                </div>
                <div>
                    <label>theta</label>
                    <input type="number" value="0" step="0.01" id="theta">
                </div>
                <div>
                    <label>psi</label>
                    <input type="number" value="0" step="0.01" id="psi">
                </div>
            </div>
            <div>
                <label>VRP</label>
                <input type="number" value="0" step="0.1" id="vrp2X">
                <input type="number" value="0" step="0.1" id="vrp2Y">
                <input type="number" value="0" step="0.1" id="vrp2Z">
            </div>
        </div>
    </div>
</div>
`;

export default template;