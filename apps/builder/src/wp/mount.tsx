import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BuilderLayout } from '@builder/components/layout/builder-layout';
import { WordPressBridge } from '@builder/components/wordpress-bridge';

const rootElement = document.getElementById('node-builder-root');

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<WordPressBridge />
			<BuilderLayout />
		</StrictMode>,
	);
}
