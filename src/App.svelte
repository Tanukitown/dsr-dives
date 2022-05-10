<script lang="ts">
	import {
    Button,
		Card,
		CardBody,
    Col,
		Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row
	} from 'sveltestrap';
	import "bootswatch/dist/vapor/bootstrap.min.css";

  import RoleIcons from './components/RoleIcons.svelte';
  import Timeline from './components/Timeline.svelte';
  import Wyrmholes from './components/Wyrmholes.svelte';
</script>

<Container fluid class="h-100">
  <Row cols={{ lg: 2, md: 2, sm: 1}} class="h-100">
    <Col lg="9" sm="1">
      <Card color="dark" class="h-100">
        <div class="card-header d-flex justify-content-between">
          <Dropdown class="my-auto">
            <DropdownToggle caret>Choose Phase</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>P3 - Nidstinien</DropdownItem>
              <DropdownItem disabled>That's all I got to be tbh</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <h1 class="text-center">P3 - Nidstinien</h1>
          <Button color="primary" id="nextStepButton" class="my-auto">Next Step</Button>
        </div>
        <CardBody id="arena">
          <RoleIcons />
          <Wyrmholes />
        </CardBody>
      </Card>
    </Col>
    <Col lg="3" sm="1">
      <Timeline />
    </Col>
  </Row>
</Container>
