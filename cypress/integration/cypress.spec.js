describe("Game of Life", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("starts with dead cells", () => {
    cy.get("[data-cy=r0c0]")
      .should("have.class", "master_dead__1ZysK")
      .and("not.have.class", "master_live__19Hhv");
    cy.get("[data-cy=r15c15]")
      .should("have.class", "master_dead__1ZysK")
      .and("not.have.class", "master_live__19Hhv");
    cy.get("[data-cy=r34c27]")
      .should("have.class", "master_dead__1ZysK")
      .and("not.have.class", "master_live__19Hhv");
  });

  it("allows user to change cell to live by clicking on it", () => {
    cy.get("[data-cy=r0c0]")
      .should("have.class", "master_dead__1ZysK")
      .then(($cell) => {
        $cell.click();
      })
      .should("have.class", "master_live__19Hhv")
      .and("not.have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r5c18]")
      .should("have.class", "master_dead__1ZysK")
      .then(($cell) => {
        $cell.click();
      })
      .should("have.class", "master_live__19Hhv")
      .and("not.have.class", "master_dead__1ZysK");
  });

  it("clears the grid when clear pressed", () => {
    // click 5 cells
    cy.get("[data-cy=r0c0]").click();
    cy.get("[data-cy=r4c6]").click();
    cy.get("[data-cy=r5c12]").click();
    cy.get("[data-cy=r15c0]").click();
    cy.get("[data-cy=r17c43]").click();

    // click clear
    cy.get("[data-cy=clear]").click();

    // cells should be dead
    cy.get("[data-cy=r0c0]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r4c6]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r5c12]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r15c0]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r17c43]").should("have.class", "master_dead__1ZysK");
  });

  it("randomizes grid when randomize clicked", () => {
    // tests there are at least 100 live cells and 100 dead cells
    // after randomizer clicked (out of 2500 total cells)

    cy.get("[data-cy=randomize]").click();
    cy.get("[class=master_live__19Hhv]")
      .its("length")
      .then(($length) => {
        expect($length).to.be.at.least(100);
      });
    cy.get("[class=master_dead__1ZysK]")
      .its("length")
      .then(($length) => {
        expect($length).to.be.at.least(100);
      });
  });

  it("correctly updates grid when playing", () => {
    // fill in cells in glider formation

    cy.get("[data-cy=r1c0]").click();
    cy.get("[data-cy=r0c2]").click();
    cy.get("[data-cy=r1c2]").click();
    cy.get("[data-cy=r2c2]").click();
    cy.get("[data-cy=r2c1]").click();
    cy.clock();
    cy.get("[data-cy=playOrPause]").click();

    // checks 3 iterations of the glider updating

    cy.tick(120);
    cy.get("[data-cy=r1c0]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r0c2]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r0c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c2]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c3]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c2]").should("have.class", "master_live__19Hhv");
    cy.tick(120);
    cy.get("[data-cy=r0c1]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r1c2]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r0c2]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c3]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c2]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c3]").should("have.class", "master_live__19Hhv");
    cy.tick(120);
    cy.get("[data-cy=r0c2]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r2c1]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r1c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c3]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c2]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c3]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r3c2]").should("have.class", "master_live__19Hhv");
  });

  it("pauses and starts playing again when button pressed", () => {
    // fill in cells in glider formation

    cy.get("[data-cy=r1c0]").click();
    cy.get("[data-cy=r0c2]").click();
    cy.get("[data-cy=r1c2]").click();
    cy.get("[data-cy=r2c2]").click();
    cy.get("[data-cy=r2c1]").click();
    cy.clock();

    // press play
    cy.get("[data-cy=playOrPause]").click();

    // press pause after 1 iteration

    cy.tick(120);
    cy.get("[data-cy=playOrPause]").click();

    // wait 1 second, check cells

    cy.tick(1000);
    cy.get("[data-cy=r1c0]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r0c2]").should("have.class", "master_dead__1ZysK");
    cy.get("[data-cy=r0c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c2]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r1c3]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c1]").should("have.class", "master_live__19Hhv");
    cy.get("[data-cy=r2c2]").should("have.class", "master_live__19Hhv");
  });
});
