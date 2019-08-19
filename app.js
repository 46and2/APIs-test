var vm = new Vue({
  el: '#app',
  data: {
    personInfo: {},
    countryData: {},
    imageUrls: []
  },
  mounted() {
    this.getName();
  },
  methods: {
    getName: function () {
      axios
        .get('https://uinames.com/api/?ext')
        .then(response => {
          this.personInfo = response.data;
          this.getCountryData(response.data.region);
          this.getCountryRelatedPhoto(response.data.region);
        })
        .catch((error) => { console.log(error); });
    },
    getCountryData: function (countryName) {
      axios
        .get('https://restcountries.eu/rest/v2/name/' + countryName)
        .then(response => (this.countryData = response.data[0]))
        .catch((error) => { console.log(error); });
    },
    getCountryRelatedPhoto: function (countryName) {
      axios
        .get('https://api.unsplash.com/search/photos/', {
          params: {
            client_id: config.KEY,
            query: countryName,
            page: 1,
            per_page: 3
          }
        })
        .then(response => {
          this.imageUrls = response.data.results.map(function (result) {
            return result.urls.small;
          });
        })
        .catch((error) => { console.log(error); });
    }
  },
  computed: {
    age: function () {
      let result = this.personInfo.age;
      return (result ? result + ' years old' : '');
    },
    title: function () {
      let result = this.personInfo.title;
      return (result ? result + '. ' : '');
    }
  }
})
