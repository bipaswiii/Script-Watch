import { exec } from "child_process";
import { Fpcode } from "../model/model.js";

export const detectFingerprint = (req, res) => {
  exec("python ./backend/api/detect_fp.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(500)
        .json({ message: `Error executing Python script: ${error.message}` });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res
        .status(500)
        .json({ message: `Python script stderr: ${stderr}` });
    }

    console.log("Python script output:", stdout);

    const jsonStart = stdout.indexOf("{");
    const jsonEnd = stdout.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      return res
        .status(500)
        .json({ message: "Failed to find JSON in stdout", rawOutput: stdout });
    }

    const jsonString = stdout.substring(jsonStart, jsonEnd);

    let fingerprintData;
    try {
      fingerprintData = JSON.parse(jsonString); // Parse the extracted JSON string
    } catch (err) {
      console.error(`Failed to parse extracted JSON: ${err}`);
      return res.status(500).json({
        message: "Failed to parse fingerprint data",
        rawOutput: stdout,
      });
    }

    console.log("Parsed fingerprint data:", fingerprintData);

    const formattedFingerprintData = JSON.stringify(fingerprintData, null, 2);

    console.log("Formatted fingerprint data:", formattedFingerprintData);

    const fingerprint = new Fpcode({ data: formattedFingerprintData });
    fingerprint
      .save()
      .then((savedFingerprint) => {
        res.status(201).json({
          message: "Fingerprint data successfully stored",
          fingerprint: savedFingerprint,
        });
      })
      .catch((err) => {
        console.error(`Failed to save fingerprint data: ${err}`);
        res.status(500).json({
          message: "Failed to save fingerprint data",
          error: err.toString(),
        });
      });
  });
};

export const getAllScripts = async (req, res) => {
  try {
    const scripts = await Fpcode.find({});
    res.status(200).json({
      message: "Successfully retrived all scripts",
      scripts: scripts,
    });
  } catch (err) {
    console.error(`Failed to retrieve scripts: ${err}`);
    res.status(500).json({
      message: "Failed to retrieve scripts",
      error: err.toString(),
    });
  }
};
