import SEO from "@/components/SEO";

function Magazine() {
  return (
    <>
      <SEO
        title="Our Magazine"
        description="Browse our latest magazine and stay updated with the latest news and events from our church."
      />
      <iframe
        src="https://heyzine.com/flip-book/a2acd7b922.html?embed=true"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
          overflow: "hidden",
        }}
        allowFullScreen
        title="Magazine Flipbook"
      ></iframe>
    </>
  );
}

export default Magazine;