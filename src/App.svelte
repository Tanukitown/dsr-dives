<script lang="ts">
	import {
		Card,
		CardBody,
		Container,
		Styles
	} from 'sveltestrap';
	import "bootswatch/dist/vapor/bootstrap.min.css";

  import RoleIcons from './components/RoleIcons.svelte';
</script>

<main class="h-100 row align-items-center">
	<Container class="col h-100 p-5">
		<Card class="h-100 bg-dark">
			<CardBody>
        <RoleIcons />
			</CardBody>
		</Card>
	</Container>
</main>

<Styles />
