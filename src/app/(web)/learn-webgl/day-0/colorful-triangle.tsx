"use client";

import { FC, useEffect, useRef } from "react";

const ColorfulTriangle: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = Math.min(width, height / 2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const vertexShaderSource = `
      precision mediump float;
      attribute vec2 vertPosition;
      attribute vec3 vertColor;
      varying vec3 fragColor;
      void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
      }
    `;
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 fragColor;
      void main() {
        gl_FragColor = vec4(fragColor, 1.0);
      }
    `;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const triangleVertices = new Float32Array(
      [
        [0.0, 0.4, 1.0, 0.0, 0.0],
        [-0.6, -0.4, 0.0, 1.0, 0.0],
        [0.6, -0.4, 0.0, 0.0, 1.0],
      ].flat()
    );
    const triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, []);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default ColorfulTriangle;
