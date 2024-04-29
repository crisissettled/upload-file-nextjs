import path from "path";
import fs from "fs";
import { NextApiRequest } from "next";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(request: Request) {
  //   console.log(request.body, "<-------request in route handler");

  //   console.log(request.formData(), "<-------request formData");

  const formData = await request.formData();
  console.log(formData, "<-----formData");

  const file = formData.get("file") as File;
  if (!file) return;

  const uploadDirectory = path.resolve(__dirname, "./upload/");
  if (fs.existsSync(uploadDirectory) === false) {
    fs.mkdirSync(uploadDirectory);
  }

  const data = await file.arrayBuffer();

  fs.writeFileSync(`${uploadDirectory}/${file.name}`, Buffer.from(data));
  //await fs.appendFile(`${uploadDirectory}/${fileName}`, Buffer.from(data));

  return Response.json({ success: true, message: "upload success" });
}

export async function GET() {
  return Response.json({ message: "hello world!!!" });
}

// async function streamToBuffer(readableStream: ReadableStream) {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     readableStream.on("data", (data) => {
//       if (typeof data === "string") {
//         // Convert string to Buffer assuming UTF-8 encoding
//         chunks.push(Buffer.from(data, "utf-8"));
//       } else if (data instanceof Buffer) {
//         chunks.push(data);
//       } else {
//         // Convert other data types to JSON and then to a Buffer
//         const jsonData = JSON.stringify(data);
//         chunks.push(Buffer.from(jsonData, "utf-8"));
//       }
//     });
//     readableStream.on("end", () => {
//       resolve(Buffer.concat(chunks));
//     });
//     readableStream.on("error", reject);
//   });
// }
