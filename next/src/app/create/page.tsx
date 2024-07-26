import crypto from "crypto";
import { redirect } from "next/navigation";

export default async function Create({ searchParams }: { searchParams: { id: string } }) {

	async function action(form: FormData) {

		"use server";

		const pdf = Buffer.from(await (form.get("file") as File).arrayBuffer());
		const data = JSON.parse(await (form.get("data") as File).text());

		const iv = crypto.randomBytes(16);
		const key = crypto.scryptSync("", crypto.randomBytes(16).toString('hex'), 32);
		const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

		const encrypted = Buffer.concat([cipher.update(Buffer.from(JSON.stringify({ pdf, data })).toString("base64")), cipher.final()]);

		const data2 = JSON.stringify({ data: JSON.stringify({ data: encrypted.toString("base64"), iv: iv.toString("base64"), url: form.get("url"), start: form.get("start"), end: form.get("end") }), key: key.toString("base64") });

		redirect("/create?id=" + Buffer.from(data2).toString("base64"));

	}

	if (searchParams.id) searchParams.id = Buffer.from(searchParams.id, "base64").toString();

	return (
		<>

			<form action={action}>

				<input type="number" name="start" placeholder="start" required />
				<input type="number" name="end" placeholder="end" required />
				<input type="text" name="url" placeholder="url" required />
				<input type="file" name="file" required />
				<input type="file" name="data" required />
				<input type="submit" value="Create" />

			</form>

			<p>Output:</p>

			<textarea readOnly id="result" defaultValue={searchParams.id ? JSON.parse(searchParams.id).data : ""}></textarea>
			<textarea readOnly id="key" defaultValue={searchParams.id ? JSON.parse(searchParams.id).key : ""}></textarea>

		</>
	);

}
