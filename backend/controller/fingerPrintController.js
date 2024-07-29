import exec from "child_process";
import { Fpcode } from "../model/model.js";

export const detectFingerprint = (req, res) => {
  const url = req.body.url || "http://localhost:3000";
  exec(`python ./api/detect_fp.py ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(error.toString());
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }

    let fingerprintData;
    try {
      fingerprintData = JSON.parse(stdout);
    } catch (err) {
      return res.status(500).send("Failed to parse fingerprint data");
    }

    const fingerprint = new Fpcode({ data: JSON.stringify(fingerprintData) });
    fingerprint
      .save()
      .then((savedFingerprint) => res.json(savedFingerprint))
      .catch((err) => res.status(500).send(err.toString()));
  });
};
