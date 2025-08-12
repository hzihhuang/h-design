import { DataStream, Endianness, ISOFile, MP4BoxBuffer, createFile } from 'mp4box';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface useVideoFramesProps {
  url: string;
}

function useVideoFrames({ url }: useVideoFramesProps) {
  const [frames, setFrames] = useState<VideoFrame[]>([]);
  const framesRef = useRef<VideoFrame[]>([]);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>>(null);
  /** 解码输出：收集帧 */
  const handleDecodedFrame = useCallback((videoFrame: VideoFrame) => {
    framesRef.current.push(videoFrame);
  }, []);

  /** 获取 track 的 extradata（初始化解码器用） */
  const getExtradata = (mp4boxFile: ISOFile): Uint8Array | undefined => {
    const entry = mp4boxFile.moov.traks[0].mdia.minf.stbl.stsd.entries[0] as any;
    const box = entry.avcC ?? entry.hvcC ?? entry.vpcC;
    if (!box) return;
    const stream = new DataStream(undefined, 0, Endianness.BIG_ENDIAN);
    box.write(stream);
    return new Uint8Array(stream.buffer.slice(8));
  };

  /** 初始化视频解码与流式加载 */
  const initDecoder = useCallback(async () => {
    const mp4boxFile = createFile();
    const decoder = new VideoDecoder({
      output: handleDecodedFrame,
      error: (e) => console.error('Decoder error:', e),
    });

    mp4boxFile.onReady = (info) => {
      const videoTrack = info.tracks.find((t) => t.type === 'video');
      if (!videoTrack) return;

      decoder.configure({
        codec: videoTrack.codec || '',
        description: getExtradata(mp4boxFile),
        hardwareAcceleration: 'prefer-hardware',
      });

      mp4boxFile.setExtractionOptions(videoTrack.id, null, { nbSamples: 1 });
      mp4boxFile.start();
    };
    mp4boxFile.onSamples = (_id, _user, samples) => {
      samples.forEach((sample) => {
        const chunk = new EncodedVideoChunk({
          type: sample.is_sync ? 'key' : 'delta',
          timestamp: sample.cts,
          duration: sample.duration,
          data: sample.data?.slice().buffer || new Uint8Array(),
        });
        decoder.decode(chunk);
      });
    };

    const response = await fetch(url);
    const reader = response.body!.getReader();
    readerRef.current = reader;
    let offset = 0;
    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        mp4boxFile.flush();
        await decoder.flush(); // 等待解码器输出所有帧
        setFrames(framesRef.current);
        return;
      }
      const buffer = value.buffer;
      (buffer as any).fileStart = offset;
      offset += buffer.byteLength;
      mp4boxFile.appendBuffer(buffer as MP4BoxBuffer);
      readChunk();
    };
    readChunk();
  }, [handleDecodedFrame, url]);

  /** 清理副作用 */
  const destroyDecoder = useCallback(() => {
    framesRef.current.forEach((frame) => frame.close());
    framesRef.current = [];
    if (readerRef.current) {
      readerRef.current.cancel().catch(() => {});
    }
  }, []);

  /** 初始化解码器和视频流 */
  useEffect(() => {
    initDecoder();
    return () => destroyDecoder();
  }, [initDecoder, destroyDecoder]);
  return {
    frames,
  };
}

export default useVideoFrames;
