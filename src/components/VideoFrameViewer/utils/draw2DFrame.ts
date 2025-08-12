export async function draw2DFrame(
  videoFrame: VideoFrame,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): Promise<void> {
  const { width, height } = canvas.getBoundingClientRect();
  const frameWidth = videoFrame.displayWidth || videoFrame.codedWidth;
  const frameHeight = videoFrame.displayHeight || videoFrame.codedHeight;

  const canvasRatio = width / height;
  const frameRatio = frameWidth / frameHeight;

  let sx = 0,
    sy = 0,
    sWidth = frameWidth,
    sHeight = frameHeight;

  if (frameRatio > canvasRatio) {
    sWidth = frameHeight * canvasRatio;
    sx = (frameWidth - sWidth) / 2;
  } else {
    sHeight = frameWidth / canvasRatio;
    sy = (frameHeight - sHeight) / 2;
  }
  ctx.drawImage(videoFrame, sx, sy, sWidth, sHeight, 0, 0, width, height);
}
