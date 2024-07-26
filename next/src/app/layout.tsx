import React from "react";
import "./global.css";

export default async function Layout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="ja">

			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<body>

				{children}
		
			</body>
		
		</html>
	)

}
