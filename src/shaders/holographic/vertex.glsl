varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// Position
	vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

	// Final position
	gl_Position = projectionMatrix * modelViewPosition;

	// Transform to world space
	vec4 modelNormal = modelViewMatrix * vec4(normal, 0.0);

	// Varyings
	vPosition = modelViewPosition.xyz;
	vNormal = modelNormal.xyz;
	vUv = uv;
}
