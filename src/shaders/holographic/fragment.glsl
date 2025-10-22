uniform float uTime;
uniform vec3 uColor;
uniform float uDecay;
uniform float uFresnelStrength;


varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    // Normal
    vec3 normal = normalize(vNormal);

    float decay = 1.0 - mix(0.0, 1.0, vUv.y);
    decay = pow(decay, uDecay);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(normal, viewDirection);
    fresnel = 1.0 - abs(fresnel);

    // Falloff
    float falloff = smoothstep(1.0, 0.7, fresnel);

    float holographic = fresnel * uFresnelStrength;
    holographic *= falloff;
    holographic *= decay;

    gl_FragColor = vec4(uColor, holographic);
}