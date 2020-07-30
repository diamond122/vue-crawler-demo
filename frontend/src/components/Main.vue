<template>
  <v-container>
    <v-text-field label="Site Full URL" v-model="url"></v-text-field>
    <v-btn mall :loading="loading" color="primary" @click="onClick">Crawl</v-btn>
    <v-spacer class="mt-4" />
    <v-data-table
      :headers="headers"
      :items="sites"
      item-key="id"
      class="elevation-1"
      @click:row="handleClick"
      :loading="loading"
    >
      <template v-slot:item._id="{ item }">
        <router-link :to="{ name: 'detail', params: { id: item._id }}">
          <v-btn color="primary">Detail</v-btn>
        </router-link>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Main",
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
      // sites: [],
      headers: [
        { text: "Site", value: "url" },
        { text: "Time", value: "createdAt" },
        { text: "Id", value: "_id" }
      ]
    };
  },
  methods: {
    ...mapActions({
      getSites: "$_site/getSites",
      crawlSite: "$_site/crawlSite"
    }),
    handleClick(site) {
      console.log("site:", site);
    },
    loadItems() {
      this.loading = true;
      this.getSites()
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.log("err:", err);
          this.loading = false;
        });
    },
    onClick() {
      console.log("clicked:", encodeURIComponent(this.url));
      if (!this.url) return;
      this.loading = true;
      this.crawlSite(this.url)
        .then(response => {
          console.log("response:", response);
          this.loading = false;
        })
        .catch(err => {
          console.log("err:", err);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters({
      sites: "$_site/sites"
    })
  },
  mounted() {
    this.loadItems();
  }
};
</script>
