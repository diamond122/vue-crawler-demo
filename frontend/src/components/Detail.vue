<template>
  <v-container>
    <v-data-table :headers="headers" :items="results" group-by="type" show-group-by></v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  props: {
    initKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      url: this.initUrl,
      items: [],
      headers: [
        { text: "type", value: "type" },
        { text: "text", value: "text" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getSite: "$_site/site"
    }),
    results() {
      const site = this.getSite(this.$route.params.id);
      return [
        ...(site?.a?.map(text => ({ type: "a", text })) || []),
        ...(site?.h1?.map(text => ({ type: "h1", text })) || []),
        ...(site?.h2?.map(text => ({ type: "h2", text })) || [])
      ];
    }
  },
  methods: {},
  mounted() {}
};
</script>
