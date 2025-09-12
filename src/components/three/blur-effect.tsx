import React, { forwardRef, useMemo } from "react";
import { type RenderTarget, Uniform, type WebGLRenderer } from "three";
import { Effect } from "postprocessing";

const fragmentShader = `
  uniform float horizontalStrength;
  uniform float verticalStrength;
  uniform float level;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 sum = vec4(0.0);

    // Apply a weighted sum of neighboring pixels to create a blur effect
    sum += texture2D(inputBuffer, vec2(uv.x - 4.0 * horizontalStrength, uv.y - 4.0 * verticalStrength)) * 0.051;
    sum += texture2D(inputBuffer, vec2(uv.x - 3.0 * horizontalStrength, uv.y - 3.0 * verticalStrength)) * 0.0918;
    sum += texture2D(inputBuffer, vec2(uv.x - 2.0 * horizontalStrength, uv.y - 2.0 * verticalStrength)) * 0.12245;
    sum += texture2D(inputBuffer, vec2(uv.x - 1.0 * horizontalStrength, uv.y - 1.0 * verticalStrength)) * 0.1531;
    sum += texture2D(inputBuffer, vec2(uv.x, uv.y)) * 0.1633;
    sum += texture2D(inputBuffer, vec2(uv.x + 1.0 * horizontalStrength, uv.y + 1.0 * verticalStrength)) * 0.1531;
    sum += texture2D(inputBuffer, vec2(uv.x + 2.0 * horizontalStrength, uv.y + 2.0 * verticalStrength)) * 0.12245;
    sum += texture2D(inputBuffer, vec2(uv.x + 3.0 * horizontalStrength, uv.y + 3.0 * verticalStrength)) * 0.0918;
    sum += texture2D(inputBuffer, vec2(uv.x + 4.0 * horizontalStrength, uv.y + 4.0 * verticalStrength)) * 0.051;

    outputColor = sum * level;
  }
`;

let _uHorizontalStrength: number;
let _uVerticalStrength: number;
let _uLevel: number;

// Effect implementation
class BlurEffectImpl extends Effect {
  constructor({
    horizontalStrength = 0.1,
    verticalStrength = 0.1,
    level = 1,
  }: {
    horizontalStrength?: number;
    verticalStrength?: number;
    level?: number;
  } = {}) {
    super("BlurEffect", fragmentShader, {
      uniforms: new Map([
        ["horizontalStrength", new Uniform(horizontalStrength)],
        ["verticalStrength", new Uniform(verticalStrength)],
        ["level", new Uniform(level)],
      ]),
    });

    _uHorizontalStrength = horizontalStrength;
    _uVerticalStrength = verticalStrength;
    _uLevel = level;
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: RenderTarget,
    deltaTime: number,
  ) {
    const horizontalStrengthUniform = this.uniforms.get("horizontalStrength");
    const verticalStrengthUniform = this.uniforms.get("verticalStrength");
    if (horizontalStrengthUniform) {
      horizontalStrengthUniform.value = _uHorizontalStrength;
    }
    if (verticalStrengthUniform) {
      verticalStrengthUniform.value = _uVerticalStrength;
    }
    const levelUniform = this.uniforms.get("level");
    if (levelUniform) {
      levelUniform.value = _uLevel;
    }
  }
}

// Effect component
interface BlurEffectProps {
  horizontalStrength?: number;
  verticalStrength?: number;
  level?: number;
}

export const BlurEffect = forwardRef<unknown, BlurEffectProps>(
  ({ horizontalStrength, verticalStrength, level }, ref) => {
    const effect = useMemo(
      () => new BlurEffectImpl({ horizontalStrength, verticalStrength, level }),
      [horizontalStrength, verticalStrength],
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  },
);

BlurEffect.displayName = "BlurEffect";
