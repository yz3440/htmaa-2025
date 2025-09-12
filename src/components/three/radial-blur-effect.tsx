import React, { forwardRef, useMemo } from "react";
import { type RenderTarget, Uniform, type WebGLRenderer } from "three";
import { Effect } from "postprocessing";

const fragmentShader = `
  const int nsamples = 100;
  uniform float blurStart;
  uniform float blurWidth;
  uniform vec2 mouse;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 center = mouse.xy;

      vec2 uvOffset = uv - center;
      float precompute = blurWidth * (1.0 / float(nsamples - 1));

      vec4 color = vec4(0.0);
      for(int i = 0; i < nsamples; i++)
      {
          float scale = blurStart + (float(i) * precompute);
          color += texture(inputBuffer, uvOffset * scale + center);
      }

      color /= float(nsamples);

      outputColor = color;
  }
`;

let _uBlurStart: number;
let _uBlurWidth: number;
let _uMouse: [number, number];

// Effect implementation
class RadialBlurEffectImpl extends Effect {
  constructor({
    blurStart = 1.0,
    blurWidth = 0.1,
    mouse = [0.5, 0.5],
  }: {
    blurStart?: number;
    blurWidth?: number;
    mouse?: [number, number];
  } = {}) {
    super("RadialBlurEffect", fragmentShader, {
      uniforms: new Map<string, Uniform<number | [number, number]>>([
        ["blurStart", new Uniform(blurStart)],
        ["blurWidth", new Uniform(blurWidth)],
        ["mouse", new Uniform(mouse)],
      ]),
    });

    _uBlurStart = blurStart;
    _uBlurWidth = blurWidth;
    _uMouse = mouse;
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: RenderTarget,
    deltaTime: number,
  ) {
    const blurStartUniform = this.uniforms.get("blurStart");
    const blurWidthUniform = this.uniforms.get("blurWidth");
    const mouseUniform = this.uniforms.get("mouse");
    if (blurStartUniform) {
      blurStartUniform.value = _uBlurStart;
    }
    if (blurWidthUniform) {
      blurWidthUniform.value = _uBlurWidth;
    }
    if (mouseUniform) {
      mouseUniform.value = _uMouse;
    }
  }
}

// Effect component
interface RadialBlurEffectProps {
  blurStart?: number;
  blurWidth?: number;
  mouse?: [number, number];
}

export const RadialBlurEffect = forwardRef<unknown, RadialBlurEffectProps>(
  ({ blurStart, blurWidth, mouse }, ref) => {
    const effect = useMemo(
      () => new RadialBlurEffectImpl({ blurStart, blurWidth, mouse }),
      [blurStart, blurWidth, mouse],
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  },
);

RadialBlurEffect.displayName = "RadialBlurEffect";
