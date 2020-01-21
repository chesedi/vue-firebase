<template>
  <div>
    <v-alert type="primary" :value="true" v-for="i in array" :key="i">
      adcd {{i}}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      seen: false,
      message: 'abcbindd',
      array: [1, 2, 3, 4, 'xx']
    }
  }
}
</script>
