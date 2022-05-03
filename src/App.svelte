<script lang="ts">
	import {
    Button,
		Card,
		CardBody,
    CardHeader,
		Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
	} from 'sveltestrap';
	import "bootswatch/dist/vapor/bootstrap.min.css";

  import RoleIcons from './components/RoleIcons.svelte';
  import Wyrmholes from './components/Wyrmholes.svelte';
</script>

<main class="h-100 row align-items-center">
	<Container class="col h-100 p-5">
		<Card color="dark" class="h-100">
      <CardHeader>
        <h1 class="text-center">Wyrmholes</h1>
        <Dropdown class="position-absolute top-0 m-3">
          <DropdownToggle caret>Choose Mechanic</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Wyrmholes</DropdownItem>
            <DropdownItem disabled>That's all I got to be tbh</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button color="primary" id="nextStepButton" class="position-absolute top-0 end-0 m-3">Next Step</Button>
      </CardHeader>
			<CardBody>
        <RoleIcons />
        <Wyrmholes />
			</CardBody>
		</Card>
	</Container>
</main>
