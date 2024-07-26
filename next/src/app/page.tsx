import { getData, setData } from "./data";
import { redirect } from "next/navigation";

export default async function Root() {

	async function action(form: FormData) {

		"use server";

		console.log(form.get("file"));

		const file = form.get("file") as File;

		await setData(file);

		console.log(getData());

		redirect("/sheet");

	}

	return (

		<>

			<h1>W-Sheet</h1>

			<p>テストデータファイルを選択してください。</p>

			<form action={action}>

				<input type="file" name="file" required />
				<input type="submit" value="Select" />

			</form>

			<a href="/create">テストの作成</a>

		</>

	);

}
