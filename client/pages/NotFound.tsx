import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PlaceholderPage from "./PlaceholderPage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PlaceholderPage
      ctaLabel="Return home"
      ctaTo="/"
      description={`The route ${location.pathname} does not exist in this build yet. The navigation remains branded and functional so we can add the screen later without breaking the experience.`}
      eyebrow="Not found"
      title="This page is not in the current Volta flow."
    />
  );
};

export default NotFound;
