let exp_len, exp_name;
let ip, port;
describe('API Tests', () => {
  it('should check and get ip and port for all apis to be called', () => {
    cy.visit('http://localhost:9000');
    cy.get('img[alt="Kubernetes wheel"]').should('be.visible');
    cy.get('img[alt="Kubernetes wheel"]').click();
    cy.contains('Kruize URL');
    cy.get('#kruize-url')
      .invoke('text')
      .then((text) => {
        const regex = /http:\/\/([\d.]+):(\d+)/;
        const match = RegExp(regex).exec(text);

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
});

describe('Mimics User Clicks in the UI', () => {
  //Checks if kruize ui page is loaded successfully
  it('Check page is loaded successfully', () => {
    cy.visit('http://localhost:9000');
    cy.title().should('include', 'Kruize');
    cy.contains('About Kruize');
  });

  //open up SRE Analytics page
  it('Clicks on hamburger icon & navigate to SRE Analytics', () => {
    cy.visit('http://localhost:9000');
    cy.get('button[aria-label="Global navigation"]').click();
    cy.get('#Analytics-2').should('be.visible').click();
    cy.contains('SRE View').click();
    cy.url().should('eq', 'http://localhost:9000/analytics_sre');
    cy.get('button[aria-label="Global navigation"]').click();
  });

  //
  it('Navigates Usecase Selection on SRE Analytics page', () => {
    cy.log(`${exp_len}`);
    const randomIndex = Number(Math.floor(Math.random() * (Number(exp_len) - 1)) + 1);
    cy.log(`${randomIndex}`);

    cy.visit('http://localhost:9000/analytics_sre');
    cy.contains('Analytics - SRE View');
    cy.contains('UseCase Selection').click();
    cy.get('select[aria-label="FormSelect Input"]').should('be.visible');
    cy.get('#usecase-selection').should('be.visible');
    cy.get('#usecase-selection').select('Monitoring');
    cy.get('#local-or-remote').should('be.visible');
    cy.get('#local-or-remote').select('Remote');
    cy.get('#exp-name-select').should('be.visible');
    // test list exp api over here
    cy.get('#exp-name-select').select(randomIndex);
    cy.get('option#exp_name_option').invoke('val').as('exp_name_value');
    cy.window().its('sessionStorage').invoke('getItem', 'Experiment Name').as('selected');
    cy.get('#get-recommendations').click();
    // testing List Recommendations api
    cy.get('@selected').then((value) => {
      cy.request('GET', `http://${ip}:${port}/listRecommendations?experiment_name=${value}&latest=false`).then(
        (response) => {
          expect(response.status).to.eq(200);
          cy.log(response.body[0].cluster_name);
          expect(response.body[0].kubernetes_objects[0].containers[0]).to.have.property('recommendations');
        }
      );
    });

    cy.get('#Workload_details').should('be.visible');
  });
});
