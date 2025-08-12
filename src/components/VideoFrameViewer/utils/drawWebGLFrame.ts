// 编译着色器的辅助函数
function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('着色器编译错误:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw new Error('着色器编译失败');
  }

  return shader;
}

// 创建着色器程序的辅助函数
function createShaderProgram(gl: WebGLRenderingContext): WebGLProgram {
  // 顶点着色器（简单传递位置和纹理坐标）
  const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = vec4(a_position, 0, 1);
            v_texCoord = a_texCoord;
        }
    `;

  // 片段着色器（从纹理采样）
  const fsSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_image;
        void main() {
            gl_FragColor = texture2D(u_image, v_texCoord);
        }
    `;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  return program;
}

export default async function drawWebGLFrame(
  videoFrame: VideoFrame,
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
): Promise<void> {
  // 1. 计算宽高比（新增）
  const videoAspect = videoFrame.displayWidth / videoFrame.displayHeight;
  const canvasAspect = canvas.width / canvas.height;

  // 2. 计算cover模式的缩放比例（核心修改）
  let scaleX = 1,
    scaleY = 1;
  if (videoAspect > canvasAspect) {
    scaleX = videoAspect / canvasAspect;
  } else {
    scaleY = canvasAspect / videoAspect;
  }

  // 3. 创建并绑定纹理
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 4. 设置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // 5. 上传视频帧数据到纹理
  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videoFrame);

  // 6. 初始化着色器程序（只创建一次）
  const program = createShaderProgram(gl);
  gl.useProgram(program);

  // 7. 设置顶点缓冲区
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -scaleX,
      -scaleY, // 左下
      scaleX,
      -scaleY, // 右下
      -scaleX,
      scaleY, // 左上
      scaleX,
      scaleY, // 右上
    ]),
    gl.STATIC_DRAW,
  );

  // 8. 设置纹理坐标缓冲区
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0,
      1, // 左下
      1,
      1, // 右下
      0,
      0, // 左上
      1,
      0, // 右上
    ]),
    gl.STATIC_DRAW,
  );

  // 9. 启用并设置顶点属性指针
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord');
  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // 10. 绘制
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // 11. 清理
  gl.deleteTexture(texture);
  gl.deleteBuffer(positionBuffer);
  gl.deleteBuffer(texCoordBuffer);
}
