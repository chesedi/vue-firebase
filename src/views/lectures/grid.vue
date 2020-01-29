<template>
  <v-card color="yellow">
    <v-container fluid>
      <v-row >
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="n in 8"
          :key="n"
          class="pa-2"
        >
          <v-card
            outline
            title
            color="red"
          >
            Column
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>
