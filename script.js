console.log("JS LOADED");

const form = document.getElementById("auditForm");
const result = document.getElementById("result");

console.log("Form:", form);

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = document.getElementById("urlInput").value;
    result.textContent = "Analyzing...";

    const apiKey = "AIzaSyCLa7I2JW7qyju5mqt8fPiy4ucjCRDf3wM";

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("API DATA:", data);

      const lighthouse = data.lighthouseResult;

      const output = {
        performance: lighthouse.categories.performance.score * 100,
        accessibility: lighthouse.categories.accessibility.score * 100,
        seo: lighthouse.categories.seo.score * 100,
        bestPractices: lighthouse.categories["best-practices"].score * 100,
      };

      result.textContent = JSON.stringify(output, null, 2);
    } catch (err) {
      console.error(err);
      result.textContent = "Error analyzing site";
    }
  });
}
