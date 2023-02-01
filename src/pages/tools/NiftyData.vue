<template>
  <li><h3>LTP</h3>
    <p>
      <span class="highlight">{{ underlying }}</span>
      <span class="highlight1">{{ lastPrice }}</span>
    </p>
  </li>
</template>

<script>
export default {
  props: ['underlying', 'lastPrice'],
  // computed: {
  //   ratingClass() {
  //     return 'highlight rating--' + this.last_price;
  //   },
  // },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

h3,
p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.highlight {
  font-weight: bold;
}

.rating--poor {
  color: #b80056;
}

.rating--average {
  color: #330075;
}

.rating--great {
  color: #008327;
}
</style>
