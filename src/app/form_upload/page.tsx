import path from "path";
import fs from "fs";

export default function Page() {
  async function uploadFile(formData: FormData) {
    "use server";

    const fileName = formData.get("fileName");
    const file = formData.get("file") as File;
    if (!file) return;

    const uploadDirectory = path.resolve(__dirname, "./upload/");
    if (fs.existsSync(uploadDirectory) === false) {
      fs.mkdirSync(uploadDirectory);
    }

    const data = await file.arrayBuffer();

    fs.writeFileSync(`${uploadDirectory}/${fileName}`, Buffer.from(data));
    //await fs.appendFile(`${uploadDirectory}/${fileName}`, Buffer.from(data));
  }

  return (
    <form action={uploadFile} className="m-2">
      <p className="m-2">
        <input
          className="border"
          type="input"
          name="fileName"
          defaultValue="abc.jpg"
        />
      </p>
      <p className="m-2">
        <input type="file" name="file" />
      </p>
      <p className="m-2">
        <button
          type="submit"
          className="rounded  bg-blue-500 active:bg-blue-600 p-2"
        >
          Upload Image
        </button>
      </p>
    </form>
  );
}
