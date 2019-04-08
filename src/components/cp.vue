<template lang="pug">
    h1 {{ msg }}
</template>

<script lang="ts">
    export default {
        data() {
            return {
                msg: 'Hello, World!',
            };
        },
    };
</script>

<style lang="stylus" scoped>
    h1
        color red
</style>
