"use client";

export function Waiter({ start }: { start: number }) {

	setTimeout(() => {

		location.reload();

	}, new Date().getTime() - start);

	return (
		<>
			<p>待機中</p>
			<p>開始：{new Date(start).toLocaleTimeString("ja-jp")}</p>
		</>
	)

} 
