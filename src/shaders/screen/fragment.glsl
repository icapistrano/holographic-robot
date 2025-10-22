uniform float uAspectRatio;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec2 modUv = vUv;

  // Scale UVs to preserve aspect ratio
  modUv.y = (vUv.y - 0.5) * uAspectRatio + 0.5;

  // Original texture
  vec4 original = texture2D(uTexture, modUv);

  // Color shift
  vec4 texR = texture2D(uTexture, modUv - vec2(0.01, 0.01));
  vec4 colorShifted = vec4(texR.r, original.g, original.b * 3.0, texR.a);

  vec4 finalColor = mix(original, colorShifted, 0.5);

  gl_FragColor = finalColor;
}
