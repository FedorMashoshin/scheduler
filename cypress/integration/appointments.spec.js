describe("Appointment", () => {
  it("should book an interview", () => {
    cy.request("GET", "/api/debug/reset");
    // Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday");
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.get(".button--confirm").click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Fedor Mashoshin");
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.get(".button--confirm").click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Fedor Mashoshin");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
    cy.get("[alt=Delete]").click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
