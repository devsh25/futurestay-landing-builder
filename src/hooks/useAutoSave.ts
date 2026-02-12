'use client';

import { useEffect, useRef } from 'react';
import { usePageStore } from '@/store/pageStore';

const STORAGE_KEY = 'futurestay-builder-draft';

export function useAutoSave() {
  const getPageData = usePageStore((s) => s.getPageData);
  const loadFromJson = usePageStore((s) => s.loadFromJson);
  const initializedRef = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        loadFromJson(data);
      }
    } catch {
      // Ignore parse errors
    }
  }, [loadFromJson]);

  // Save to localStorage on changes (debounced)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const unsubscribe = usePageStore.subscribe(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const data = getPageData();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
          // Ignore storage errors
        }
      }, 2000);
    });

    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, [getPageData]);
}
