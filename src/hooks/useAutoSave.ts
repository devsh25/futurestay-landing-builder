'use client';

import { useEffect, useRef } from 'react';
import { usePageStore } from '@/store/pageStore';

const STORAGE_KEY = 'futurestay-builder-draft';
// Bump this version whenever defaults change to invalidate stale drafts
const DRAFT_VERSION = 3;
const VERSION_KEY = 'futurestay-builder-draft-version';

export function useAutoSave() {
  const getPageData = usePageStore((s) => s.getPageData);
  const loadFromJson = usePageStore((s) => s.loadFromJson);
  const initializedRef = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const savedVersion = localStorage.getItem(VERSION_KEY);
      const currentVersion = String(DRAFT_VERSION);

      // If version mismatch, clear stale draft and use new defaults
      if (savedVersion !== currentVersion) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(VERSION_KEY, currentVersion);
        return; // Use defaults from the store
      }

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
          localStorage.setItem(VERSION_KEY, String(DRAFT_VERSION));
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
