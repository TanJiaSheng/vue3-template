<template>
    <div>
        <el-empty description="404" />
    </div>
</template>

<script setup lang="ts">
    import { useStore } from 'vuex'
    const store = useStore()
    console.log(store.state.system)
</script>

<style scoped></style>
