precision mediump float;

uniform sampler2D uTerrainMap;

varying vec3 vNormal;
varying vec2 vUv;
varying float vRad;
varying float vExtent;

void main()
{
    // vec4 texCol = texture2D(uTerrainMap, vUv);
    // gl_FragColor = texCol;
    // gl_FragColor = vec4(vNormal*.5+.5, 1.0);
    // gl_FragColor = vec4(1.);
    gl_FragColor = vec4(vec3(1.), pow(1. - vRad * 4.,2.) + vExtent * .2);
}