<script lang="ts">
	import {
    Button,
		Card,
		CardBody,
    CardHeader,
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
        <CardHeader>
          <h1 class="text-center">P3 - Nidstinien</h1>
          <Dropdown class="position-absolute top-0 m-3">
            <DropdownToggle caret>Choose Phase</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>P3 - Nidstinien</DropdownItem>
              <DropdownItem disabled>That's all I got to be tbh</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" id="nextStepButton" class="position-absolute top-0 end-0 m-3">Next Step</Button>
        </CardHeader>
        <CardBody id="moveableBound">
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
