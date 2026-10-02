import { GlobalRegistrator } from '@happy-dom/global-registrator';

// A concrete URL is required so relative URLs (e.g. the ones next/image
// generates for its optimized <img> src) can be resolved during tests.
GlobalRegistrator.register({ url: 'http://localhost:3000' });
