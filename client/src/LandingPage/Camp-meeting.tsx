import SEO from "@/components/SEO";

function CampMeeting() {
  return (
    <>
      <SEO
        title="Our Camp Meeting Programs"
        description="Browse our latest camp meeting programs and stay updated with the latest news and events from our church."
      />
      <iframe
        src ="https://heyzine.com/flip-book/61721bdd42.html?embed=true"
        style={{
          width: "100%",
          height: "90vh",
          border: "none",
          overflow: "hidden",
        }}
        allowFullScreen
        title="Camp Meeting Programs"
      ></iframe>
    </>
  );
}

export default CampMeeting;