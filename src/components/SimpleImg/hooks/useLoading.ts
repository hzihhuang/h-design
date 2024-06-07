import { useEffect, useState } from 'react';

interface UseLoadingEvent {
  imgRef: React.RefObject<HTMLImageElement>;
  src?: string;
}

/**
 * loading 功能
 */
function useLoading({ imgRef, src }: UseLoadingEvent) {
  const [loading, setLoading] = useState(true);
  const loadingCallback = () => setLoading(false);
  const loadingError = () => {
    setLoading(false);
  };
  useEffect(() => {
    if (!imgRef.current) return;
    setLoading(true);
    if (!!imgRef.current.getAttribute('src') && imgRef.current.complete) {
      setLoading(false);
    }
    imgRef.current.addEventListener('load', loadingCallback);
    imgRef.current.addEventListener('error', loadingError);
    return () => {
      imgRef.current?.removeEventListener('load', loadingCallback);
      imgRef.current?.removeEventListener('error', loadingError);
    };
  }, [src]);

  return {
    loading,
  };
}

export default useLoading;
