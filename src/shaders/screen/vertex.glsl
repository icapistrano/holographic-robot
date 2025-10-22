uniform float uAmplitude;
uniform float uTime;
varying vec2 vUv;

void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	modelPosition.x += uTime;
	modelPosition.y += uTime;

	gl_Position = projectionMatrix * viewMatrix * modelPosition;

	vUv = uv;
}