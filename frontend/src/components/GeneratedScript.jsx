import React from "react";
import { Card, Spinner } from "flowbite-react";
import { useDetailScriptQuery } from "../api/fingerPrinting";
import Section from "./Section";

const GeneratedScript = () => {
  const { data: scriptData, isLoading: isLoadingScripts } =
    useDetailScriptQuery();

  if (isLoadingScripts) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!scriptData || !scriptData.scripts) {
    return <p>No scripts found.</p>;
  }

  return (
    <Section className="flex justify-center">
      {scriptData.scripts.map((script) => (
        <Card key={script._id} className="mb-4 w-9/12 ">
          <h3 className="text-lg font-bold mb-2">Detected Script</h3>
          <pre className="text-white bg-gray-800 p-4 rounded">
            {JSON.stringify(JSON.parse(script.data), null, 2)}
          </pre>
        </Card>
      ))}
    </Section>
  );
};

export default GeneratedScript;
