import { notFound } from "next/navigation";
import { dencrypt, getData, setKey } from "../data";
import { Waiter } from "./waiter";

export default async function Sheet() {

	if (getData()?.start == undefined) notFound();

	if (getData()!!.start > new Date().getTime()) {

		return (
			<>

				<Waiter start={getData()!!.start} />

			</>
		)

	}

	await setKey();

	const data = JSON.stringify(await dencrypt());

	return (
		<>

			<h1>W-Sheet</h1>

			<div dangerouslySetInnerHTML={{ __html: data.html }}></div>


		</>
	)

}
