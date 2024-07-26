import crypto from "crypto";

let data: { start: number, end: number, data: string, iv: string, url: string } | undefined = undefined;
let key: Buffer | undefined = undefined;

export function getData() {

	return data;

}


export async function setData(file: File) {

	data = JSON.parse(await file.text());

}

export async function setKey() {

	await fetch(data!!.url).then(async (response) => key = Buffer.from(await response.text(), "base64"));

}

export async function dencrypt() {

	const decipher = crypto.createDecipheriv("aes-256-cbc", key!!, Buffer.from(data!!.iv, "base64"));
	const decrypted = Buffer.concat([decipher.update(Buffer.from(data!!.data, "base64")), decipher.final()]);

	return JSON.parse(Buffer.from(decrypted.toString(), "base64").toString()) as { pdf: Buffer, data: { answer: string }[] };

}
