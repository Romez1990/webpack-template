<template lang="pug">
    #wrapper
        h2 {{ msg }}
        cp
</template>

<script lang="ts">
    import cp from '../components/cp.vue';
    
    export default {
        data() {
            return {
                msg: 'Blog',
            };
        },
        components: { cp },
    };
</script>

<style lang="stylus" scoped>
    @import '../components/standard'
    
    h2
        color red
</style>
