import type { Metadata } from 'next';
import type { ReactNode, ReactElement } from 'react';

import './globals.css';

export const metadata: Metadata = {
	title: 'NodeBrains Visual Builder',
	description: 'Core shell for the NodeBrains visual page builder.',
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
