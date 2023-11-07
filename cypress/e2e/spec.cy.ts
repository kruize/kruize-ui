let exp_len, exp_name;

describe('API Tests', () => {
  let ip, port;
  it('should check and get ip and port for all apis to be called', () => {
    cy.visit('http://localhost:9000');
    cy.get('img[alt="Kubernetes wheel"]').should('be.visible');
    cy.get('img[alt="Kubernetes wheel"]').click();
    cy.contains('Kruize URL');
    cy.get('#kruize-url')
      .invoke('text')
      .then((text) => {
        const regex = /http:\/\/([\d.]+):(\d+)/;
        const match = text.match(regex);

        if (match) {
          ip = match[1];
          port = match[2];
        } else {
          cy.log('IP and Port not found in the text');
        }
      });
  });

  it('should check that the List Experiments API is working', () => {
    cy.request('GET', `http://${ip}:${port}/listExperiments`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body[0].experiment_name);
      expect(response.body[0]).to.have.property('experiment_name');
      exp_len = response.body.length;
    });
  });

  // it('should check that the List Recommendations API is working', () => {
  //   cy.request('GET', `http://${ip}:${port}/listRecommendations?experiment_name=${exp_name}&latest=false`).then(
  //     (response) => {
  //       expect(response.status).to.eq(200);
  //       cy.log(response.body[0].experiment_name);
  //       expect(response.body[0]).to.have.property('experiment_name');
  //       exp_len = response.body.length;
  //     }
  //   );
  // });
});

describe('My First Test', () => {
  //Checks if kruize ui page is loaded successfully
  it('Check page is loaded successfully', () => {
    cy.visit('http://localhost:9000');
    cy.title().should('include', 'Kruize');
    cy.contains('About Kruize');
  });

  //open up SRE Analytics page
  it('click on hamburger icon & select SRE Analytics from Analytics', () => {
    cy.visit('http://localhost:9000');
    cy.get('button[aria-label="Global navigation"]').click();
    cy.get('#Analytics-2').should('be.visible').click();
    cy.contains('SRE View').click();
    cy.url().should('eq', 'http://localhost:9000/analytics_sre');
    cy.get('button[aria-label="Global navigation"]').click();
  });

  //
  it('perform additional actions on SRE Analytics page', () => {
    cy.log(`${exp_len}`);
    const randomIndex = Number(Math.floor(Math.random() * (Number(exp_len) - 1)) + 1);
    cy.log(`${randomIndex}`);

    cy.visit('http://localhost:9000/analytics_sre');
    cy.contains('Analytics - SRE View');
    cy.contains('UseCase Selection').click();
    cy.get('select[aria-label="FormSelect Input"]').should('be.visible');
    cy.get('#usecase-selection').should('be.visible'); // Click to open the dropdown
    cy.get('#usecase-selection').select('Monitoring'); // Replace 'Monitoring' with the actual value of the option
    cy.get('#local-or-remote').should('be.visible'); // Click to open the dropdown
    cy.get('#local-or-remote').select('Remote');
    cy.get('#exp-name-select').should('be.visible');
    // test list exp api over here
    cy.get('#exp-name-select').select(randomIndex);
    cy.get('#get-recommendations').click();
  });

  // it('goes to view recommendations', () => {
  //   cy.contains('Recommendations').click();
  // });
});
