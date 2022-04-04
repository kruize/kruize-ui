import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

const CommunityCall: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg"> <center>Autotune Community Calls !</center></Title>
    <p><center>Welcome to the Autotune Community Calls page!</center></p> <br/> 
    <p>Hosted by the Autotune Community team, these free calls are some of the most engaging webinars around! 
      Typically, the calls are an hour. For each webinar, the presentation portion takes 25 minutes, followed by 30 minutes of in-depth questions and discussions with the audience -- with the final 5 minutes usually spent looking ahead to what topics are planned in the coming weeks.</p>
    <br/> <br/>
  <Title headingLevel="h1" size="lg">Joining the calls</Title>
  <br/><br/>
  <p>Please note that our process for joining the Community Calls has changed. Now, you can go to the YouTube link to subscribe to Autotune Community Calls. There, you can set reminders for the calls you’re interested in attending. No need to register for upcoming calls.
</p><br/><br/>

  <Title headingLevel="h1" size="lg">Upcoming calls</Title>
<br/><br/>
  <table>
    <tr>
      <th>
        Date and Time&nbsp;&nbsp;
      </th>
      <th>Title and Registration Link&nbsp;&nbsp;</th>
      <th>Agenda</th>
      <th>Presenter(s)</th>
    </tr>
    <tbody>
      <tr>
        <td>16 March (9 pm IST)</td>
        <td>&nbsp;&nbsp;Some Stuff</td>
        <td>As part of these connects, we would be covering the following: <br/>
Understanding the project scope,<br/> current status and future roadmap/enhancements<br/>
Collaboration opportunities,
Community drive and open source contribution</td>
<td><a href="mailto:dinogun@gmail.com">Dinakar Guniguntala</a> - 'Dino', as he is fondly referred,<br/> is the Senior Principal SE/architect at Red Hat.Prior to RH, Dino was with IBM and moved to Red Hat in 2020.</td>
      </tr>
    </tbody>
  </table>
  <br/><br/>
  <Title headingLevel="h1" size="lg">Requesting and suggesting topics and sessions</Title> <br/><br/>
  <p>Email your suggestions directly to <u>community@autotune.com</u>. We'll do our best to find the right topic expert and schedule the session in the coming months.</p> <br/><br/>
  <Title headingLevel="h1" size="lg">Asking questions and providing feedback</Title> <br/><br/>
  <p>Email your questions and feedback directly to <u>community@autotune.com </u>.</p> <br/><br/>
  <Title headingLevel="h1" size="lg">Accessing replays</Title><br/><br/>
  <p>Please note that all 2022 Autotune Community Calls replays are accessible on our <a href="https://www.youtube.com/channel/UCgwhJbGq7NPAkkjgD9cdJXQ">YouTube channel</a>.
  <ul>
  <li>&emsp;&emsp;<a href="https://www.youtube.com/watch?v=f1mKHBTfgVc" >2022 11th March</a></li>
        <li>&emsp;&emsp;2021</li>

      </ul>
      </p>
  </PageSection>
)

export { CommunityCall };
