<template>
  <v-card>
    <v-form v-model="valid" class="pa-2">
      <v-container>
        <v-card-title class="headline">
          Add Item
        </v-card-title>

        <v-row no-gutters>
          <v-col>
            <v-text-field required v-model="name" label="Name"> </v-text-field>
          </v-col> </v-row
        ><v-row>
        <v-col>
          <v-btn
              @click="add"
              depressed
              color="primary"
          >
            <span class="white--text">Add Item</span>
          </v-btn></v-col
        ><v-col>
        <v-btn @click="" depressed color="primary" outlined>
          Close
        </v-btn></v-col
      >
      </v-row></v-container
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LayoutDesign"
}
</script>

<style scoped>

</style>
