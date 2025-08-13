import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useLocalStorageState
 *
 * 管理 localStorage 中指定 keys 的状态，返回当前这些 keys 对应的值对象和 dispatch 方法。
 * 支持跨标签页和同标签页同步。
 *
 * @param keys 需要管理的 localStorage key 数组
 * @returns [state, dispatch]
 *   - state: { [key]: string | null }，对应 keys 的值（不存在则 null）
 *   - dispatch: (key, value) => void，用于更新或删除指定 key 的值（value=null 表示删除）
 */
function useLocalStorageState<T extends readonly string[]>(keys: T) {
  // 初始化状态，从 localStorage 读取指定 keys 的值
  const getInitialState = () => {
    if (typeof window === 'undefined') return {};
    const state = {} as {
      [K in T[number]]: string | null;
    };
    keys.forEach((key) => {
      const value = window.localStorage.getItem(key);
      state[key as T[number]] = value; // 如果 key 不存在，value 为 null
    });
    return state;
  };

  const [state, setState] = useState<{
    [K in T[number]]: string | null;
  }>(getInitialState);

  // BroadcastChannel 用于同标签页之间通信，实现实时同步
  const channelRef = useRef<BroadcastChannel | null>(null);

  // 初始化 BroadcastChannel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      channelRef.current = new BroadcastChannel('local-storage');
    }
    return () => {
      channelRef.current?.close();
    };
  }, []);

  /**
   * dispatch 更新指定 key 的值
   * @param key 需要更新的 key，必须包含在 keys 中
   * @param value 新值，传 null 表示删除该 key
   */
  const dispatch = useCallback(
    (key: (typeof keys)[number], value: string | null) => {
      if (!keys.includes(key)) {
        console.warn(`[useLocalStorageKeys] key "${key}" not managed by this hook.`);
        return;
      }
      setState((prev) => {
        const newState = { ...prev, [key]: value };
        try {
          if (value === null) {
            // 删除 localStorage 中对应的 key
            window.localStorage.removeItem(key);
          } else {
            // 设置 localStorage 中对应的 key 值
            window.localStorage.setItem(key, value);
          }
          // 通过 BroadcastChannel 广播消息，实现同步
          channelRef.current?.postMessage({ key, value });
        } catch {
          // 忽略写入错误
        }
        return newState;
      });
    },
    [keys],
  );

  // 监听 localStorage 变化事件（跨标签页触发）
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key && keys.includes(event.key)) {
        setState((prev) => ({
          ...prev,
          [event.key]: event.newValue, // event.newValue 为 null 表示删除
        }));
      }
    }

    // 监听 BroadcastChannel 消息（同标签页或跨标签页）
    function handleBroadcast(event: MessageEvent) {
      const { key, value } = event.data || {};
      if (typeof key === 'string' && keys.includes(key)) {
        setState((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    }

    window.addEventListener('storage', handleStorage);
    channelRef.current?.addEventListener('message', handleBroadcast);

    return () => {
      window.removeEventListener('storage', handleStorage);
      channelRef.current?.removeEventListener('message', handleBroadcast);
    };
  }, [keys]);

  return [state, dispatch] as const;
}

export default useLocalStorageState;
