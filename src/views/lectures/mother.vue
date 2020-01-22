<template>
    <v-card>
      <my-son name="aaaa" @help="listen"></my-son>
      <my-son name="bbbb"></my-son>
      <my-son name="cccc"></my-son>
      <my-son name="ddd"></my-son>
      <my-doughter></my-doughter>
      <v-card-text>
        <v-alert type="success" v-model="call">
          I'm a success alert.
        </v-alert>
      </v-card-text>
    </v-card>
</template>
<script>
import MySon from '@/components/mySon'
import MyDoughter from '@/components/myDoughter'
export default {
  components: {
    MySon, MyDoughter
  },
  data () {
    return {
      call: false
    }
  },
  methods: {
    listen () {
      this.call = true
    }
  }
}
</script>
