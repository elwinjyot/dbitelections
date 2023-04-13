import { useEffect, useState } from "react";

export default function Track() {
  const [results, setResults] = useState<[]>([]);
  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const res = await fetch("http://localhost:3000/api/track");
    if (res) {
      res.json().then((r) => {
        setResults(r);
      });
    }
  };

  return (
    <div id="portal">
      <div className="portal-wrapper">
        {results.map((res: any) => (
          <>
            <h2>{res.name}</h2>
            <p>President</p>
          </>
        ))}
      </div>
    </div>
  );
}
