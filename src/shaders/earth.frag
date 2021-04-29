precision mediump float;

uniform sampler2D uTerrainMap;

varying vec3 vNormal;
varying vec2 vUv;

void main()
{
    // vec4 texCol = texture2D(uTerrainMap, vUv);
    // gl_FragColor = texCol;
    gl_FragColor = vec4(vNormal*.5+.5, 0.3);
    // gl_FragColor = vec4(vec3(0.), .5);
}