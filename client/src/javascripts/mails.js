import SearchBar from "../components/partials/Search";
import PaginationMenu from "../components/partials/Pagination";

export default {
  name: "Mails",
  data() {
    return {
      mails: [],

      entitiesAmount: 0,
      search: "",
      header: "",

      hasResults: true
    };
  },
  watch: {
    mails: function() {
      if (this.mails.length === 0) {
        this.header = "No results";
        this.hasResults = false;
      } else {
        this.header = "";
        this.hasResults = true;
      }
    }
  },
  methods: {
    searching: function(query) {
      this.search = query;
    }
  },
  components: {
    SearchBar,
    PaginationMenu
  }
};