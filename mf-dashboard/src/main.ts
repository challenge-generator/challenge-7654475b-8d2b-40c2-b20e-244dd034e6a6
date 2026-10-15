import { importSPAParticipant } from 'single-spa';
import { mount, bootstrap, unmount, unload } from './bootstrap';

declare global {
  interface Window {
    System: {
      import: (module: string) => Promise<unknown>;
    };
  }
}

const lifecycles = {
  bootstrap,
  mount,
  unmount,
  unload,
};

if (window.singleSpaAngularV2) {
  window.singleSpaAngularV2(lifecycles);
} else {
  window.addEventListener('single-spa:first-mount', () => {
    const event = new CustomEvent('mf-dashboard:mounted', {
      detail: { timestamp: Date.now() },
    });
    window.dispatchEvent(event);
  });

  window.addEventListener('single-spa:routing-event', () => {
    console.log('[mf-dashboard] Routing event detected, checking for lazy routes');
  });

  window.addEventListener('single-spa:app-change', (event: Event) => {
    const customEvent = event as CustomEvent<{ appName: string; appStatus: string }>;
    console.log(`[mf-dashboard] App change: ${customEvent.detail.appName} - ${customEvent.detail.appStatus}`);
  });

  window.addEventListener('single-spa:no-app-change', () => {
    console.log('[mf-dashboard] No app change detected');
  });

  window.addEventListener('single-spa:mount-spa-participant', async (event: Event) => {
    const customEvent = event as CustomEvent<{ participantId: string }>;
    console.log(`[mf-dashboard] Mounting participant: ${customEvent.detail.participantId}`);
    
    try {
      const participantModule = await window.System.import(customEvent.detail.participantId);
      console.log(`[mf-dashboard] Participant loaded:`, participantModule);
    } catch (error) {
      console.error(`[mf-dashboard] Failed to load participant:`, error);
    }
  });

  if (typeof window.singleSpa !== 'undefined') {
    window.singleSpa.registerApplication(
      'mf-dashboard',
      async () => lifecycles,
      (location) => location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/accounts')
    );
  } else {
    console.warn('[mf-dashboard] single-spa not found in window, registering via importSPAParticipant');
    importSPAParticipant({
      name: 'mf-dashboard',
      mount,
      bootstrap,
      unmount,
      unload,
      activeIf: (location) => location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/accounts'),
    });
  }
}

console.log('[mf-dashboard] Micro-frontend initialized and ready for single-spa integration');
export default lifecycles;