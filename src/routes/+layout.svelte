<script lang="ts">
	import '../app.postcss';
	import "lirio/styles";

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { AppShell, Drawer, getDrawerStore, initializeStores, storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Footer, Menu } from 'lirio/components';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Drawer
	initializeStores();
	const drawerStore = getDrawerStore();

	export let data;
	let { settings } = data;
</script>

<Drawer>
	{#if $drawerStore.id === "mobile-menu"}
		<Menu data={{Mobile: true, ...settings?.Menu}}/>
	{/if}
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<Menu data={{
			Mobile: false,
			...settings?.Menu
		}}/>
	</svelte:fragment>

	<slot /><svelte:fragment slot="pageFooter">
		<Footer data={{...settings?.Footer}}/>
	</svelte:fragment>
</AppShell>
