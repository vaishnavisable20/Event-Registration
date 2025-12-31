async function initRedirect() {
  const statusText = document.getElementById("status-text");
  const eventButton = document.getElementById("event-button");

  try {
    // 1. Fetch the data from your JSON file
    const response = await fetch("event-config.json");

    if (!response.ok) throw new Error("Could not load event data");

    const eventData = await response.json();

    // 2. Update the UI with JSON data
    document.getElementById(
      "status-heading"
    ).innerText = `Joining: ${eventData.eventName}`;
    eventButton.href = eventData.registrationUrl;

    // 3. Logic for Redirection
    if (eventData.isActive) {
      setTimeout(() => {
        statusText.innerText = "Redirecting to registration...";
        window.location.href = eventData.registrationUrl;
      });
    } else {
      statusText.innerText = "This event is currently closed.";
      eventButton.classList.add("hidden");
    }

    // 4. Tracking (Internal Log)
    console.log(`Tracking Scan: Event ID - ${eventData.eventID}`);
  } catch (error) {
    console.error("Error:", error);
    statusText.innerText = "Error loading event. Please try again later.";
  }
}

// Run the function when the page loads
window.onload = initRedirect;

