class PixelatePipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
    constructor(game) {
        super({
            game,
            renderer: game.renderer,
            fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                uniform float pixelSize;

                void main(void) {
                    vec2 pixelCoord = vec2(floor(outTexCoord.x / pixelSize) * pixelSize, floor(outTexCoord.y / pixelSize) * pixelSize);
                    vec4 color = texture2D(uMainSampler, pixelCoord);
                    gl_FragColor = color;
                }
            `
        });
    }

    set pixelSize(value) {
        this.set1f('pixelSize', value);
    }

    get pixelSize() {
        return this.uniforms.pixelSize.value;
    }
}
