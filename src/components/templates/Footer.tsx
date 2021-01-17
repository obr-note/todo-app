import _ from 'lodash';
import React from 'react';
import { Container, Image, List, Segment } from 'semantic-ui-react';

const FooterTemplete: React.FC = () => (
  <Segment inverted id="footer-wrapper" vertical>
    <Container textAlign="center">
      <Image src="./images/logo.png" centered size="mini" />
      <List horizontal inverted divided link size="small">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default FooterTemplete;
