<script>
import { mapState } from 'vuex'

export default {
    name: 'Footer',
    computed: {
        ...mapState({
            copyright: "copyright"
        })
    },
}
</script>

<template>
    <footer class="footer">
		<p>{{ copyright }}</p>
	</footer>
</template>

<style>
    .footer {
		text-align: center;
		font-style: italic;
        background-color: white;
        opacity: 85%;
        width: 100%;
        margin-top: 2rem;
        position: fixed;
        bottom: 0rem;
	}
</style>